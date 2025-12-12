/**
 * API Client
 * Production-grade HTTP client with security, performance optimization, and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG, API_ENDPOINTS, HTTP_STATUS } from './config';
import { tokenStorage } from './storage';
import {
    APIResponse,
    APIError,
    APIClientError,
    NetworkError,
    AuthenticationError,
    ValidationError,
    RequestConfig,
} from './types';

/**
 * Request deduplication cache
 * Prevents duplicate requests from being sent simultaneously
 */
class RequestDeduplicator {
    private pendingRequests = new Map<string, Promise<any>>();

    private generateKey(config: AxiosRequestConfig): string {
        return `${config.method}:${config.url}:${JSON.stringify(config.params || {})}`;
    }

    async deduplicate<T>(
        config: AxiosRequestConfig,
        executor: () => Promise<T>
    ): Promise<T> {
        if (!API_CONFIG.enableRequestDeduplication) {
            return executor();
        }

        const key = this.generateKey(config);

        // Return existing pending request if found
        if (this.pendingRequests.has(key)) {
            return this.pendingRequests.get(key)!;
        }

        // Create new request
        const promise = executor().finally(() => {
            this.pendingRequests.delete(key);
        });

        this.pendingRequests.set(key, promise);
        return promise;
    }
}

/**
 * API Client Class
 */
class APIClient {
    private axiosInstance: AxiosInstance;
    private deduplicator: RequestDeduplicator;
    private isRefreshing = false;
    private refreshSubscribers: Array<(token: string) => void> = [];

    constructor() {
        this.deduplicator = new RequestDeduplicator();
        this.axiosInstance = axios.create({
            baseURL: API_CONFIG.baseURL,
            timeout: API_CONFIG.timeout,
            headers: API_CONFIG.defaultHeaders,
        });

        this.setupInterceptors();
    }

    /**
     * Setup request and response interceptors
     */
    private setupInterceptors(): void {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                // Add auth token
                const token = tokenStorage.getAccessToken();
                if (token && !config.headers['skip-auth']) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Add device ID for session tracking
                const deviceId = tokenStorage.getDeviceId();
                if (deviceId) {
                    config.headers['X-Device-ID'] = deviceId;
                }

                // Add request timestamp for performance monitoring
                config.headers['X-Request-Time'] = Date.now().toString();

                // Logging in development
                if (API_CONFIG.enableLogging) {
                    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
                        params: config.params,
                        data: config.data,
                    });
                }

                return config;
            },
            (error) => {
                if (API_CONFIG.enableLogging) {
                    console.error('[API Request Error]', error);
                }
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => {
                // Log response time in development
                if (API_CONFIG.enableLogging) {
                    const requestTime = parseInt(response.config.headers['X-Request-Time'] as string, 10);
                    const responseTime = Date.now() - requestTime;
                    console.log(`[API Response] ${response.config.url} (${responseTime}ms)`, response.data);
                }

                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

                // Handle network errors
                if (!error.response) {
                    throw new NetworkError('Network error. Please check your connection.');
                }

                // Handle 401 Unauthorized - Token refresh
                if (error.response.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        // Wait for token refresh to complete
                        return new Promise((resolve) => {
                            this.refreshSubscribers.push((token: string) => {
                                originalRequest.headers!.Authorization = `Bearer ${token}`;
                                resolve(this.axiosInstance(originalRequest));
                            });
                        });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const refreshToken = tokenStorage.getRefreshToken();
                        if (!refreshToken) {
                            throw new AuthenticationError('No refresh token available');
                        }

                        // Refresh token
                        const response = await this.axiosInstance.post<APIResponse<{ accessToken: string; refreshToken: string }>>(
                            API_ENDPOINTS.auth.refresh,
                            { refreshToken },
                            { headers: { 'skip-auth': 'true' } }
                        );

                        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

                        // Store new tokens
                        tokenStorage.setAccessToken(accessToken);
                        tokenStorage.setRefreshToken(newRefreshToken);

                        // Retry all pending requests
                        this.refreshSubscribers.forEach((callback) => callback(accessToken));
                        this.refreshSubscribers = [];

                        // Retry original request
                        originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
                        return this.axiosInstance(originalRequest);
                    } catch (refreshError) {
                        // Clear auth and redirect to login
                        tokenStorage.clearAuth();
                        if (typeof window !== 'undefined') {
                            window.location.href = '/login';
                        }
                        throw new AuthenticationError('Session expired. Please login again.');
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                // Transform error
                throw this.transformError(error);
            }
        );
    }

    /**
     * Transform axios error to custom error
     */
    private transformError(error: AxiosError<APIError>): Error {
        if (error.response) {
            const { status, data } = error.response;

            // Validation error
            if (status === HTTP_STATUS.UNPROCESSABLE_ENTITY) {
                return new ValidationError(
                    data.error?.message || 'Validation failed',
                    data.error?.details as Record<string, string[]>
                );
            }

            // API error
            return new APIClientError(
                data.error?.message || 'An error occurred',
                status,
                data.error?.code || 'UNKNOWN_ERROR',
                data.error?.details
            );
        }

        // Network error
        return new NetworkError(error.message || 'Network error occurred');
    }

    /**
     * Generic request method with retry logic
     */
    private async request<T>(
        config: AxiosRequestConfig,
        customConfig?: RequestConfig
    ): Promise<T> {
        const { skipRetry = false, timeout, headers } = customConfig || {};

        const requestConfig: AxiosRequestConfig = {
            ...config,
            timeout: timeout || config.timeout,
            headers: {
                ...config.headers,
                ...headers,
            },
        };

        // Request deduplication for GET requests
        if (config.method === 'GET') {
            return this.deduplicator.deduplicate(requestConfig, async () => {
                const response = await this.executeWithRetry<APIResponse<T>>(requestConfig, skipRetry);
                return response.data.data;
            });
        }

        // Execute request
        const response = await this.executeWithRetry<APIResponse<T>>(requestConfig, skipRetry);
        return response.data.data;
    }

    /**
     * Execute request with exponential backoff retry
     */
    private async executeWithRetry<T>(
        config: AxiosRequestConfig,
        skipRetry: boolean
    ): Promise<AxiosResponse<T>> {
        let lastError: Error;

        const maxAttempts = skipRetry ? 1 : API_CONFIG.maxRetries;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                return await this.axiosInstance.request<T>(config);
            } catch (error) {
                lastError = error as Error;

                // Don't retry on client errors (4xx) except 429
                if (axios.isAxiosError(error) && error.response) {
                    const status = error.response.status;
                    if (status >= 400 && status < 500 && status !== HTTP_STATUS.TOO_MANY_REQUESTS) {
                        throw error;
                    }
                }

                // Don't retry on last attempt
                if (attempt === maxAttempts - 1) {
                    throw error;
                }

                // Exponential backoff
                const delay = API_CONFIG.retryDelay * Math.pow(2, attempt);
                await new Promise((resolve) => setTimeout(resolve, delay));

                if (API_CONFIG.enableLogging) {
                    console.log(`[API Retry] Attempt ${attempt + 2}/${maxAttempts} after ${delay}ms`);
                }
            }
        }

        throw lastError!;
    }

    /**
     * HTTP Methods
     */
    async get<T>(url: string, params?: Record<string, any>, config?: RequestConfig): Promise<T> {
        return this.request<T>({ method: 'GET', url, params }, config);
    }

    async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>({ method: 'POST', url, data }, config);
    }

    async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>({ method: 'PATCH', url, data }, config);
    }

    async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>({ method: 'PUT', url, data }, config);
    }

    async delete<T>(url: string, config?: RequestConfig): Promise<T> {
        return this.request<T>({ method: 'DELETE', url }, config);
    }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export class for testing
export { APIClient };
