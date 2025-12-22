/**
 * DatePicker Input Component
 * Native HTML5 date picker with react-hook-form integration
 */

'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputWrapper } from '../InputWrapper';

interface DatePickerProps {
    name: string;
    placeholder?: string;
    min?: string; // ISO date string (YYYY-MM-DD)
    max?: string; // ISO date string (YYYY-MM-DD)
    disabled?: boolean;
    className?: string;
}

export function DatePicker({
    name,
    placeholder,
    min,
    max,
    disabled,
    className = '',
}: DatePickerProps) {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name]?.message as string | undefined;

    return (
        <InputWrapper name={name} error={error}>
            <input
                {...register(name)}
                type="date"
                min={min}
                max={max}
                disabled={disabled}
                placeholder={placeholder}
                className={`
                    w-full px-4 py-2.5 rounded-lg
                    bg-white dark:bg-zinc-800
                    border border-gray-300 dark:border-zinc-700
                    text-gray-900 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-munshi-indigo focus:border-transparent
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors
                    ${error ? 'border-red-500 focus:ring-red-500' : ''}
                    ${className}
                `}
            />
        </InputWrapper>
    );
}
