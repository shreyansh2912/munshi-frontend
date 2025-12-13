/**
 * API Types
 * Type definitions for API requests and responses
 */

// ==================== Request/Response Types ====================

export interface APIResponse<T = any> {
    success: true;
    data: T;
    message?: string;
}

export interface APIError {
    error: {
        message: string;
        code: string;
        details?: any;
    };
}

export interface RequestConfig {
    skipAuth?: boolean;
    skipRetry?: boolean;
    timeout?: number;
    headers?: Record<string, string>;
}

// ==================== Authentication Types ====================

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

// ==================== User Types ====================

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
}

// ==================== Ledger Types ====================

export interface LedgerAccount {
    id: string;
    name: string;
    type: string;
    balance: number;
    currency?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateLedgerRequest {
    name: string;
    type: string;
    balance?: number;
    currency?: string;
}

export interface UpdateLedgerRequest {
    name?: string;
    type?: string;
    balance?: number;
    currency?: string;
}

// ==================== Invoice Types ====================

export interface InvoiceItem {
    id?: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface Invoice {
    id: string;
    invoiceNumber: string;
    customerId: string;
    customer?: Customer;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: string;
    dueDate: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateInvoiceRequest {
    customerId: string;
    items: InvoiceItem[];
    tax?: number;
    dueDate: string;
}

export interface UpdateInvoiceRequest {
    customerId?: string;
    items?: InvoiceItem[];
    tax?: number;
    dueDate?: string;
    status?: string;
}

// ==================== Customer Types ====================

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateCustomerRequest {
    name: string;
    email: string;
    phone?: string;
    address?: string;
}

export interface UpdateCustomerRequest {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}

// ==================== Pagination Types ====================

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// ==================== Custom Error Classes ====================

/**
 * Base API Client Error
 */
export class APIClientError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public code: string,
        public details?: any
    ) {
        super(message);
        this.name = 'APIClientError';
    }
}

/**
 * Network Error (no response from server)
 */
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}

/**
 * Authentication Error (401, 403)
 */
export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

/**
 * Validation Error (422)
 */
export class ValidationError extends Error {
    constructor(
        message: string,
        public fields?: Record<string, string[]>
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}
