/**
 * Phone Input Component
 * Specialized input for phone numbers with auto-formatting
 */

'use client';

import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { sanitizers } from '@/lib/validations/fields';

interface PhoneInputProps {
    name: string;
    error?: boolean;
    placeholder?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ name, error, placeholder = '+91 98765 43210', ...props }, ref) => {
        const { register, setValue, watch } = useFormContext();
        const value = watch(name) || '';

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Keep only digits
            let digits = sanitizers.digitsOnly(e.target.value);
            
            // Limit to 12 digits (including country code)
            digits = digits.slice(0, 12);
            
            // Auto-format
            let formatted = digits;
            if (digits.startsWith('91') && digits.length > 2) {
                formatted = `+91${digits.slice(2)}`;
            } else if (digits.startsWith('91')) {
                formatted = `+${digits}`;
            }
            
            setValue(name, formatted, { shouldValidate: true });
        };

        const baseClasses = `
            w-full px-4 py-2.5 rounded-lg
            border-2 transition-all duration-200
            bg-white dark:bg-zinc-900
            text-munshi-text dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-offset-1
            font-mono
        `;

        const stateClasses = error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900'
            : 'border-gray-200 dark:border-zinc-700 focus:border-munshi-indigo focus:ring-munshi-indigo/20';

        return (
            <input
                {...register(name)}
                {...props}
                ref={ref}
                type="tel"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={`${baseClasses} ${stateClasses}`}
            />
        );
    }
);

PhoneInput.displayName = 'PhoneInput';
