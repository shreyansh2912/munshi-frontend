/**
 * Ledger Scene (Client Component)
 * Handles ledger UI and interactions
 */

'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Badge, Modal, Input } from '@/components/ui/UI';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import type { LedgerAccount } from '@/lib/api';

interface LedgerSceneProps {
  initialData: {
    ledgerAccounts: LedgerAccount[];
  };
}

export default function LedgerScene({ initialData }: LedgerSceneProps) {
  const [accounts, setAccounts] = useState(initialData.ledgerAccounts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('ALL');

  // Filter accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || account.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Chart of Accounts</h1>
          <p className="text-munshi-subtext dark:text-zinc-400 text-sm mt-1">Manage your ledger accounts</p>
        </div>
        <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={16} className="mr-2"/> New Account
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-munshi-text dark:text-white outline-none focus:ring-2 focus:ring-munshi-indigo"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-munshi-text dark:text-white outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="ASSET">Assets</option>
            <option value="LIABILITY">Liabilities</option>
            <option value="EQUITY">Equity</option>
            <option value="REVENUE">Revenue</option>
            <option value="EXPENSE">Expenses</option>
          </select>
        </div>
      </Card>

      {/* Accounts Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-munshi-dark-card divide-y divide-gray-200 dark:divide-zinc-800">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-munshi-text dark:text-gray-200">{account.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-munshi-indigo dark:text-white">{account.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={account.type === 'ASSET' ? 'success' : account.type === 'LIABILITY' ? 'warning' : 'neutral'}>
                      {account.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-right text-munshi-text dark:text-gray-200">
                    ₹{account.balance.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${account.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'}`}>
                      {account.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-munshi-indigo hover:text-munshi-teal dark:text-indigo-400 dark:hover:text-teal-400">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Account Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Account"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsCreateModalOpen(false)}>Create Account</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Account Name" placeholder="e.g. Cash" />
          <Input label="Account Code" placeholder="e.g. 1001" />
          <div>
            <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Account Type</label>
            <select className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none">
              <option value="ASSET">Asset</option>
              <option value="LIABILITY">Liability</option>
              <option value="EQUITY">Equity</option>
              <option value="REVENUE">Revenue</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}
