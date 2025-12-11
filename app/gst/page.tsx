'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Badge, AISuggestionBox } from '@/components/ui/UI';
import { Download, FileText, AlertTriangle } from 'lucide-react';

export default function GSTPage() {
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">GST & Taxes</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Track liabilities, ITC, and file returns.</p>
        </div>
        <Button size="sm"><Download size={16} className="mr-2"/> GSTR-1 Report</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-munshi-indigo to-blue-900 text-white border-none">
           <h3 className="text-sm font-medium opacity-80 mb-1">Estimated Liability (Oct)</h3>
           <p className="text-3xl font-mono font-bold mb-4">₹42,500</p>
           <div className="text-xs bg-white/10 inline-block px-2 py-1 rounded">Due by Nov 20</div>
        </Card>
        <Card>
           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Input Tax Credit (ITC)</h3>
           <p className="text-3xl font-mono font-bold text-green-600 dark:text-green-400 mb-4">₹12,800</p>
           <p className="text-xs text-gray-400">Available for offset</p>
        </Card>
        <Card>
           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Net Payable</h3>
           <p className="text-3xl font-mono font-bold text-munshi-indigo dark:text-indigo-300 mb-4">₹29,700</p>
           <Button size="sm" variant="outline" className="h-7 text-xs">Pay Now</Button>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h3 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-gray-200 mb-6">Filing History</h3>
            <div className="space-y-4">
              {['Sep 2023', 'Aug 2023', 'Jul 2023'].map((month, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-munshi-text dark:text-gray-200">GSTR-3B - {month}</p>
                      <p className="text-xs text-gray-500">Filed on 20th</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="success">Filed</Badge>
                    <button className="text-gray-400 hover:text-munshi-indigo dark:hover:text-indigo-300"><Download size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
           <AISuggestionBox 
             title="Optimize ITC Claim"
             description="We found 3 invoices from last month eligible for ITC that haven't been reconciled."
             actionLabel="Review Invoices"
             onAction={() => {}}
           />
           
           <Card className="bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30">
             <div className="flex gap-3">
               <AlertTriangle className="text-orange-500 flex-shrink-0" size={20} />
               <div>
                 <h4 className="text-sm font-bold text-orange-800 dark:text-orange-300 mb-1">Compliance Alert</h4>
                 <p className="text-xs text-orange-700 dark:text-orange-400">Your GSTIN verification is pending for the new branch.</p>
               </div>
             </div>
           </Card>
        </div>
      </div>
    </AppLayout>
  );
}
