
import { Transaction, BankAccount, Organization, Member, Customer, Category } from './types';
import {
    LayoutDashboard, BookOpenText, Landmark, FileText, Settings, Calculator,
    ShoppingCart, Package, Users, Tags
} from 'lucide-react';

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
