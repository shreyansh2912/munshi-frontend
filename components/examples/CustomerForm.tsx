/**
 * Example Customer Form
 * Demonstrates the complete validation system in action
 */

'use client';

import React, { useState } from 'react';
import { Form, FormField, Input, PANInput, GSTInput, PhoneInput, Select, Textarea } from '../forms';
import { customerFormSchema, CustomerFormData } from '@/lib/validations/forms';
import { Button } from '../ui/UI';

export function CustomerForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: CustomerFormData) => {
        setIsSubmitting(true);
        try {
            // Call your API here
            console.log('Submitting form data:', data);
            // Example: await customersService.create(data);
            
            // For now, simulating API call
            throw new Error('API integration pending');
        } catch (error: any) {
            console.error('Form submission error:', error);
            // Form component will handle validation errors
            // Other errors can be shown with toast/alert
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
                Create Customer
            </h2>

            <Form
                schema={customerFormSchema}
                onSubmit={handleSubmit}
                defaultValues={{
                    billingCountry: 'IN',
                    shippingCountry: 'IN',
                    creditLimit: 0,
                    paymentTermsDays: 30,
                }}
                className="space-y-6"
            >
                {/* Basic Information */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Basic Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="customerCode" label="Customer Code">
                            <Input name="customerCode" placeholder="CUST001" maxLength={50} showCounter />
                        </FormField>

                        <FormField name="name" label="Display Name" required>
                            <Input name="name" placeholder="Acme Corporation" maxLength={255} />
                        </FormField>

                        <FormField name="legalName" label="Legal Name">
                            <Input name="legalName" placeholder="Acme Corporation Pvt Ltd" maxLength={255} />
                        </FormField>

                        <FormField name="contactPerson" label="Contact Person">
                            <Input name="contactPerson" placeholder="John Doe" maxLength={200} />
                        </FormField>
                    </div>
                </div>

                {/* Tax Information */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Tax Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            name="gstin"
                            label="GSTIN"
                            helpText="15 characters, e.g., 27ABCDE1234F1Z5"
                        >
                            <GSTInput name="gstin" />
                        </FormField>

                        <FormField
                            name="pan"
                            label="PAN Card"
                            helpText="10 characters, e.g., ABCDE1234F"
                        >
                            <PANInput name="pan" />
                        </FormField>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="email" label="Email">
                            <Input name="email" type="email" placeholder="contact@example.com" />
                        </FormField>

                        <FormField name="phone" label="Phone" helpText="10 digits">
                            <PhoneInput name="phone" />
                        </FormField>
                    </div>
                </div>

                {/* Billing Address */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Billing Address
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="billingAddressLine1" label="Address Line 1" className="md:col-span-2">
                            <Input name="billingAddressLine1" placeholder="123 Main Street" maxLength={255} />
                        </FormField>

                        <FormField name="billingAddressLine2" label="Address Line 2" className="md:col-span-2">
                            <Input name="billingAddressLine2" placeholder="Apartment, suite, etc" maxLength={255} />
                        </FormField>

                        <FormField name="billingCity" label="City">
                            <Input name="billingCity" placeholder="Mumbai" maxLength={100} />
                        </FormField>

                        <FormField name="billingState" label="State">
                            <Input name="billingState" placeholder="Maharashtra" maxLength={100} />
                        </FormField>

                        <FormField name="billingPincode" label="Pincode">
                            <Input name="billingPincode" placeholder="400001" maxLength={6} />
                        </FormField>

                        <FormField name="billingCountry" label="Country">
                            <Select
                                name="billingCountry"
                                options={[
                                    { value: 'IN', label: 'India' },
                                    { value: 'US', label: 'United States' },
                                    { value: 'UK', label: 'United Kingdom' },
                                ]}
                            />
                        </FormField>
                    </div>
                </div>

                {/* Financial Terms */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Financial Terms
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="creditLimit" label="Credit Limit (₹)">
                            <Input name="creditLimit" type="number" placeholder="0" />
                        </FormField>

                        <FormField name="paymentTermsDays" label="Payment Terms (Days)">
                            <Input name="paymentTermsDays" type="number" placeholder="30" />
                        </FormField>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Customer'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
