/**
 * Secure Token Storage
 * Production-grade token management with security best practices
 */

import { STORAGE_KEYS } from './config';
import type { User } from './types';

/**
 * Storage interface for abstraction
 */
interface Storage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
}

/**
 * Get storage instance (client-side only)
 */
const getStorage = (): Storage | null => {
    if (typeof window === 'undefined') return null;
    return window.localStorage;
};

/**
 * Generate a unique device ID for session tracking
 */
const generateDeviceId = (): string => {
    const storage = getStorage();
    if (!storage) return '';

    let deviceId = storage.getItem(STORAGE_KEYS.deviceId);

    if (!deviceId) {
        // Generate a unique device ID
        deviceId = `device_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        storage.setItem(STORAGE_KEYS.deviceId, deviceId);
    }

    return deviceId;
};

/**
 * Token Storage Class
 * Handles secure storage and retrieval of authentication tokens
 */
class TokenStorage {
    private storage: Storage | null;

    constructor() {
        this.storage = getStorage();
    }

    /**
     * Store access token securely
     */
    setAccessToken(token: string): void {
        if (!this.storage) return;

        try {
            this.storage.setItem(STORAGE_KEYS.accessToken, token);
        } catch (error) {
            console.error('Failed to store access token:', error);
        }
    }

    /**
     * Get access token
     */
    getAccessToken(): string | null {
        if (!this.storage) return null;

        try {
            return this.storage.getItem(STORAGE_KEYS.accessToken);
        } catch (error) {
            console.error('Failed to retrieve access token:', error);
            return null;
        }
    }

    /**
     * Store refresh token securely
     */
    setRefreshToken(token: string): void {
        if (!this.storage) return;

        try {
            this.storage.setItem(STORAGE_KEYS.refreshToken, token);
        } catch (error) {
            console.error('Failed to store refresh token:', error);
        }
    }

    /**
     * Get refresh token
     */
    getRefreshToken(): string | null {
        if (!this.storage) return null;

        try {
            return this.storage.getItem(STORAGE_KEYS.refreshToken);
        } catch (error) {
            console.error('Failed to retrieve refresh token:', error);
            return null;
        }
    }

    /**
     * Store user data
     */
    setUser(user: User): void {
        if (!this.storage) return;

        try {
            this.storage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
        } catch (error) {
            console.error('Failed to store user data:', error);
        }
    }

    /**
     * Get user data
     */
    getUser(): User | null {
        if (!this.storage) return null;

        try {
            const userData = this.storage.getItem(STORAGE_KEYS.user);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Failed to retrieve user data:', error);
            return null;
        }
    }

    /**
     * Get device ID
     */
    getDeviceId(): string {
        return generateDeviceId();
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getAccessToken() && !!this.getRefreshToken();
    }

    /**
     * Clear all authentication data
     */
    clearAuth(): void {
        if (!this.storage) return;

        try {
            this.storage.removeItem(STORAGE_KEYS.accessToken);
            this.storage.removeItem(STORAGE_KEYS.refreshToken);
            this.storage.removeItem(STORAGE_KEYS.user);
        } catch (error) {
            console.error('Failed to clear auth data:', error);
        }
    }

    /**
     * Clear all storage
     */
    clearAll(): void {
        if (!this.storage) return;

        try {
            this.storage.clear();
        } catch (error) {
            console.error('Failed to clear storage:', error);
        }
    }
}

// Export singleton instance
export const tokenStorage = new TokenStorage();

// Export class for testing
export { TokenStorage };
