/**
 * User Service
 * Handles all user-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import type { User, UpdateProfileRequest } from '@/lib/api/types';

/**
 * Get current user profile
 */
export const getProfile = () => {
    return apiClient.get<User>(API_ENDPOINTS.user.me);
};

/**
 * Update current user profile
 */
export const updateProfile = (data: UpdateProfileRequest) => {
    return apiClient.patch<User>(API_ENDPOINTS.user.me, data);
};

/**
 * List all users (admin only)
 */
export const listUsers = () => {
    return apiClient.get<User[]>(API_ENDPOINTS.user.list);
};

/**
 * Get user by ID (admin only)
 */
export const getUserById = (id: string) => {
    return apiClient.get<User>(`${API_ENDPOINTS.user.list}/${id}`);
};
