'use client';

import React, { useState, useEffect } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button, Card, Badge } from '@/components/ui/UI';
import { 
  ChevronRight, Calendar, Share2, Bookmark, 
  CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight, 
  Copy, Terminal
} from 'lucide-react';
import Link from 'next/link';

// Reusable Article Components
const ProTip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="my-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-l-4 border-green-500 rounded-r-xl">
    <div className="flex items-start gap-3">
      <div className="p-1 bg-green-200 dark:bg-green-800 rounded-full text-green-700 dark:text-green-300 mt-0.5">
        <CheckCircle2 size={16} strokeWidth={3} />
      </div>
      <div>
        <h4 className="font-bold text-green-800 dark:text-green-400 text-sm uppercase tracking-wide mb-1">Pro Tip</h4>
        <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{children}</div>
      </div>
    </div>
  </div>
);

const WarningBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="my-8 p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl flex gap-4">
    <div className="text-red-500 shrink-0">
      <AlertTriangle size={24} />
    </div>
    <div>
      <h4 className="font-bold text-red-700 dark:text-red-400 mb-1">Important Compliance Note</h4>
      <div className="text-red-600 dark:text-red-300/80 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

const AIInsight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="my-8 relative overflow-hidden rounded-2xl border border-munshi-indigo/20 dark:border-indigo-500/30 bg-white dark:bg-zinc-900 shadow-xl shadow-munshi-indigo/5">
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-munshi-indigo to-munshi-teal"></div>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3 text-munshi-indigo dark:text-indigo-400">
        <SparklesIcon />
        <span className="font-heading font-bold text-sm">Munshi AI Insight</span>
      </div>
      <div className="text-gray-600 dark:text-gray-300 italic leading-relaxed pl-2 border-l-2 border-gray-100 dark:border-zinc-700">
        "{children}"
      </div>
    </div>
  </div>
);

const CodeBlock: React.FC<{ code: string, lang: string }> = ({ code, lang }) => (
  <div className="my-8 rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-800 shadow-lg">
    <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-800">
      <span className="text-xs text-gray-400 font-mono lowercase">{lang}</span>
      <button className="text-gray-400 hover:text-white transition-colors" title="Copy">
        <Copy size={14} />
      </button>
    </div>
    <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
      <code>{code}</code>
    </pre>
  </div>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-munshi-gold">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor"/>
  </svg>
);

export default function ArticlePage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category, slug } = React.use(params);
  const [activeSection, setActiveSection] = useState('intro');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      const sections = ['intro', 'prerequisites', 'step-by-step', 'common-errors', 'automation'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tocItems = [
    { id: 'intro', label: 'Introduction' },
    { id: 'prerequisites', label: 'Prerequisites' },
    { id: 'step-by-step', label: 'Step-by-Step Filing' },
    { id: 'common-errors', label: 'Common Errors' },
    { id: 'automation', label: 'Automating with Munshi' },
  ];

  return (
    <PublicLayout>
      {/* Scroll Progress Bar */}
      <div className="fixed top-20 left-0 h-1 bg-munshi-teal z-40 transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>

      <div className="bg-white dark:bg-munshi-dark-bg min-h-screen">
        
        {/* Header Section */}
        <div className="pt-12 pb-12 px-6 bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <Link href="/guide" className="hover:text-munshi-indigo dark:hover:text-white">Guide</Link>
              <ChevronRight size={14} />
              <Link href={`/guide/${category}`} className="hover:text-munshi-indigo dark:hover:text-white capitalize">{category.replace(/-/g, ' ')}</Link>
              <ChevronRight size={14} />
              <span className="text-munshi-indigo dark:text-white font-medium">Mastering GSTR-1 Filing</span>
            </div>

            <div className="max-w-4xl">
              <div className="flex gap-3 mb-6">
                <Badge variant="info">Compliance</Badge>
                <Badge variant="neutral">8 min read</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-munshi-indigo dark:text-white mb-6 leading-tight">
                Mastering GSTR-1 Filing: A Complete Guide for Indian SMEs
              </h1>
              <p className="text-xl text-munshi-subtext dark:text-zinc-400 mb-8 leading-relaxed max-w-2xl">
                Learn how to file your outward supplies return accurately, avoid penalties, and ensure your customers get their Input Tax Credit on time.
              </p>

              <div className="flex items-center justify-between border-t border-gray-200 dark:border-zinc-800 pt-8 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-munshi-indigo dark:bg-zinc-700 flex items-center justify-center text-white font-bold text-lg">
                    AS
                  </div>
                  <div>
                    <p className="font-bold text-munshi-indigo dark:text-white">Ananya Singh</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Senior Tax Analyst, Munshi</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-2"><Calendar size={16}/> Oct 24, 2023</span>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"><Share2 size={18}/></button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"><Bookmark size={18}/></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Body */}
          <article className="lg:col-span-8 prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:text-munshi-indigo dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-munshi-teal hover:prose-a:text-munshi-indigo max-w-none">
            
            <section id="intro">
              <p className="lead text-xl text-gray-700 dark:text-gray-300">
                The Goods and Services Tax (GST) regime has streamlined taxation in India, but the filing process can still be daunting. GSTR-1 is the monthly or quarterly return that contains details of all outward supplies (sales).
              </p>
              <p>
                Filing this correctly is crucial because your customer's ability to claim Input Tax Credit (ITC) depends entirely on the data you upload here.
              </p>
            </section>

            <section id="prerequisites">
              <h2>Prerequisites for Filing</h2>
              <p>Before you log into the GST portal or open Munshi, ensure you have the following ready:</p>
              <ul>
                <li>Valid GSTIN and portal credentials.</li>
                <li>Digital Signature Certificate (DSC) for companies/LLPs.</li>
                <li>A valid mobile number linked to the authorized signatory for EVC verification.</li>
                <li>Consolidated details of all B2B and B2C invoices.</li>
              </ul>
              <ProTip>
                Use Munshi's <strong>Document Vault</strong> to auto-extract invoice details. Just upload your PDFs, and we'll prepare the CSV for you.
              </ProTip>
            </section>

            <section id="step-by-step">
              <h2>Step-by-Step Filing Process</h2>
              <h3>1. Upload B2B Invoices</h3>
              <p>
                Enter details of taxable supplies made to other registered persons. You will need the receiver's GSTIN, invoice number, date, value, and tax rate.
              </p>
              
              <CodeBlock 
                lang="JSON"
                code={`{
  "gstin": "27AAAAA0000A1Z5",
  "fp": "102023",
  "b2b": [
    {
      "ctin": "24BBBBB1234B1Z2",
      "inv": [
        {
          "inum": "INV-001",
          "idt": "24-10-2023",
          "val": 15000.00,
          "pos": "24",
          "itms": [
            {
              "num": 1,
              "rt": 18,
              "txval": 12711.86,
              "iamt": 2288.14
            }
          ]
        }
      ]
    }
  ]
}`}
              />

              <h3>2. Enter B2C Large Invoices</h3>
              <p>
                For inter-state supplies to unregistered persons where the invoice value is more than ₹2.5 Lakhs.
              </p>

              <h3>3. HSN-wise Summary</h3>
              <p>
                Since 2021, it is mandatory to report HSN-wise summary of outward supplies.
              </p>
            </section>

            <section id="common-errors">
              <h2>Common Errors to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                <Card className="bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30">
                  <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2">Incorrect GSTIN</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Typing errors in customer GSTINs are the #1 cause of rejection.</p>
                </Card>
                <Card className="bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30">
                  <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2">Wrong Place of Supply</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Confusing Intra-state (CGST+SGST) vs Inter-state (IGST).</p>
                </Card>
              </div>
              <WarningBox>
                If you amend an invoice in a later month, interest @ 18% p.a. might be applicable on the tax difference if the liability increases.
              </WarningBox>
            </section>

            <section id="automation">
              <h2>Automating with Munshi</h2>
              <p>
                Why do this manually? Munshi connects directly to your bank and invoicing workflow to generate the JSON file automatically.
              </p>
              <AIInsight>
                Based on your current transaction volume, switching to automated filing could save you approximately <strong>12 hours per month</strong> and reduce error risk by 94%.
              </AIInsight>
              <p>
                Simply go to the <strong>GST & Tax</strong> tab in your dashboard, review the auto-populated GSTR-1 draft, and click "File with EVC".
              </p>
            </section>

          </article>

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8">
              
              {/* Table of Contents */}
              <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
                <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
                <nav className="space-y-1">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(item.id);
                      }}
                      className={`block px-3 py-2 text-sm rounded-lg transition-all duration-200 border-l-2 ${
                        activeSection === item.id
                          ? 'border-munshi-teal bg-white dark:bg-black text-munshi-indigo dark:text-white font-medium shadow-sm'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-munshi-indigo dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Sidebar CTA */}
              <div className="bg-munshi-indigo dark:bg-zinc-900 rounded-2xl p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Terminal size={100} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 relative z-10">Hate filing taxes?</h3>
                <p className="text-sm text-blue-100 mb-6 relative z-10">Let Munshi's AI handle the numbers while you focus on business.</p>
                <Link href="/signup">
                  <Button className="w-full relative z-10 bg-white text-munshi-indigo hover:bg-blue-50 border-none">
                    Start Free Trial
                  </Button>
                </Link>
              </div>

            </div>
          </aside>
        </div>

        {/* Footer Navigation Area */}
        <div className="bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-zinc-800 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <Link 
                href="/guide"
                className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-munshi-indigo/30 dark:hover:border-zinc-700 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 text-gray-400 mb-2 group-hover:text-munshi-indigo dark:group-hover:text-white transition-colors">
                  <ArrowLeft size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Previous</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Setting up your first organization</h3>
              </Link>
              <Link 
                href="/guide"
                className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-munshi-indigo/30 dark:hover:border-zinc-700 transition-all cursor-pointer text-right"
              >
                <div className="flex items-center justify-end gap-2 text-gray-400 mb-2 group-hover:text-munshi-indigo dark:group-hover:text-white transition-colors">
                  <span className="text-xs font-bold uppercase tracking-wider">Next</span>
                  <ArrowRight size={16} />
                </div>
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Understanding Input Tax Credit (ITC)</h3>
              </Link>
            </div>

            {/* Bottom CTA Strip */}
            <div className="bg-gradient-to-r from-munshi-indigo to-blue-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-heading font-bold mb-6">Ready to automate your accounting?</h2>
                <p className="text-lg text-blue-100 mb-8">Join 10,000+ Indian businesses using Munshi to simplify their finances.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="bg-white text-munshi-indigo hover:bg-blue-50 border-none">
                      Start 7-Day Free Trial
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white">
                      Talk to Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
