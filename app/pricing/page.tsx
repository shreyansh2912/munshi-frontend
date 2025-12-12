'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { PricingSection } from '@/components/sections/PricingSection';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ Component (same style as landing page)
const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-zinc-800 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-4 text-left focus:outline-none group">
        <span className={`font-medium transition-colors ${isOpen ? 'text-munshi-indigo dark:text-white' : 'text-munshi-subtext dark:text-gray-400 group-hover:text-munshi-indigo dark:group-hover:text-gray-200'}`}>{question}</span>
        {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {isOpen && <div className="pb-4 text-sm text-munshi-subtext dark:text-zinc-400 leading-relaxed animate-fade-in-up" style={{ animationDuration: '0.2s' }}>{answer}</div>}
    </div>
  );
};

export default function PricingPage() {
  return (
    <PublicLayout>
      {/* Pricing Section */}
      <section className="pt-16">
        <PricingSection />
      </section>

      {/* FAQ Section (same style as landing page) */}
      <section className="py-24 bg-white dark:bg-munshi-dark-bg">
         <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-2">
               <FAQItem question="Can I switch plans later?" answer="Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference." />
               <FAQItem question="What payment methods do you accept?" answer="We accept all major credit cards, debit cards, UPI, and net banking through our secure payment partners." />
               <FAQItem question="Is there a setup fee?" answer="No, there are no setup fees or hidden charges. You only pay for your subscription plan." />
               <FAQItem question="Can I cancel anytime?" answer="Yes, you can cancel your subscription at any time from your account settings. No questions asked, and you'll retain access until the end of your billing period." />
               <FAQItem question="Do you offer refunds?" answer="We offer a 14-day free trial so you can test all features. If you're not satisfied after subscribing, contact us within 7 days for a full refund." />
               <FAQItem question="Is my financial data safe with Munshi?" answer="Absolutely. We use bank-grade 256-bit encryption for all data in transit and at rest. We are compliant with Indian data privacy regulations." />
               <FAQItem question="Does Munshi support GST filing?" answer="Yes, Munshi is a fully GST-compliant platform. You can generate GSTR-1, GSTR-3B reports and JSON files ready for the government portal." />
               <FAQItem question="Can I invite my Chartered Accountant?" answer="Yes! You can invite your CA or accountant as a 'Viewer' or 'Member' to your organization for free, so they can audit your books directly." />
            </div>
         </div>
      </section>
    </PublicLayout>
  );
}
