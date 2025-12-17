/**
 * Form Component
 * Root form wrapper using React Hook Form + Zod
 */

'use client';

import React from 'react';
import { useForm, FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

interface FormProps<T extends FieldValues> {
    schema: ZodSchema<T>;
    onSubmit: (data: T) => void | Promise<void>;
    defaultValues?: Partial<T>;
    children: React.ReactNode;
    className?: string;
}

export function Form<T extends FieldValues>({
    schema,
    onSubmit,
    defaultValues,
    children,
    className = '',
}: FormProps<T>) {
    const methods = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as any,
        mode: 'onBlur', // Validate on blur for better UX
    });

    const { handleSubmit, setError } = methods;

    const handleFormSubmit = async (data: T) => {
        try {
            await onSubmit(data);
        } catch (error: any) {
            console.log('[Form] Caught error:', error);
            console.log('[Form] Error structure:', {
                errorCode: error.errorCode,
                errors: error.errors,
                message: error.message,
            });

            // Handle new error format: { field1: "message", field2: "message" }
            if (error.errors && typeof error.errors === 'object') {
                console.log('[Form] Setting validation errors:', error.errors);
                
                // Iterate over error object
                Object.entries(error.errors).forEach(([field, message]) => {
                    setError(field as any, {
                        type: 'manual',
                        message: message as string,
                    });
                });
                
                // Focus first error field
                const firstField = Object.keys(error.errors)[0];
                if (firstField) {
                    setTimeout(() => {
                        const element = document.getElementsByName(firstField)[0] as HTMLElement;
                        element?.focus();
                    }, 100);
                }
            } 
            // Legacy format support: array of {field, message}
            else if (error.details?.errors && Array.isArray(error.details.errors)) {
                console.log('[Form] Setting legacy validation errors:', error.details.errors);
                
                error.details.errors.forEach((err: any) => {
                    const field = err.field || err.path || err.property;
                    const message = err.message || err.error || 'Invalid value';
                    
                    if (field) {
                        setError(field as any, {
                            type: 'manual',
                            message: message,
                        });
                    }
                });
            } else {
                // If no structured errors, show generic error
                console.error('[Form] No structured validation errors found:', error);
            }
            
            // Re-throw so parent components can handle it too
            throw error;
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={className} noValidate>
                {children}
            </form>
        </FormProvider>
    );
}

// Export hook for accessing form context
export { useFormContext } from 'react-hook-form';
export type { UseFormReturn };
