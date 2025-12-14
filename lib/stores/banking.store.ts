/**
 * Banking Store
 * Zustand store for banking and accounts management
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    balance: number;
    lastSynced: string;
    status: 'connected' | 'error' | 'pending';
}

interface BankingState {
    accounts: BankAccount[];
    isLoading: boolean;
    error: string | null;

    fetchAccounts: () => Promise<void>;
    addAccount: (account: Partial<BankAccount>) => Promise<void>;
    removeAccount: (id: string) => Promise<void>;
    syncAccount: (id: string) => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    accounts: [],
    isLoading: false,
    error: null,
};

export const useBankingStore = create<BankingState>()(
    devtools(
        (set, get) => ({
            ...initialState,

            fetchAccounts: async () => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual banking API when available
                    // const accounts = await api.banking.list();
                    const accounts: BankAccount[] = [];
                    set({ accounts, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch bank accounts',
                        isLoading: false
                    });
                    throw error;
                }
            },

            addAccount: async (account: Partial<BankAccount>) => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Implement when banking API is available
                    set({ isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to add bank account',
                        isLoading: false
                    });
                    throw error;
                }
            },

            removeAccount: async (id: string) => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Implement when banking API is available
                    set((state) => ({
                        accounts: state.accounts.filter((acc) => acc.id !== id),
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to remove bank account',
                        isLoading: false
                    });
                    throw error;
                }
            },

            syncAccount: async (id: string) => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Implement when banking API is available
                    set({ isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to sync bank account',
                        isLoading: false
                    });
                    throw error;
                }
            },

            clearError: () => {
                set({ error: null });
            },

            reset: () => {
                set(initialState);
            },
        }),
        { name: 'BankingStore' }
    )
);
