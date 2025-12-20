/**
 * Shared Validation Schemas
 * 
 * Zod schemas for form validation that match backend validation rules.
 * These schemas ensure data is validated on the frontend before API calls,
 * preventing unnecessary network requests and providing immediate user feedback.
 * 
 * @module validations/schemas
 */

import { z } from 'zod';

// ============================================================================
// COMMON VALIDATORS
// ============================================================================

/**
 * GSTIN validator - 15 alphanumeric characters
 * Format: 22AAAAA0000A1Z5
 */
export const gstinValidator = z
    .string()
    .length(15, 'GSTIN must be exactly 15 characters')
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format')
    .optional()
    .or(z.literal(''));

/**
 * PAN validator - 10 alphanumeric characters
 * Format: AAAAA0000A
 */
export const panValidator = z
    .string()
    .length(10, 'PAN must be exactly 10 characters')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format')
    .optional()
    .or(z.literal(''));

/**
 * Phone number validator - flexible format
 */
export const phoneValidator = z
    .string()
    .max(32, 'Phone number is too long')
    .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format')
    .optional()
    .or(z.literal(''));

/**
 * Email validator with custom error messages
 */
export const emailValidator = z
    .string()
    .email('Invalid email address')
    .max(255, 'Email is too long')
    .optional()
    .or(z.literal(''));

/**
 * Pincode validator - 6 digits for India
 */
export const pincodeValidator = z
    .string()
    .regex(/^[0-9]{6}$/, 'Pincode must be 6 digits')
    .optional()
    .or(z.literal(''));

/**
 * Country code validator - 2 letter ISO code
 */
export const countryCodeValidator = z
    .string()
    .length(2, 'Country code must be 2 characters')
    .regex(/^[A-Z]{2}$/, 'Invalid country code')
    .default('IN');

// ============================================================================
// CUSTOMER SCHEMAS
// ============================================================================

/**
 * Customer creation schema
 * Matches backend validation in customers.validation.ts
 */
export const createCustomerSchema = z.object({
    // Basic Information
    name: z
        .string()
        .min(1, 'Customer name is required')
        .max(255, 'Name is too long')
        .trim(),

    customerCode: z
        .string()
        .max(50, 'Customer code is too long')
        .optional()
        .or(z.literal('')),

    legalName: z
        .string()
        .max(255, 'Legal name is too long')
        .optional()
        .or(z.literal('')),

    contactPerson: z
        .string()
        .max(200, 'Contact person name is too long')
        .optional()
        .or(z.literal('')),

    // Contact Information
    email: emailValidator,
    phone: phoneValidator,

    // Tax Information
    gstin: gstinValidator,
    pan: panValidator,

    // Billing Address
    billingAddressLine1: z
        .string()
        .max(255, 'Address is too long')
        .optional()
        .or(z.literal('')),

    billingAddressLine2: z
        .string()
        .max(255, 'Address is too long')
        .optional()
        .or(z.literal('')),

    billingCity: z
        .string()
        .max(100, 'City name is too long')
        .optional()
        .or(z.literal('')),

    billingState: z
        .string()
        .max(100, 'State name is too long')
        .optional()
        .or(z.literal('')),

    billingPincode: pincodeValidator,
    billingCountry: countryCodeValidator,

    // Shipping Address
    shippingAddressLine1: z
        .string()
        .max(255, 'Address is too long')
        .optional()
        .or(z.literal('')),

    shippingAddressLine2: z
        .string()
        .max(255, 'Address is too long')
        .optional()
        .or(z.literal('')),

    shippingCity: z
        .string()
        .max(100, 'City name is too long')
        .optional()
        .or(z.literal('')),

    shippingState: z
        .string()
        .max(100, 'State name is too long')
        .optional()
        .or(z.literal('')),

    shippingPincode: pincodeValidator,
    shippingCountry: countryCodeValidator,

    // Financial Terms
    creditLimit: z
        .number()
        .min(0, 'Credit limit cannot be negative')
        .default(0),

    paymentTermsDays: z
        .number()
        .int('Payment terms must be a whole number')
        .min(0, 'Payment terms cannot be negative')
        .default(30),
});

/**
 * Customer update schema
 * All fields are optional for partial updates
 */
export const updateCustomerSchema = createCustomerSchema.partial().extend({
    isActive: z.boolean().optional(),
});

// ============================================================================
// AUTH SCHEMAS
// ============================================================================

/**
 * Login schema
 */
export const loginSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required'),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .min(1, 'Password is required'),
});

/**
 * Registration schema
 */
export const registerSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name is too long')
        .trim(),

    email: z
        .string()
        .email('Invalid email address')
        .max(255, 'Email is too long')
        .toLowerCase(),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password is too long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

// ============================================================================
// PRODUCT SCHEMAS
// ============================================================================

/**
 * Product creation schema
 */
export const createProductSchema = z.object({
    name: z
        .string()
        .min(1, 'Product name is required')
        .max(255, 'Name is too long')
        .trim(),

    sku: z
        .string()
        .max(100, 'SKU is too long')
        .optional()
        .or(z.literal('')),

    description: z
        .string()
        .max(1000, 'Description is too long')
        .optional()
        .or(z.literal('')),

    categoryId: z
        .number()
        .int()
        .positive()
        .optional(),

    unitId: z
        .number()
        .int()
        .positive()
        .optional(),

    hsnCode: z
        .string()
        .max(20, 'HSN code is too long')
        .optional()
        .or(z.literal('')),

    price: z
        .number()
        .min(0, 'Price cannot be negative')
        .default(0),

    costPrice: z
        .number()
        .min(0, 'Cost price cannot be negative')
        .optional(),

    taxRate: z
        .number()
        .min(0, 'Tax rate cannot be negative')
        .max(100, 'Tax rate cannot exceed 100%')
        .default(0),

    stockQuantity: z
        .number()
        .min(0, 'Stock cannot be negative')
        .default(0),

    minStockLevel: z
        .number()
        .min(0, 'Minimum stock level cannot be negative')
        .default(0),
});

/**
 * Product update schema
 */
export const updateProductSchema = createProductSchema.partial().extend({
    isActive: z.boolean().optional(),
});

// ============================================================================
// LEDGER SCHEMAS
// ============================================================================

/**
 * Ledger account creation schema
 */
export const createLedgerSchema = z.object({
    accountCode: z
        .string()
        .max(50, 'Account code is too long')
        .optional()
        .or(z.literal('')),

    name: z
        .string()
        .min(1, 'Account name is required')
        .max(255, 'Name is too long')
        .trim(),

    type: z.enum(
        ['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'],
        { errorMap: () => ({ message: 'Invalid account type' }) }
    ),

    parentId: z
        .number()
        .int()
        .positive()
        .optional(),

    description: z
        .string()
        .max(500, 'Description is too long')
        .optional()
        .or(z.literal('')),

    openingBalance: z
        .number()
        .default(0),
});

/**
 * Ledger account update schema
 */
export const updateLedgerSchema = createLedgerSchema.partial().extend({
    isActive: z.boolean().optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateLedgerInput = z.infer<typeof createLedgerSchema>;
export type UpdateLedgerInput = z.infer<typeof updateLedgerSchema>;
