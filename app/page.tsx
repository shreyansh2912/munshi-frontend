'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button, Card, Badge, AISuggestionBox } from '@/components/ui/UI';
import { 
  Sparkles, ShieldCheck, ArrowRight, BarChart3, Activity, 
  LayoutDashboard, BookOpenText, Landmark, FileText, Check, Star,
  Search, Bell, ArrowUpRight, ArrowDownRight, MoreHorizontal, Settings, Calculator, Menu, X,
  CheckCircle2, XCircle, Zap, Users, Lock, Server, BrainCircuit, FileSpreadsheet, 
  Smartphone, IndianRupee, HelpCircle, ChevronDown, ChevronUp, RefreshCw, Database, Moon, Sun
} from 'lucide-react';
import { PricingSection } from '@/components/sections/PricingSection';
import { NAV_LINKS } from '@/lib/constants';
import { RevenueChart, ExpenseBarChart } from '@/components/charts/Charts';
import { Logo } from '@/components/ui/Logo';

// Helper Components
const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col items-center justify-center p-4 md:border-r border-gray-100 dark:border-zinc-800 last:border-0">
    <span className="text-2xl md:text-3xl font-mono font-bold text-munshi-indigo dark:text-white mb-1">{value}</span>
    <span className="text-xs text-munshi-subtext dark:text-zinc-500 uppercase tracking-wide font-medium">{label}</span>
  </div>
);

const HowItWorksStep = ({ number, title, desc, icon: Icon }: any) => (
  <div className="relative flex flex-col items-center text-center group">
    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg shadow-munshi-indigo/5 dark:shadow-none flex items-center justify-center text-munshi-blue dark:text-blue-400 mb-6 relative z-10 border border-gray-50 dark:border-zinc-700 group-hover:scale-110 transition-transform duration-300">
      <Icon size={32} strokeWidth={1.5} />
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-munshi-gold text-white flex items-center justify-center font-bold text-sm shadow-sm border-2 border-white dark:border-zinc-900">
        {number}
      </div>
    </div>
    <h3 className="text-lg font-heading font-bold text-munshi-indigo dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-munshi-subtext dark:text-zinc-400 leading-relaxed max-w-xs">{desc}</p>
    
    {number !== 3 && (
      <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-800 to-transparent -z-0"></div>
    )}
  </div>
);

const ComparisonRow = ({ feature, manual, munshi }: any) => (
  <div className="grid grid-cols-3 py-5 border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors px-4 rounded-lg items-center">
    <div className="font-medium text-munshi-subtext dark:text-zinc-300 text-sm md:text-base">{feature}</div>
    <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-500 text-sm">
      <XCircle size={16} className="text-red-400 shrink-0" /> 
      <span className="hidden sm:inline">{manual}</span>
    </div>
    <div className="flex items-center gap-2 text-munshi-indigo dark:text-blue-400 font-bold text-sm">
      <CheckCircle2 size={16} className="text-munshi-teal shrink-0" /> 
      <span>{munshi}</span>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-zinc-800 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-4 text-left focus:outline-none group">
        <span className={`font-medium transition-colors ${isOpen ? 'text-munshi-indigo dark:text-white' : 'text-munshi-subtext dark:text-gray-400 group-hover:text-munshi-indigo dark:group-hover:text-gray-200'}`}>{question}</span>
        {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {isOpen && <div className="pb-4 text-sm text-munshi-subtext dark:text-zinc-400 leading-relaxed animate-fade-in-up" style={{ animationDuration: '0.2s' }}>{answer}</div>}
    </div>
  );
};

const TESTIMONIALS = [
  { name: "Rahul Sharma", company: "TechFlow Systems", text: "Munshi's AI categorization saved us 20 hours a week. The GST filing is practically automatic now." },
  { name: "Priya Patel", company: "GreenLeaf Designs", text: "The interface is so calm and intuitive. I actually enjoy looking at my finances for the first time." },
  { name: "Vikram Singh", company: "Urban logistics", text: "Bank reconciliation used to be a nightmare. Munshi handles it in seconds." },
  { name: "Anjali Gupta", company: "Creative Studios", text: "Best accounting software for Indian SMEs hands down. Support is fantastic." },
  { name: "Arjun Reddy", company: "Reddy Constructions", text: "The cashflow forecasting helped us survive a tough quarter. Invaluable insights." },
  { name: "Sneha Nair", company: "Nair Consulting", text: "I love the dark mode! It's clear Munshi cares about design and user experience." },
  { name: "Mohammed Ali", company: "Ali Exports", text: "Multi-currency support and GST compliance in one place. A game changer." },
  { name: "Kavita Rao", company: "Rao & Sons", text: "The document extraction feature is magic. Just upload and done." },
  { name: "Suresh Menon", company: "Kerala Spices", text: "Clean, fast, and accurate. Exactly what a business owner needs." },
];

const TestimonialColumn: React.FC<{ testimonials: typeof TESTIMONIALS, direction: 'up' | 'down', duration?: string }> = ({ testimonials, direction, duration = '40s' }) => (
  <div className="relative h-[600px] overflow-hidden mask-gradient">
    <div className={`absolute w-full space-y-6 ${direction === 'down' ? 'animate-scroll-down' : 'animate-scroll-up'}`} style={{ animationDuration: duration }}>
      {[...testimonials, ...testimonials].map((t, i) => (
        <div key={i} className="bg-white dark:bg-munshi-dark-card p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex text-munshi-gold mb-3">
            {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
          </div>
          <p className="text-munshi-subtext dark:text-zinc-300 text-sm mb-4 leading-relaxed">"{t.text}"</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-munshi-indigo/10 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-munshi-indigo dark:text-white">
              {t.name.charAt(0)}{t.name.split(' ')[1]?.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-munshi-text dark:text-white">{t.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">{t.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-munshi-white dark:from-munshi-dark-bg to-transparent z-10 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-munshi-white dark:from-munshi-dark-bg to-transparent z-10 pointer-events-none"></div>
  </div>
);

// Mock Dashboard Component
const MockDashboardVisual = () => {
  return (
    <div className="rounded-2xl bg-white dark:bg-munshi-dark-card shadow-2xl shadow-munshi-indigo/20 dark:shadow-none border border-gray-200 dark:border-munshi-dark-border overflow-hidden relative font-sans text-left h-[500px] md:h-[700px] flex select-none pointer-events-none">
      <div className="w-16 md:w-64 bg-white dark:bg-munshi-dark-card border-r border-gray-100 dark:border-munshi-dark-border flex flex-col flex-shrink-0 transition-all">
        <div className="p-4 md:p-6 flex items-center justify-center md:justify-start gap-2">
          <Logo variant="full" size="sm" className="hidden md:flex" />
          <Logo variant="icon" size="sm" className="md:hidden" />
        </div>

        <nav className="flex-1 px-2 md:px-4 space-y-1 mt-4">
          {NAV_LINKS.slice(0, 6).map((link, idx) => {
            const isActive = idx === 0;
            const Icon = link.icon;
            return (
              <div
                key={link.path}
                className={`flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-munshi-indigo/5 dark:bg-zinc-800 text-munshi-indigo dark:text-white' 
                    : 'text-munshi-subtext dark:text-zinc-400'
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span className="hidden md:inline">{link.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="p-2 md:p-4 border-t border-gray-100 dark:border-munshi-dark-border hidden md:block">
          <div className="bg-gradient-to-br from-munshi-indigo to-munshi-teal dark:from-zinc-900 dark:to-zinc-800 p-4 rounded-xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-munshi-gold" />
              <span className="text-xs font-bold uppercase tracking-wider text-munshi-gold">Munshi AI</span>
            </div>
            <p className="text-xs opacity-90 mb-3 text-gray-100">GST filing is due in 3 days. Your report is 90% ready.</p>
            <div className="text-xs bg-white/20 px-3 py-1.5 rounded-md w-full text-center text-white">
              View Report
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-munshi-white dark:bg-munshi-dark-bg bg-ledger-pattern dark:bg-ledger-pattern-dark flex flex-col min-w-0">
        <header className="h-16 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <div className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black border border-transparent rounded-lg text-sm text-gray-400 whitespace-nowrap overflow-hidden">
                Ask Munshi or search...
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative p-2 text-gray-400">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-black"></span>
            </div>
            <div className="h-8 w-px bg-gray-200 dark:bg-zinc-800 mx-1 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-munshi-text dark:text-gray-200">Rajesh Kumar</p>
                <p className="text-xs text-gray-500">TechSpace India</p>
              </div>
              <div className="w-9 h-9 bg-munshi-beige dark:bg-zinc-800 rounded-full flex items-center justify-center text-munshi-indigo dark:text-white font-bold text-sm">
                RK
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 overflow-y-auto no-scrollbar">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Dashboard</h1>
              <p className="text-munshi-subtext dark:text-zinc-400 text-sm mt-1">Good morning, Rajesh. Here's your financial pulse.</p>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" size="sm" className="hidden sm:flex">Report</Button>
                <Button size="sm">New Transaction</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-medium text-munshi-subtext dark:text-zinc-400">Total Revenue</p>
                  <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400">
                    <ArrowUpRight size={14} className="mr-1" />
                    +12.5%
                  </div>
                </div>
                <h3 className="text-3xl font-mono font-medium text-munshi-indigo dark:text-gray-100 mb-1">₹24,50,000</h3>
                <p className="text-xs text-gray-400 dark:text-zinc-500">vs last month</p>
              </Card>
              <Card className="p-6 hidden md:block">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-medium text-munshi-subtext dark:text-zinc-400">Total Expenses</p>
                  <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                    <ArrowDownRight size={14} className="mr-1" />
                    +4.2%
                  </div>
                </div>
                <h3 className="text-3xl font-mono font-medium text-munshi-indigo dark:text-gray-100 mb-1">₹8,20,400</h3>
                <p className="text-xs text-gray-400 dark:text-zinc-500">vs last month</p>
              </Card>
              <Card className="p-6 hidden md:block">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-medium text-munshi-subtext dark:text-zinc-400">Net Profit</p>
                  <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400">
                    <ArrowUpRight size={14} className="mr-1" />
                    +18.2%
                  </div>
                </div>
                <h3 className="text-3xl font-mono font-medium text-munshi-indigo dark:text-gray-100 mb-1">₹16,29,600</h3>
                <p className="text-xs text-gray-400 dark:text-zinc-500">vs last month</p>
              </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="col-span-2 space-y-8">
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-gray-200">Cashflow Overview</h3>
                    <div className="text-sm text-gray-500 bg-gray-50 dark:bg-zinc-900 px-3 py-1 rounded-lg">Last 30 Days</div>
                  </div>
                  <RevenueChart />
                </Card>
             </div>
             <div className="space-y-8 hidden lg:block">
                <Card className="p-6 bg-munshi-indigo dark:bg-zinc-900 text-white">
                   <div className="flex justify-between items-start mb-4">
                      <h3 className="font-heading font-semibold">Expense Breakdown</h3>
                      <MoreHorizontal size={16} className="text-white/50" />
                   </div>
                   <ExpenseBarChart />
                </Card>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg font-sans selection:bg-munshi-indigo selection:text-white transition-colors duration-200 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
             <Logo variant="full" size="md" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-munshi-subtext dark:text-zinc-400 hover:text-munshi-indigo dark:hover:text-white">Features</Link>
            <Link href="/pricing" className="text-sm font-medium text-munshi-subtext dark:text-zinc-400 hover:text-munshi-indigo dark:hover:text-white">Pricing</Link>
            <div className="h-4 w-px bg-gray-300 dark:bg-zinc-700"></div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-zinc-400" /> : <Moon size={18} className="text-gray-600" />}
            </button>
            <Link href="/login" className="text-sm font-medium text-munshi-indigo dark:text-white hover:text-munshi-teal">Log In</Link>
            <Link href="/book-demo"><Button size="sm" variant="outline" className="hidden lg:flex">Book Demo</Button></Link>
            <Link href="/signup"><Button size="sm">Get Started Free</Button></Link>
          </div>

          <button className="md:hidden text-gray-600 dark:text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 p-6 flex flex-col gap-4 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
             <Link href="/" className="text-left py-2 font-medium text-gray-700 dark:text-gray-200">Features</Link>
             <Link href="/pricing" className="text-left py-2 font-medium text-gray-700 dark:text-gray-200">Pricing</Link>
             <button
               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
               className="flex items-center gap-2 text-left py-2 font-medium text-gray-700 dark:text-gray-200"
             >
               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
               {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
             </button>
             <Link href="/login" className="text-left py-2 font-medium text-munshi-indigo dark:text-indigo-400">Log In</Link>
             <Link href="/book-demo"><Button className="w-full" variant="outline">Book Demo</Button></Link>
             <Link href="/signup"><Button className="w-full">Get Started Free</Button></Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pb-20 px-6 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-munshi-beige/20 to-transparent pointer-events-none dark:opacity-5"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-munshi-indigo/5 dark:bg-zinc-800 border border-munshi-indigo/10 dark:border-zinc-700 text-munshi-indigo dark:text-zinc-300 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-munshi-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-munshi-teal"></span>
            </span>
            Munshi AI v2.0 is live
          </div>
          
          <h1 className="text-4xl md:text-7xl font-heading font-bold text-munshi-indigo dark:text-white mb-6 tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Accounting that <span className="text-transparent bg-clip-text bg-gradient-to-r from-munshi-teal to-munshi-mint block md:inline">thinks.</span>
          </h1>
          <p className="text-lg md:text-xl text-munshi-subtext dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Munshi is your intelligent financial mind. Automate bookkeeping, reconcile banks instantly, and file GST with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up px-6" style={{ animationDelay: '0.3s' }}>
            <Link href="/signup"><Button size="lg" className="w-full sm:w-auto shadow-lg shadow-munshi-indigo/20 hover:shadow-xl hover:scale-105 transition-all">Start Free Trial</Button></Link>
            <Link href="/book-demo"><Button size="lg" variant="outline" className="w-full sm:w-auto group">
              Book Live Demo
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button></Link>
          </div>

          <div className="mt-16 md:mt-20 mx-auto max-w-6xl animate-float px-2 md:px-0">
            <MockDashboardVisual />
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="bg-white dark:bg-munshi-dark-bg border-y border-gray-100 dark:border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
           <StatItem label="Active SMEs" value="500+" />
           <StatItem label="Txns Automated" value="10k+" />
           <StatItem label="Processed Volume" value="₹50Cr+" />
           <StatItem label="GST Compliant" value="100%" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-munshi-white dark:bg-munshi-dark-bg">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white mb-16">How Munshi Works</h2>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
             <HowItWorksStep 
               number={1} 
               title="Connect & Import" 
               desc="Securely link your bank accounts or simply drag-and-drop your statements."
               icon={Landmark}
             />
             <HowItWorksStep 
               number={2} 
               title="AI Categorization" 
               desc="Our engine automatically tags 95% of transactions to the right ledger heads."
               icon={BrainCircuit}
             />
             <HowItWorksStep 
               number={3} 
               title="Instant Reports" 
               desc="Generate GST-ready reports, P&L, and balance sheets with a single click."
               icon={FileText}
             />
          </div>
          <div className="mt-16">
             <Link href="/signup"><Button variant="ghost">See full workflow <ArrowRight size={16} className="ml-2" /></Button></Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-munshi-dark-card border-y border-gray-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Core Capabilities</h2>
            <p className="text-munshi-subtext dark:text-zinc-400 max-w-2xl mx-auto">Compliance, categorization, and clarity baked into every pixel.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Automated GST', desc: 'Auto-calculates liabilities and prepares JSON reports for upload.', icon: ShieldCheck },
              { title: 'Smart Ledger', desc: 'AI categorizes 95% of transactions without human intervention.', icon: BarChart3 },
              { title: 'Cashflow Forecast', desc: 'Predictive analytics to help you manage working capital.', icon: Activity },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-black hover:shadow-xl hover:shadow-munshi-indigo/5 dark:hover:shadow-none transition-all border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 group">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-munshi-indigo dark:text-white mb-6 group-hover:scale-110 transition-transform">
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-munshi-indigo dark:text-white mb-3">{f.title}</h3>
                <p className="text-munshi-subtext dark:text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Superpowers */}
      <section className="py-24 bg-munshi-white dark:bg-munshi-dark-bg">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-munshi-teal/10 text-munshi-teal dark:text-teal-400 text-xs font-bold uppercase tracking-wide">
                    <Sparkles size={14} /> Munshi Intelligence
                 </div>
                 <h2 className="text-3xl md:text-5xl font-heading font-bold text-munshi-indigo dark:text-white leading-tight">
                    AI that works like your <span className="text-transparent bg-clip-text bg-gradient-to-r from-munshi-indigo to-munshi-blue dark:from-white dark:to-gray-400">best accountant.</span>
                 </h2>
                 <p className="text-lg text-munshi-subtext dark:text-zinc-400 leading-relaxed">
                    Stop manually tagging "Uber" as "Travel" for the 100th time. Munshi learns your business context and handles the grunt work.
                 </p>
                 <ul className="space-y-4 mt-4">
                    {[
                      'Anomaly detection for unusual expenses', 
                      'Document-to-Ledger OCR extraction', 
                      'Smart tax-saving suggestions'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                           <Check size={14} strokeWidth={3} />
                         </div>
                         <span className="text-munshi-text dark:text-gray-200 font-medium">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="flex-1 w-full">
                 <div className="relative bg-white dark:bg-munshi-dark-card rounded-2xl p-6 shadow-2xl shadow-munshi-indigo/10 dark:shadow-none border border-gray-100 dark:border-zinc-800">
                    <AISuggestionBox 
                       title="Recurring Payment Detected"
                       description="We noticed a monthly payment of ₹3,200 to 'AWS'. Should we set this as a recurring 'Software Subscription' expense?"
                       actionLabel="Yes, Automate This"
                       onAction={() => {}}
                    />
                    <div className="mt-4 p-4 rounded-xl border border-dashed border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-400 uppercase">Ledger Preview</span>
                          <Badge variant="success">98% Confidence</Badge>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-munshi-indigo dark:text-white font-medium">AWS Cloud Services</span>
                          <span className="text-munshi-subtext dark:text-zinc-400">→ IT & Software</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Comparison Strip */}
      <section className="py-24 bg-white dark:bg-munshi-dark-card border-y border-gray-100 dark:border-zinc-800">
         <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white">Why Munshi is Different</h2>
               <p className="text-munshi-subtext dark:text-zinc-400">Move beyond spreadsheets and legacy software.</p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-2">
               <div className="grid grid-cols-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                  <div>Feature</div>
                  <div>Manual / Legacy</div>
                  <div className="text-munshi-indigo dark:text-white">Munshi AI</div>
               </div>
               <ComparisonRow feature="Data Entry" manual="Hours of typing" munshi="Zero touch (AI)" />
               <ComparisonRow feature="Reconciliation" manual="Monthly headache" munshi="Real-time sync" />
               <ComparisonRow feature="GST Reports" manual="Wait for CA" munshi="Instant Download" />
               <ComparisonRow feature="Document Storage" manual="Physical files" munshi="Digital & Searchable" />
               <ComparisonRow feature="Insights" manual="Reactive" munshi="Proactive" />
            </div>
         </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-20 bg-munshi-white dark:bg-munshi-dark-bg">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-8">Works with your ecosystem</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
               {['HDFC Bank', 'ICICI Bank', 'SBI Corporate', 'Razorpay', 'Zoho', 'Tally Prime', 'Excel'].map((brand, i) => (
                  <div key={i} className="px-6 py-3 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-700 font-bold text-munshi-indigo dark:text-gray-300 flex items-center gap-2">
                     <Database size={16} className="text-munshi-teal" /> {brand}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Security Section */}
      <section className="py-24 bg-munshi-indigo dark:bg-black text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                     <ShieldCheck size={32} className="text-munshi-teal" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold mb-6">Bank-Grade Security</h2>
                  <p className="text-blue-100 text-lg leading-relaxed mb-8">
                     Your financial data is sensitive. We treat it that way. Munshi uses 256-bit encryption and adheres to global security standards.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="flex items-center gap-3">
                        <Lock size={20} className="text-munshi-teal" />
                        <span className="font-medium text-sm">End-to-End Encryption</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Server size={20} className="text-munshi-teal" />
                        <span className="font-medium text-sm">Secure AWS Infrastructure</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-munshi-teal" />
                        <span className="font-medium text-sm">ISO 27001 Ready</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Database size={20} className="text-munshi-teal" />
                        <span className="font-medium text-sm">Daily Automated Backups</span>
                     </div>
                  </div>
               </div>
               <div className="flex-1 flex justify-center">
                  <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 max-w-sm w-full">
                     <div className="flex items-center justify-center mb-6">
                        <ShieldCheck size={80} className="text-munshi-teal opacity-80" strokeWidth={1} />
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-mono font-bold text-white mb-2">100%</div>
                        <div className="text-sm text-blue-200">Data Integrity</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Made for India */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-900/10 dark:to-green-900/10 border-y border-gray-100 dark:border-zinc-800">
         <div className="max-w-4xl mx-auto px-6 text-center">
             <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white dark:bg-zinc-800 rounded-full shadow-sm text-xs font-bold text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="w-2 h-2 rounded-full bg-white border border-gray-200"></span>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Made for India
             </div>
             <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">Engineered for Indian Compliances</h2>
             <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                 {['GST Ready', 'TDS Calculations', 'HSN/SAC Codes', 'Indian Banking Standards', 'Multi-State GST'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-munshi-text dark:text-gray-300 font-medium bg-white/50 dark:bg-black/20 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700">
                       <IndianRupee size={14} /> {item}
                    </div>
                 ))}
             </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
           <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Trusted by 10,000+ businesses</h2>
           <p className="text-munshi-subtext dark:text-zinc-400">See what Indian business owners are saying about Munshi.</p>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6">
           <div className="grid md:grid-cols-3 gap-6 h-[600px] overflow-hidden">
              <TestimonialColumn testimonials={TESTIMONIALS.slice(0, 3)} direction="down" duration="45s" />
              <TestimonialColumn testimonials={TESTIMONIALS.slice(3, 6)} direction="up" duration="50s" />
              <TestimonialColumn testimonials={TESTIMONIALS.slice(6, 9)} direction="down" duration="48s" />
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-munshi-dark-bg">
         <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-2">
               <FAQItem question="Is my financial data safe with Munshi?" answer="Absolutely. We use bank-grade 256-bit encryption for all data in transit and at rest. We are compliant with Indian data privacy regulations." />
               <FAQItem question="Does Munshi support GST filing?" answer="Yes, Munshi is a fully GST-compliant platform. You can generate GSTR-1, GSTR-3B reports and JSON files ready for the government portal." />
               <FAQItem question="Can I invite my Chartered Accountant?" answer="Yes! You can invite your CA or accountant as a 'Viewer' or 'Member' to your organization for free, so they can audit your books directly." />
               <FAQItem question="What happens after the free trial?" answer="You can choose to upgrade to our Pro plan to keep using AI features. If you choose not to, you can still access your data and export it at any time." />
               <FAQItem question="Can I import data from Tally or Excel?" answer="Yes, we support bulk import from Excel and Tally XML formats to help you migrate your historical data seamlessly." />
            </div>
         </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* Footer */}
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
}
