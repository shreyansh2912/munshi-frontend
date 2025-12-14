/**
 * Invoices Service
 * Handles all invoice-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import type { Invoice, CreateInvoiceRequest, UpdateInvoiceRequest, APIResponse } from '@/lib/api/types';

/**
 * Invoices Service Object
 */
export const invoicesService = {
    /**
     * List all invoices
     */
    async list(params?: { status?: string; search?: string }): Promise<Invoice[]> {
        const response = await apiClient.get<APIResponse<Invoice[]>>(API_ENDPOINTS.invoices.list, params);
        return response.data;
    },

    /**
     * Get invoice by ID
     */
    async getById(id: string): Promise<Invoice> {
        const response = await apiClient.get<APIResponse<Invoice>>(API_ENDPOINTS.invoices.get(id));
        return response.data;
    },

    /**
     * Create new invoice
     */
    async create(data: CreateInvoiceRequest): Promise<Invoice> {
        const response = await apiClient.post<APIResponse<Invoice>>(API_ENDPOINTS.invoices.create, data);
        return response.data;
    },

    /**
     * Update invoice
     */
    async update(id: string, data: UpdateInvoiceRequest): Promise<Invoice> {
        const response = await apiClient.patch<APIResponse<Invoice>>(API_ENDPOINTS.invoices.update(id), data);
        return response.data;
    },

    /**
     * Delete invoice
     */
    async delete(id: string): Promise<void> {
        await apiClient.delete<void>(API_ENDPOINTS.invoices.delete(id));
    },
};

// Backwards compatibility exports
export const list = (params?: { status?: string; search?: string }) => invoicesService.list(params);
export const get = (id: string) => invoicesService.getById(id);
export const create = (data: CreateInvoiceRequest) => invoicesService.create(data);
export const update = (id: string, data: UpdateInvoiceRequest) => invoicesService.update(id, data);
export const deleteInvoice = (id: string) => invoicesService.delete(id);

export default invoicesService;
