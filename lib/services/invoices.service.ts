/**
 * Invoices Service
 * Handles all invoice-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import type { Invoice, CreateInvoiceRequest, UpdateInvoiceRequest } from '@/lib/api/types';

/**
 * List all invoices
 */
export const list = (params?: { status?: string; search?: string }) => {
    return apiClient.get<Invoice[]>(API_ENDPOINTS.invoices.list, params);
};

/**
 * Get invoice by ID
 */
export const get = (id: string) => {
    return apiClient.get<Invoice>(API_ENDPOINTS.invoices.get(id));
};

/**
 * Create new invoice
 */
export const create = (data: CreateInvoiceRequest) => {
    return apiClient.post<Invoice>(API_ENDPOINTS.invoices.create, data);
};

/**
 * Update invoice
 */
export const update = (id: string, data: UpdateInvoiceRequest) => {
    return apiClient.patch<Invoice>(API_ENDPOINTS.invoices.update(id), data);
};

/**
 * Delete invoice
 */
export const deleteInvoice = (id: string) => {
    return apiClient.delete<void>(API_ENDPOINTS.invoices.delete(id));
};
