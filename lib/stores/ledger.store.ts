/**
 * Ledger Store
 * Zustand store for ledger state management
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { LedgerAccount, CreateLedgerRequest, UpdateLedgerRequest } from '@/lib/api/types';
import * as ledgerService from '@/lib/services/ledger.service';

interface LedgerState {
    // State
    ledgers: LedgerAccount[];
    currentLedger: LedgerAccount | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchLedgers: (params?: { type?: string; search?: string }) => Promise<void>;
    fetchLedger: (id: string) => Promise<void>;
    createLedger: (data: CreateLedgerRequest) => Promise<void>;
    updateLedger: (id: string, data: UpdateLedgerRequest) => Promise<void>;
    deleteLedger: (id: string) => Promise<void>;
    setCurrentLedger: (ledger: LedgerAccount | null) => void;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    ledgers: [],
    currentLedger: null,
    isLoading: false,
    error: null,
};

export const useLedgerStore = create<LedgerState>()(
    devtools(
        (set, get) => ({
            ...initialState,

            fetchLedgers: async (params) => {
                set({ isLoading: true, error: null });
                try {
                    const ledgers = await ledgerService.list(params);
                    set({ ledgers, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch ledgers',
                        isLoading: false
                    });
                    throw error;
                }
            },

            fetchLedger: async (id: string) => {
                set({ isLoading: true, error: null });
                try {
                    const ledger = await ledgerService.get(id);
                    set({ currentLedger: ledger, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch ledger',
                        isLoading: false
                    });
                    throw error;
                }
            },

            createLedger: async (data: CreateLedgerRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const newLedger = await ledgerService.create(data);
                    set((state) => ({
                        ledgers: [...state.ledgers, newLedger],
                        isLoading: false
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to create ledger',
                        isLoading: false
                    });
                    throw error;
                }
            },

            updateLedger: async (id: string, data: UpdateLedgerRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const updatedLedger = await ledgerService.update(id, data);
                    set((state) => ({
                        ledgers: state.ledgers.map((l) => l.id === id ? updatedLedger : l),
                        currentLedger: state.currentLedger?.id === id ? updatedLedger : state.currentLedger,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to update ledger',
                        isLoading: false
                    });
                    throw error;
                }
            },

            deleteLedger: async (id: string) => {
                set({ isLoading: true, error: null });
                try {
                    await ledgerService.deleteLedger(id);
                    set((state) => ({
                        ledgers: state.ledgers.filter((l) => l.id !== id),
                        currentLedger: state.currentLedger?.id === id ? null : state.currentLedger,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to delete ledger',
                        isLoading: false
                    });
                    throw error;
                }
            },

            setCurrentLedger: (ledger: LedgerAccount | null) => {
                set({ currentLedger: ledger });
            },

            clearError: () => {
                set({ error: null });
            },

            reset: () => {
                set(initialState);
            },
        }),
        { name: 'LedgerStore' }
    )
);
