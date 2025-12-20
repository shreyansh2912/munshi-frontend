/**
 * Banking Page
 * 
 * Banking and account management with transaction tracking.
 * Shows empty states when no accounts are connected.
 * 
 * @module pages/banking
 */

'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button } from '@/components/ui/UI';
import { Plus, RefreshCw, Building2, ArrowDown, ArrowUp } from 'lucide-react';

export default function BankingPage() {
    // TODO: Fetch from banking store when implemented
    const accounts: any[] = [];
    const hasAccounts = accounts.length > 0;
    
    return (
        <AppLayout>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">
                        Banking
                    </h1>
                    <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">
                        Connect accounts, sync transactions, and reconcile automatically.
                    </p>
                </div>
                {hasAccounts && (
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                            <RefreshCw size={16} className="mr-2" />
                            Sync All
                        </Button>
                        <Button size="sm">
                            <Plus size={16} className="mr-2" />
                            Connect Account
                        </Button>
                    </div>
                )}
            </div>
            
            {/* Empty State */}
            {!hasAccounts && (
                <Card className="p-12">
                    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                            <Building2 className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        </div>
                        
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                            Connect Your Bank Account
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Link your bank accounts to automatically sync transactions, reconcile payments,
                            and get real-time insights into your cash flow.
                        </p>
                        
                        <div className="grid grid-cols-1 gap-3 w-full mb-8">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                    <ArrowDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Auto-sync transactions
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Transactions update automatically
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                    <ArrowUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Smart reconciliation
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        AI matches transactions to invoices
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <Button size="lg">
                            <Plus size={20} className="mr-2" />
                            Connect Your First Account
                        </Button>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                            🔒 Bank-level encryption • Secure connection • Read-only access
                        </p>
                    </div>
                </Card>
            )}
            
            {/* Bank Accounts Grid - Only show when accounts exist */}
            {hasAccounts && (
                <>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {/* Account cards will be rendered here when data exists */}
                    </div>
                    
                    {/* Recent Transactions */}
                    <Card>
                        <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                            <h3 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white">
                                Recent Transactions
                            </h3>
                            <Button variant="ghost" size="sm">
                                View All
                            </Button>
                        </div>
                        
                        <div className="p-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                No transactions yet
                            </p>
                        </div>
                    </Card>
                    
                    {/* Reconciliation Summary */}
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <Card className="p-6">
                            <h3 className="font-heading font-semibold text-munshi-indigo dark:text-white mb-4">
                                Reconciliation Status
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Matched Transactions
                                    </span>
                                    <span className="font-mono font-medium text-green-600 dark:text-green-400">
                                        0
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Unmatched
                                    </span>
                                    <span className="font-mono font-medium text-yellow-600 dark:text-yellow-400">
                                        0
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Needs Review
                                    </span>
                                    <span className="font-mono font-medium text-red-600 dark:text-red-400">
                                        0
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full mt-6" disabled>
                                Review Unmatched
                            </Button>
                        </Card>
                        
                        <Card className="p-6 bg-gradient-to-br from-munshi-indigo to-munshi-teal text-white">
                            <h3 className="font-heading font-semibold mb-2">Auto-Reconciliation</h3>
                            <p className="text-sm text-white/80 mb-6">
                                Connect your bank account to enable AI-powered automatic reconciliation.
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white/20 rounded-full h-2">
                                    <div className="bg-white rounded-full h-2" style={{ width: '0%' }} />
                                </div>
                                <span className="text-sm font-bold">0%</span>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </AppLayout>
    );
}
