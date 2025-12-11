'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Badge } from '@/components/ui/UI';
import { MOCK_ACCOUNTS } from '@/lib/constants';
import { Plus, RefreshCw, Download, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export default function BankingPage() {
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Banking</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Connect accounts, sync transactions, and reconcile automatically.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm"><RefreshCw size={16} className="mr-2"/> Sync All</Button>
          <Button size="sm"><Plus size={16} className="mr-2"/> Connect Account</Button>
        </div>
      </div>

      {/* Bank Accounts Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {MOCK_ACCOUNTS.map((account) => (
          <Card key={account.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-heading font-semibold text-munshi-indigo dark:text-white">{account.bankName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{account.accountNumber}</p>
              </div>
              <span className={`w-3 h-3 rounded-full ${account.status === 'connected' ? 'bg-green-500' : account.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Balance</p>
              <h2 className="text-3xl font-mono font-bold text-munshi-indigo dark:text-white">₹{account.balance.toLocaleString('en-IN')}</h2>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
              <span className="text-xs text-gray-500 dark:text-gray-400">Last synced {account.lastSynced}</span>
              <Badge variant={account.status === 'connected' ? 'success' : account.status === 'error' ? 'error' : 'warning'}>
                {account.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white">Recent Transactions</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
          {[
            { id: 1, desc: 'Client Payment - Zephyr Inc', amount: 125000, type: 'credit', date: '2 hours ago', category: 'Revenue' },
            { id: 2, desc: 'Office Rent Payment', amount: -45000, type: 'debit', date: '5 hours ago', category: 'Rent' },
            { id: 3, desc: 'AWS Cloud Services', amount: -3200, type: 'debit', date: 'Yesterday', category: 'Software' },
            { id: 4, desc: 'Consulting Fee - Acme Corp', amount: 85000, type: 'credit', date: '2 days ago', category: 'Revenue' },
            { id: 5, desc: 'Office Supplies', amount: -1200, type: 'debit', date: '3 days ago', category: 'Operations' },
          ].map((txn) => (
            <div key={txn.id} className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  txn.type === 'credit' 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                    : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                }`}>
                  {txn.type === 'credit' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div>
                  <p className="font-medium text-munshi-text dark:text-white">{txn.desc}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{txn.date}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{txn.category}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-mono font-semibold ${
                  txn.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {txn.type === 'credit' ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString('en-IN')}
                </p>
                <button className="text-xs text-munshi-teal hover:text-munshi-indigo dark:text-teal-400 dark:hover:text-teal-300 mt-1 flex items-center gap-1">
                  Categorize <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reconciliation Summary */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <h3 className="font-heading font-semibold text-munshi-indigo dark:text-white mb-4">Reconciliation Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Matched Transactions</span>
              <span className="font-mono font-medium text-green-600 dark:text-green-400">245</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Unmatched</span>
              <span className="font-mono font-medium text-yellow-600 dark:text-yellow-400">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Needs Review</span>
              <span className="font-mono font-medium text-red-600 dark:text-red-400">3</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-6">Review Unmatched</Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-munshi-indigo to-munshi-teal text-white">
          <h3 className="font-heading font-semibold mb-2">Auto-Reconciliation</h3>
          <p className="text-sm text-white/80 mb-6">Munshi AI has matched 95% of your transactions automatically this month.</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2" style={{ width: '95%' }}></div>
            </div>
            <span className="text-sm font-bold">95%</span>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
