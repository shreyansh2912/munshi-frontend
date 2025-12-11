'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Badge } from '@/components/ui/UI';
import { FileText, Upload, Download, Eye, Trash2, Search } from 'lucide-react';

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    { id: 1, name: 'Invoice_2024_001.pdf', type: 'Invoice', size: '245 KB', date: '2024-11-15', category: 'Financial' },
    { id: 2, name: 'GST_Return_Oct_2024.pdf', type: 'Tax', size: '1.2 MB', date: '2024-11-10', category: 'Compliance' },
    { id: 3, name: 'Bank_Statement_Nov.pdf', type: 'Statement', size: '890 KB', date: '2024-11-05', category: 'Banking' },
    { id: 4, name: 'Contract_Vendor_ABC.pdf', type: 'Contract', size: '456 KB', date: '2024-10-28', category: 'Legal' },
  ];

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Documents</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Store and manage all your business documents.</p>
        </div>
        <Button size="sm"><Upload size={16} className="mr-2"/> Upload Document</Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Documents', value: '124', color: 'blue' },
          { label: 'This Month', value: '18', color: 'green' },
          { label: 'Storage Used', value: '2.4 GB', color: 'purple' },
          { label: 'Categories', value: '8', color: 'orange' },
        ].map((item, i) => (
          <Card key={i} className="p-4">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">{item.label}</p>
            <h3 className="text-2xl font-bold dark:text-white">{item.value}</h3>
          </Card>
        ))}
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm outline-none text-munshi-text dark:text-gray-200"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
          {documents.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-munshi-text dark:text-white">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="neutral">{doc.category}</Badge>
                    <span className="text-xs text-gray-500">{doc.size}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{doc.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-munshi-indigo dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800">
                  <Eye size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-munshi-teal dark:hover:text-teal-400 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800">
                  <Download size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppLayout>
  );
}
