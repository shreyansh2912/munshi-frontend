/**
 * Ledger Service
 * Handles all ledger-related API calls
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import type { LedgerAccount, CreateLedgerRequest, UpdateLedgerRequest } from '@/lib/api/types';

/**
 * List all ledger accounts
 */
export const list = (params?: { type?: string; search?: string }) => {
    return apiClient.get<LedgerAccount[]>(API_ENDPOINTS.ledger.list, params);
};

/**
 * Get ledger account by ID
 */
export const get = (id: string) => {
    return apiClient.get<LedgerAccount>(API_ENDPOINTS.ledger.get(id));
};

/**
 * Create new ledger account
 */
export const create = (data: CreateLedgerRequest) => {
    return apiClient.post<LedgerAccount>(API_ENDPOINTS.ledger.create, data);
};

/**
 * Update ledger account
 */
export const update = (id: string, data: UpdateLedgerRequest) => {
    return apiClient.patch<LedgerAccount>(API_ENDPOINTS.ledger.update(id), data);
};

/**
 * Delete ledger account
 */
export const deleteLedger = (id: string) => {
    return apiClient.delete<void>(API_ENDPOINTS.ledger.delete(id));
};
