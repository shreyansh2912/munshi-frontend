/**
 * Customers Service
 * Handles all customer-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import type { Customer, CreateCustomerRequest, UpdateCustomerRequest, APIResponse } from '@/lib/api/types';

/**
 * Customers Service Object
 */
export const customersService = {
    /**
     * List all customers
     */
    async list(params?: { status?: string; search?: string }): Promise<Customer[]> {
        const response = await apiClient.get<APIResponse<Customer[]>>(API_ENDPOINTS.customers.list, params);
        return response.data;
    },

    /**
     * Get customer by ID
     */
    async getById(id: string): Promise<Customer> {
        const response = await apiClient.get<APIResponse<Customer>>(API_ENDPOINTS.customers.get(id));
        return response.data;
    },

    /**
     * Create new customer
     */
    async create(data: CreateCustomerRequest): Promise<Customer> {
        const response = await apiClient.post<APIResponse<Customer>>(API_ENDPOINTS.customers.create, data);
        return response.data;
    },

    /**
     * Update customer
     */
    async update(id: string, data: UpdateCustomerRequest): Promise<Customer> {
        const response = await apiClient.patch<APIResponse<Customer>>(API_ENDPOINTS.customers.update(id), data);
        return response.data;
    },

    /**
     * Delete customer
     */
    async delete(id: string): Promise<void> {
        await apiClient.delete<void>(API_ENDPOINTS.customers.delete(id));
    },
};

// Backwards compatibility exports
export const list = (params?: { status?: string; search?: string }) => customersService.list(params);
export const get = (id: string) => customersService.getById(id);
export const create = (data: CreateCustomerRequest) => customersService.create(data);
export const update = (id: string, data: UpdateCustomerRequest) => customersService.update(id, data);
export const deleteCustomer = (id: string) => customersService.delete(id);

export default customersService;
