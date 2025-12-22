/**
 * Example Invoice Form
 * Demonstrates complete invoice creation with dynamic line items
 */

'use client';

import React, { useState } from 'react';
import { Form, FormField, Input, DatePicker, Select, Textarea, InvoiceLineItems } from '../forms';
import { invoiceFormSchema, InvoiceFormData } from '@/lib/validations/forms';
import { Button } from '../ui/UI';
import { toast } from 'sonner';
import { invoicesService } from '@/lib/services/invoices.service';

export function InvoiceForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: InvoiceFormData) => {
        setIsSubmitting(true);
        try {
            console.log('Submitting invoice data:', data);
            
            // Transform data for API
            const invoiceData = {
                ...data,
                invoiceDate: typeof data.invoiceDate === 'string' ? data.invoiceDate : data.invoiceDate.toISOString().split('T')[0],
                dueDate: data.dueDate ? (typeof data.dueDate === 'string' ? data.dueDate : data.dueDate.toISOString().split('T')[0]) : undefined,
            };
            
            // Call API
            await invoicesService.create(invoiceData as any);
            
            toast.success('Invoice created successfully!');
            
            // TODO: Navigate to invoice list or detail page
            // router.push('/invoices');
        } catch (error: any) {
            console.error('Form submission error:', error);
            toast.error(error.message || 'Failed to create invoice');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
                Create Invoice
            </h2>

            <Form
                schema={invoiceFormSchema}
                onSubmit={handleSubmit}
                defaultValues={{
                    invoiceType: 'tax_invoice',
                    currency: 'INR',
                    isReverseCharge: false,
                    isExport: false,
                    invoiceDate: new Date().toISOString().split('T')[0],
                    items: [
                        {
                            lineNumber: 1,
                            description: '',
                            quantity: 1,
                            unitPrice: 0,
                            taxRate: 18,
                            discountPercent: 0,
                            discountAmount: 0,
                        },
                    ],
                }}
                className="space-y-6"
            >
                {/* Invoice Header */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Invoice Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="invoiceNumber" label="Invoice Number" helpText="Leave blank for auto-generation">
                            <Input name="invoiceNumber" placeholder="INV-2024-0001" maxLength={100} />
                        </FormField>

                        <FormField name="invoiceType" label="Invoice Type">
                            <Select
                                name="invoiceType"
                                options={[
                                    { value: 'tax_invoice', label: 'Tax Invoice' },
                                    { value: 'proforma', label: 'Proforma Invoice' },
                                    { value: 'credit_note', label: 'Credit Note' },
                                    { value: 'debit_note', label: 'Debit Note' },
                                    { value: 'export_invoice', label: 'Export Invoice' },
                                ]}
                            />
                        </FormField>

                        <FormField name="customerId" label="Customer" required>
                            <Input name="customerId" type="number" placeholder="Select customer" />
                        </FormField>

                        <FormField name="placeOfSupply" label="Place of Supply">
                            <Input name="placeOfSupply" placeholder="e.g., Maharashtra" maxLength={100} />
                        </FormField>

                        <FormField name="invoiceDate" label="Invoice Date" required>
                            <DatePicker name="invoiceDate" />
                        </FormField>

                        <FormField name="dueDate" label="Due Date">
                            <DatePicker name="dueDate" />
                        </FormField>
                    </div>
                </div>

                {/* Line Items */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <InvoiceLineItems />
                </div>

                {/* Additional Details */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Additional Information
                    </h3>
                    <div className="grid md:grid-cols-1 gap-4">
                        <FormField name="notes" label="Notes">
                            <Textarea name="notes" placeholder="Any additional notes..." maxLength={1000} rows={3} />
                        </FormField>

                        <FormField name="termsAndConditions" label="Terms & Conditions">
                            <Textarea name="termsAndConditions" placeholder="Payment terms, delivery terms, etc..." maxLength={2000} rows={4} />
                        </FormField>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Invoice...' : 'Create Invoice'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
