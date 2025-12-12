/**
 * API Types
 * Type-safe definitions for all API requests and responses
 */

// ============================================================================
// Common Types
// ============================================================================

export interface APIResponse<T = unknown> {
    success: boolean;
    data: T;
    message?: string;
    timestamp: string;
}

export interface APIError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Record<string, unknown>;
        statusCode: number;
    };
    timestamp: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

// ============================================================================
// Authentication Types
// ============================================================================

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    user: User;
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

// ============================================================================
// User Types
// ============================================================================

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileRequest {
    name?: string;
    // Add other updatable fields
}

// ============================================================================
// Ledger Types
// ============================================================================

export interface LedgerAccount {
    id: string;
    name: string;
    code: string;
    type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
    parentId: string | null;
    balance: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateLedgerRequest {
    name: string;
    code: string;
    type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
    parentId?: string;
}

export interface UpdateLedgerRequest {
    name?: string;
    code?: string;
    type?: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
    parentId?: string;
    isActive?: boolean;
}

// ============================================================================
// Invoice Types
// ============================================================================

export interface Invoice {
    id: string;
    customer: string;
    customerId?: string;
    date: string;
    dueDate: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    items?: InvoiceItem[];
    createdAt?: string;
    updatedAt?: string;
}

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

export interface CreateInvoiceRequest {
    customerId: string;
    dueDate: string;
    items: Omit<InvoiceItem, 'id'>[];
}

export interface UpdateInvoiceRequest {
    customerId?: string;
    dueDate?: string;
    status?: 'paid' | 'pending' | 'overdue';
    items?: Omit<InvoiceItem, 'id'>[];
}

// ============================================================================
// Customer Types
// ============================================================================

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    gstin?: string;
    address?: string;
    balance: number;
    status: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateCustomerRequest {
    name: string;
    email: string;
    phone?: string;
    gstin?: string;
    address?: string;
}

export interface UpdateCustomerRequest {
    name?: string;
    email?: string;
    phone?: string;
    gstin?: string;
    address?: string;
    status?: 'active' | 'inactive';
}

// ============================================================================
// Request Config Types
// ============================================================================

export interface RequestConfig {
    skipAuth?: boolean;
    skipRetry?: boolean;
    skipCache?: boolean;
    timeout?: number;
    headers?: Record<string, string>;
}

// ============================================================================
// Error Types
// ============================================================================

export class APIClientError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public code: string,
        public details?: Record<string, unknown>
    ) {
        super(message);
        this.name = 'APIClientError';
    }
}

export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

export class ValidationError extends Error {
    constructor(
        message: string,
        public fields?: Record<string, string[]>
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}
