/**
 * Example Payment Form
 * Demonstrates payment receipt/payment creation with payment methods
 */

'use client';

import React, { useState } from 'react';
import { Form, FormField, Input, CurrencyInput, DatePicker, Select, Textarea } from '../forms';
import { paymentFormSchema, PaymentFormData } from '@/lib/validations/forms';
import { Button } from '../ui/UI';
import { toast } from 'sonner';

export function PaymentForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('cash');

    const handleSubmit = async (data: PaymentFormData) => {
        setIsSubmitting(true);
        try {
            console.log('Submitting payment data:', data);
            
            // Call your API here
            // Example: await paymentsService.create(data);
            
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success('Payment recorded successfully!');
        } catch (error: any) {
            console.error('Form submission error:', error);
            toast.error(error.message || 'Failed to record payment');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
                Record Payment
            </h2>

            <Form
                schema={paymentFormSchema}
                onSubmit={handleSubmit}
                defaultValues={{
                    paymentType: 'receipt',
                    partyType: 'customer',
                    paymentMethod: 'cash',
                    paymentDate: new Date().toISOString().split('T')[0],
                }}
                className="space-y-6"
            >
                {/* Payment Type & Party */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Transaction Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="paymentNumber" label="Payment Number" required>
                            <Input name="paymentNumber" placeholder="PMT-001" maxLength={100} />
                        </FormField>

                        <FormField name="paymentType" label="Type" required>
                            <Select
                                name="paymentType"
                                options={[
                                    { value: 'receipt', label: 'Receipt (Money In)' },
                                    { value: 'payment', label: 'Payment (Money Out)' },
                                ]}
                            />
                        </FormField>

                        <FormField name="paymentDate" label="Payment Date" required>
                            <DatePicker name="paymentDate" />
                        </FormField>

                        <FormField name="amount" label="Amount" required>
                            <CurrencyInput name="amount" placeholder="0.00" />
                        </FormField>
                    </div>
                </div>

                {/* Party Information */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Party Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="partyType" label="Party Type" required>
                            <Select
                                name="partyType"
                                options={[
                                    { value: 'customer', label: 'Customer' },
                                    { value: 'supplier', label: 'Supplier' },
                                    { value: 'other', label: 'Other' },
                                ]}
                            />
                        </FormField>

                        <FormField name="partyId" label="Party" required helpText="Select customer/supplier">
                            <Input name="partyId" type="number" placeholder="Select party" />
                        </FormField>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Payment Method
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="paymentMethod" label="Method" required className="md:col-span-2">
                            <Select
                                name="paymentMethod"
                                options={[
                                    { value: 'cash', label: 'Cash' },
                                    { value: 'bank_transfer', label: 'Bank Transfer' },
                                    { value: 'upi', label: 'UPI' },
                                    { value: 'card', label: 'Card' },
                                    { value: 'cheque', label: 'Cheque' },
                                    { value: 'dd', label: 'Demand Draft' },
                                    { value: 'other', label: 'Other' },
                                ]}
                                onChange={(e: any) => setPaymentMethod(e.target.value)}
                            />
                        </FormField>

                        <FormField name="referenceNumber" label="Reference Number">
                            <Input name="referenceNumber" placeholder="Transaction ref/ID" maxLength={255} />
                        </FormField>

                        <FormField name="notes" label="Notes" className="md:col-span-2">
                            <Textarea name="notes" placeholder="Additional notes" maxLength={1000} rows={3} />
                        </FormField>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Recording...' : 'Record Payment'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
