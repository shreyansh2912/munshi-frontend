/**
 * Customers Service
 * Handles all customer-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import type { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '@/lib/api/types';

/**
 * List all customers
 */
export const list = (params?: { status?: string; search?: string }) => {
    return apiClient.get<Customer[]>(API_ENDPOINTS.customers.list, params);
};

/**
 * Get customer by ID
 */
export const get = (id: string) => {
    return apiClient.get<Customer>(API_ENDPOINTS.customers.get(id));
};

/**
 * Create new customer
 */
export const create = (data: CreateCustomerRequest) => {
    return apiClient.post<Customer>(API_ENDPOINTS.customers.create, data);
};

/**
 * Update customer
 */
export const update = (id: string, data: UpdateCustomerRequest) => {
    return apiClient.patch<Customer>(API_ENDPOINTS.customers.update(id), data);
};

/**
 * Delete customer
 */
export const deleteCustomer = (id: string) => {
    return apiClient.delete<void>(API_ENDPOINTS.customers.delete(id));
};
