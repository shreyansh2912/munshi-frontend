/**
 * Validation Helper Utilities
 * 
 * Helper functions for form validation, error handling, and data transformation.
 * Provides reusable utilities for consistent validation across the application.
 * 
 * @module validations/helpers
 */

import { ZodSchema, ZodError } from 'zod';

// ============================================================================
// ERROR FORMATTING
// ============================================================================

/**
 * Format Zod validation errors into a flat object
 * 
 * Converts ZodError into a simple object mapping field names to error messages.
 * This format is compatible with react-hook-form and our Form component.
 * 
 * @param error - Zod validation error
 * @returns Object mapping field names to error messages
 * 
 * @example
 * ```ts
 * try {
 *   schema.parse(data);
 * } catch (error) {
 *   const errors = formatZodErrors(error);
 *   // { email: "Invalid email", password: "Password too short" }
 * }
 * ```
 */
export function formatZodErrors(error: ZodError): Record<string, string> {
    const errors: Record<string, string> = {};

    error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (path && !errors[path]) {
            errors[path] = err.message;
        }
    });

    return errors;
}

// ============================================================================
// PRE-SUBMISSION VALIDATION
// ============================================================================

/**
 * Validate data before submission
 * 
 * Performs validation and returns both success status and formatted errors.
 * Use this before making API calls to prevent unnecessary network requests.
 * 
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with success flag, data, and errors
 * 
 * @example
 * ```ts
 * const result = validateBeforeSubmit(loginSchema, formData);
 * 
 * if (result.success) {
 *   await api.auth.login(result.data);
 * } else {
 *   console.error(result.errors);
 * }
 * ```
 */
export function validateBeforeSubmit<T>(
    schema: ZodSchema<T>,
    data: unknown
): { success: true; data: T; errors: null } | { success: false; data: null; errors: Record<string, string> } {
    try {
        const validated = schema.parse(data);
        return {
            success: true,
            data: validated,
            errors: null,
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                success: false,
                data: null,
                errors: formatZodErrors(error),
            };
        }

        // Re-throw unexpected errors
        throw error;
    }
}

// ============================================================================
// SAFE PARSING
// ============================================================================

/**
 * Safely parse data with Zod schema
 * 
 * Non-throwing version of schema.parse(). Returns the parsed data or null.
 * Useful when you want to handle validation gracefully without try-catch.
 * 
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Parsed data or null if validation fails
 * 
 * @example
 * ```ts
 * const customer = safeParse(createCustomerSchema, formData);
 * 
 * if (customer) {
 *   await api.customers.create(customer);
 * }
 * ```
 */
export function safeParse<T>(schema: ZodSchema<T>, data: unknown): T | null {
    const result = schema.safeParse(data);
    return result.success ? result.data : null;
}

// ============================================================================
// FIELD-SPECIFIC VALIDATORS
// ============================================================================

/**
 * Validate GSTIN format and check digit
 * 
 * Validates Indian GSTIN (Goods and Services Tax Identification Number).
 * Format: 22AAAAA0000A1Z5 (15 characters)
 * 
 * @param gstin - GSTIN to validate
 * @returns True if valid, false otherwise
 */
export function isValidGSTIN(gstin: string): boolean {
    if (!gstin || gstin.length !== 15) return false;

    const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return pattern.test(gstin);
}

/**
 * Validate PAN (Permanent Account Number) format
 * 
 * Validates Indian PAN format.
 * Format: AAAAA0000A (10 characters)
 * 
 * @param pan - PAN to validate
 * @returns True if valid, false otherwise
 */
export function isValidPAN(pan: string): boolean {
    if (!pan || pan.length !== 10) return false;

    const pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return pattern.test(pan);
}

/**
 * Validate Indian pincode format
 * 
 * @param pincode - Pincode to validate
 * @returns True if valid, false otherwise
 */
export function isValidPincode(pincode: string): boolean {
    return /^[0-9]{6}$/.test(pincode);
}

/**
 * Validate phone number format
 * 
 * Accepts various phone number formats including country codes.
 * 
 * @param phone - Phone number to validate
 * @returns True if valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
    if (!phone) return false;

    // Remove all spaces, hyphens, and parentheses
    const cleaned = phone.replace(/[\s\-()]/g, '');

    // Check if it's a valid number with optional + prefix
    return /^\+?[0-9]{10,15}$/.test(cleaned);
}

// ============================================================================
// DATA TRANSFORMATION
// ============================================================================

/**
 * Transform form data for API submission
 * 
 * Cleans up form data by:
 * - Converting empty strings to undefined
 * - Trimming string values
 * - Removing null values
 * 
 * @param data - Raw form data
 * @returns Cleaned data ready for API submission
 */
export function transformFormData<T extends Record<string, any>>(data: T): Partial<T> {
    const transformed: Partial<T> = {};

    for (const [key, value] of Object.entries(data)) {
        // Skip null or undefined
        if (value === null || value === undefined) {
            continue;
        }

        // Convert empty strings to undefined
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (trimmed === '') {
                continue;
            }
            transformed[key as keyof T] = trimmed as any;
        } else {
            transformed[key as keyof T] = value;
        }
    }

    return transformed;
}

/**
 * Merge default values with form data
 * 
 * Useful for update operations where you want to preserve existing values
 * for fields not in the form.
 * 
 * @param existingData - Current data from backend
 * @param formData - New data from form
 * @returns Merged data
 */
export function mergeFormData<T extends Record<string, any>>(
    existingData: T,
    formData: Partial<T>
): T {
    return {
        ...existingData,
        ...transformFormData(formData),
    };
}

// ============================================================================
// ERROR MESSAGES
// ============================================================================

/**
 * Get user-friendly error message for common validation errors
 * 
 * @param errorCode - Error code from validation
 * @returns Human-readable error message
 */
export function getErrorMessage(errorCode: string): string {
    const messages: Record<string, string> = {
        'invalid_type': 'Invalid data type',
        'invalid_string': 'Invalid text format',
        'too_small': 'Value is too short',
        'too_big': 'Value is too long',
        'invalid_email': 'Invalid email address',
        'invalid_url': 'Invalid URL format',
        'invalid_date': 'Invalid date format',
    };

    return messages[errorCode] || 'Validation error';
}

/**
 * Format validation error for display
 * 
 * Converts technical error messages into user-friendly text.
 * 
 * @param field - Field name
 * @param message - Error message
 * @returns Formatted error message
 */
export function formatErrorMessage(field: string, message: string): string {
    // Convert camelCase to Title Case
    const fieldName = field
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();

    return `${fieldName}: ${message}`;
}
