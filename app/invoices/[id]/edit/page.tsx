/**
 * Edit Invoice Page
 * Allows editing of draft invoices
 */

'use client';

import React, { useEffect, useState } from 'react';
import { invoicesService } from '@/lib/services/invoices.service';
import type { Invoice } from '@/lib/api/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function EditInvoicePage({ params }: { params: { id: string } }) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const data = await invoicesService.getById(params.id);
                
                // Only allow editing draft invoices
                if (data.status !== 'draft') {
                    toast.error('Only draft invoices can be edited');
                    router.push(`/invoices/${params.id}`);
                    return;
                }
                
                setInvoice(data);
            } catch (error: any) {
                toast.error('Failed to load invoice');
                console.error(error);
                router.push('/invoices');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [params.id, router]);

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
            <div className="mb-6">
                <h1 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white">
                    Edit Invoice {invoice.invoiceNumber}
                </h1>
                <p className="text-gray-600 dark:text-zinc-400 mt-2">
                    Modify the invoice details below
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6">
                <p className="text-gray-600 dark:text-zinc-400">
                    Invoice edit form will be implemented here. For now, navigate back to the invoice detail.
                </p>
                <button
                    onClick={() => router.push(`/invoices/${params.id}`)}
                    className="mt-4 px-4 py-2 bg-munshi-indigo text-white rounded-lg hover:bg-munshi-indigo/90"
                >
                    Back to Invoice
                </button>
            </div>
        </div>
    );
}
