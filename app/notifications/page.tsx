'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Badge } from '@/components/ui/UI';
import { Bell, Check } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: 'Invoice Payment Received', desc: 'Payment of ₹1,25,000 received from Zephyr Inc', time: '2 hours ago', read: false, type: 'success' },
    { id: 2, title: 'GST Filing Due Soon', desc: 'GSTR-3B for November is due in 3 days', time: '5 hours ago', read: false, type: 'warning' },
    { id: 3, title: 'Bank Account Synced', desc: 'HDFC Bank account synced successfully', time: '1 day ago', read: true, type: 'info' },
    { id: 4, title: 'Low Stock Alert', desc: 'Office Chair - Ergonomic is running low on stock', time: '2 days ago', read: true, type: 'warning' },
  ];

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Notifications</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Stay updated with important alerts and updates.</p>
        </div>
        <button className="text-sm text-munshi-teal hover:text-munshi-indigo dark:text-teal-400">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`p-6 ${!notif.read ? 'border-l-4 border-l-munshi-indigo' : ''}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                notif.type === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                notif.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
              }`}>
                <Bell size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-munshi-text dark:text-white">{notif.title}</h3>
                  {!notif.read && <div className="w-2 h-2 bg-munshi-indigo rounded-full"></div>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notif.desc}</p>
                <span className="text-xs text-gray-500">{notif.time}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
