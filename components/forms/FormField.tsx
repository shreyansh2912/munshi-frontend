/**
 * FormField Component
 * Wrapper for form inputs with label, error display, and validation styling
 */

'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
    name: string;
    label?: string;
    required?: boolean;
    helpText?: string;
    children: React.ReactElement;
    className?: string;
}

export function FormField({
    name,
    label,
    required = false,
    helpText,
    children,
    className = '',
}: FormFieldProps) {
    const {
        formState: { errors },
    } = useFormContext();

    const error = errors[name];
    const errorMessage = error?.message as string;

    // Clone child and inject error state
    const childWithProps = React.cloneElement(children, {
        name,
        id: name,
        error: !!error,
        'aria-invalid': !!error,
        'aria-describedby': error ? `${name}-error` : undefined,
    });

    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-munshi-text dark:text-gray-200 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {childWithProps}

            {helpText && !error && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpText}</p>
            )}

            {error && (
                <p
                    id={`${name}-error`}
                    className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
                    role="alert"
                >
                    <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
