'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Organization, Member } from '@/lib/types';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface OrganizationContextType {
  organizations: Organization[];
  currentOrg: Organization | null;
  members: Member[];
  isLoading: boolean;
  setCurrentOrg: (org: Organization) => void;
  createOrganization: (name: string) => Promise<void>;
  deleteOrganization: (id: string) => void;
  inviteMember: (email: string, role: string) => void;
  refreshOrganizations: () => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load organizations on mount
  useEffect(() => {
    refreshOrganizations();
  }, []);

  const refreshOrganizations = async () => {
    try {
      setIsLoading(true);
      const orgs = await api.organizations.list();
      
      // Transform backend response to match frontend Organization type
      const transformedOrgs: Organization[] = orgs.map((org: any) => ({
        id: org.id?.toString() || org.uuid,
        name: org.name,
        slug: org.name.toLowerCase().replace(/\s+/g, '-'),
        role: org.role?.name?.toLowerCase() || 'member',
        plan: org.subscriptionPlan || 'free',
        members: 1, // TODO: Get actual member count from backend
      }));
      
      setOrganizations(transformedOrgs);
      
      // Set current org if not set
      if (!currentOrg && transformedOrgs.length > 0) {
        setCurrentOrg(transformedOrgs[0]);
      }
    } catch (error: any) {
      console.error('Failed to load organizations:', error);
      toast.error('Failed to load organizations');
    } finally {
      setIsLoading(false);
    }
  };

  const createOrganization = async (name: string) => {
    try {
      const response = await api.organizations.create({ name });
      toast.success('Organization created successfully');
      
      // Refresh the organizations list
      await refreshOrganizations();
      
      // Switch to the newly created organization
      const newOrg = organizations.find(org => org.name === name);
      if (newOrg) {
        setCurrentOrg(newOrg);
      }
    } catch (error: any) {
      console.error('Failed to create organization:', error);
      toast.error(error.message || 'Failed to create organization');
      throw error;
    }
  };

  const deleteOrganization = (id: string) => {
    const newOrgs = organizations.filter(org => org.id !== id);
    setOrganizations(newOrgs);
    if (currentOrg?.id === id && newOrgs.length > 0) {
      setCurrentOrg(newOrgs[0]);
    }
  };

  const inviteMember = (email: string, role: string) => {
    const newMember: Member = {
      id: `m_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: role as any,
      status: 'pending'
    };
    setMembers([...members, newMember]);
  };

  return (
    <OrganizationContext.Provider value={{
      organizations,
      currentOrg,
      members,
      isLoading,
      setCurrentOrg,
      createOrganization,
      deleteOrganization,
      inviteMember,
      refreshOrganizations,
    }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
