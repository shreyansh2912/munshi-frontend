"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '@/lib/api';

interface CustomerFormProps {
  customer?: Customer | null;
 onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CustomerForm({ customer, onSuccess, onCancel }: CustomerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const [formData, setFormData] = useState<CreateCustomerRequest | UpdateCustomerRequest>({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    contactPerson: customer?.contactPerson || '',
    customerCode: customer?.customerCode || '',
    legalName: customer?.legalName || '',
    gstin: customer?.gstin || '',
    pan: customer?.pan || '',
    billingAddressLine1: customer?.billingAddressLine1 || '',
    billingAddressLine2: customer?.billingAddressLine2 || '',
    billingCity: customer?.billingCity || '',
    billingState: customer?.billingState || '',
    billingPincode: customer?.billingPincode || '',
    billingCountry: customer?.billingCountry || 'IN',
    shippingAddressLine1: customer?.shippingAddressLine1 || '',
    shippingAddressLine2: customer?.shippingAddressLine2 || '',
    shippingCity: customer?.shippingCity || '',
    shippingState: customer?.shippingState || '',
    shippingPincode: customer?.shippingPincode || '',
    shippingCountry: customer?.shippingCountry || 'IN',
    creditLimit: customer?.creditLimit || 0,
    paymentTermsDays: customer?.paymentTermsDays || 30,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSameAsBilling = (checked: boolean) => {
    setSameAsBilling(checked);
    if (checked) {
      setFormData(prev => ({
        ...prev,
        shippingAddressLine1: prev.billingAddressLine1,
        shippingAddressLine2: prev.billingAddressLine2,
        shippingCity: prev.billingCity,
        shippingState: prev.billingState,
        shippingPincode: prev.billingPincode,
        shippingCountry: prev.billingCountry,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      if (customer) {
        // Update existing customer
        await api.customers.update(customer.id.toString(), formData as UpdateCustomerRequest);
      } else {
        // Create new customer
        await api.customers.create(formData as CreateCustomerRequest);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/customers');
        router.refresh();
      }
    } catch (err: any) {
      console.error('Customer save error:', err);
      console.log('Error has errors property?', 'errors' in err);
      console.log('Error.errors value:', err.errors);
      console.log('Error.errors type:', typeof err.errors);
      
      // Handle validation errors
      if (err.errors && typeof err.errors === 'object') {
        console.log('Setting field errors:', err.errors);
        setFieldErrors(err.errors);
        setError('Please fix the validation errors below');
        
        // Focus first error field
        const firstField = Object.keys(err.errors)[0];
        if (firstField) {
          setTimeout(() => {
            const element = document.getElementsByName(firstField)[0] as HTMLElement;
            element?.focus();
          }, 100);
        }
      } else {
        console.log('No validation errors, showing generic error');
        setError(err.message || 'Failed to save customer');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Acme Corporation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Customer Code
            </label>
            <input
              type="text"
              name="customerCode"
              value={formData.customerCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="CUST001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Legal Name
            </label>
            <input
              type="text"
              name="legalName"
              value={formData.legalName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Acme Corporation Pvt Ltd"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Person
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="contact@acme.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>
      </div>

      {/* Tax Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tax Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GSTIN
            </label>
            <input
              type="text"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              maxLength={15}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white font-mono"
              placeholder="27AAAAA0000A1Z5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              PAN
            </label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              maxLength={10}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white font-mono uppercase"
              placeholder="AAAAA0000A"
            />
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Billing Address</h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="billingAddressLine1"
            value={formData.billingAddressLine1}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Address Line 1"
          />
          <input
            type="text"
            name="billingAddressLine2"
            value={formData.billingAddressLine2}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Address Line 2"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="billingCity"
              value={formData.billingCity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="City"
            />
            <input
              type="text"
              name="billingState"
              value={formData.billingState}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="State"
            />
            <div>
              <input
                type="text"
                name="billingPincode"
                value={formData.billingPincode}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  fieldErrors.billingPincode ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
                placeholder="Pincode"
              />
              {fieldErrors.billingPincode && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.billingPincode}</p>
              )}
            </div>
            <input
              type="text"
              name="billingCountry"
              value={formData.billingCountry}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="IN"
              maxLength={2}
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Shipping Address</h3>
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={(e) => handleSameAsBilling(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Same as billing
          </label>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="shippingAddressLine1"
            value={formData.shippingAddressLine1}
            onChange={handleChange}
            disabled={sameAsBilling}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50"
            placeholder="Address Line 1"
          />
          <input
            type="text"
            name="shippingAddressLine2"
            value={formData.shippingAddressLine2}
            onChange={handleChange}
            disabled={sameAsBilling}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50"
            placeholder="Address Line 2"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="shippingCity"
              value={formData.shippingCity}
              onChange={handleChange}
              disabled={sameAsBilling}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50"
              placeholder="City"
            />
            <input
              type="text"
              name="shippingState"
              value={formData.shippingState}
              onChange={handleChange}
              disabled={sameAsBilling}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50"
              placeholder="State"
            />
            <div>
              <input
                type="text"
                name="shippingPincode"
                value={formData.shippingPincode}
                onChange={handleChange}
                disabled={sameAsBilling}
                className={`w-full px-4 py-2 border ${
                  fieldErrors.shippingPincode ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50`}
                placeholder="Pincode"
              />
              {fieldErrors.shippingPincode && !sameAsBilling && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.shippingPincode}</p>
              )}
            </div>
            <input
              type="text"
              name="shippingCountry"
              value={formData.shippingCountry}
              onChange={handleChange}
              disabled={sameAsBilling}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50"
              placeholder="IN"
              maxLength={2}
            />
          </div>
        </div>
      </div>

      {/* Credit Terms */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Credit Terms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Credit Limit (₹)
            </label>
            <input
              type="number"
              name="creditLimit"
              value={formData.creditLimit}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Terms (days)
            </label>
            <input
              type="number"
              name="paymentTermsDays"
              value={formData.paymentTermsDays}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Saving...' : customer ? 'Update Customer' : 'Create Customer'}
        </button>
      </div>
    </form>
  );
}
