'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button, Input, Card } from '@/components/ui/UI';
import { Check, ShieldCheck, Video, Clock } from 'lucide-react';

export default function BookDemoPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PublicLayout>
      <div className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-munshi-dark-bg dark:to-black">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Content */}
          <div className="flex-1 space-y-8">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-munshi-gold/10 text-munshi-gold text-xs font-bold uppercase tracking-wide mb-4 border border-munshi-gold/20">
                  <Video size={14} /> Live Walkthrough
               </div>
               <h1 className="text-4xl md:text-5xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
                 Book a Live Munshi Demo
               </h1>
               <p className="text-lg text-munshi-subtext dark:text-zinc-400 leading-relaxed">
                 See how AI eliminates bookkeeping work in minutes. Join 10,000+ businesses automating their financial workflows.
               </p>
            </div>

            <div className="grid gap-6">
               {[
                 { title: 'Zero Spam Promise', desc: 'We value your privacy. Your contact info is safe.', icon: ShieldCheck },
                 { title: 'Expert-Guided', desc: 'Chat with a real product specialist, not a bot.', icon: Video },
                 { title: '30-Min Session', desc: 'Concise, high-impact overview of key features.', icon: Clock }
               ].map((item, i) => (
                 <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-munshi-indigo/5 dark:bg-zinc-800 flex items-center justify-center text-munshi-indigo dark:text-white shrink-0">
                       <item.icon size={20} />
                    </div>
                    <div>
                       <h3 className="font-bold text-munshi-indigo dark:text-white">{item.title}</h3>
                       <p className="text-sm text-munshi-subtext dark:text-zinc-500">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="p-6 bg-munshi-indigo dark:bg-zinc-900 rounded-2xl text-white mt-8">
              <p className="italic text-sm text-gray-300 mb-4">"The demo opened my eyes. I didn't realize how much time I was wasting on manual entry until I saw Munshi in action."</p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">RJ</div>
                 <div>
                    <p className="text-xs font-bold">Ravi Jain</p>
                    <p className="text-[10px] text-gray-400">Founder, Jain Exports</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1 w-full max-w-lg">
            <Card className="p-8 shadow-2xl shadow-munshi-indigo/10 dark:shadow-none border-t-4 border-t-munshi-gold">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">Schedule Your Session</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Full Name" placeholder="Rajesh Kumar" required />
                    <Input label="Phone" placeholder="+91 98765..." required />
                  </div>
                  
                  <Input label="Work Email" type="email" placeholder="rajesh@company.com" required />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Business Name" placeholder="Acme Corp" required />
                     <div>
                      <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Business Size</label>
                      <select className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none focus:border-munshi-indigo">
                        <option>1-10 Employees</option>
                        <option>11-50 Employees</option>
                        <option>50-200 Employees</option>
                        <option>200+ Employees</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input label="City" placeholder="Mumbai" required />
                    <Input label="Preferred Time" type="datetime-local" required />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="whatsapp" className="rounded border-gray-300 text-munshi-indigo focus:ring-munshi-indigo" />
                    <label htmlFor="whatsapp" className="text-sm text-gray-600 dark:text-gray-400">Receive confirmation via WhatsApp</label>
                  </div>

                  <Button className="w-full py-3 text-lg" size="lg">Book Demo</Button>
                </form>
              ) : (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={40} />
                   </div>
                   <h3 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">You're Booked!</h3>
                   <p className="text-gray-600 dark:text-gray-400 mb-8">
                     We've sent a calendar invitation to your email. A Munshi specialist will call you at the selected time.
                   </p>
                   <Button variant="outline" onClick={() => window.location.href = '/'}>Back to Home</Button>
                </div>
              )}
            </Card>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
