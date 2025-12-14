/**
 * API Services
 * Reusable service layer for all API operations
 */

import { apiClient } from './client';
import { API_ENDPOINTS } from './config';
import productsApi from './products';
import paymentsApi from './payments';
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    User,
    UpdateProfileRequest,
    LedgerAccount,
    CreateLedgerRequest,
    UpdateLedgerRequest,
    Invoice,
    CreateInvoiceRequest,
    UpdateInvoiceRequest,
    Customer,
    CreateCustomerRequest,
    UpdateCustomerRequest,
    PaginatedResponse,
    RequestConfig,
} from './types';

// ============================================================================
// Authentication Service
// ============================================================================

export const authService = {
    /**
     * Register a new user
     */
    async register(data: RegisterRequest): Promise<AuthResponse> {
        return apiClient.post<AuthResponse>(API_ENDPOINTS.auth.register, data, {
            skipAuth: true,
        });
    },

    /**
     * Login user
     */
    async login(data: LoginRequest): Promise<AuthResponse> {
        return apiClient.post<AuthResponse>(API_ENDPOINTS.auth.login, data, {
            skipAuth: true,
        });
    },

    /**
     * Logout user
     */
    async logout(refreshToken: string): Promise<void> {
        return apiClient.post<void>(API_ENDPOINTS.auth.logout, { refreshToken }, {
            skipAuth: true,
        });
    },

    /**
     * Logout from all devices
     */
    async logoutAll(): Promise<void> {
        return apiClient.post<void>(API_ENDPOINTS.auth.logoutAll);
    },
};

// ============================================================================
// User Service
// ============================================================================

export const userService = {
    /**
     * Get current user profile
     */
    async getProfile(config?: RequestConfig): Promise<User> {
        return apiClient.get<User>(API_ENDPOINTS.user.me, undefined, config);
    },

    /**
     * Update current user profile
     */
    async updateProfile(data: UpdateProfileRequest): Promise<User> {
        return apiClient.patch<User>(API_ENDPOINTS.user.me, data);
    },

    /**
     * List all users (admin only)
     */
    async listUsers(): Promise<User[]> {
        return apiClient.get<User[]>(API_ENDPOINTS.user.list);
    },
};

// ============================================================================
// Ledger Service
// ============================================================================

export const ledgerService = {
    /**
     * List all ledger accounts
     */
    async list(params?: { type?: string; search?: string }, config?: RequestConfig): Promise<LedgerAccount[]> {
        return apiClient.get<LedgerAccount[]>(API_ENDPOINTS.ledger.list, params, config);
    },

    /**
     * Get ledger account by ID
     */
    async get(id: string): Promise<LedgerAccount> {
        return apiClient.get<LedgerAccount>(API_ENDPOINTS.ledger.get(id));
    },

    /**
     * Create new ledger account
     */
    async create(data: CreateLedgerRequest): Promise<LedgerAccount> {
        return apiClient.post<LedgerAccount>(API_ENDPOINTS.ledger.create, data);
    },

    /**
     * Update ledger account
     */
    async update(id: string, data: UpdateLedgerRequest): Promise<LedgerAccount> {
        return apiClient.patch<LedgerAccount>(API_ENDPOINTS.ledger.update(id), data);
    },

    /**
     * Delete ledger account
     */
    async delete(id: string): Promise<void> {
        return apiClient.delete<void>(API_ENDPOINTS.ledger.delete(id));
    },
};

// ============================================================================
// Invoices Service
// ============================================================================

export const invoicesService = {
    /**
     * List all invoices
     */
    async list(params?: { status?: string; search?: string }, config?: any): Promise<Invoice[]> {
        return apiClient.get<Invoice[]>(API_ENDPOINTS.invoices.list, params, config);
    },

    /**
     * Get invoice by ID
     */
    async get(id: string, config?: any): Promise<Invoice> {
        return apiClient.get<Invoice>(API_ENDPOINTS.invoices.get(id), undefined, config);
    },

    /**
     * Create new invoice
     */
    async create(data: CreateInvoiceRequest, config?: any): Promise<Invoice> {
        return apiClient.post<Invoice>(API_ENDPOINTS.invoices.create, data, config);
    },

    /**
     * Update invoice
     */
    async update(id: string, data: UpdateInvoiceRequest, config?: any): Promise<Invoice> {
        return apiClient.patch<Invoice>(API_ENDPOINTS.invoices.update(id), data, config);
    },

    /**
     * Delete invoice
     */
    async delete(id: string, config?: any): Promise<void> {
        return apiClient.delete<void>(API_ENDPOINTS.invoices.delete(id), config);
    },
};

// ============================================================================
// Customers Service
// ============================================================================

export const customersService = {
    /**
     * List all customers
     */
    async list(params?: { status?: string; search?: string }, config?: RequestConfig): Promise<Customer[]> {
        return apiClient.get<Customer[]>(API_ENDPOINTS.customers.list, params, config);
    },

    /**
     * Get customer by ID
     */
    async get(id: string): Promise<Customer> {
        return apiClient.get<Customer>(API_ENDPOINTS.customers.get(id));
    },

    /**
     * Create new customer
     */
    async create(data: CreateCustomerRequest): Promise<Customer> {
        return apiClient.post<Customer>(API_ENDPOINTS.customers.create, data);
    },

    /**
     * Update customer
     */
    async update(id: string, data: UpdateCustomerRequest): Promise<Customer> {
        return apiClient.patch<Customer>(API_ENDPOINTS.customers.update(id), data);
    },

    /**
     * Delete customer
     */
    async delete(id: string): Promise<void> {
        return apiClient.delete<void>(API_ENDPOINTS.customers.delete(id));
    },
};

// ============================================================================
// Organizations Service
// ============================================================================

export const organizationsService = {
    /**
     * Create new organization
     */
    async create(data: { name: string;[key: string]: any }): Promise<any> {
        return apiClient.post<any>(API_ENDPOINTS.organizations.create, data);
    },

    /**
     * List user's organizations
     */
    async list(config?: RequestConfig): Promise<any[]> {
        return apiClient.get<any[]>(API_ENDPOINTS.organizations.list, undefined, config);
    },

    /**
     * Get current organization
     */
    async getCurrent(config?: RequestConfig): Promise<any> {
        return apiClient.get<any>(API_ENDPOINTS.organizations.current, undefined, config);
    },

    /**
     * Update organization
     */
    async update(id: string, data: { name?: string;[key: string]: any }): Promise<any> {
        return apiClient.patch<any>(API_ENDPOINTS.organizations.update(id), data);
    },

    /**
     * Switch to another organization
     */
    async switch(id: string): Promise<any> {
        return apiClient.post<any>(API_ENDPOINTS.organizations.switch(id));
    },
};

// ============================================================================
// Health Service
// ============================================================================

export const healthService = {
    /**
     * Check API health
     */
    async check(): Promise<{ status: string; timestamp: string }> {
        return apiClient.get<{ status: string; timestamp: string }>(API_ENDPOINTS.health, undefined, {
            skipAuth: true,
            timeout: 5000,
        });
    },
};

// ============================================================================
// Export all services
// ============================================================================

export const api = {
    auth: authService,
    user: userService,
    ledger: ledgerService,
    invoices: invoicesService,
    customers: customersService,
    organizations: organizationsService,
    health: healthService,
    products: productsApi,
    payments: paymentsApi,
};

// Export individual services
export const productsService = productsApi;
export const paymentsService = paymentsApi;
