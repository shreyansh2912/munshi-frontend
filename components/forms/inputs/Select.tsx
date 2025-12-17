/**
 * Select Component
 * Dropdown select with validation styling
 */

'use client';

import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
    name: string;
    error?: boolean;
    options: Array<{ value: string | number; label: string }>;
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ name, error, options, placeholder, ...props }, ref) => {
        const { register } = useFormContext();

        const baseClasses = `
            w-full px-4 py-2.5 rounded-lg
            border-2 transition-all duration-200
            bg-white dark:bg-zinc-900
            text-munshi-text dark:text-white
            focus:outline-none focus:ring-2 focus:ring-offset-1
            cursor-pointer
        `;

        const stateClasses = error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900'
            : 'border-gray-200 dark:border-zinc-700 focus:border-munshi-indigo focus:ring-munshi-indigo/20';

        return (
            <select
                {...register(name)}
                {...props}
                ref={ref}
                className={`${baseClasses} ${stateClasses}`}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);

Select.displayName = 'Select';
