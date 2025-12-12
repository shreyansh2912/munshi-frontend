'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, Button } from '@/components/ui/UI';
import { 
  ArrowLeft, Search, Calendar, User, Clock, ArrowRight, BookOpen, Database, Sparkles, FileText, Upload, Settings, Users
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock articles data
const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'How to connect your HDFC Corporate account',
    excerpt: 'Step-by-step guide to linking your HDFC bank account with Munshi for automatic transaction sync.',
    categorySlug: 'bank-sync',
    author: 'Ananya Singh',
    date: 'Oct 24, 2023',
    readTime: '5 min read',
    tags: ['HDFC', 'Banking'],
    slug: 'hdfc-corporate-account'
  },
  {
    id: 2,
    title: 'Understanding the AI Confidence Score',
    excerpt: 'Learn what the confidence score means and how to improve AI categorization accuracy.',
    categorySlug: 'ai-ledger',
    author: 'Rajesh Kumar',
    date: 'Oct 20, 2023',
    readTime: '4 min read',
    tags: ['AI', 'Ledger'],
    slug: 'ai-confidence-score'
  },
  {
    id: 3,
    title: 'Exporting GSTR-1 JSON for filing',
    excerpt: 'Complete guide to generating and downloading GSTR-1 JSON files for GST portal upload.',
    categorySlug: 'gst-tds',
    author: 'Priya Sharma',
    date: 'Oct 18, 2023',
    readTime: '8 min read',
    tags: ['GST', 'Compliance'],
    slug: 'gstr-1-json-export'
  },
  {
    id: 4,
    title: 'Setting up your first organization',
    excerpt: 'Get started with Munshi by creating your organization and configuring basic settings.',
    categorySlug: 'getting-started',
    author: 'Vikram Patel',
    date: 'Oct 15, 2023',
    readTime: '6 min read',
    tags: ['Setup', 'Basics'],
    slug: 'first-organization-setup'
  },
  {
    id: 5,
    title: 'Inviting your Chartered Accountant as a Viewer',
    excerpt: 'Learn how to add team members and set appropriate permissions for your CA.',
    categorySlug: 'settings',
    author: 'Meera Reddy',
    date: 'Oct 12, 2023',
    readTime: '3 min read',
    tags: ['Team', 'Permissions'],
    slug: 'invite-ca-viewer'
  },
  {
    id: 6,
    title: 'Bulk uploading invoices from Google Drive',
    excerpt: 'Automate invoice processing by connecting your Google Drive for bulk uploads.',
    categorySlug: 'import-export',
    author: 'Amit Desai',
    date: 'Oct 10, 2023',
    readTime: '7 min read',
    tags: ['Import', 'Automation'],
    slug: 'bulk-upload-google-drive'
  }
];

export default function GuideCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = React.use(params);
  const [searchTerm, setSearchTerm] = useState('');

  // Map slugs to display titles and icons
  const categoryInfo: Record<string, { title: string, description: string, icon: any }> = {
    'getting-started': { title: 'Getting Started', description: 'Everything you need to know to set up your Munshi account for success.', icon: BookOpen },
    'bank-sync': { title: 'Bank Synchronization', description: 'Guides on connecting banks, troubleshooting feeds, and reconciliation.', icon: Database },
    'ai-ledger': { title: 'AI Ledger', description: 'Learn how our AI works and how to train it for better accuracy.', icon: Sparkles },
    'gst-tds': { title: 'GST & TDS', description: 'Compliance guides for Indian tax laws and filing procedures.', icon: FileText },
    'import-export': { title: 'Import / Export', description: 'Data migration tools and report generation.', icon: Upload },
    'settings': { title: 'Settings & Billing', description: 'Manage your organization, team members, and subscription.', icon: Settings },
    'multi-org': { title: 'Multi-Organization', description: 'Managing multiple businesses under one login.', icon: Users },
  };

  const currentCategory = category && categoryInfo[category] ? categoryInfo[category] : null;
  
  // If category doesn't exist, show 404
  if (!currentCategory) {
    notFound();
  }
  
  const CategoryIcon = currentCategory.icon;

  // Filter articles
  const articles = MOCK_ARTICLES.filter(article => {
    const matchesCategory = article.categorySlug === category;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PublicLayout>
      <div className="bg-gray-50 dark:bg-black py-16 px-6 border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto">
           <Link 
             href="/guide"
             className="flex items-center text-sm font-medium text-gray-500 hover:text-munshi-indigo dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
           >
             <ArrowLeft size={16} className="mr-2" /> Back to Guide
           </Link>
           
           <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-munshi-indigo dark:bg-white text-white dark:text-munshi-indigo flex items-center justify-center shrink-0 shadow-lg">
                 <CategoryIcon size={32} />
              </div>
              <div>
                 <h1 className="text-3xl md:text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">
                    {currentCategory.title}
                 </h1>
                 <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                    {currentCategory.description}
                 </p>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 min-h-[60vh]">
         {/* Search within category */}
         <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder={`Search in ${currentCategory.title}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm outline-none focus:ring-2 focus:ring-munshi-indigo focus:border-transparent text-munshi-text dark:text-white transition-all"
            />
         </div>

         {/* Article List */}
         <div className="space-y-6">
            {articles.length > 0 ? articles.map(article => (
              <Link 
                key={article.id}
                href={`/guide/${category}/${article.slug}`}
                className="block group bg-white dark:bg-munshi-dark-card border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-lg hover:border-munshi-indigo/30 dark:hover:border-zinc-600 transition-all cursor-pointer"
              >
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <h3 className="text-xl font-heading font-bold text-munshi-indigo dark:text-white group-hover:text-munshi-teal transition-colors">
                       {article.title}
                    </h3>
                    <div className="flex gap-2">
                       {article.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs rounded-md font-medium">
                             {tag}
                          </span>
                       ))}
                    </div>
                 </div>
                 
                 <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {article.excerpt}
                 </p>

                 <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-zinc-800">
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
                       <span className="flex items-center gap-1.5">
                          <User size={14} /> {article.author}
                       </span>
                       <span className="flex items-center gap-1.5">
                          <Calendar size={14} /> {article.date}
                       </span>
                       <span className="flex items-center gap-1.5">
                          <Clock size={14} /> {article.readTime}
                       </span>
                    </div>
                    <span className="text-munshi-teal font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                       Read Article <ArrowRight size={16} />
                    </span>
                 </div>
              </Link>
            )) : (
              <div className="text-center py-16">
                 <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Search size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
                 <p className="text-gray-500">Try searching for something else or browse other categories.</p>
                 <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); }}>
                    Clear Search
                 </Button>
              </div>
            )}
         </div>
      </div>
    </PublicLayout>
  );
}
