/**
 * Dashboard Scene (Client Component)
 * Handles UI interactions and state management with real API data
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, AISuggestionBox, Modal, Input } from '@/components/ui/UI';
import { RevenueChart, ExpenseBarChart } from '@/components/charts/Charts';
import { AppLayout } from '@/components/layout/AppLayout';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Download, Plus, DollarSign, Tag, FileText, Loader2 } from 'lucide-react';
import { useDashboardStore, useBankingStore } from '@/lib/stores';
import type { User, LedgerAccount } from '@/lib/api';

interface DashboardSceneProps {
  initialData: {
    user: User;
    ledgerAccounts: LedgerAccount[];
  };
}

const MetricCard: React.FC<{ title: string, value: string, trend: string, isPositive: boolean, caption: string, isLoading?: boolean }> = ({ 
  title, value, trend, isPositive, caption, isLoading 
}) => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4">
      <p className="text-sm font-medium text-munshi-subtext dark:text-zinc-400">{title}</p>
      <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400' : 'text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400'}`}>
        {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
        {trend}
      </div>
    </div>
    {isLoading ? (
      <div className="flex items-center gap-2">
        <Loader2 size={24} className="animate-spin text-munshi-indigo" />
        <span className="text-sm text-gray-400">Loading...</span>
      </div>
    ) : (
      <>
        <h3 className="text-3xl font-mono font-medium text-munshi-indigo dark:text-gray-100 mb-1">{value}</h3>
        <p className="text-xs text-gray-400 dark:text-zinc-500">{caption}</p>
      </>
    )}
  </Card>
);

export default function DashboardScene({ initialData }: DashboardSceneProps) {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const { user } = initialData;
  
  // Dashboard store
  const { metrics, recentActivity, isLoading: isDashboardLoading, fetchAll } = useDashboardStore();
  
  // Banking store
  const { accounts: bankAccounts, fetchAccounts, isLoading: isBankingLoading } = useBankingStore();

  // Fetch data on mount
  useEffect(() => {
    fetchAll();
    fetchAccounts();
  }, [fetchAll, fetchAccounts]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Dashboard</h1>
          <p className="text-munshi-subtext dark:text-zinc-400 text-sm mt-1">Good morning, {user.name}. Here's your financial pulse.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex"><Download size={16} className="mr-2"/> Report</Button>
            <Button size="sm" onClick={() => setIsTransactionModalOpen(true)}><Plus size={16} className="mr-2"/> New Transaction</Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          title="Total Revenue" 
          value={metrics ? formatCurrency(metrics.totalRevenue) : '...'} 
          trend={metrics?.revenueTrend || '...'}
          isPositive={true} 
          caption="vs last month"
          isLoading={isDashboardLoading}
        />
        <MetricCard 
          title="Total Expenses" 
          value={metrics ? formatCurrency(metrics.totalExpenses) : '...'} 
          trend={metrics?.expensesTrend || '...'}
          isPositive={false} 
          caption="vs last month"
          isLoading={isDashboardLoading}
        />
        <MetricCard 
          title="Net Profit" 
          value={metrics ? formatCurrency(metrics.netProfit) : '...'} 
          trend={metrics?.profitTrend || '...'}
          isPositive={true} 
          caption="vs last month"
          isLoading={isDashboardLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-gray-200">Cashflow Overview</h3>
              <select className="bg-gray-50 dark:bg-zinc-900 border-none text-sm rounded-lg px-3 py-1 focus:ring-0 cursor-pointer text-gray-700 dark:text-gray-200">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Quarter</option>
              </select>
            </div>
            <RevenueChart />
          </Card>

          <Card className="p-6">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-gray-200">Recent Activity</h3>
                <Button variant="ghost" size="sm">View All</Button>
             </div>
             {isDashboardLoading ? (
               <div className="flex justify-center py-8">
                 <Loader2 size={32} className="animate-spin text-munshi-indigo" />
               </div>
             ) : recentActivity.length === 0 ? (
               <div className="text-center py-8 text-gray-400">
                 <p>No recent activity</p>
               </div>
             ) : (
               <div className="space-y-0">
                  {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-zinc-800 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-900 px-2 rounded-lg transition-colors">
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-munshi-indigo/5 dark:bg-zinc-800 flex items-center justify-center text-munshi-indigo dark:text-white text-xs font-bold">
                                {activity.description.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                  <p className="text-sm font-medium text-munshi-text dark:text-gray-200">{activity.description}</p>
                                  <p className="text-xs text-gray-400">{activity.category} • {activity.date}</p>
                              </div>
                          </div>
                          <div className="text-right">
                               <p className="text-sm font-mono font-medium text-munshi-text dark:text-gray-200">
                                 {activity.type === 'credit' ? '+' : '-'} {formatCurrency(activity.amount)}
                               </p>
                               <Badge variant={activity.status === 'cleared' ? 'success' : 'default'}>{activity.status}</Badge>
                          </div>
                      </div>
                  ))}
               </div>
             )}
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <AISuggestionBox 
            title="Unusual Expense Detected"
            description="Spending on 'Software' is 40% higher than your average. Review 3 flagged transactions?"
            actionLabel="Review"
            onAction={() => console.log('Review')}
          />

          <Card className="p-6">
             <h3 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-gray-200 mb-4">Bank Accounts</h3>
             {isBankingLoading ? (
               <div className="flex justify-center py-4">
                 <Loader2 size={24} className="animate-spin text-munshi-indigo" />
               </div>
             ) : bankAccounts.length === 0 ? (
               <div className="text-center py-4">
                 <p className="text-sm text-gray-400 mb-4">No bank accounts connected</p>
                 <Button variant="outline" className="w-full text-sm border-dashed">Connect Bank Account</Button>
               </div>
             ) : (
               <div className="space-y-4">
                  {bankAccounts.map(acc => (
                      <div key={acc.id} className="p-4 border border-gray-100 dark:border-zinc-800 rounded-xl hover:border-munshi-indigo/30 dark:hover:border-zinc-600 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                               <p className="text-sm font-medium text-munshi-text dark:text-gray-200">{acc.bankName}</p>
                               <span className={`w-2 h-2 rounded-full ${acc.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">{acc.accountNumber}</p>
                          <p className="text-lg font-mono text-munshi-indigo dark:text-white font-medium">{formatCurrency(acc.balance)}</p>
                      </div>
                  ))}
                  <Button variant="outline" className="w-full text-sm border-dashed">Connect New Account</Button>
               </div>
             )}
          </Card>

          <Card className="p-6 bg-munshi-indigo dark:bg-zinc-900 text-white">
             <div className="flex justify-between items-start mb-4">
                <h3 className="font-heading font-semibold">Expense Breakdown</h3>
                <MoreHorizontal size={16} className="text-white/50" />
             </div>
             <ExpenseBarChart />
             <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm">
                <span className="text-white/70">Top category</span>
                <span className="font-medium">Rent & Utilities</span>
             </div>
          </Card>
        </div>
      </div>

      {/* New Transaction Modal */}
      <Modal 
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        title="Record New Transaction"
        footer={
           <>
              <Button variant="ghost" onClick={() => setIsTransactionModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsTransactionModalOpen(false)}>Create Transaction</Button>
           </>
        }
      >
         <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Type</label>
                  <select className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none">
                     <option value="debit">Expense (Debit)</option>
                     <option value="credit">Income (Credit)</option>
                  </select>
               </div>
               <Input label="Date" type="date" />
            </div>
            
            <Input label="Amount" placeholder="0.00" icon={<DollarSign size={16} />} />
            <Input label="Description" placeholder="e.g. Client Lunch" icon={<FileText size={16} />} />
            
            <div>
               <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Category</label>
               <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600" size={16} />
                  <select className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg pl-10 pr-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none">
                     <option>Office Supplies</option>
                     <option>Travel</option>
                     <option>Software</option>
                     <option>Rent</option>
                     <option>Marketing</option>
                  </select>
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Payment Method</label>
               <select className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none">
                  <option>Cash</option>
                  {bankAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.bankName} {acc.accountNumber}</option>
                  ))}
               </select>
            </div>
         </div>
      </Modal>

    </AppLayout>
  );
}
