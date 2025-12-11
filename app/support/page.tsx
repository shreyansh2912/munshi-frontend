'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Input } from '@/components/ui/UI';
import { MessageCircle, Book, Mail, Phone } from 'lucide-react';

export default function SupportPage() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Support</h1>
        <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Get help and find answers to your questions.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white mb-4">Contact Support</h2>
          <form className="space-y-4">
            <Input label="Subject" placeholder="How can we help?" />
            <div>
              <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-2">Message</label>
              <textarea 
                className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none resize-none h-32"
                placeholder="Describe your issue..."
              ></textarea>
            </div>
            <Button className="w-full">Submit Ticket</Button>
          </form>
        </Card>

        <div className="space-y-6">
          {[
            { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our support team', action: 'Start Chat', color: 'blue' },
            { icon: Book, title: 'Documentation', desc: 'Browse our help articles', action: 'View Docs', color: 'purple' },
            { icon: Mail, title: 'Email Support', desc: 'support@munshi.ai', action: 'Send Email', color: 'green' },
            { icon: Phone, title: 'Phone Support', desc: '+91 123 456 7890', action: 'Call Now', color: 'orange' },
          ].map((item, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-${item.color}-100 dark:bg-${item.color}-900/20 rounded-xl flex items-center justify-center`}>
                  <item.icon size={24} className={`text-${item.color}-600 dark:text-${item.color}-400`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-munshi-text dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
                <Button variant="outline" size="sm">{item.action}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
