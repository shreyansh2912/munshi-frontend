'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button } from '@/components/ui/UI';
import { Download, FileText } from 'lucide-react';

export default function DownloadsPage() {
  const downloads = [
    { name: 'Monthly Report - November 2024', type: 'PDF', size: '2.4 MB', date: '2024-11-30' },
    { name: 'GST Returns - Q3 2024', type: 'ZIP', size: '5.1 MB', date: '2024-11-15' },
    { name: 'Invoice Summary - October', type: 'Excel', size: '890 KB', date: '2024-10-31' },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Downloads</h1>
        <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Access your generated reports and exports.</p>
      </div>

      <div className="space-y-4">
        {downloads.map((item, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-munshi-indigo/10 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-munshi-indigo dark:text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-munshi-text dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.type} • {item.size} • {item.date}</p>
                </div>
              </div>
              <Button variant="outline" size="sm"><Download size={16} className="mr-2"/> Download</Button>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
