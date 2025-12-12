'use client';

import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Shield, Lock, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="py-16 px-6 bg-white dark:bg-munshi-dark-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold uppercase tracking-wide mb-4">
                <Shield size={14} /> Bank-Grade Security
             </div>
             <h1 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Privacy Policy</h1>
             <p className="text-gray-500 dark:text-gray-400">We treat your financial data with the highest level of confidentiality.</p>
          </div>

          <div className="space-y-12">
             <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                   <Lock className="text-munshi-teal mb-4" size={24} />
                   <h3 className="font-bold text-munshi-indigo dark:text-white mb-2">Encryption</h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400">All data is encrypted in transit (TLS 1.2+) and at rest (AES-256).</p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                   <Database className="text-munshi-teal mb-4" size={24} />
                   <h3 className="font-bold text-munshi-indigo dark:text-white mb-2">Data Isolation</h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400">Customer data is logically isolated. We never sell your data.</p>
                </div>
             </div>

             <section className="space-y-4">
                <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white">1. Information We Collect</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                   When you register for Munshi, we collect information such as your name, company name, email address, and payment information. When you connect bank accounts, we receive read-only transaction data via our secure banking partners. We do NOT store your banking login credentials.
                </p>
             </section>

             <section className="space-y-4">
                <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white">2. How We Use Information</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                   <li>To provide and maintain the Service.</li>
                   <li>To notify you about changes to our Service.</li>
                   <li>To provide customer support.</li>
                   <li>To gather analysis or valuable information so that we can improve the Service (e.g., AI categorization models). Note: Data used for AI training is anonymized and aggregated.</li>
                </ul>
             </section>

             <section className="space-y-4">
                <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white">3. Bank Sync & Third Parties</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                   We use regulated third-party providers (Account Aggregators) to sync your bank data. These providers adhere to RBI guidelines. We also share data with payment processors (e.g., Stripe, Razorpay) only as necessary to process your subscription payments.
                </p>
             </section>

             <section className="space-y-4">
                <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white">4. Your Data Rights</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                   You have the right to access, correct, update, or request deletion of your personal information. You can delete your account at any time from the Settings page, which will permanently remove your financial data from our active servers.
                </p>
             </section>

             <div className="bg-munshi-indigo/5 dark:bg-zinc-800 p-6 rounded-xl mt-8">
                <h3 className="font-bold text-munshi-indigo dark:text-white mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                   If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@munshi.app" className="text-munshi-teal hover:underline">privacy@munshi.app</a>.
                </p>
             </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
