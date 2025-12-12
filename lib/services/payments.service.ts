/**
 * Payments Service
 */

import { apiClient } from '@/lib/api/client';

export interface Payment {
    id: number;
    uuid: string;
    paymentNumber: string;
    paymentType: 'receipt' | 'payment';
    amount: number;
    paymentDate: string;
    status: string;
}

export const getPayments = () => {
    return apiClient.get<Payment[]>('/payments');
};

export const getPayment = (id: string) => {
    return apiClient.get<Payment>(`/payments/${id}`);
};

export const createPayment = (data: Partial<Payment>) => {
    return apiClient.post<Payment>('/payments', data);
};

export const updatePayment = (id: string, data: Partial<Payment>) => {
    return apiClient.patch<Payment>(`/payments/${id}`, data);
};
