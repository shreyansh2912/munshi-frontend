'use client';

import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ShieldCheck, Zap, Users, IndianRupee } from 'lucide-react';

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="py-24 px-6 text-center max-w-4xl mx-auto">
         <h1 className="text-4xl md:text-6xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
            Our Vision for the Future of Accounting
         </h1>
         <p className="text-xl text-munshi-subtext dark:text-zinc-400 leading-relaxed">
            Replacing manual bookkeeping with intelligent automation, so Indian businesses can focus on growth, not paperwork.
         </p>
      </div>

      {/* Story */}
      <div className="py-16 px-6 bg-white dark:bg-munshi-dark-card border-y border-gray-100 dark:border-zinc-800">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">The Munshi Story</h2>
               <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                     It started with a simple observation: despite the digital revolution, most Indian SMEs were still reconciling bank statements in Excel or handing over shoeboxes of receipts to their CAs.
                  </p>
                  <p>
                     We realized that accounting software hadn't evolved in decades. It was still just a digital ledger—passive, requiring manual input, and prone to error.
                  </p>
                  <p>
                     Munshi was built to be different. We built it to be an <strong>active participant</strong> in your business. An AI agent that doesn't just record history, but understands it, categorizes it, and helps you plan for the future.
                  </p>
               </div>
            </div>
            <div className="h-96 rounded-2xl bg-gradient-to-br from-munshi-indigo to-munshi-teal flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop')] bg-cover opacity-20 mix-blend-overlay"></div>
               <div className="relative z-10 text-white text-center">
                  <div className="text-6xl font-bold mb-2">2023</div>
                  <div className="text-sm uppercase tracking-widest opacity-80">Year Founded</div>
               </div>
            </div>
         </div>
      </div>

      {/* Principles */}
      <div className="py-24 px-6 bg-munshi-white dark:bg-munshi-dark-bg">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white text-center mb-16">Our Principles</h2>
            <div className="grid md:grid-cols-4 gap-8">
               {[
                 { title: 'Security First', desc: 'We never compromise on data protection. Your trust is our currency.', icon: ShieldCheck },
                 { title: 'Total Automation', desc: 'If a human has to do it twice, our AI should learn to do it once.', icon: Zap },
                 { title: 'Transparency', desc: 'No hidden fees, no dark patterns, and open communication.', icon: Users },
                 { title: 'India First', desc: 'Built specifically for GST, TDS, and Indian banking protocols.', icon: IndianRupee },
               ].map((p, i) => (
                 <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <div className="w-12 h-12 rounded-xl bg-munshi-indigo/5 dark:bg-zinc-800 text-munshi-indigo dark:text-white flex items-center justify-center mb-6">
                       <p.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-munshi-indigo dark:text-white mb-3">{p.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </PublicLayout>
  );
}
