/**
 * Organizations Service - Multi-tenancy
 */

import { apiClient } from '@/lib/api/client';

export interface Organization {
    id: number;
    uuid: string;
    name: string;
    gstin?: string;
    isActive: boolean;
}

export const getOrganizations = () => {
    return apiClient.get<Organization[]>('/organizations');
};

export const getCurrentOrganization = () => {
    return apiClient.get<Organization>('/organizations/current');
};

export const createOrganization = (data: { name: string; gstin?: string }) => {
    return apiClient.post<Organization>('/organizations', data);
};

export const switchOrganization = (id: string) => {
    return apiClient.post<{ orgId: string }>(`/organizations/${id}/switch`);
};
