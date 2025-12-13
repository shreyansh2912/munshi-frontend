/**
 * Payments Store
 * Zustand store for payment state management
 */

import { create } from 'zustand';
import paymentsService from '../services/payments.service';
import type { Payment, CreatePaymentRequest, UpdatePaymentRequest } from '../api/types';

interface PaymentsState {
    payments: Payment[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchPayments: () => Promise<void>;
    getPayment: (id: string | number) => Promise<Payment | undefined>;
    createPayment: (data: CreatePaymentRequest) => Promise<void>;
    updatePayment: (id: string | number, data: UpdatePaymentRequest) => Promise<void>;
    clearError: () => void;
}

export const usePaymentsStore = create<PaymentsState>((set, get) => ({
    payments: [],
    isLoading: false,
    error: null,

    fetchPayments: async () => {
        set({ isLoading: true, error: null });
        try {
            const payments = await paymentsService.list();
            set({ payments, isLoading: false });
        } catch (error: any) {
            set({
                error: error?.message || 'Failed to fetch payments',
                isLoading: false
            });
        }
    },

    getPayment: async (id: string | number) => {
        set({ isLoading: true, error: null });
        try {
            const payment = await paymentsService.getById(id);
            set({ isLoading: false });
            return payment;
        } catch (error: any) {
            set({
                error: error?.message || 'Failed to fetch payment',
                isLoading: false
            });
            return undefined;
        }
    },

    createPayment: async (data: CreatePaymentRequest) => {
        set({ isLoading: true, error: null });
        try {
            const newPayment = await paymentsService.create(data);
            set(state => ({
                payments: [newPayment, ...state.payments],
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error?.message || 'Failed to create payment',
                isLoading: false
            });
            throw error;
        }
    },

    updatePayment: async (id: string | number, data: UpdatePaymentRequest) => {
        set({ isLoading: true, error: null });
        try {
            const updatedPayment = await paymentsService.update(id, data);
            set(state => ({
                payments: state.payments.map(p =>
                    p.id === id ? updatedPayment : p
                ),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error?.message || 'Failed to update payment',
                isLoading: false
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));

export default usePaymentsStore;
