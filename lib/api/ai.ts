/**
 * AI Service
 * 
 * Frontend service for AI-powered features
 */

import { api } from './api';

export interface InvoiceExtractionResult {
    invoiceNumber?: string;
    date?: string;
    dueDate?: string;
    customerName?: string;
    customerGSTIN?: string;
    items: Array<{
        description: string;
        quantity: number;
        rate: number;
        amount: number;
    }>;
    subtotal: number;
    taxAmount: number;
    total: number;
    confidence: number;
}

export interface TransactionCategorizationResult {
    category: string;
    subcategory?: string;
    confidence: number;
    reasoning: string;
}

export interface FinancialInsight {
    type: 'warning' | 'info' | 'suggestion';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
}

export interface InvoiceMatch {
    invoiceId: number;
    confidence: number;
    reasoning: string;
}

/**
 * AI API methods
 */
export const aiService = {
    /**
     * Extract invoice data from text
     */
    extractInvoice: async (text: string): Promise<InvoiceExtractionResult> => {
        const response = await api.post('/ai/extract-invoice', { text });
        return response.data;
    },

    /**
     * Categorize transaction using AI
     */
    categorizeTransaction: async (
        description: string,
        amount?: number
    ): Promise<TransactionCategorizationResult> => {
        const response = await api.post('/ai/categorize-transaction', {
            description,
            amount,
        });
        return response.data;
    },

    /**
     * Generate financial insights
     */
    generateInsights: async (data: {
        revenue: number;
        expenses: number;
        profitMargin: number;
        topExpenses: Array<{ category: string; amount: number }>;
        cashFlow: number;
    }): Promise<FinancialInsight[]> => {
        const response = await api.post('/ai/financial-insights', data);
        return response.data;
    },

    /**
     * Suggest invoice matches for reconciliation
     */
    suggestMatches: async (
        transaction: {
            description: string;
            amount: number;
            date: string;
        },
        invoices: Array<{
            id: number;
            invoiceNumber: string;
            customerName: string;
            amount: number;
            dueDate: string;
        }>
    ): Promise<InvoiceMatch[]> => {
        const response = await api.post('/ai/suggest-matches', {
            transaction,
            invoices,
        });
        return response.data;
    },

    /**
     * Chat with AI assistant
     */
    chat: async (
        message: string,
        context?: {
            revenue?: number;
            expenses?: number;
            recentTransactions?: string[];
        }
    ): Promise<string> => {
        const response = await api.post('/ai/chat', {
            message,
            context,
        });
        return response.data.response;
    },
};
