/**
 * Invoice Detail Page
 * Displays full invoice details
 */

'use client';

import React, { useEffect, useState } from 'react';
import { invoicesService } from '@/lib/services/invoices.service';
import type { Invoice } from '@/lib/api/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const data = await invoicesService.getById(params.id);
                setInvoice(data);
            } catch (error: any) {
                toast.error('Failed to load invoice');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [params.id]);

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/4 mb-6"></div>
                    <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                </div>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Invoice Not Found
                </h1>
                <button
                    onClick={() => router.push('/invoices')}
                    className="text-munshi-indigo hover:underline"
                >
                    Back to Invoices
                </button>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white">
                    Invoice {invoice.invoiceNumber}
                </h1>
                <div className="flex gap-2">
                    {invoice.status === 'draft' && (
                        <button
                            onClick={() => router.push(`/invoices/${params.id}/edit`)}
                            className="px-4 py-2 bg-munshi-indigo text-white rounded-lg hover:bg-munshi-indigo/90"
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={() => router.push('/invoices')}
                        className="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800"
                    >
                        Back
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6 space-y-6">
                {/* Invoice Header */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-600 dark:text-zinc-400">Invoice Type</label>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                            {invoice.invoiceType?.replace('_', ' ')}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-zinc-400">Status</label>
                        <p className="font-medium">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                invoice.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                invoice.status === 'draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                                {invoice.status}
                            </span>
                        </p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-zinc-400">Invoice Date</label>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(invoice.invoiceDate).toLocaleDateString()}
                        </p>
                    </div>
                    {invoice.dueDate && (
                        <div>
                            <label className="text-sm text-gray-600 dark:text-zinc-400">Due Date</label>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {new Date(invoice.dueDate).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </div>

                {/* Line Items */}
                {invoice.items && invoice.items.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Line Items</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-zinc-800">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-zinc-400">#</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-zinc-400">Description</th>
                                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-600 dark:text-zinc-400">Qty</th>
                                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-600 dark:text-zinc-400">Price</th>
                                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-600 dark:text-zinc-400">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.items.map((item, index) => (
                                        <tr key={index} className="border-t border-gray-200 dark:border-zinc-800">
                                            <td className="px-4 py-2 text-sm">{item.lineNumber}</td>
                                            <td className="px-4 py-2 text-sm">{item.description}</td>
                                            <td className="px-4 py-2 text-sm text-right">{item.quantity}</td>
                                            <td className="px-4 py-2 text-sm text-right">₹{item.unitPrice.toFixed(2)}</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium">
                                                ₹{(item.quantity * item.unitPrice).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Totals */}
                <div className="border-t border-gray-200 dark:border-zinc-800 pt-4">
                    <div className="flex justify-end">
                        <div className="w-64 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-zinc-400">Subtotal:</span>
                                <span className="font-mono">₹{invoice.subtotal.toFixed(2)}</span>
                            </div>
                            {invoice.taxAmount > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-zinc-400">Tax:</span>
                                    <span className="font-mono">₹{invoice.taxAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-zinc-800 pt-2">
                                <span>Total:</span>
                                <span className="font-mono text-munshi-indigo dark:text-white">
                                    ₹{invoice.totalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                {invoice.notes && (
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-zinc-400">Notes</label>
                        <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{invoice.notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
