/**
 * Invoices Scene (Client Component)
 * Handles invoices UI and interactions
 */

'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Badge } from '@/components/ui/UI';
import { Plus, Search, Filter, MoreHorizontal, ShoppingCart, Clock, Check } from 'lucide-react';
import type { Invoice } from '@/lib/api';

interface InvoicesSceneProps {
  initialData: {
    invoices: Invoice[];
    customers: any[];  // Will be properly typed when we integrate the form
    products: any[];   // Will be properly typed when we integrate the form
  };
}

export default function InvoicesScene({ initialData }: InvoicesSceneProps) {
  const [invoices] = useState(initialData.invoices);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate summary stats
  const totalSales = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const overdue = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const paidThisMonth = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  // Filter invoices
  const filteredInvoices = invoices.filter(inv =>
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Invoices</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Manage sales, create invoices, and track payments.</p>
        </div>
        <Button size="sm"><Plus size={16} className="mr-2"/> Create Invoice</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <Card className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center">
               <ShoppingCart size={24} />
            </div>
            <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Total Sales</p>
               <h3 className="text-xl font-bold dark:text-white">₹{totalSales.toLocaleString('en-IN')}</h3>
            </div>
         </Card>
         <Card className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl flex items-center justify-center">
               <Clock size={24} />
            </div>
            <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Overdue</p>
               <h3 className="text-xl font-bold dark:text-white">₹{overdue.toLocaleString('en-IN')}</h3>
            </div>
         </Card>
         <Card className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl flex items-center justify-center">
               <Check size={24} />
            </div>
            <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Paid (This Month)</p>
               <h3 className="text-xl font-bold dark:text-white">₹{paidThisMonth.toLocaleString('en-IN')}</h3>
            </div>
         </Card>
      </div>

      <Card noPadding>
         <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row gap-4">
             <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  placeholder="Search invoices..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm outline-none text-munshi-text dark:text-gray-200" 
                />
             </div>
             <Button variant="outline" size="sm"><Filter size={16} className="mr-2"/> Filter</Button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-gray-50 dark:bg-zinc-900/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                     <th className="px-6 py-4">Invoice ID</th>
                     <th className="px-6 py-4">Customer</th>
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4">Due Date</th>
                     <th className="px-6 py-4 text-right">Amount</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {filteredInvoices.map((inv) => (
                     <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-munshi-indigo dark:text-indigo-400">{inv.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{inv.customer}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{inv.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{inv.dueDate}</td>
                        <td className="px-6 py-4 text-right font-mono text-sm font-medium dark:text-white">₹{inv.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                           <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'overdue' ? 'error' : 'warning'}>
                              {inv.status}
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-gray-400 hover:text-munshi-indigo dark:hover:text-white"><MoreHorizontal size={18} /></button>
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
