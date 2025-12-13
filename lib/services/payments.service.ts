/**
 * Payments Service
 * API calls for payment operations
 */

import { apiClient } from '@/lib/api/client';
import type {
    Payment,
    CreatePaymentRequest,
    UpdatePaymentRequest,
    APIResponse
} from '@/lib/api/types';

export const paymentsService = {
    /**
     * List all payments
     */
    async list(): Promise<Payment[]> {
        const response = await apiClient.get<APIResponse<Payment[]>>('/payments');
        return response.data;
    },

    /**
     * Get a single payment by ID
     */
    async getById(id: string | number): Promise<Payment> {
        const response = await apiClient.get<APIResponse<Payment>>(`/payments/${id}`);
        return response.data;
    },

    /**
     * Create a new payment
     */
    async create(data: CreatePaymentRequest): Promise<Payment> {
        const response = await apiClient.post<APIResponse<Payment>>('/payments', data);
        return response.data;
    },

    /**
     * Update a payment
     */
    async update(id: string | number, data: UpdatePaymentRequest): Promise<Payment> {
        const response = await apiClient.patch<APIResponse<Payment>>(`/payments/${id}`, data);
        return response.data;
    },

    // Note: No delete method - payments are permanent records
    // Users can mark payments as 'cancelled' instead
};

export default paymentsService;
