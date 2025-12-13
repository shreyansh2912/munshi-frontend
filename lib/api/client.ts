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
            withCredentials: true,
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
                // const token = tokenStorage.getAccessToken();
                // if (token && !config.headers['skip-auth']) {
                //     config.headers.Authorization = `Bearer ${token}`;
                // }

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

                // Skip auto-refresh if request has skip-auth header or already retried
                const shouldSkipRefresh =
                    originalRequest.headers?.['skip-auth'] === 'true' ||
                    originalRequest._retry;

                // Handle 401 Unauthorized - Token refresh
                if (error.response.status === HTTP_STATUS.UNAUTHORIZED && !shouldSkipRefresh) {
                    // Only attempt auto-refresh on client-side
                    if (typeof window === 'undefined') {
                        // Server-side: Don't auto-refresh, just throw error
                        throw this.transformError(error as AxiosError<APIError>);
                    }

                    if (this.isRefreshing) {
                        // Wait for token refresh to complete
                        return new Promise((resolve) => {
                            this.refreshSubscribers.push((newCookie: string) => {
                                if (newCookie) {
                                    if (!originalRequest.headers) {
                                        originalRequest.headers = {};
                                    }
                                    originalRequest.headers['Cookie'] = newCookie;
                                }
                                resolve(this.axiosInstance(originalRequest));
                            });
                        });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        // Refresh token - cookie based
                        if (!originalRequest.headers) {
                            originalRequest.headers = {};
                        }
                        const cookieHeader = originalRequest.headers['Cookie'] || originalRequest.headers['cookie'];
                        const refreshHeaders: Record<string, string> = { 'skip-auth': 'true' };
                        if (cookieHeader) {
                            refreshHeaders['Cookie'] = cookieHeader.toString();
                        }

                        if (API_CONFIG.enableLogging) {
                            console.log('[API Refresh] Attempting refresh with headers:', refreshHeaders);
                            console.log('[API Refresh] Endpoint:', API_ENDPOINTS.auth.refresh);
                        }

                        const refreshResponse = await this.axiosInstance.post(
                            API_ENDPOINTS.auth.refresh,
                            {},
                            { headers: refreshHeaders }
                        );

                        // Update cookies for retry (Server-Side Fix)
                        const setCookie = refreshResponse.headers['set-cookie'];
                        let currentCookie = (originalRequest.headers['Cookie'] as string) || '';

                        if (API_CONFIG.enableLogging) {
                            console.log('[API Refresh] Set-Cookie headers:', setCookie);
                        }

                        if (setCookie && Array.isArray(setCookie)) {
                            const newCookies = setCookie.map(c => c.split(';')[0]); // Get name=value parts

                            newCookies.forEach(newCookie => {
                                const [name] = newCookie.split('=');
                                if (currentCookie.includes(`${name}=`)) {
                                    // Replace existing cookie value using regex to match name=value until semicolon or end of string
                                    currentCookie = currentCookie.replace(new RegExp(`${name}=[^;]+`), newCookie);
                                } else {
                                    // Append new cookie
                                    currentCookie = currentCookie ? `${currentCookie}; ${newCookie}` : newCookie;
                                }
                            });

                            if (API_CONFIG.enableLogging) {
                                console.log('[API Refresh] Updated Cookie header:', currentCookie);
                            }

                            originalRequest.headers['Cookie'] = currentCookie;
                        }

                        // Retry all pending requests with new cookies
                        this.refreshSubscribers.forEach((callback) => callback(currentCookie));
                        this.refreshSubscribers = [];

                        // Retry original request
                        return this.axiosInstance(originalRequest);
                    } catch (refreshError) {
                        tokenStorage.clearAuth();
                        // Only redirect on client-side
                        if (typeof window !== 'undefined') {
                            window.location.href = '/login';
                        }
                        throw new AuthenticationError('Session expired. Please login again.');
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                // Transform error
                throw this.transformError(error as AxiosError<APIError>);
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
                    data.message || 'Validation failed',
                    data.details as Record<string, string[]>
                );
            }

            // API error
            return new APIClientError(
                data.message || 'An error occurred',
                status,
                data.errorCode || 'UNKNOWN_ERROR',
                data.details
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
        const { skipRetry = false, skipAuth = false, timeout, headers } = customConfig || {};

        const requestConfig: AxiosRequestConfig = {
            ...config,
            timeout: timeout || config.timeout,
            headers: {
                ...config.headers,
                ...headers,
                ...(skipAuth ? { 'skip-auth': 'true' } : {}),
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
