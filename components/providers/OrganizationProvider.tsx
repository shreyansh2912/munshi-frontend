'use client';

import React, { createContext, useContext, useState } from 'react';
import { Organization, Member } from '@/lib/types';
import { MOCK_ORGANIZATIONS, MOCK_MEMBERS } from '@/lib/constants';

interface OrganizationContextType {
  organizations: Organization[];
  currentOrg: Organization;
  members: Member[];
  setCurrentOrg: (org: Organization) => void;
  createOrganization: (name: string) => void;
  deleteOrganization: (id: string) => void;
  inviteMember: (email: string, role: string) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Organization[]>(MOCK_ORGANIZATIONS);
  const [currentOrg, setCurrentOrg] = useState<Organization>(MOCK_ORGANIZATIONS[0]);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);

  const createOrganization = (name: string) => {
    const newOrg: Organization = {
      id: `org_${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      role: 'admin',
      plan: 'free',
      members: 1,
    };
    setOrganizations([...organizations, newOrg]);
    setCurrentOrg(newOrg);
  };

  const deleteOrganization = (id: string) => {
    const newOrgs = organizations.filter(org => org.id !== id);
    setOrganizations(newOrgs);
    if (currentOrg.id === id && newOrgs.length > 0) {
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
      setCurrentOrg,
      createOrganization,
      deleteOrganization,
      inviteMember
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
