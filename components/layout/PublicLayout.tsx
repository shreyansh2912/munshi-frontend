'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/UI';
import { Menu, X } from 'lucide-react';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', path: '/' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Guide', path: '/guide' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg font-sans selection:bg-munshi-indigo selection:text-white transition-colors duration-200">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
             <Logo variant="full" size="md" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                href={link.path}
                className={`text-sm font-medium hover:text-munshi-indigo dark:hover:text-white transition-colors ${pathname === link.path ? 'text-munshi-indigo dark:text-white' : 'text-munshi-subtext dark:text-zinc-400'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-4 w-px bg-gray-300 dark:bg-zinc-700"></div>
            <Link href="/login" className="text-sm font-medium text-munshi-indigo dark:text-white hover:text-munshi-teal">Log In</Link>
            <Link href="/book-demo"><Button size="sm">Book Demo</Button></Link>
          </div>

          <button className="md:hidden text-gray-600 dark:text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 p-6 flex flex-col gap-4 animate-fade-in-up">
             {navLinks.map(link => (
               <Link key={link.path} href={link.path} className="text-left py-2 font-medium text-gray-700 dark:text-gray-200">{link.label}</Link>
             ))}
             <Link href="/login" className="text-left py-2 font-medium text-munshi-indigo dark:text-indigo-400">Log In</Link>
             <Link href="/book-demo"><Button className="w-full">Book Demo</Button></Link>
          </div>
        )}
      </nav>

      <div className="pt-20">
        {children}
      </div>

      <footer className="bg-munshi-indigo dark:bg-munshi-dark-card text-white py-12 border-t border-white/10 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="mb-6">
               <Logo variant="full" size="md" lightMode />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering Indian businesses with intelligence, clarity, and control.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/guide" className="hover:text-white">Guide</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-heading font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 dark:border-zinc-800 text-center text-sm text-gray-500">
          © 2024 Munshi Financial Technologies Pvt Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
