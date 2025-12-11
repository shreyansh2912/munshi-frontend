'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Card } from '@/components/ui/UI';
import { Sparkles, Check, X, Building2, Zap } from 'lucide-react';

const FeatureItem: React.FC<{ text: string, included?: boolean, highlight?: boolean }> = ({ text, included = true, highlight = false }) => (
  <div className={`flex items-start gap-3 text-sm ${!included ? 'opacity-50' : ''}`}>
    {included ? (
      <div className={`mt-0.5 rounded-full p-0.5 ${highlight ? 'bg-munshi-teal/20 text-munshi-teal dark:text-teal-400 dark:bg-teal-900/30' : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'}`}>
        <Check size={12} strokeWidth={3} />
      </div>
    ) : (
      <div className="mt-0.5 text-gray-400">
        <X size={14} />
      </div>
    )}
    <span className={`${included ? 'text-munshi-text dark:text-zinc-300' : 'text-gray-400 line-through'} ${highlight ? 'font-medium text-munshi-indigo dark:text-white' : ''}`}>
      {text}
    </span>
  </div>
);

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="py-20 px-6 bg-white dark:bg-munshi-dark-bg transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-munshi-subtext dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your business stage. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-munshi-indigo dark:text-white' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 bg-munshi-indigo dark:bg-zinc-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-munshi-indigo"
            >
              <span className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}></span>
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-munshi-indigo dark:text-white' : 'text-gray-400'}`}>
              Yearly <span className="text-munshi-teal dark:text-teal-400 text-xs ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border border-gray-200 dark:border-zinc-800 flex flex-col hover:border-gray-300 transition-colors">
             <div className="p-2 mb-4">
               <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
                  <Zap size={24} />
               </div>
             </div>
             <h3 className="text-xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">Free Trial</h3>
             <p className="text-gray-500 dark:text-zinc-400 text-sm mb-6 h-10">Perfect for exploring Munshi's interface.</p>
             <div className="mb-8">
               <span className="text-4xl font-mono font-bold text-munshi-indigo dark:text-white">₹0</span>
               <span className="text-gray-500 text-sm ml-2">/ 7 days</span>
             </div>
             <Link href="/signup"><Button variant="outline" className="w-full mb-8">Start Free Trial</Button></Link>
             
             <div className="space-y-4 flex-1">
               <FeatureItem text="Basic Dashboard" />
               <FeatureItem text="Manual Bank Import" />
               <FeatureItem text="3 Invoices" />
               <FeatureItem text="AI Features" included={false} />
               <FeatureItem text="Bank Auto-Sync" included={false} />
             </div>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-munshi-indigo dark:border-white shadow-2xl shadow-munshi-indigo/10 dark:shadow-none flex flex-col transform md:-translate-y-4">
             <div className="absolute top-0 right-0 left-0 flex justify-center -mt-3">
               <span className="bg-munshi-indigo dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
             </div>
             <div className="p-2 mb-4 mt-2">
               <div className="w-12 h-12 rounded-xl bg-munshi-indigo/10 dark:bg-zinc-800 flex items-center justify-center text-munshi-indigo dark:text-white">
                  <Sparkles size={24} />
               </div>
             </div>
             <h3 className="text-xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">Pro</h3>
             <p className="text-gray-500 dark:text-zinc-400 text-sm mb-6 h-10">For growing businesses needing automation.</p>
             <div className="mb-8">
               <span className="text-4xl font-mono font-bold text-munshi-indigo dark:text-white">₹{isYearly ? '4,999' : '499'}</span>
               <span className="text-gray-500 text-sm ml-2">/{isYearly ? 'year' : 'month'}</span>
             </div>
             <Link href="/signup"><Button variant="primary" className="w-full mb-8">Upgrade to Pro</Button></Link>
             
             <div className="space-y-4 flex-1">
               <FeatureItem text="Everything in Free" />
               <FeatureItem text="AI Categorization & Ledger" highlight />
               <FeatureItem text="AI Tax Suggestions" highlight />
               <FeatureItem text="Automated Bank Sync" highlight />
               <FeatureItem text="Unlimited Invoices" />
               <FeatureItem text="Priority Email Support" />
             </div>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative border border-munshi-gold/50 dark:border-yellow-700/50 flex flex-col hover:border-munshi-gold transition-colors bg-gradient-to-b from-transparent to-munshi-gold/5 dark:to-yellow-900/10">
             <div className="p-2 mb-4">
               <div className="w-12 h-12 rounded-xl bg-munshi-gold/10 dark:bg-yellow-900/20 flex items-center justify-center text-munshi-gold dark:text-yellow-500">
                  <Building2 size={24} />
               </div>
             </div>
             <h3 className="text-xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">Enterprise</h3>
             <p className="text-gray-500 dark:text-zinc-400 text-sm mb-6 h-10">For large organizations requiring control.</p>
             <div className="mb-8 flex items-end h-10">
               <span className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white">Custom</span>
             </div>
             <Link href="/contact"><Button variant="outline" className="w-full mb-8 border-munshi-gold/50 text-munshi-indigo hover:bg-munshi-gold/10 dark:text-white dark:hover:bg-yellow-900/20">Contact Sales</Button></Link>
             
             <div className="space-y-4 flex-1">
               <FeatureItem text="Everything in Pro" />
               <FeatureItem text="Multi-user Access" />
               <FeatureItem text="Role-based Permissions" />
               <FeatureItem text="Organization Dashboard" />
               <FeatureItem text="API Access" />
               <FeatureItem text="Dedicated Account Manager" />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
