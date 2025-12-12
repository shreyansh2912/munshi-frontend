'use client';

import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button, Input, Card } from '@/components/ui/UI';
import { Mail, MapPin, Clock, Linkedin, Twitter, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <PublicLayout>
      <div className="py-20 px-6 bg-munshi-white dark:bg-munshi-dark-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">Get in Touch</h1>
             <p className="text-xl text-munshi-subtext dark:text-zinc-400">We're here to help with onboarding, support, and integrations.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
             <div className="lg:col-span-2">
                <Card className="p-8">
                   <h3 className="text-xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">Send us a message</h3>
                   <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                         <Input label="Name" placeholder="Your name" />
                         <Input label="Email" type="email" placeholder="you@company.com" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                         <Input label="Phone" placeholder="+91..." />
                         <div>
                            <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Inquiry Type</label>
                            <select className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none">
                               <option>Product Support</option>
                               <option>Sales & Enterprise</option>
                               <option>Billing</option>
                               <option>Partnership</option>
                            </select>
                         </div>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Message</label>
                         <textarea className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none h-40 resize-none" placeholder="How can we help you?"></textarea>
                      </div>
                      <Button size="lg">Send Message</Button>
                   </form>
                </Card>
             </div>

             <div className="space-y-8">
                <Card className="p-6 bg-munshi-indigo dark:bg-zinc-900 text-white">
                   <h3 className="font-bold text-lg mb-6">Contact Info</h3>
                   <div className="space-y-4">
                      <div className="flex items-start gap-4">
                         <MapPin className="text-munshi-teal shrink-0 mt-1" size={20} />
                         <div>
                            <p className="font-bold text-sm">Headquarters</p>
                            <p className="text-sm text-gray-300">1204, Tech Park One, SG Highway,<br/>Ahmedabad, Gujarat - 380054</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <Mail className="text-munshi-teal shrink-0 mt-1" size={20} />
                         <div>
                            <p className="font-bold text-sm">Email</p>
                            <p className="text-sm text-gray-300">support@munshi.app</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <Clock className="text-munshi-teal shrink-0 mt-1" size={20} />
                         <div>
                            <p className="font-bold text-sm">Support Hours</p>
                            <p className="text-sm text-gray-300">Mon - Fri, 9:00 AM - 7:00 PM IST</p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                      <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Linkedin size={18} /></button>
                      <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Twitter size={18} /></button>
                      <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><MessageCircle size={18} /></button>
                   </div>
                </Card>

                {/* Map Placeholder */}
                <div className="h-64 rounded-2xl bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-gray-400">
                   Map Embed
                </div>
             </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
