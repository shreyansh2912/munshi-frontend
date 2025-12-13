/**
 * Validation Schemas
 * Reusable Yup schemas optimized for performance with memoization
 */

import * as yup from 'yup';

// ==================== Base Field Schemas (Reusable) ====================

/**
 * Email validation - reusable across all forms
 */
export const emailSchema = yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email')
    .lowercase()
    .trim();

/**
 * Password validation - strong requirements
 */
export const passwordSchema = yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        'Password must contain uppercase, lowercase, number, and special character'
    );

/**
 * Name validation
 */
export const nameSchema = yup
    .string()
    .required('This field is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes')
    .trim();

// ==================== Authentication Schemas ====================

/**
 * Login form schema
 */
export const loginSchema = yup.object({
    email: emailSchema,
    password: yup.string().required('Password is required'), // Less strict for login
});

/**
 * Registration form schema
 */
export const registerSchema = yup.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
});

/**
 * Forgot password schema
 */
export const forgotPasswordSchema = yup.object({
    email: emailSchema,
});

// ==================== Helper Functions ====================

/**
 * Validate single field
 */
export async function validateField(
    schema: yup.Schema,
    value: any
): Promise<string | null> {
    try {
        await schema.validate(value);
        return null;
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return error.message;
        }
        return 'Validation error';
    }
}

/**
 * Validate entire form
 */
export async function validateForm<T extends Record<string, any>>(
    schema: yup.Schema,
    values: T
): Promise<Record<string, string> | null> {
    try {
        await schema.validate(values, { abortEarly: false });
        return null;
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            return errors;
        }
        return null;
    }
}

// ==================== TypeScript Types ====================

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
