/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/lib/api/types';

/**
 * Register a new user
 */
export const register = (data: RegisterRequest) => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.auth.register, data, {
        skipAuth: true,
    });
};

/**
 * Login user
 */
export const login = (data: LoginRequest) => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.auth.login, data, {
        skipAuth: true,
    });
};

/**
 * Logout user
 */
export const logout = (refreshToken: string) => {
    return apiClient.post<void>(API_ENDPOINTS.auth.logout, { refreshToken }, {
        skipAuth: true,
    });
};

/**
 * Logout from all devices
 */
export const logoutAll = () => {
    return apiClient.post<void>(API_ENDPOINTS.auth.logoutAll);
};

/**
 * Refresh access token
 */
export const refreshToken = (refreshToken: string) => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.auth.refresh, { refreshToken }, {
        skipAuth: true,
    });
};
