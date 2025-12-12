/**
 * Customers Store
 * Zustand store for customers state management
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '@/lib/api/types';
import * as customersService from '@/lib/services/customers.service';

interface CustomersState {
    // State
    customers: Customer[];
    currentCustomer: Customer | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchCustomers: (params?: { status?: string; search?: string }) => Promise<void>;
    fetchCustomer: (id: string) => Promise<void>;
    createCustomer: (data: CreateCustomerRequest) => Promise<void>;
    updateCustomer: (id: string, data: UpdateCustomerRequest) => Promise<void>;
    deleteCustomer: (id: string) => Promise<void>;
    setCurrentCustomer: (customer: Customer | null) => void;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    customers: [],
    currentCustomer: null,
    isLoading: false,
    error: null,
};

export const useCustomersStore = create<CustomersState>()(
    devtools(
        (set, get) => ({
            ...initialState,

            fetchCustomers: async (params) => {
                set({ isLoading: true, error: null });
                try {
                    const customers = await customersService.list(params);
                    set({ customers, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch customers',
                        isLoading: false
                    });
                    throw error;
                }
            },

            fetchCustomer: async (id: string) => {
                set({ isLoading: true, error: null });
                try {
                    const customer = await customersService.get(id);
                    set({ currentCustomer: customer, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch customer',
                        isLoading: false
                    });
                    throw error;
                }
            },

            createCustomer: async (data: CreateCustomerRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const newCustomer = await customersService.create(data);
                    set((state) => ({
                        customers: [...state.customers, newCustomer],
                        isLoading: false
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to create customer',
                        isLoading: false
                    });
                    throw error;
                }
            },

            updateCustomer: async (id: string, data: UpdateCustomerRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const updatedCustomer = await customersService.update(id, data);
                    set((state) => ({
                        customers: state.customers.map((c) => c.id === id ? updatedCustomer : c),
                        currentCustomer: state.currentCustomer?.id === id ? updatedCustomer : state.currentCustomer,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to update customer',
                        isLoading: false
                    });
                    throw error;
                }
            },

            deleteCustomer: async (id: string) => {
                set({ isLoading: true, error: null });
                try {
                    await customersService.deleteCustomer(id);
                    set((state) => ({
                        customers: state.customers.filter((c) => c.id !== id),
                        currentCustomer: state.currentCustomer?.id === id ? null : state.currentCustomer,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to delete customer',
                        isLoading: false
                    });
                    throw error;
                }
            },

            setCurrentCustomer: (customer: Customer | null) => {
                set({ currentCustomer: customer });
            },

            clearError: () => {
                set({ error: null });
            },

            reset: () => {
                set(initialState);
            },
        }),
        { name: 'CustomersStore' }
    )
);
