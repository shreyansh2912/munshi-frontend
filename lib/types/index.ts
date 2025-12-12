/**
 * Central Types File - Frontend
 * All shared types, interfaces, and DTOs for the Munshi frontend
 */

// ============================================================================
// Common Types
// ============================================================================

export interface APIResponse<T = unknown> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
}

export interface APIError {
    success: false;
    statusCode: number;
    message: string;
    errorCode: string;
    details?: Record<string, unknown>;
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
// Organization Types
// ============================================================================

export interface Organization {
    id: string;
    name: string;
    slug: string;
    role: 'admin' | 'member' | 'viewer';
    plan: 'free' | 'pro' | 'enterprise';
    members: number;
}

export interface CreateOrganizationRequest {
    name: string;
    slug?: string;
}

export interface UpdateOrganizationRequest {
    name?: string;
    slug?: string;
}

export interface Member {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'member' | 'viewer';
    status: 'active' | 'pending';
}

// ============================================================================
// Product Types
// ============================================================================

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
    sku?: string;
    stock?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateProductRequest {
    name: string;
    description?: string;
    price: number;
    category?: string;
    sku?: string;
    stock?: number;
}

export interface UpdateProductRequest {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    sku?: string;
    stock?: number;
}

// ============================================================================
// Payment Types
// ============================================================================

export interface Payment {
    id: string;
    customerId?: string;
    invoiceId?: string;
    amount: number;
    paymentDate: string;
    paymentMethod: 'cash' | 'bank_transfer' | 'cheque' | 'upi' | 'card' | 'other';
    referenceNumber?: string;
    notes?: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatePaymentRequest {
    customerId?: string;
    invoiceId?: string;
    amount: number;
    paymentDate?: string;
    paymentMethod: 'cash' | 'bank_transfer' | 'cheque' | 'upi' | 'card' | 'other';
    referenceNumber?: string;
    notes?: string;
}

export interface UpdatePaymentRequest {
    amount?: number;
    paymentDate?: string;
    paymentMethod?: 'cash' | 'bank_transfer' | 'cheque' | 'upi' | 'card' | 'other';
    referenceNumber?: string;
    notes?: string;
    status?: 'pending' | 'completed' | 'failed' | 'cancelled';
}

// ============================================================================
// UI-Specific Types
// ============================================================================

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    category: string;
    status: 'cleared' | 'pending';
    aiSuggestion?: string;
    gstRate?: number;
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    balance: number;
    lastSynced: string;
    status: 'connected' | 'error' | 'syncing';
}

export interface NavItem {
    label: string;
    icon: any;
    path: string;
}

export interface MetricCardProps {
    title: string;
    value: string;
    trend: number;
    trendLabel: string;
    icon: any;
}

export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense' | 'asset' | 'liability';
    budget?: number;
    icon?: string;
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
