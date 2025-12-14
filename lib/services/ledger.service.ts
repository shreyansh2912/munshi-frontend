/**
 * Ledger Service
 * Handles all ledger-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import type { LedgerAccount, CreateLedgerRequest, UpdateLedgerRequest, APIResponse } from '@/lib/api/types';

/**
 * Ledger Service Object
 */
export const ledgerService = {
    /**
     * List all ledger accounts
     */
    async list(params?: { type?: string; search?: string }): Promise<LedgerAccount[]> {
        const response = await apiClient.get<APIResponse<LedgerAccount[]>>(API_ENDPOINTS.ledger.list, params);
        return response.data;
    },

    /**
     * Get ledger account by ID
     */
    async getById(id: string): Promise<LedgerAccount> {
        const response = await apiClient.get<APIResponse<LedgerAccount>>(API_ENDPOINTS.ledger.get(id));
        return response.data;
    },

    /**
     * Create new ledger account
     */
    async create(data: CreateLedgerRequest): Promise<LedgerAccount> {
        const response = await apiClient.post<APIResponse<LedgerAccount>>(API_ENDPOINTS.ledger.create, data);
        return response.data;
    },

    /**
     * Update ledger account
     */
    async update(id: string, data: UpdateLedgerRequest): Promise<LedgerAccount> {
        const response = await apiClient.patch<APIResponse<LedgerAccount>>(API_ENDPOINTS.ledger.update(id), data);
        return response.data;
    },

    /**
     * Delete ledger account
     */
    async delete(id: string): Promise<void> {
        await apiClient.delete<void>(API_ENDPOINTS.ledger.delete(id));
    },
};

// Backwards compatibility exports
export const list = (params?: { type?: string; search?: string }) => ledgerService.list(params);
export const get = (id: string) => ledgerService.getById(id);
export const create = (data: CreateLedgerRequest) => ledgerService.create(data);
export const update = (id: string, data: UpdateLedgerRequest) => ledgerService.update(id, data);
export const deleteLedger = (id: string) => ledgerService.delete(id);

export default ledgerService;
