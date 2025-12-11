'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Input } from '@/components/ui/UI';
import { User, Building2, Bell, Shield, CreditCard, Users } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Settings</h1>
        <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Manage your account and preferences.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <Card className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-munshi-indigo/5 dark:bg-zinc-800 text-munshi-indigo dark:text-white'
                        : 'text-munshi-subtext dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card>
              <h2 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white mb-6">Profile Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-munshi-beige dark:bg-zinc-800 flex items-center justify-center text-munshi-indigo dark:text-white font-bold text-2xl">
                    RK
                  </div>
                  <div>
                    <Button size="sm" variant="outline">Change Photo</Button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="Rajesh" />
                  <Input label="Last Name" defaultValue="Kumar" />
                </div>

                <Input label="Email Address" type="email" defaultValue="rajesh@techspace.in" />
                <Input label="Phone Number" defaultValue="+91 9876543210" />

                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'organization' && (
            <Card>
              <h2 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white mb-6">Organization Settings</h2>
              <div className="space-y-6">
                <Input label="Organization Name" defaultValue="TechSpace India Pvt Ltd" />
                <Input label="GSTIN" defaultValue="24AAAAA0000A1Z5" />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="PAN" defaultValue="AAAAA0000A" />
                  <Input label="CIN" defaultValue="U12345MH2020PTC123456" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Registered Address</label>
                  <textarea 
                    className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none resize-none h-24"
                    defaultValue="123 Business Park, Ahmedabad, Gujarat - 380001"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <Button>Update Organization</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <h2 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                {[
                  { title: 'Invoice Payments', desc: 'Get notified when invoices are paid' },
                  { title: 'GST Filing Reminders', desc: 'Receive reminders for GST filing deadlines' },
                  { title: 'Bank Sync Updates', desc: 'Notifications when bank accounts sync' },
                  { title: 'Team Activity', desc: 'Updates on team member actions' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-zinc-800 last:border-0">
                    <div>
                      <p className="font-medium text-munshi-text dark:text-white">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-munshi-teal"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <h2 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-munshi-text dark:text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-munshi-text dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable 2FA</Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <Button>Update Password</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'billing' && (
            <Card>
              <h2 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white mb-6">Billing & Subscription</h2>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-munshi-indigo to-munshi-teal rounded-xl text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm opacity-90">Current Plan</p>
                      <h3 className="text-2xl font-bold mt-1">Pro Plan</h3>
                    </div>
                    <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">Upgrade</Button>
                  </div>
                  <p className="text-sm opacity-90">₹999/month • Renews on Jan 15, 2024</p>
                </div>

                <div>
                  <h3 className="font-medium text-munshi-text dark:text-white mb-4">Payment Method</h3>
                  <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium text-munshi-text dark:text-white">•••• 4589</p>
                        <p className="text-xs text-gray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Update</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'team' && (
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white">Team Members</h2>
                <Button size="sm">Invite Member</Button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Rajesh Kumar', email: 'rajesh@techspace.in', role: 'Admin', status: 'Active' },
                  { name: 'Sarah Williams', email: 'sarah@techspace.in', role: 'Member', status: 'Active' },
                  { name: 'Vikram Singh', email: 'vikram@techspace.in', role: 'Viewer', status: 'Pending' },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-100 dark:border-zinc-800 rounded-lg hover:border-munshi-indigo/30 dark:hover:border-zinc-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-munshi-indigo/10 dark:bg-zinc-800 flex items-center justify-center text-munshi-indigo dark:text-white font-bold text-sm">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-munshi-text dark:text-white">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{member.role}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${member.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'}`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
