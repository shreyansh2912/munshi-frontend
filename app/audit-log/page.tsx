'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/UI';
import { Activity, Clock, User } from 'lucide-react';

export default function AuditLogPage() {
  const logs = [
    { id: 1, action: 'Invoice Created', user: 'Rajesh Kumar', details: 'Created invoice INV-004 for ₹1,25,000', time: '2 hours ago', type: 'create' },
    { id: 2, action: 'Customer Updated', user: 'Sarah Williams', details: 'Updated customer details for Zephyr Inc', time: '5 hours ago', type: 'update' },
    { id: 3, action: 'Bank Sync', user: 'System', details: 'Synced HDFC Bank account', time: '1 day ago', type: 'system' },
    { id: 4, action: 'User Login', user: 'Rajesh Kumar', details: 'Logged in from 103.45.67.89', time: '2 days ago', type: 'auth' },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Audit Log</h1>
        <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Track all activities and changes in your account.</p>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <Card key={log.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                log.type === 'create' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                log.type === 'update' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                log.type === 'system' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
              }`}>
                <Activity size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-munshi-text dark:text-white mb-1">{log.action}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{log.details}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><User size={12} /> {log.user}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {log.time}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
