/**
 * Invoice Calculations Hook
 * Provides real-time calculation of invoice totals
 */

'use client';

import { useMemo } from 'react';

export interface LineItem {
    quantity: number;
    unitPrice: number;
    discountPercent?: number;
    discountAmount?: number;
    taxRate?: number;
}

export interface InvoiceCalculations {
    lineItems: Array<{
        lineTotal: number;
        discountAmount: number;
        taxableAmount: number;
        taxAmount: number;
        lineGrandTotal: number;
    }>;
    subtotal: number;
    totalDiscount: number;
    taxableAmount: number;
    cgst: number;
    sgst: number;
    igst: number;
    totalTax: number;
    grandTotal: number;
}

/**
 * Calculate invoice totals from line items
 * 
 * @param items - Array of line items
 * @param isInterState - Whether invoice is inter-state (for IGST vs CGST+SGST)
 * @returns Calculated totals
 */
export function useInvoiceCalculations(
    items: LineItem[] = [],
    isInterState: boolean = false
): InvoiceCalculations {
    return useMemo(() => {
        const lineItemCalculations = items.map((item) => {
            // Line total = quantity × unit price
            const lineTotal = item.quantity * item.unitPrice;

            // Discount calculation
            let discountAmount = item.discountAmount || 0;
            if (item.discountPercent && item.discountPercent > 0) {
                discountAmount = (lineTotal * item.discountPercent) / 100;
            }

            // Taxable amount = line total - discount
            const taxableAmount = lineTotal - discountAmount;

            // Tax calculation
            const taxRate = item.taxRate || 0;
            const taxAmount = (taxableAmount * taxRate) / 100;

            // Line grand total
            const lineGrandTotal = taxableAmount + taxAmount;

            return {
                lineTotal,
                discountAmount,
                taxableAmount,
                taxAmount,
                lineGrandTotal,
            };
        });

        // Calculate invoice totals
        const subtotal = lineItemCalculations.reduce((sum, item) => sum + item.lineTotal, 0);
        const totalDiscount = lineItemCalculations.reduce((sum, item) => sum + item.discountAmount, 0);
        const taxableAmount = lineItemCalculations.reduce((sum, item) => sum + item.taxableAmount, 0);
        const totalTax = lineItemCalculations.reduce((sum, item) => sum + item.taxAmount, 0);
        const grandTotal = lineItemCalculations.reduce((sum, item) => sum + item.lineGrandTotal, 0);

        // GST split
        let cgst = 0;
        let sgst = 0;
        let igst = 0;

        if (isInterState) {
            // Inter-state: IGST only
            igst = totalTax;
        } else {
            // Intra-state: CGST + SGST (split equally)
            cgst = totalTax / 2;
            sgst = totalTax / 2;
        }

        return {
            lineItems: lineItemCalculations,
            subtotal,
            totalDiscount,
            taxableAmount,
            cgst,
            sgst,
            igst,
            totalTax,
            grandTotal,
        };
    }, [items, isInterState]);
}
