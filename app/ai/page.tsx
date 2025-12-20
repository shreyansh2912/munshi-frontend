/**
 * AI Hub Page
 * 
 * Showcase all AI-powered features
 */

'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { InvoiceExtractor, FinancialInsights } from '@/components/ai';
import { Sparkles, FileText, TrendingUp, MessageSquare, Zap } from 'lucide-react';
import { useState } from 'react';

export default function AIHubPage() {
    const [activeTab, setActiveTab] = useState<'invoice' | 'insights' | 'about'>('about');

    // Sample data for insights demo
    const sampleFinancialData = {
        revenue: 500000,
        expenses: 450000,
        profitMargin: 10,
        topExpenses: [
            { category: 'Salaries', amount: 200000 },
            { category: 'Rent', amount: 50000 },
            { category: 'Marketing', amount: 80000 },
            { category: 'Utilities', amount: 30000 },
        ],
        cashFlow: 50000,
    };

    const tabs = [
        {
            id: 'about' as const,
            label: 'About',
            icon: <Sparkles className="w-5 h-5" />,
        },
        {
            id: 'invoice' as const,
            label: 'Invoice Extraction',
            icon: <FileText className="w-5 h-5" />,
        },
        {
            id: 'insights' as const,
            label: 'Financial Insights',
            icon: <TrendingUp className="w-5 h-5" />,
        },
    ];

    return (
        <AppLayout>
            <div className="p-8 max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <Sparkles className="w-12 h-12" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Munshi AI</h1>
                            <p className="text-white/90 text-lg">
                                Intelligent Financial Assistant - Powered by Groq
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Zap className="w-6 h-6" />
                                <h3 className="font-semibold">Ultra-Fast</h3>
                            </div>
                            <p className="text-sm text-white/80">
                                10-50x faster than OpenAI
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <MessageSquare className="w-6 h-6" />
                                <h3 className="font-semibold">Smart Chat</h3>
                            </div>
                            <p className="text-sm text-white/80">
                                24/7 financial assistant
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <FileText className="w-6 h-6" />
                                <h3 className="font-semibold">Auto-Extract</h3>
                            </div>
                            <p className="text-sm text-white/80">
                                Invoice data from images
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg mb-6">
                    <div className="flex border-b dark:border-gray-700">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                    {activeTab === 'about' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    What is Munshi AI?
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Munshi AI is your intelligent financial assistant powered by Groq's
                                    cutting-edge AI technology. It helps automate tedious accounting
                                    tasks, provides actionable insights, and makes managing your business
                                    finances effortless.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border dark:border-gray-700 rounded-xl p-6">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        Invoice Data Extraction
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Upload invoice images or paste text, and AI automatically extracts
                                        all relevant data including items, amounts, tax, and customer details.
                                    </p>
                                </div>

                                <div className="border dark:border-gray-700 rounded-xl p-6">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        Financial Insights
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Get AI-powered recommendations to optimize expenses, improve cash
                                        flow, and grow your business based on your actual financial data.
                                    </p>
                                </div>

                                <div className="border dark:border-gray-700 rounded-xl p-6">
                                    <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        Smart Transaction Categorization
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        AI automatically categorizes your transactions into proper accounting
                                        categories, saving hours of manual work every month.
                                    </p>
                                </div>

                                <div className="border dark:border-gray-700 rounded-xl p-6">
                                    <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <Sparkles className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        AI Chat Assistant
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Ask questions about your finances anytime. Get instant answers
                                        about accounting, taxes, reports, and how to use Munshi features.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                                    🎉 100% FREE with Groq
                                </h3>
                                <p className="text-purple-800 dark:text-purple-200 text-sm">
                                    Munshi AI uses Groq's completely free API with generous limits (14,400
                                    requests/day). No credit card required, no hidden fees. Just pure AI
                                    power for your business!
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'invoice' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Invoice Data Extraction
                            </h2>
                            <InvoiceExtractor
                                onExtracted={(data) => {
                                    console.log('Extracted invoice data:', data);
                                    // You can auto-fill invoice form with this data
                                }}
                            />
                        </div>
                    )}

                    {activeTab === 'insights' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Financial Insights Demo
                            </h2>
                            <FinancialInsights {...sampleFinancialData} />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        AI Assistant is always available in the bottom-right corner of every page{' '}
                        <span className="text-purple-600 dark:text-purple-400">→</span>
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
