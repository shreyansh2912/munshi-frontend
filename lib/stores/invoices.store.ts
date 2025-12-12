/**
 * Invoices Store
 * Zustand store for invoices state management
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Invoice, CreateInvoiceRequest, UpdateInvoiceRequest } from '@/lib/api/types';
import * as invoicesService from '@/lib/services/invoices.service';

interface InvoicesState {
    // State
    invoices: Invoice[];
    currentInvoice: Invoice | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchInvoices: (params?: { status?: string; search?: string }) => Promise<void>;
    fetchInvoice: (id: string) => Promise<void>;
    createInvoice: (data: CreateInvoiceRequest) => Promise<void>;
    updateInvoice: (id: string, data: UpdateInvoiceRequest) => Promise<void>;
    deleteInvoice: (id: string) => Promise<void>;
    setCurrentInvoice: (invoice: Invoice | null) => void;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    invoices: [],
    currentInvoice: null,
    isLoading: false,
    error: null,
};

export const useInvoicesStore = create<InvoicesState>()(
    devtools(
        (set, get) => ({
            ...initialState,

            fetchInvoices: async (params) => {
                set({ isLoading: true, error: null });
                try {
                    const invoices = await invoicesService.list(params);
                    set({ invoices, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch invoices',
                        isLoading: false
                    });
                    throw error;
                }
            },

            fetchInvoice: async (id: string) => {
                set({ isLoading: true, error: null });
                try {
                    const invoice = await invoicesService.get(id);
                    set({ currentInvoice: invoice, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch invoice',
                        isLoading: false
                    });
                    throw error;
                }
            },

            createInvoice: async (data: CreateInvoiceRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const newInvoice = await invoicesService.create(data);
                    set((state) => ({
                        invoices: [...state.invoices, newInvoice],
                        isLoading: false
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to create invoice',
                        isLoading: false
                    });
                    throw error;
                }
            },

            updateInvoice: async (id: string, data: UpdateInvoiceRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const updatedInvoice = await invoicesService.update(id, data);
                    set((state) => ({
                        invoices: state.invoices.map((i) => i.id === id ? updatedInvoice : i),
                        currentInvoice: state.currentInvoice?.id === id ? updatedInvoice : state.currentInvoice,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to update invoice',
                        isLoading: false
                    });
                    throw error;
                }
            },

            deleteInvoice: async (id: string) => {
                set({ isLoading: true, error: null });
                try {
                    await invoicesService.deleteInvoice(id);
                    set((state) => ({
                        invoices: state.invoices.filter((i) => i.id !== id),
                        currentInvoice: state.currentInvoice?.id === id ? null : state.currentInvoice,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to delete invoice',
                        isLoading: false
                    });
                    throw error;
                }
            },

            setCurrentInvoice: (invoice: Invoice | null) => {
                set({ currentInvoice: invoice });
            },

            clearError: () => {
                set({ error: null });
            },

            reset: () => {
                set(initialState);
            },
        }),
        { name: 'InvoicesStore' }
    )
);
