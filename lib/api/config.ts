/**
 * API Configuration
 * Centralized configuration for API client with security and performance settings
 */

export const API_CONFIG = {
    // Base URLs
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
    appURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',

    // Timeouts (in milliseconds)
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10),

    // Retry configuration
    maxRetries: parseInt(process.env.NEXT_PUBLIC_MAX_RETRIES || '3', 10),
    retryDelay: 1000, // Base delay for exponential backoff

    // Security
    tokenRefreshBuffer: 60, // Refresh token 60 seconds before expiry
    maxConcurrentRequests: 10,

    // Performance
    enableRequestDeduplication: process.env.NEXT_PUBLIC_ENABLE_REQUEST_DEDUPLICATION === 'true',
    enableCaching: true,
    cacheMaxAge: 5 * 60 * 1000, // 5 minutes

    // Logging
    enableLogging: process.env.NODE_ENV === 'development' ||
        process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true',

    // Headers
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
} as const;

/**
 * API Endpoints
 * Type-safe endpoint definitions
 */
export const API_ENDPOINTS = {
    // Authentication
    auth: {
        register: '/auth/register',
        login: '/auth/login',
        refresh: '/auth/refresh',
        logout: '/auth/logout',
        logoutAll: '/auth/logout-all',
    },

    // User
    user: {
        me: '/users/me',
        list: '/users',
        update: (id: string) => `/users/${id}`,
    },

    // Ledger
    ledger: {
        list: '/ledger',
        create: '/ledger',
        get: (id: string) => `/ledger/${id}`,
        update: (id: string) => `/ledger/${id}`,
        delete: (id: string) => `/ledger/${id}`,
    },

    // Invoices
    invoices: {
        list: '/invoices',
        create: '/invoices',
        get: (id: string) => `/invoices/${id}`,
        update: (id: string) => `/invoices/${id}`,
        delete: (id: string) => `/invoices/${id}`,
    },

    // Customers
    customers: {
        list: '/customers',
        create: '/customers',
        get: (id: string) => `/customers/${id}`,
        update: (id: string) => `/customers/${id}`,
        delete: (id: string) => `/customers/${id}`,
    },

    // Products
    products: {
        list: '/products',
        create: '/products',
        get: (id: string) => `/products/${id}`,
        update: (id: string) => `/products/${id}`,
        delete: (id: string) => `/products/${id}`,
        categories: '/products/categories',
        units: '/products/units',
    },

    // Payments
    payments: {
        list: '/payments',
        create: '/payments',
        get: (id: string) => `/payments/${id}`,
        update: (id: string) => `/payments/${id}`,
        delete: (id: string) => `/payments/${id}`,
        allocations: (id: string) => `/payments/${id}/allocations`,
    },

    // Organizations
    organizations: {
        list: '/organizations',
        create: '/organizations',
        current: '/organizations/current',
        update: (id: string) => `/organizations/${id}`,
        switch: (id: string) => `/organizations/${id}/switch`,
    },

    // Health
    health: '/health',
} as const;

/**
 * Storage Keys
 * Consistent keys for localStorage/sessionStorage
 */
export const STORAGE_KEYS = {
    accessToken: 'munshi_access_token',
    refreshToken: 'munshi_refresh_token',
    user: 'munshi_user',
    deviceId: 'munshi_device_id',
} as const;

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
} as const;
