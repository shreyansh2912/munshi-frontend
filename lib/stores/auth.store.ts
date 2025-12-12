/**
 * Auth Store
 * Zustand store for authentication state management
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/lib/api/types';
import * as authService from '@/lib/services/auth.service';
import { tokenStorage } from '@/lib/api/storage';
import { useUserStore } from './user.store';

interface AuthState {
    // State
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    logoutAll: () => Promise<void>;
    clearError: () => void;
    checkAuth: () => boolean;
}

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,

                login: async (data: LoginRequest) => {
                    set({ isLoading: true, error: null });
                    try {
                        const response = await authService.login(data);

                        // Store tokens
                        tokenStorage.setAccessToken(response.accessToken);
                        tokenStorage.setRefreshToken(response.refreshToken);

                        // Set user in user store
                        useUserStore.getState().setCurrentUser(response.user);

                        set({ isAuthenticated: true, isLoading: false });
                    } catch (error: any) {
                        set({
                            error: error.message || 'Login failed',
                            isLoading: false,
                            isAuthenticated: false,
                        });
                        throw error;
                    }
                },

                register: async (data: RegisterRequest) => {
                    set({ isLoading: true, error: null });
                    try {
                        const response = await authService.register(data);

                        // Store tokens
                        tokenStorage.setAccessToken(response.accessToken);
                        tokenStorage.setRefreshToken(response.refreshToken);

                        // Set user in user store
                        useUserStore.getState().setCurrentUser(response.user);

                        set({ isAuthenticated: true, isLoading: false });
                    } catch (error: any) {
                        set({
                            error: error.message || 'Registration failed',
                            isLoading: false,
                            isAuthenticated: false,
                        });
                        throw error;
                    }
                },

                logout: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        const refreshToken = tokenStorage.getRefreshToken();
                        if (refreshToken) {
                            await authService.logout(refreshToken);
                        }

                        // Clear tokens and user
                        tokenStorage.clearAuth();
                        useUserStore.getState().reset();

                        set({ isAuthenticated: false, isLoading: false });
                    } catch (error: any) {
                        // Clear auth even if API call fails
                        tokenStorage.clearAuth();
                        useUserStore.getState().reset();

                        set({
                            error: error.message || 'Logout failed',
                            isLoading: false,
                            isAuthenticated: false,
                        });
                    }
                },

                logoutAll: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        await authService.logoutAll();

                        // Clear tokens and user
                        tokenStorage.clearAuth();
                        useUserStore.getState().reset();

                        set({ isAuthenticated: false, isLoading: false });
                    } catch (error: any) {
                        // Clear auth even if API call fails
                        tokenStorage.clearAuth();
                        useUserStore.getState().reset();

                        set({
                            error: error.message || 'Logout failed',
                            isLoading: false,
                            isAuthenticated: false,
                        });
                    }
                },

                clearError: () => {
                    set({ error: null });
                },

                checkAuth: () => {
                    const hasToken = !!tokenStorage.getAccessToken();
                    set({ isAuthenticated: hasToken });
                    return hasToken;
                },
            }),
            {
                name: 'auth-storage',
                partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
            }
        ),
        { name: 'AuthStore' }
    )
);
