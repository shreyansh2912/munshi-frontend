'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Badge, Input } from '@/components/ui/UI';
import { Plus, Search, TrendingUp, TrendingDown } from 'lucide-react';

export default function LedgerPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const accounts = [
    { id: 1, code: '1000', name: 'Cash', type: 'Asset', balance: 125000, change: 12.5 },
    { id: 2, code: '1100', name: 'Accounts Receivable', type: 'Asset', balance: 450000, change: -5.2 },
    { id: 3, code: '1200', name: 'Inventory', type: 'Asset', balance: 280000, change: 8.3 },
    { id: 4, code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 180000, change: 3.1 },
    { id: 5, code: '3000', name: 'Owner Equity', type: 'Equity', balance: 500000, change: 15.7 },
    { id: 6, code: '4000', name: 'Sales Revenue', type: 'Income', balance: 1250000, change: 22.4 },
    { id: 7, code: '5000', name: 'Cost of Goods Sold', type: 'Expense', balance: 450000, change: 18.2 },
    { id: 8, code: '5100', name: 'Rent Expense', type: 'Expense', balance: 45000, change: 0 },
    { id: 9, code: '5200', name: 'Utilities', type: 'Expense', balance: 12000, change: -8.5 },
    { id: 10, code: '5300', name: 'Salaries', type: 'Expense', balance: 320000, change: 5.0 },
  ];

  const filteredAccounts = accounts.filter(acc =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.code.includes(searchTerm)
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Asset': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Liability': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'Equity': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Income': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'Expense': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Chart of Accounts</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Manage your ledger and account structure.</p>
        </div>
        <Button size="sm"><Plus size={16} className="mr-2"/> Add Account</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Assets', value: '₹8.55L', color: 'blue' },
          { label: 'Liabilities', value: '₹1.80L', color: 'red' },
          { label: 'Equity', value: '₹5.00L', color: 'purple' },
          { label: 'Income', value: '₹12.5L', color: 'green' },
          { label: 'Expenses', value: '₹8.27L', color: 'orange' },
        ].map((item, i) => (
          <Card key={i} className="p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">{item.label}</p>
            <h3 className={`text-xl font-mono font-bold text-${item.color}-600 dark:text-${item.color}-400`}>{item.value}</h3>
          </Card>
        ))}
      </div>

      <Card noPadding>
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

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white dark:bg-zinc-900/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Account Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Balance</th>
                <th className="px-6 py-4 text-right">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-munshi-dark-card">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">{account.code}</td>
                  <td className="px-6 py-4 font-medium text-munshi-text dark:text-white">{account.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(account.type)}`}>
                      {account.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-munshi-text dark:text-white">
                    ₹{account.balance.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`flex items-center justify-end gap-1 ${
                      account.change > 0 ? 'text-green-600 dark:text-green-400' : account.change < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500'
                    }`}>
                      {account.change > 0 && <TrendingUp size={14} />}
                      {account.change < 0 && <TrendingDown size={14} />}
                      <span className="text-sm font-medium">{account.change > 0 ? '+' : ''}{account.change}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}
