/**
 * GST Input Component
 * Specialized input for GSTIN with auto-formatting and validation
 */

'use client';

import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { sanitizers } from '@/lib/validations/fields';

interface GSTInputProps {
    name: string;
    error?: boolean;
    placeholder?: string;
}

export const GSTInput = forwardRef<HTMLInputElement, GSTInputProps>(
    ({ name, error, placeholder = '27ABCDE1234F1Z5', ...props }, ref) => {
        const { register, setValue, watch } = useFormContext();
        const value = watch(name) || '';

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Auto-uppercase, alphanumeric only, max 15 chars
            let formatted = sanitizers.uppercase(sanitizers.alphanumeric(e.target.value));
            formatted = formatted.slice(0, 15);
            setValue(name, formatted, { shouldValidate: true });
        };

        const baseClasses = `
            w-full px-4 py-2.5 rounded-lg
            border-2 transition-all duration-200
            bg-white dark:bg-zinc-900
            text-munshi-text dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-offset-1
            font-mono uppercase
        `;

        const stateClasses = error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900'
            : 'border-gray-200 dark:border-zinc-700 focus:border-munshi-indigo focus:ring-munshi-indigo/20';

        return (
            <div className="relative">
                <input
                    {...register(name)}
                    {...props}
                    ref={ref}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    maxLength={15}
                    className={`${baseClasses} ${stateClasses}`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
                    {value.length}/15
                </div>
            </div>
        );
    }
);

GSTInput.displayName = 'GSTInput';
