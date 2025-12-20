/**
 * Invoice Extraction Component
 * 
 * Upload invoice image/PDF and extract data using AI
 */

'use client';

import { useState } from 'react';
import { aiService, type InvoiceExtractionResult } from '@/lib/api/ai';
import { Upload, FileText, Sparkles, Check, AlertCircle, Loader2 } from 'lucide-react';

interface InvoiceExtractorProps {
    onExtracted?: (data: InvoiceExtractionResult) => void;
}

export function InvoiceExtractor({ onExtracted }: InvoiceExtractorProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedData, setExtractedData] = useState<InvoiceExtractionResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [text, setText] = useState('');

    const handleExtract = async () => {
        if (!text.trim()) {
            setError('Please paste invoice text');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const result = await aiService.extractInvoice(text);
            setExtractedData(result);
            onExtracted?.(result);
        } catch (err: any) {
            setError(err.message || 'Failed to extract invoice data');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // For now, just read as text
        // In production, you'd upload to backend, OCR, then extract
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setText(content);
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-4 rounded-full">
                        <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            Upload Invoice
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Upload image or paste invoice text
                        </p>
                    </div>
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*,.pdf,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            <FileText className="w-4 h-4" />
                            Choose File
                        </span>
                    </label>
                </div>
            </div>

            {/* Text Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Or Paste Invoice Text
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste invoice text here..."
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Extract Button */}
            <button
                onClick={handleExtract}
                disabled={isProcessing || !text.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Extracting with AI...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        Extract Invoice Data
                    </>
                )}
            </button>

            {/* Error */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                </div>
            )}

            {/* Extracted Data */}
            {extractedData && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        <h4 className="font-semibold">Extraction Complete</h4>
                        <span className="ml-auto text-sm">
                            Confidence: {(extractedData.confidence * 100).toFixed(0)}%
                        </span>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Invoice Number</p>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                    {extractedData.invoiceNumber || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Date</p>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                    {extractedData.date || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Customer</p>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                    {extractedData.customerName || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Total Amount</p>
                                <p className="font-semibold text-green-600 dark:text-green-400 text-xl">
                                    ₹{extractedData.total.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>

                        {/* Items */}
                        {extractedData.items.length > 0 && (
                            <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Items</p>
                                <div className="space-y-2">
                                    {extractedData.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white dark:bg-gray-800 p-3 rounded-lg flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                                    {item.description}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {item.quantity} × ₹{item.rate.toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                ₹{item.amount.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tax Breakdown */}
                        <div className="border-t dark:border-gray-700 pt-3 space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    ₹{extractedData.subtotal.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    ₹{extractedData.taxAmount.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t dark:border-gray-700 pt-2 mt-2">
                                <span className="text-gray-900 dark:text-gray-100">Total</span>
                                <span className="text-green-600 dark:text-green-400">
                                    ₹{extractedData.total.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
