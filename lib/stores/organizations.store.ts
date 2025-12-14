/**
 * Organizations Store
 * Zustand store for organization management
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface Organization {
    id: string;
    uuid?: string;
    name: string;
    slug?: string;
    role?: any;
    subscriptionPlan?: string;
    plan?: string;
    members?: number;
}

interface OrganizationsState {
    // State
    organizations: Organization[];
    currentOrg: Organization | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchOrganizations: () => Promise<void>;
    fetchCurrentOrganization: () => Promise<void>;
    createOrganization: (name: string) => Promise<void>;
    updateOrganization: (id: string, data: Partial<Organization>) => Promise<void>;
    switchOrganization: (id: string) => Promise<void>;
    setCurrentOrganization: (org: Organization | null) => void;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    organizations: [],
    currentOrg: null,
    isLoading: false,
    error: null,
};

export const useOrganizationsStore = create<OrganizationsState>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,

                fetchOrganizations: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        const orgs = await api.organizations.list();

                        // Transform backend response to frontend format
                        const transformedOrgs: Organization[] = orgs.map((org: any) => ({
                            id: org.id?.toString() || org.uuid,
                            uuid: org.uuid,
                            name: org.name,
                            slug: org.name.toLowerCase().replace(/\s+/g, '-'),
                            role: org.role?.name?.toLowerCase() || 'member',
                            plan: org.subscriptionPlan || 'free',
                            subscriptionPlan: org.subscriptionPlan,
                            members: 1, // TODO: Get from backend
                        }));

                        set({
                            organizations: transformedOrgs,
                            isLoading: false
                        });

                        // Set current org if not set
                        if (!get().currentOrg && transformedOrgs.length > 0) {
                            set({ currentOrg: transformedOrgs[0] });
                        }
                    } catch (error: any) {
                        set({
                            error: error.message || 'Failed to fetch organizations',
                            isLoading: false
                        });
                        throw error;
                    }
                },

                fetchCurrentOrganization: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        const org = await api.organizations.getCurrent();
                        const transformedOrg: Organization = {
                            id: org.id?.toString() || org.uuid,
                            uuid: org.uuid,
                            name: org.name,
                            slug: org.name.toLowerCase().replace(/\s+/g, '-'),
                            role: org.role?.name?.toLowerCase() || 'member',
                            plan: org.subscriptionPlan || 'free',
                            subscriptionPlan: org.subscriptionPlan,
                            members: 1,
                        };
                        set({ currentOrg: transformedOrg, isLoading: false });
                    } catch (error: any) {
                        set({
                            error: error.message || 'Failed to fetch current organization',
                            isLoading: false
                        });
                        throw error;
                    }
                },

                createOrganization: async (name: string) => {
                    set({ isLoading: true, error: null });
                    try {
                        await api.organizations.create({ name });
                        toast.success('Organization created successfully');

                        // Refresh the list
                        await get().fetchOrganizations();

                        set({ isLoading: false });
                    } catch (error: any) {
                        set({
                            error: error.message || 'Failed to create organization',
                            isLoading: false
                        });
                        toast.error(error.message || 'Failed to create organization');
                        throw error;
                    }
                },

                updateOrganization: async (id: string, data: Partial<Organization>) => {
                    set({ isLoading: true, error: null });
                    try {
                        await api.organizations.update(id, data);
                        toast.success('Organization updated successfully');

                        // Update in local state
                        set((state) => ({
                            organizations: state.organizations.map((org) =>
                                org.id === id ? { ...org, ...data } : org
                            ),
                            currentOrg: state.currentOrg?.id === id
                                ? { ...state.currentOrg, ...data }
                                : state.currentOrg,
                            isLoading: false,
                        }));
                    } catch (error: any) {
                        set({
                            error: error.message || 'Failed to update organization',
                            isLoading: false
                        });
                        toast.error(error.message || 'Failed to update organization');
                        throw error;
                    }
                },

                switchOrganization: async (id: string) => {
                    set({ isLoading: true, error: null });
                    try {
                        await api.organizations.switch(id);

                        // Find and set the organization
                        const org = get().organizations.find((o) => o.id === id);
                        if (org) {
                            set({ currentOrg: org, isLoading: false });
                            toast.success(`Switched to ${org.name}`);
                        } else {
                            throw new Error('Organization not found');
                        }
                    } catch (error: any) {
                        set({
                            error: error.message || 'Failed to switch organization',
                            isLoading: false
                        });
                        toast.error(error.message || 'Failed to switch organization');
                        throw error;
                    }
                },

                setCurrentOrganization: (org: Organization | null) => {
                    set({ currentOrg: org });
                },

                clearError: () => {
                    set({ error: null });
                },

                reset: () => {
                    set(initialState);
                },
            }),
            {
                name: 'organizations-storage',
                partialize: (state) => ({
                    currentOrg: state.currentOrg,
                }),
            }
        ),
        { name: 'OrganizationsStore' }
    )
);
