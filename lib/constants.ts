
import { Transaction, BankAccount, Organization, Member, Customer, Category } from './types';
import {
    LayoutDashboard, BookOpenText, Landmark, FileText, Settings, Calculator,
    ShoppingCart, Package, Users, Tags
} from 'lucide-react';

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'TXN001', date: '2023-10-24', description: 'TechSpace Rentals', amount: 45000, type: 'debit', category: 'Rent', status: 'cleared', gstRate: 18 },
    { id: 'TXN002', date: '2023-10-23', description: 'Client Payment - Zephyr', amount: 125000, type: 'credit', category: 'Revenue', status: 'cleared', aiSuggestion: 'High probability: recurring revenue' },
    { id: 'TXN003', date: '2023-10-23', description: 'Cloud Services AWS', amount: 3200, type: 'debit', category: 'Software', status: 'pending' },
    { id: 'TXN004', date: '2023-10-22', description: 'Office Supplies', amount: 1200, type: 'debit', category: 'Operations', status: 'cleared' },
    { id: 'TXN005', date: '2023-10-21', description: 'Consulting Fee', amount: 85000, type: 'credit', category: 'Revenue', status: 'cleared' },
];

export const MOCK_ACCOUNTS: BankAccount[] = [
    { id: 'BA1', bankName: 'HDFC Bank', accountNumber: '**** 4589', balance: 1245000, lastSynced: '2 mins ago', status: 'connected' },
    { id: 'BA2', bankName: 'ICICI Bank', accountNumber: '**** 9921', balance: 45000, lastSynced: '1 hour ago', status: 'connected' },
    { id: 'BA3', bankName: 'SBI Corporate', accountNumber: '**** 1102', balance: 0, lastSynced: '1 day ago', status: 'error' },
];

export const NAV_LINKS = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Invoices', path: '/invoices', icon: ShoppingCart },
    { label: 'Customers', path: '/customers', icon: Users },
    { label: 'Ledger', path: '/ledger', icon: BookOpenText },
    { label: 'Banking', path: '/banking', icon: Landmark },
    { label: 'Inventory', path: '/inventory', icon: Package },
    { label: 'GST & Tax', path: '/gst', icon: Calculator },
    { label: 'Documents', path: '/documents', icon: FileText },
    { label: 'Categories', path: '/categories', icon: Tags },
    { label: 'Settings', path: '/settings', icon: Settings },
];

export const MOCK_ORGANIZATIONS: Organization[] = [
    { id: 'org_1', name: 'TechSpace India Pvt Ltd', slug: 'techspace', role: 'admin', plan: 'pro', members: 4 },
    { id: 'org_2', name: 'Kumar Consulting', slug: 'kumar-consulting', role: 'admin', plan: 'free', members: 1 },
    { id: 'org_3', name: 'Global Ventures', slug: 'global-ventures', role: 'member', plan: 'enterprise', members: 12 },
];

export const MOCK_MEMBERS: Member[] = [
    { id: 'm1', name: 'Rajesh Kumar', email: 'rajesh@techspace.in', role: 'admin', status: 'active' },
    { id: 'm2', name: 'Sarah Williams', email: 'sarah@techspace.in', role: 'member', status: 'active' },
    { id: 'm3', name: 'Vikram Singh', email: 'vikram@techspace.in', role: 'viewer', status: 'pending' },
];

export const MOCK_INVOICES = [
    { id: 'INV-001', customer: 'Zephyr Inc', date: '2023-10-24', amount: 125000, status: 'paid', dueDate: '2023-11-24' },
    { id: 'INV-002', customer: 'Acme Corp', date: '2023-10-25', amount: 45000, status: 'pending', dueDate: '2023-11-25' },
    { id: 'INV-003', customer: 'Global Tech', date: '2023-10-26', amount: 250000, status: 'overdue', dueDate: '2023-10-20' },
];

export const MOCK_INVENTORY = [
    { id: 'SKU-001', name: 'Ergonomic Chair', stock: 45, price: 12000, status: 'in_stock' },
    { id: 'SKU-002', name: 'Office Desk', stock: 12, price: 18000, status: 'low_stock' },
    { id: 'SKU-003', name: 'Monitor Arm', stock: 0, price: 4500, status: 'out_of_stock' },
];

export const MOCK_LOGS = [
    { id: 'log_1', user: 'Rajesh Kumar', action: 'Created Invoice #INV-004', timestamp: '2 mins ago', details: 'Value: ₹45,000' },
    { id: 'log_2', user: 'System', action: 'Bank Sync - HDFC', timestamp: '1 hour ago', details: 'Imported 12 transactions' },
    { id: 'log_3', user: 'Sarah Williams', action: 'Updated GSTIN', timestamp: 'Yesterday, 4:00 PM', details: 'Old: NULL -> New: 22AAAAA0000A1Z5' },
];

export const MOCK_NOTIFICATIONS = [
    { id: 'not_1', title: 'GST Filing Due', message: 'GSTR-3B for October is due in 3 days.', type: 'alert', read: false, time: '2 hours ago' },
    { id: 'not_2', title: 'New Invoice Paid', message: 'Zephyr Inc paid Invoice #INV-001.', type: 'success', read: true, time: '5 hours ago' },
    { id: 'not_3', title: 'Low Stock Alert', message: 'Monitor Arms are out of stock.', type: 'warning', read: false, time: '1 day ago' },
];

export const MOCK_CUSTOMERS: Customer[] = [
    { id: 'CUST-001', name: 'Zephyr Inc', email: 'accounts@zephyr.com', phone: '+91 9876543210', gstin: '27AAAAA0000A1Z5', balance: 0, status: 'active', address: 'Mumbai, Maharashtra' },
    { id: 'CUST-002', name: 'Acme Corp', email: 'billing@acme.com', phone: '+91 9898989898', gstin: '24BBBBB1234B1Z2', balance: 45000, status: 'active', address: 'Ahmedabad, Gujarat' },
    { id: 'CUST-003', name: 'Global Tech Solutions', email: 'finance@globaltech.com', balance: 12000, status: 'inactive', address: 'Bangalore, Karnataka' },
];

export const MOCK_CATEGORIES: Category[] = [
    { id: 'CAT-001', name: 'Revenue', type: 'income', budget: 500000 },
    { id: 'CAT-002', name: 'Rent', type: 'expense', budget: 50000 },
    { id: 'CAT-003', name: 'Software', type: 'expense', budget: 15000 },
    { id: 'CAT-004', name: 'Office Supplies', type: 'expense', budget: 5000 },
    { id: 'CAT-005', name: 'Consulting Fees', type: 'income', budget: 0 },
    { id: 'CAT-006', name: 'Travel', type: 'expense', budget: 25000 },
];
