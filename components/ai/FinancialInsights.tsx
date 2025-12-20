/**
 * Financial Insights Component
 * 
 * AI-powered financial insights and recommendations
 */

'use client';

import { useState, useEffect } from 'react';
import { aiService, type FinancialInsight } from '@/lib/api/ai';
import { TrendingUp, AlertTriangle, Lightbulb, Sparkles, Loader2 } from 'lucide-react';

interface FinancialInsightsProps {
    revenue: number;
    expenses: number;
    profitMargin: number;
    topExpenses: Array<{ category: string; amount: number }>;
    cashFlow: number;
}

export function FinancialInsights(props: FinancialInsightsProps) {
    const [insights, setInsights] = useState<FinancialInsight[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadInsights();
    }, [props]);

    const loadInsights = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await aiService.generateInsights(props);
            setInsights(result);
        } catch (err: any) {
            setError(err.message || 'Failed to generate insights');
        } finally {
            setIsLoading(false);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'warning':
                return <AlertTriangle className="w-5 h-5" />;
            case 'suggestion':
                return <Lightbulb className="w-5 h-5" />;
            default:
                return <TrendingUp className="w-5 h-5" />;
        }
    };

    const getColorClasses = (type: string, impact: string) => {
        if (type === 'warning') {
            return impact === 'high'
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
                : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300';
        }
        if (type === 'suggestion') {
            return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300';
        }
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300';
    };

    const getIconColorClass = (type: string) => {
        switch (type) {
            case 'warning':
                return 'text-red-600 dark:text-red-400';
            case 'suggestion':
                return 'text-blue-600 dark:text-blue-400';
            default:
                return 'text-green-600 dark:text-green-400';
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                        <Loader2 className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-spin" />
                        <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Analyzing Your Finances
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            AI is generating personalized insights...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                            Failed to Generate Insights
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                        <button
                            onClick={loadInsights}
                            className="mt-3 text-sm text-red-700 dark:text-red-300 underline hover:no-underline"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">AI Financial Insights</h2>
                </div>
                <p className="text-white/90 text-sm">
                    Personalized recommendations to improve your business finances
                </p>
            </div>

            {/* Insights */}
            {insights.length === 0 ? (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                        No insights available at the moment
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {insights.map((insight, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl p-5 ${getColorClasses(
                                insight.type,
                                insight.impact
                            )}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`flex-shrink-0 ${getIconColorClass(insight.type)}`}>
                                    {getIcon(insight.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-lg">{insight.title}</h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${
                                                insight.impact === 'high'
                                                    ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                                                    : insight.impact === 'medium'
                                                    ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                                                    : 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                                            }`}
                                        >
                                            {insight.impact.toUpperCase()} IMPACT
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed">{insight.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Powered by */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Powered by Groq AI • Updated in real-time
            </p>
        </div>
    );
}
