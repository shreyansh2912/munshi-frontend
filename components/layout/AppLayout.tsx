'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  Bell, Search, Sparkles, Moon, Sun, ChevronDown, Check, Plus, Building2, Menu
} from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { useOrganizationsStore } from '@/lib/stores';
import { Button, Input, Modal } from '@/components/ui/UI';
import { Logo } from '@/components/ui/Logo';

const Sidebar: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentOrg, organizations, setCurrentOrganization, createOrganization, fetchOrganizations } = useOrganizationsStore();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');

  // Fetch organizations on mount
  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const handleCreateOrg = async () => {
    if (newOrgName.trim()) {
      await createOrganization(newOrgName);
      setNewOrgName('');
      setIsCreateModalOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        ></div>
      )}

      <div className={`
        w-64 bg-white dark:bg-munshi-dark-card border-r border-gray-100 dark:border-munshi-dark-border h-screen flex flex-col fixed left-0 top-0 z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="p-6 pb-2">
            <Logo variant="full" size="md" />
        </div>

        {/* Organization Switcher Header */}
        <div className="px-4 py-2">
          <div 
            className="w-full flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-zinc-900/50 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors border border-gray-100 dark:border-zinc-800"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-munshi-indigo dark:bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                 {currentOrg?.name?.charAt(0) || 'O'}
              </div>
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-sm font-bold text-munshi-indigo dark:text-gray-100 truncate w-32">{currentOrg?.name || 'Loading...'}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">{currentOrg?.plan || 'free'} Plan</span>
              </div>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-20 left-4 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-700 overflow-hidden z-50 animate-fade-in-up" style={{ animationDuration: '0.1s' }}>
              <div className="p-2 border-b border-gray-50 dark:border-zinc-800">
                <p className="text-xs font-medium text-gray-400 px-2 py-1">Your Organizations</p>
                {organizations.map(org => (
                  <button 
                    key={org.id}
                    onClick={() => {
                      setCurrentOrganization(org);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 text-munshi-text dark:text-gray-200"
                  >
                    <div className="flex items-center gap-2">
                       <Building2 size={14} className="text-gray-400"/>
                       <span className="truncate w-32 text-left">{org.name}</span>
                    </div>
                    {currentOrg?.id === org.id && <Check size={14} className="text-munshi-teal" />}
                  </button>
                ))}
              </div>
              <div className="p-2">
                <button 
                  onClick={() => {
                    setIsCreateModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-2 text-sm text-munshi-indigo dark:text-indigo-400 font-medium rounded-lg hover:bg-munshi-indigo/5 dark:hover:bg-indigo-900/20"
                >
                  <Plus size={14} /> Create Organization
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 mt-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-munshi-indigo/5 dark:bg-zinc-800 text-munshi-indigo dark:text-white' 
                    : 'text-munshi-subtext dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-munshi-text dark:hover:text-gray-200'
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* AI Widget */}
        <div className="p-4 border-t border-gray-100 dark:border-munshi-dark-border">
          <div className="bg-gradient-to-br from-munshi-indigo to-munshi-teal dark:from-zinc-900 dark:to-zinc-800 border border-transparent dark:border-zinc-700 p-4 rounded-xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-munshi-gold" />
              <span className="text-xs font-bold uppercase tracking-wider text-munshi-gold">Munshi AI</span>
            </div>
            <p className="text-xs opacity-90 mb-3 text-gray-100 dark:text-zinc-300">GST filing is due in 3 days. Your report is 90% ready.</p>
            <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md w-full transition-colors text-white">
              View Report
            </button>
          </div>
        </div>
      </div>

      {/* Create Org Modal */}
      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Organization"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateOrg}>Create Organization</Button>
          </>
        }
      >
        <div className="space-y-4">
           <p className="text-sm text-gray-500 dark:text-gray-400">
             Create a new workspace for your business. You can invite team members after creation.
           </p>
           <Input 
             label="Organization Name" 
             placeholder="e.g. Acme Corp" 
             value={newOrgName}
             onChange={(e) => setNewOrgName(e.target.value)}
             autoFocus
           />
        </div>
      </Modal>
    </>
  );
};

const TopBar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border fixed top-0 right-0 left-0 lg:left-64 z-10 px-4 lg:px-8 flex items-center justify-between transition-all duration-200">
      <div className="flex items-center gap-4 w-full lg:w-96">
        <button onClick={onMenuClick} className="lg:hidden text-gray-500 dark:text-gray-400">
          <Menu size={24} />
        </button>
        <div className="lg:hidden">
          <Logo variant="icon" size="sm" />
        </div>
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" size={16} />
          <input 
            type="text" 
            placeholder="Ask Munshi or search..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black border border-transparent focus:bg-white dark:focus:bg-zinc-900 focus:border-munshi-indigo/20 dark:focus:border-zinc-700 rounded-lg text-sm transition-all outline-none text-munshi-text dark:text-gray-200 dark:placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {mounted && (
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-400 hover:text-munshi-indigo dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        )}

        <button className="relative p-2 text-gray-400 hover:text-munshi-indigo dark:hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-black"></span>
        </button>
        <div className="h-8 w-px bg-gray-200 dark:bg-zinc-800 mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/settings')}>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-munshi-text dark:text-gray-200">Rajesh Kumar</p>
            <p className="text-xs text-gray-500 dark:text-zinc-500">TechSpace India</p>
          </div>
          <div className="w-9 h-9 bg-munshi-beige dark:bg-zinc-800 rounded-full flex items-center justify-center text-munshi-indigo dark:text-white font-bold text-sm">
            RK
          </div>
        </div>
      </div>
    </header>
  );
};

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg font-sans bg-ledger-pattern dark:bg-ledger-pattern-dark transition-colors duration-200">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
      <main className="lg:ml-64 pt-16 min-h-screen transition-all duration-200">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
