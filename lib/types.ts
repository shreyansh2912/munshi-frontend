
export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    category: string;
    status: 'cleared' | 'pending';
    aiSuggestion?: string;
    gstRate?: number;
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    balance: number;
    lastSynced: string;
    status: 'connected' | 'error' | 'syncing';
}

export interface NavItem {
    label: string;
    icon: any;
    path: string;
}

export interface MetricCardProps {
    title: string;
    value: string;
    trend: number;
    trendLabel: string;
    icon: any;
}

export interface Organization {
    id: string;
    name: string;
    slug: string;
    role: 'admin' | 'member' | 'viewer';
    plan: 'free' | 'pro' | 'enterprise';
    members: number;
}

export interface Member {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'member' | 'viewer';
    status: 'active' | 'pending';
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    gstin?: string;
    address?: string;
    balance: number;
    status: 'active' | 'inactive';
}

export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense' | 'asset' | 'liability';
    budget?: number;
    icon?: string;
}
