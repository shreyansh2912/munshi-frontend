/**
 * Input Component
 * Base text input with validation styling and error states
 */

'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
    name: string;
    error?: boolean;
    showCounter?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ name, error, showCounter = false, maxLength, type = 'text', ...props }, ref) => {
        const { register, watch } = useFormContext();
        const value = watch(name) || '';

        const baseClasses = `
            w-full px-4 py-2.5 rounded-lg
            border-2 transition-all duration-200
            bg-white dark:bg-zinc-900
            text-munshi-text dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-offset-1
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
                    type={type}
                    maxLength={maxLength}
                    className={`${baseClasses} ${stateClasses}`}
                />
                {showCounter && maxLength && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {value.length}/{maxLength}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
