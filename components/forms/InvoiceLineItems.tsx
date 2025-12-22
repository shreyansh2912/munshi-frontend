/**
 * Invoice Line Items Component
 * Manages array of invoice line items with add/remove functionality
 */

'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { InvoiceLineItem } from './InvoiceLineItem';
import { useInvoiceCalculations } from '@/lib/hooks/useInvoiceCalculations';
import { Plus } from 'lucide-react';
import type { InvoiceLineItemData } from '@/lib/validations/forms';

export function InvoiceLineItems() {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    // Watch all items for calculations
    const items = watch('items') || [];
    const calculations = useInvoiceCalculations(items);

    const addLineItem = () => {
        const newItem: Partial<InvoiceLineItemData> = {
            lineNumber: fields.length + 1,
            description: '',
            quantity: 1,
            unitPrice: 0,
            taxRate: 18, // Default GST rate
            discountPercent: 0,
            discountAmount: 0,
        };
        append(newItem);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white">
                    Line Items
                </h3>
                <button
                    type="button"
                    onClick={addLineItem}
                    className="flex items-center gap-2 px-4 py-2 bg-munshi-indigo text-white rounded-lg hover:bg-munshi-indigo/90 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Line Item
                </button>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
                {fields.map((field, index) => (
                    <InvoiceLineItem
                        key={field.id}
                        index={index}
                        onRemove={() => remove(index)}
                        showRemove={fields.length > 1}
                        calculatedAmount={calculations.lineItems[index]?.lineGrandTotal || 0}
                    />
                ))}

                {fields.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-zinc-400">
                        <p>No line items yet. Click "Add Line Item" to get started.</p>
                    </div>
                )}
            </div>

            {/* Totals Summary */}
            {fields.length > 0 && (
                <div className="mt-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h4 className="text-md font-semibold text-munshi-indigo dark:text-white mb-4">
                        Invoice Totals
                    </h4>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-zinc-400">Subtotal:</span>
                            <span className="font-mono text-gray-900 dark:text-white">
                                ₹{calculations.subtotal.toFixed(2)}
                            </span>
                        </div>

                        {calculations.totalDiscount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-zinc-400">Total Discount:</span>
                                <span className="font-mono text-red-600 dark:text-red-400">
                                    -₹{calculations.totalDiscount.toFixed(2)}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-zinc-400">Taxable Amount:</span>
                            <span className="font-mono text-gray-900 dark:text-white">
                                ₹{calculations.taxableAmount.toFixed(2)}
                            </span>
                        </div>

                        {/* GST Breakdown */}
                        {calculations.cgst > 0 && (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-zinc-400">CGST (9%):</span>
                                    <span className="font-mono text-gray-900 dark:text-white">
                                        ₹{calculations.cgst.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-zinc-400">SGST (9%):</span>
                                    <span className="font-mono text-gray-900 dark:text-white">
                                        ₹{calculations.sgst.toFixed(2)}
                                    </span>
                                </div>
                            </>
                        )}

                        {calculations.igst > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-zinc-400">IGST (18%):</span>
                                <span className="font-mono text-gray-900 dark:text-white">
                                    ₹{calculations.igst.toFixed(2)}
                                </span>
                            </div>
                        )}

                        <div className="border-t border-gray-200 dark:border-zinc-700 pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span className="text-gray-900 dark:text-white">Grand Total:</span>
                                <span className="font-mono text-munshi-indigo dark:text-white">
                                    ₹{calculations.grandTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
