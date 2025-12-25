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
import { InvoiceForm } from '@/components/examples/InvoiceForm';

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
        <div className="max-w-7xl mx-auto">
            <InvoiceForm 
                mode="edit" 
                invoiceId={params.id}
                initialData={invoice}
            />
        </div>
    );
}
