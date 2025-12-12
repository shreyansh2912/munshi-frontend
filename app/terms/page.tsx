'use client';

import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';

export default function TermsPage() {
  const sections = [
    'Introduction', 'Account Creation', 'Subscription & Billing', 'Trial Rules', 
    'Usage Rights', 'Data Ownership', 'Termination', 'Liability', 'Dispute Resolution'
  ];

  return (
    <PublicLayout>
      <div className="py-16 px-6 bg-white dark:bg-munshi-dark-bg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-2 text-center">Terms & Conditions</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-16">Last updated: October 24, 2023</p>

          <div className="grid lg:grid-cols-4 gap-12">
             {/* Sidebar */}
             <div className="hidden lg:block col-span-1">
                <div className="sticky top-24 space-y-1">
                   {sections.map((section, i) => (
                      <a 
                        key={i} 
                        href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-munshi-indigo dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                      >
                         {section}
                      </a>
                   ))}
                </div>
             </div>

             {/* Content */}
             <div className="lg:col-span-3 space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed">
                <section id="introduction">
                   <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white mb-4">1. Introduction</h2>
                   <p>Welcome to Munshi. These Terms and Conditions govern your use of the Munshi accounting platform and services. By accessing or using our services, you agree to be bound by these terms.</p>
                </section>

                <section id="account-creation">
                   <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white mb-4">2. Account Creation</h2>
                   <p>To use Munshi, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                </section>

                <section id="subscription-&-billing">
                   <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white mb-4">3. Subscription & Billing</h2>
                   <p className="mb-4">Munshi offers both free and paid subscription plans. Paid plans are billed in advance on a monthly or annual basis and are non-refundable for the current billing period.</p>
                   <ul className="list-disc pl-5 space-y-2">
                      <li>We reserve the right to change our pricing upon 30 days notice.</li>
                      <li>Downgrading your plan may cause the loss of content, features, or capacity of your account.</li>
                   </ul>
                </section>

                <section id="trial-rules">
                   <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white mb-4">4. Free Trial</h2>
                   <p>We may offer a free trial period. If you do not upgrade to a paid plan before the trial expires, your account may be suspended or limited to free features.</p>
                </section>

                <section id="data-ownership">
                   <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white mb-4">5. Data Ownership</h2>
                   <p>You retain all rights and ownership of your financial data. We claim no intellectual property rights over the material you provide to the Service. However, by setting your pages to be viewed publicly, you agree to allow others to view your Content.</p>
                </section>
                
                <section id="liability">
                   <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white mb-4">6. Limitation of Liability</h2>
                   <p>In no event shall Munshi, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
                </section>
                
                <div className="pt-12 border-t border-gray-100 dark:border-zinc-800">
                   <p className="text-sm text-gray-500">For questions regarding these terms, please contact us at legal@munshi.app.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
