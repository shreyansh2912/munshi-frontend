/**
 * Customer Form Component
 * 
 * Production-quality customer creation/editing form with:
 * - Frontend Zod validation (prevents unnecessary API calls)
 * - Reusable form components
 * - Centralized error handling
 * - Type-safe form inputs
 * - Proper loading and error states
 * 
 * @module components/customers/CustomerForm
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { Customer } from '@/lib/api';
import { createCustomerSchema, updateCustomerSchema } from '@/lib/validations/schemas';
import type { CreateCustomerInput, UpdateCustomerInput } from '@/lib/validations/schemas';
import { Form, FormField, Input, GSTInput, PANInput, PhoneInput } from '@/components/forms';

// ============================================================================
// TYPES
// ============================================================================

interface CustomerFormProps {
    /** Existing customer data for edit mode */
    customer?: Customer | null;
    /** Callback fired on successful submission */
    onSuccess?: () => void;
    /** Callback fired when form is cancelled */
    onCancel?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function CustomerForm({ customer, onSuccess, onCancel }: CustomerFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sameAsBilling, setSameAsBilling] = useState(false);
    
    const isEditMode = Boolean(customer);
    const schema = isEditMode ? updateCustomerSchema : createCustomerSchema;
    
    // ========================================================================
    // DEFAULT VALUES
    // ========================================================================
    
    const defaultValues: Partial<CreateCustomerInput | UpdateCustomerInput> = customer
        ? {
              name: customer.name || '',
              email: customer.email || '',
              phone: customer.phone || '',
              contactPerson: customer.contactPerson || '',
              customerCode: customer.customerCode || '',
              legalName: customer.legalName || '',
              gstin: customer.gstin || '',
              pan: customer.pan || '',
              billingAddressLine1: customer.billingAddressLine1 || '',
              billingAddressLine2: customer.billingAddressLine2 || '',
              billingCity: customer.billingCity || '',
              billingState: customer.billingState || '',
              billingPincode: customer.billingPincode || '',
              billingCountry: customer.billingCountry || 'IN',
              shippingAddressLine1: customer.shippingAddressLine1 || '',
              shippingAddressLine2: customer.shippingAddressLine2 || '',
              shippingCity: customer.shippingCity || '',
              shippingState: customer.shippingState || '',
              shippingPincode: customer.shippingPincode || '',
              shippingCountry: customer.shippingCountry || 'IN',
              creditLimit: customer.creditLimit || 0,
              paymentTermsDays: customer.paymentTermsDays || 30,
          }
        : {
              billingCountry: 'IN',
              shippingCountry: 'IN',
              creditLimit: 0,
              paymentTermsDays: 30,
          };
    
    // ========================================================================
    // FORM SUBMISSION
    // ========================================================================
    
    /**
     * Handle form submission
     * 
     * Note: Zod validation happens automatically in the Form component.
     * This function only executes if validation passes.
     */
    const handleSubmit = async (data: CreateCustomerInput | UpdateCustomerInput) => {
        setLoading(true);
        setError(null);
        
        try {
            if (isEditMode && customer) {
                // Update existing customer
                await api.customers.update(customer.id.toString(), data as UpdateCustomerInput);
            } else {
                // Create new customer
                await api.customers.create(data as CreateCustomerInput);
            }
            
            // Success! Navigate or call callback
            if (onSuccess) {
                onSuccess();
            } else {
                router.push('/customers');
                router.refresh();
            }
        } catch (err: any) {
            console.error('Customer save error:', err);
            
            // The Form component handles validation errors automatically
            // We only need to handle general errors here
            if (!err.errors) {
                setError(err.message || `Failed to ${isEditMode ? 'update' : 'create'} customer`);
            }
            
            // Re-throw to let Form component handle it
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    // ========================================================================
    // RENDER
    // ========================================================================
    
    return (
        <Form
            schema={schema}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            className="space-y-6"
        >
            {/* General Error Message */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}
            
            {/* Basic Information Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="Customer Name"
                        name="name"
                        required
                    >
                        <Input
                            name="name"
                            placeholder="Acme Corporation"
                        />
                    </FormField>
                    
                    <FormField
                        label="Customer Code"
                        name="customerCode"
                    >
                        <Input
                            name="customerCode"
                            placeholder="CUST001"
                        />
                    </FormField>
                    
                    <FormField
                        label="Legal Name"
                        name="legalName"
                    >
                        <Input
                            name="legalName"
                            placeholder="Acme Corporation Pvt Ltd"
                        />
                    </FormField>
                    
                    <FormField
                        label="Contact Person"
                        name="contactPerson"
                    >
                        <Input
                            name="contactPerson"
                            placeholder="John Doe"
                        />
                    </FormField>
                    
                    <FormField
                        label="Email"
                        name="email"
                    >
                        <Input
                            name="email"
                            type="email"
                            placeholder="contact@acme.com"
                        />
                    </FormField>
                    
                    <FormField
                        label="Phone"
                        name="phone"
                    >
                        <PhoneInput
                            name="phone"
                            placeholder="+91 98765 43210"
                        />
                    </FormField>
                </div>
            </div>
            
            {/* Tax Information Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tax Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="GSTIN"
                        name="gstin"
                        helpText="15-digit GST Identification Number"
                    >
                        <GSTInput
                            name="gstin"
                            placeholder="27AAAAA0000A1Z5"
                        />
                    </FormField>
                    
                    <FormField
                        label="PAN"
                        name="pan"
                        helpText="10-digit Permanent Account Number"
                    >
                        <PANInput
                            name="pan"
                            placeholder="AAAAA0000A"
                        />
                    </FormField>
                </div>
            </div>
            
            {/* Billing Address Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Billing Address</h3>
                
                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        label="Address Line 1"
                        name="billingAddressLine1"
                    >
                        <Input
                            name="billingAddressLine1"
                            placeholder="Building number, Street name"
                        />
                    </FormField>
                    
                    <FormField
                        label="Address Line 2"
                        name="billingAddressLine2"
                    >
                        <Input
                            name="billingAddressLine2"
                            placeholder="Apartment, Suite, Floor (optional)"
                        />
                    </FormField>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FormField
                            label="City"
                            name="billingCity"
                        >
                            <Input
                                name="billingCity"
                                placeholder="Mumbai"
                            />
                        </FormField>
                        
                        <FormField
                            label="State"
                            name="billingState"
                        >
                            <Input
                                name="billingState"
                                placeholder="Maharashtra"
                            />
                        </FormField>
                        
                        <FormField
                            label="Pincode"
                            name="billingPincode"
                        >
                            <Input
                                name="billingPincode"
                                placeholder="400001"
                                maxLength={6}
                            />
                        </FormField>
                        
                        <FormField
                            label="Country"
                            name="billingCountry"
                        >
                            <Input
                                name="billingCountry"
                                placeholder="IN"
                                maxLength={2}
                            />
                        </FormField>
                    </div>
                </div>
            </div>
            
            {/* Shipping Address Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Shipping Address</h3>
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={sameAsBilling}
                            onChange={(e) => setSameAsBilling(e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Same as billing
                    </label>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        label="Address Line 1"
                        name="shippingAddressLine1"
                    >
                        <Input
                            name="shippingAddressLine1"
                            placeholder="Building number, Street name"
                            disabled={sameAsBilling}
                        />
                    </FormField>
                    
                    <FormField
                        label="Address Line 2"
                        name="shippingAddressLine2"
                    >
                        <Input
                            name="shippingAddressLine2"
                            placeholder="Apartment, Suite, Floor (optional)"
                            disabled={sameAsBilling}
                        />
                    </FormField>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FormField
                            label="City"
                            name="shippingCity"
                        >
                            <Input
                                name="shippingCity"
                                placeholder="Mumbai"
                                disabled={sameAsBilling}
                            />
                        </FormField>
                        
                        <FormField
                            label="State"
                            name="shippingState"
                        >
                            <Input
                                name="shippingState"
                                placeholder="Maharashtra"
                                disabled={sameAsBilling}
                            />
                        </FormField>
                        
                        <FormField
                            label="Pincode"
                            name="shippingPincode"
                        >
                            <Input
                                name="shippingPincode"
                                placeholder="400001"
                                maxLength={6}
                                disabled={sameAsBilling}
                            />
                        </FormField>
                        
                        <FormField
                            label="Country"
                            name="shippingCountry"
                        >
                            <Input
                                name="shippingCountry"
                                placeholder="IN"
                                maxLength={2}
                                disabled={sameAsBilling}
                            />
                        </FormField>
                    </div>
                </div>
            </div>
            
            {/* Financial Terms Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Credit Terms</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="Credit Limit (₹)"
                        name="creditLimit"
                        helpText="Maximum credit allowed"
                    >
                        <Input
                            name="creditLimit"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0"
                        />
                    </FormField>
                    
                    <FormField
                        label="Payment Terms (days)"
                        name="paymentTermsDays"
                        helpText="Number of days for payment"
                    >
                        <Input
                            name="paymentTermsDays"
                            type="number"
                            min="0"
                            placeholder="30"
                        />
                    </FormField>
                </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                )}
                
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    {loading
                        ? 'Saving...'
                        : isEditMode
                        ? 'Update Customer'
                        : 'Create Customer'}
                </button>
            </div>
        </Form>
    );
}
