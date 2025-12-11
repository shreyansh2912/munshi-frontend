'use client';

import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card } from '@/components/ui/UI';
import { Search, BookOpen, Database, Sparkles, FileText, Upload, Settings, Users, ArrowRight } from 'lucide-react';

export default function GuidePage() {
  const categories = [
    { title: 'Getting Started', count: '5 articles', icon: BookOpen },
    { title: 'Bank Synchronization', count: '8 articles', icon: Database },
    { title: 'AI Ledger', count: '4 articles', icon: Sparkles },
    { title: 'GST & TDS', count: '12 articles', icon: FileText },
    { title: 'Import / Export', count: '3 articles', icon: Upload },
    { title: 'Settings & Billing', count: '6 articles', icon: Settings },
    { title: 'Multi-Organization', count: '2 articles', icon: Users },
  ];

  const popularArticles = [
    'How to connect your HDFC Corporate account',
    'Understanding the AI Confidence Score',
    'Exporting GSTR-1 JSON for filing',
    'Inviting your Chartered Accountant as a Viewer',
    'Bulk uploading invoices from Google Drive'
  ];

  return (
    <PublicLayout>
      <div className="bg-munshi-indigo dark:bg-black py-20 px-6 text-center">
         <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Munshi Guide & Resources</h1>
         <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Everything you need to know about using Munshi to automate your accounting.</p>
         <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-munshi-text shadow-lg outline-none focus:ring-2 focus:ring-munshi-teal"
            />
         </div>
      </div>

      <div className="py-20 px-6 max-w-7xl mx-auto bg-munshi-white dark:bg-munshi-dark-bg -mt-10 rounded-t-3xl relative z-10">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
               <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer group p-6">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-munshi-indigo/5 dark:bg-zinc-800 text-munshi-indigo dark:text-white flex items-center justify-center group-hover:bg-munshi-indigo group-hover:text-white transition-colors">
                        <cat.icon size={24} />
                     </div>
                     <div>
                        <h3 className="font-bold text-munshi-indigo dark:text-white text-lg mb-1">{cat.title}</h3>
                        <p className="text-sm text-gray-500">{cat.count}</p>
                     </div>
                  </div>
               </Card>
            ))}
         </div>

         <div className="mt-16">
            <h2 className="text-2xl font-bold text-munshi-indigo dark:text-white mb-8">Popular Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
               {popularArticles.map((article, i) => (
                 <Link 
                    key={i} 
                    href="/guide/article"
                    className="p-4 bg-white dark:bg-munshi-dark-card border border-gray-100 dark:border-zinc-800 rounded-xl hover:border-munshi-indigo dark:hover:border-zinc-600 cursor-pointer transition-colors flex items-center justify-between group"
                 >
                    <span className="text-munshi-text dark:text-gray-200 font-medium group-hover:text-munshi-indigo dark:group-hover:text-white transition-colors">{article}</span>
                    <span className="text-munshi-teal flex items-center gap-1 text-sm font-medium">Read <ArrowRight size={14}/></span>
                 </Link>
               ))}
            </div>
         </div>
      </div>
    </PublicLayout>
  );
}
