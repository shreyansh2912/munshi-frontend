/**
 * Ledger Page (Chart of Accounts)
 * 
 * Displays all ledger accounts with filtering and summary statistics.
 * Data is fetched from backend via useLedgerStore.
 * 
 * @module pages/ledger
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Badge } from '@/components/ui/UI';
import { Plus, Search, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { useLedgerStore } from '@/lib/stores/ledger.store';
import type { LedgerAccount } from '@/lib/api/types';

// ============================================================================
// TYPES
// ============================================================================

type AccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';

interface TypeSummary {
    label: string;
    value: number;
    color: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function LedgerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Zustand store
    const { ledgers, isLoading, error, fetchLedgers } = useLedgerStore();
    
    // ========================================================================
    // DATA FETCHING
    // ========================================================================
    
    useEffect(() => {
        // Fetch ledgers on mount
        fetchLedgers().catch((err) => {
            console.error('Failed to fetch ledgers:', err);
        });
    }, [fetchLedgers]);
    
    // ========================================================================
    // FILTERING
    // ========================================================================
    
    const filteredAccounts = useMemo(() => {
        if (!searchTerm) return ledgers;
        
        const term = searchTerm.toLowerCase();
        return ledgers.filter(
            (acc) =>
                acc.name.toLowerCase().includes(term) ||
                (acc.accountCode && acc.accountCode.toLowerCase().includes(term))
        );
    }, [ledgers, searchTerm]);
    
    // ========================================================================
    // SUMMARY CALCULATIONS
    // ========================================================================
    
    const summaryByType = useMemo((): TypeSummary[] => {
        const totals = {
            ASSET: 0,
            LIABILITY: 0,
            EQUITY: 0,
            REVENUE: 0,
            EXPENSE: 0,
        };
        
        ledgers.forEach((account) => {
            const type = account.type as AccountType;
            if (totals[type] !== undefined) {
                totals[type] += account.balance || 0;
            }
        });
        
        return [
            {
                label: 'Assets',
                value: totals.ASSET,
                color: 'blue',
            },
            {
                label: 'Liabilities',
                value: totals.LIABILITY,
                color: 'red',
            },
            {
                label: 'Equity',
                value: totals.EQUITY,
                color: 'purple',
            },
            {
                label: 'Revenue',
                value: totals.REVENUE,
                color: 'green',
            },
            {
                label: 'Expenses',
                value: totals.EXPENSE,
                color: 'orange',
            },
        ];
    }, [ledgers]);
    
    // ========================================================================
    // UTILITY FUNCTIONS
    // ========================================================================
    
    const getTypeColor = (type: string): string => {
        switch (type) {
            case 'ASSET':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
            case 'LIABILITY':
                return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
            case 'EQUITY':
                return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
            case 'REVENUE':
                return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
            case 'EXPENSE':
                return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };
    
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };
    
    const formatCurrencyCompact = (amount: number): string => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(2)}Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(2)}L`;
        } else if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(2)}K`;
        }
        return `₹${amount.toFixed(0)}`;
    };
    
    // ========================================================================
    // RENDER
    // ========================================================================
    
    return (
        <AppLayout>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">
                        Chart of Accounts
                    </h1>
                    <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">
                        Manage your ledger and account structure.
                    </p>
                </div>
                <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Account
                </Button>
            </div>
            
            {/* Error State */}
            {error && (
                <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}
            
            {/* Summary Cards */}
            <div className="grid md:grid-cols-5 gap-4 mb-8">
                {summaryByType.map((item, i) => (
                    <Card key={i} className="p-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">
                            {item.label}
                        </p>
                        <h3 className={`text-xl font-mono font-bold text-${item.color}-600 dark:text-${item.color}-400`}>
                            {formatCurrencyCompact(item.value)}
                        </h3>
                    </Card>
                ))}
            </div>
            
            {/* Accounts Table */}
            <Card noPadding>
                {/* Search Header */}
                <div className="p-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-munshi-dark-card rounded-t-2xl">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            placeholder="Search by account name or code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 rounded-lg text-sm outline-none focus:border-munshi-indigo text-munshi-text dark:text-gray-200"
                        />
                    </div>
                </div>
                
                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-12 bg-white dark:bg-munshi-dark-card">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
                        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading accounts...</span>
                    </div>
                )}
                
                {/* Empty State */}
                {!isLoading && ledgers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-munshi-dark-card">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No ledger accounts found</p>
                        <Button size="sm">
                            <Plus size={16} className="mr-2" />
                            Create First Account
                        </Button>
                    </div>
                )}
                
                {/* Table */}
                {!isLoading && filteredAccounts.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white dark:bg-zinc-900/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Code</th>
                                    <th className="px-6 py-4">Account Name</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4 text-right">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-munshi-dark-card">
                                {filteredAccounts.map((account) => (
                                    <tr
                                        key={account.id}
                                        className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                                            {account.accountCode || '-'}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-munshi-text dark:text-white">
                                            {account.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                                    account.type
                                                )}`}
                                            >
                                                {account.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-medium text-munshi-text dark:text-white">
                                            {formatCurrency(account.balance || 0)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {/* No Search Results */}
                {!isLoading && ledgers.length > 0 && filteredAccounts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-munshi-dark-card">
                        <p className="text-gray-500 dark:text-gray-400">
                            No accounts match "{searchTerm}"
                        </p>
                    </div>
                )}
            </Card>
        </AppLayout>
    );
}
