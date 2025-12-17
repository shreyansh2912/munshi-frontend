/**
 * Textarea Component
 * Multi-line text input with character counter and validation styling
 */

'use client';

import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
    name: string;
    error?: boolean;
    showCounter?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ name, error, showCounter = false, maxLength, rows = 4, ...props }, ref) => {
        const { register, watch } = useFormContext();
        const value = watch(name) || '';

        const baseClasses = `
            w-full px-4 py-2.5 rounded-lg
            border-2 transition-all duration-200
            bg-white dark:bg-zinc-900
            text-munshi-text dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-offset-1
            resize-vertical
        `;

        const stateClasses = error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900'
            : 'border-gray-200 dark:border-zinc-700 focus:border-munshi-indigo focus:ring-munshi-indigo/20';

        return (
            <div className="relative">
                <textarea
                    {...register(name)}
                    {...props}
                    ref={ref}
                    rows={rows}
                    maxLength={maxLength}
                    className={`${baseClasses} ${stateClasses}`}
                />
                {showCounter && maxLength && (
                    <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                        {value.length}/{maxLength}
                    </div>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
