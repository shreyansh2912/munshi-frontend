/**
 * Invoice Line Item Component
 * Single editable row in invoice line items array
 */

'use client';

import React from 'react';
import { FormField, Input, CurrencyInput, PercentageInput, HSNInput, Textarea } from '../forms';
import { Trash2 } from 'lucide-react';

interface InvoiceLineItemProps {
    index: number;
    onRemove: () => void;
    showRemove: boolean;
    calculatedAmount?: number;
}

export function InvoiceLineItem({ index, onRemove, showRemove, calculatedAmount = 0 }: InvoiceLineItemProps) {
    return (
        <div className="grid grid-cols-12 gap-3 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700 relative">
            {/* Line Number */}
            <div className="col-span-1 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600 dark:text-zinc-400">
                    {index + 1}
                </span>
            </div>

            {/* Description */}
            <div className="col-span-11 md:col-span-5">
                <FormField name={`items.${index}.description`} label="Description" required>
                    <Textarea 
                        name={`items.${index}.description`} 
                        placeholder="Product or service description" 
                        rows={2}
                        maxLength={500}
                    />
                </FormField>
            </div>

            {/* HSN/SAC Code */}
            <div className="col-span-6 md:col-span-2">
                <FormField name={`items.${index}.hsnCode`} label="HSN Code">
                    <HSNInput name={`items.${index}.hsnCode`} type="hsn" maxLength={8} />
                </FormField>
            </div>

            {/* Quantity */}
            <div className="col-span-6 md:col-span-2">
                <FormField name={`items.${index}.quantity`} label="Quantity" required>
                    <Input 
                        name={`items.${index}.quantity`} 
                        type="number" 
                        step="0.01"
                        min="0.01"
                        placeholder="1" 
                    />
                </FormField>
            </div>

            {/* Unit Price */}
            <div className="col-span-6 md:col-span-2">
                <FormField name={`items.${index}.unitPrice`} label="Unit Price" required>
                    <CurrencyInput 
                        name={`items.${index}.unitPrice`} 
                        placeholder="0.00" 
                    />
                </FormField>
            </div>

            {/* Tax Rate */}
            <div className="col-span-6 md:col-span-2">
                <FormField name={`items.${index}.taxRate`} label="Tax Rate">
                    <PercentageInput 
                        name={`items.${index}.taxRate`} 
                        min={0}
                        max={100}
                        decimals={2}
                    />
                </FormField>
            </div>

            {/* Discount Percent */}
            <div className="col-span-6 md:col-span-2">
                <FormField name={`items.${index}.discountPercent`} label="Discount %">
                    <PercentageInput 
                        name={`items.${index}.discountPercent`} 
                        min={0}
                        max={100}
                        decimals={2}
                    />
                </FormField>
            </div>

            {/* Calculated Amount (Read-only) */}
            <div className="col-span-6 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1.5">
                    Amount
                </label>
                <div className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono text-sm">
                    ₹{calculatedAmount.toFixed(2)}
                </div>
            </div>

            {/* Remove Button */}
            {showRemove && (
                <div className="col-span-12 flex justify-end">
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm flex items-center gap-1 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Remove Line
                    </button>
                </div>
            )}

            {/* Hidden field for lineNumber */}
            <input type="hidden" name={`items.${index}.lineNumber`} value={index + 1} />
        </div>
    );
}
