/**
 * User Store
 * Zustand store for user state management
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User, UpdateProfileRequest } from '@/lib/api/types';
import * as userService from '@/lib/services/user.service';

interface UserState {
    // State
    currentUser: User | null;
    users: User[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchProfile: () => Promise<void>;
    updateProfile: (data: UpdateProfileRequest) => Promise<void>;
    fetchUsers: () => Promise<void>;
    setCurrentUser: (user: User | null) => void;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    currentUser: null,
    users: [],
    isLoading: false,
    error: null,
};

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,

                fetchProfile: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        const user = await userService.getProfile();
                        set({ currentUser: user, isLoading: false });
                    } catch (error: any) {
                        set({
                            error: error.message || 'Failed to fetch profile',
                            isLoading: false
                        });
                        throw error;
                    }
                },

                updateProfile: async (data: UpdateProfileRequest) => {
                    set({ isLoading: true, error: null });
                    try {
                        const user = await userService.updateProfile(data);
                        set({ currentUser: user, isLoading: false });
                    } catch (error: any) {
                        set({
                            error: error.message || 'Failed to update profile',
                            isLoading: false
                        });
                        throw error;
                    }
                },

                fetchUsers: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        const users = await userService.listUsers();
                        set({ users, isLoading: false });
                    } catch (error: any) {
                        set({
                            error: error.message || 'Failed to fetch users',
                            isLoading: false
                        });
                        throw error;
                    }
                },

                setCurrentUser: (user: User | null) => {
                    set({ currentUser: user });
                },

                clearError: () => {
                    set({ error: null });
                },

                reset: () => {
                    set(initialState);
                },
            }),
            {
                name: 'user-storage',
                partialize: (state) => ({ currentUser: state.currentUser }),
            }
        ),
        { name: 'UserStore' }
    )
);
