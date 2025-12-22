/**
 * Custom hook for generic form submission with API integration
 * Handles loading states, toasts, and error mapping
 */

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ValidationError, APIClientError } from '@/lib/api/types';

export interface UseFormSubmissionOptions<TData, TResponse> {
    onSubmit: (data: TData) => Promise<TResponse>;
    onSuccess?: (response: TResponse) => void;
    onError?: (error: Error) => void;
    successMessage?: string;
    errorMessage?: string;
}

export interface UseFormSubmissionReturn<TData> {
    submit: (data: TData) => Promise<void>;
    isSubmitting: boolean;
    error: Error | null;
}

export function useFormSubmission<TData = any, TResponse = any>({
    onSubmit,
    onSuccess,
    onError,
    successMessage = 'Operation completed successfully',
    errorMessage = 'An error occurred',
}: UseFormSubmissionOptions<TData, TResponse>): UseFormSubmissionReturn<TData> {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const submit = async (data: TData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await onSubmit(data);

            toast.success(successMessage);

            if (onSuccess) {
                onSuccess(response);
            }
        } catch (err: any) {
            console.error('Form submission error:', err);
            setError(err);

            // Handle different error types
            if (err instanceof ValidationError) {
                toast.error('Validation error: ' + err.message);
                // Form errors are automatically displayed by react-hook-form
            } else if (err instanceof APIClientError) {
                toast.error(err.message || errorMessage);
            } else {
                toast.error(errorMessage);
            }

            if (onError) {
                onError(err);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        submit,
        isSubmitting,
        error,
    };
}
