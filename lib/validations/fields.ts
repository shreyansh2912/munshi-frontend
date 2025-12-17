/**
 * Field Validation Utilities
 * Reusable Zod validation schemas for common business fields
 */

import { z } from 'zod';

/**
 * PAN Card Validation
 * Format: AAAAA9999A (5 letters + 4 numbers + 1 letter)
 * Example: ABCDE1234F
 */
export const panSchema = z
    .string()
    .length(10, 'PAN must be exactly 10 characters')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (AAAAA9999A)')
    .transform((val) => val.toUpperCase());

/**
 * GSTIN Validation  
 * Format: 99AAAAA9999A9Z9 (15 characters)
 * 2 digits (state) + 10 chars (PAN) + 1 letter + 1 digit + 1 letter
 * Example: 27ABCDE1234F1Z5
 */
export const gstinSchema = z
    .string()
    .length(15, 'GSTIN must be exactly 15 characters')
    .regex(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        'Invalid GSTIN format'
    )
    .transform((val) => val.toUpperCase());

/**
 * Phone Number Validation
 * Indian mobile: 10 digits
 * With country code: +91XXXXXXXXXX
 */
export const phoneSchema = z
    .string()
    .regex(/^(\+91)?[6-9][0-9]{9}$/, 'Invalid phone number')
    .transform((val) => val.replace(/\s+/g, '')); // Remove spaces

/**
 * Email Validation
 */
export const emailSchema = z
    .string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .toLowerCase();

/**
 * Pincode Validation
 * Indian pincode: 6 digits
 */
export const pincodeSchema = z
    .string()
    .regex(/^[1-9][0-9]{5}$/, 'Invalid pincode (6 digits required)');

/**
 * Indian State Code (for addresses)
 */
export const stateCodeSchema = z
    .string()
    .max(100, 'State name too long')
    .optional();

/**
 * Country Code (ISO 3166-1 alpha-2)
 */
export const countryCodeSchema = z
    .string()
    .length(2, 'Country code must be 2 characters')
    .toUpperCase();

/**
 * Currency Amount (in paise/cents)
 * Stored as integer in database
 */
export const amountSchema = z
    .number()
    .int('Amount must be a whole number')
    .nonnegative('Amount cannot be negative');

/**
 * Percentage Validation
 */
export const percentageSchema = z
    .number()
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100');

/**
 * Customer Code / Account Code
 */
export const accountCodeSchema = z
    .string()
    .max(50, 'Code too long')
    .regex(/^[A-Z0-9_-]+$/i, 'Only letters, numbers, hyphens, and underscores allowed')
    .toUpperCase();

/**
 * Generic text field with max length
 */
export const textField = (maxLength: number, required = true) => {
    const schema = z.string().max(maxLength, `Maximum ${maxLength} characters allowed`);
    return required ? schema.min(1, 'This field is required') : schema.optional();
};

/**
 * Generic number field
 */
export const numberField = (min?: number, max?: number, required = true) => {
    let schema = z.number();
    if (min !== undefined) schema = schema.min(min, `Minimum value is ${min}`);
    if (max !== undefined) schema = schema.max(max, `Maximum value is ${max}`);
    return required ? schema : schema.optional();
};

/**
 * Input Sanitization Helpers
 */
export const sanitizers = {
    /** Remove all whitespace */
    noSpaces: (value: string) => value.replace(/\s+/g, ''),

    /** Convert to uppercase */
    uppercase: (value: string) => value.toUpperCase(),

    /** Convert to lowercase */
    lowercase: (value: string) => value.toLowerCase(),

    /** Remove special characters, keep alphanumeric */
    alphanumeric: (value: string) => value.replace(/[^a-zA-Z0-9]/g, ''),

    /** Keep only digits */
    digitsOnly: (value: string) => value.replace(/\D/g, ''),

    /** Trim whitespace from edges */
    trim: (value: string) => value.trim(),
};

/**
 * Input Formatters
 */
export const formatters = {
    /** Format phone number: +91 XXXXX XXXXX */
    phone: (value: string) => {
        const digits = sanitizers.digitsOnly(value);
        if (digits.length <= 2) return digits;
        if (digits.startsWith('91')) {
            const number = digits.slice(2);
            if (number.length <= 5) return `+91 ${number}`;
            return `+91 ${number.slice(0, 5)} ${number.slice(5, 10)}`;
        }
        if (digits.length <= 5) return digits;
        return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
    },

    /** Format PAN: AAAAA9999A */
    pan: (value: string) => sanitizers.uppercase(sanitizers.alphanumeric(value)).slice(0, 10),

    /** Format GSTIN */
    gstin: (value: string) => sanitizers.uppercase(sanitizers.alphanumeric(value)).slice(0, 15),

    /** Format amount as INR currency */
    currency: (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(amount / 100); // Convert paise to rupees
    },
};
