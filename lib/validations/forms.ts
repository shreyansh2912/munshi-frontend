/**
 * Form Validation Schemas
 * Complete form schemas matching backend validation
 */

import { z } from 'zod';
import {
    panSchema,
    gstinSchema,
    phoneSchema,
    emailSchema,
    pincodeSchema,
    countryCodeSchema,
    textField,
    numberField,
} from './fields';

/**
 * Customer Form Schema
 * Matches backend: munshi-backend/src/modules/customers/customers.validation.ts
 */
export const customerFormSchema = z.object({
    // Basic Info
    customerCode: textField(50, false),
    name: textField(255),
    legalName: textField(255, false),

    // Tax Info
    gstin: gstinSchema.optional(),
    pan: panSchema.optional(),

    // Contact
    contactPerson: textField(200, false),
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),

    // Billing Address
    billingAddressLine1: textField(255, false),
    billingAddressLine2: textField(255, false),
    billingCity: textField(100, false),
    billingState: textField(100, false),
    billingPincode: pincodeSchema.optional(),
    billingCountry: countryCodeSchema.default('IN'),

    // Shipping Address
    shippingAddressLine1: textField(255, false),
    shippingAddressLine2: textField(255, false),
    shippingCity: textField(100, false),
    shippingState: textField(100, false),
    shippingPincode: pincodeSchema.optional(),
    shippingCountry: countryCodeSchema.default('IN'),

    // Financial
    creditLimit: numberField(0, undefined, false).default(0),
    paymentTermsDays: numberField(0, undefined, false).default(30),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;

/**
 * Invoice Form Schema
 */
export const invoiceFormSchema = z.object({
    invoiceNumber: textField(100),
    customerId: z.number(),
    invoiceDate: z.date(),
    dueDate: z.date().optional(),
    placeOfSupply: textField(100, false),
    notes: textField(1000, false),
    // Items will be handled separately
});

export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

/**
 * Payment Form Schema
 */
export const paymentFormSchema = z.object({
    paymentNumber: textField(100),
    paymentType: z.enum(['receipt', 'payment']),
    paymentDate: z.date(),
    partyType: z.enum(['customer', 'supplier', 'other']),
    partyId: z.number(),
    amount: numberField(1),
    paymentMethod: z.enum(['cash', 'bank_transfer', 'upi', 'card', 'cheque', 'dd', 'other']),
    referenceNumber: textField(255, false),
    notes: textField(1000, false),
});

export type PaymentFormData = z.infer<typeof paymentFormSchema>;

/**
 * Product Form Schema
 * Matches backend: munshi-backend/src/modules/products/products.validation.ts
 */
export const productFormSchema = z.object({
    sku: textField(100),
    name: textField(255),
    description: textField(1000, false),
    categoryId: numberField(1, undefined, false),
    hsnCode: textField(50, false),
    sacCode: textField(50, false),
    productType: z.enum(['goods', 'service']).default('goods'),
    unitId: numberField(1, undefined, false),
    hasVariants: z.boolean().default(false),
    trackInventory: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
