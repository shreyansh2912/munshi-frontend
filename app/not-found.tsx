'use client';

import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/UI';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden bg-munshi-white dark:bg-munshi-dark-bg transition-colors duration-200 py-20">
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-munshi-indigo/5 dark:bg-indigo-900/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-munshi-teal/5 dark:bg-teal-900/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
        </div>

        <div className="relative z-10 text-center px-6">
            {/* 404 Visual Block */}
            <div className="relative mb-10 inline-block">
                {/* Orbiting Ring - Outer */}
                <div className="absolute -inset-10 rounded-full border border-dashed border-munshi-indigo/20 dark:border-zinc-700 animate-spin-reverse opacity-60" style={{ animationDuration: '25s' }}></div>
                
                {/* Orbiting Ring - Inner */}
                <div className="absolute -inset-4 rounded-full border border-munshi-teal/20 dark:border-zinc-800 animate-spin" style={{ animationDuration: '15s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-munshi-teal rounded-full shadow-[0_0_8px_rgba(12,115,107,0.5)]"></div>
                </div>
                
                <h1 className="text-[140px] md:text-[200px] font-mono font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-munshi-indigo to-munshi-teal dark:from-white dark:to-zinc-600 select-none tracking-tighter drop-shadow-sm animate-fade-in-up">
                    404
                </h1>
                
                {/* Floating Particle */}
                <div className="absolute top-10 -right-6 w-4 h-4 bg-munshi-gold rounded-full blur-[1px] animate-float opacity-80"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Lost in the Ledger?
            </h2>
            <p className="text-lg text-munshi-subtext dark:text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                The page has wandered off the ledger. It might have been moved, deleted, or never existed in this fiscal year.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Link href="/dashboard">
                  <Button size="lg" className="shadow-lg shadow-munshi-indigo/20 w-full sm:w-auto">
                      <ArrowLeft size={18} className="mr-2" /> Return to Dashboard
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                      <Home size={18} className="mr-2" /> Back to Homepage
                  </Button>
                </Link>
            </div>
        </div>
      </div>
    </PublicLayout>
  );
}
