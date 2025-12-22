/**
 * PercentageInput Component
 * Percentage input with % symbol and 0-100 validation
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputWrapper } from '../InputWrapper';

interface PercentageInputProps {
    name: string;
    placeholder?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    decimals?: number;
    className?: string;
}

export function PercentageInput({
    name,
    placeholder = '0',
    disabled,
    min = 0,
    max = 100,
    decimals = 2,
    className = '',
}: PercentageInputProps) {
    const { register, setValue, watch, formState: { errors } } = useFormContext();
    const error = errors[name]?.message as string | undefined;
    const value = watch(name);
    const [displayValue, setDisplayValue] = useState('');

    // Format display value when the underlying value changes
    useEffect(() => {
        if (value !== undefined && value !== null && value !== '') {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numValue)) {
                setDisplayValue(String(numValue));
            }
        } else {
            setDisplayValue('');
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        
        // Allow empty input
        if (inputValue === '') {
            setDisplayValue('');
            setValue(name, undefined);
            return;
        }

        // Remove non-numeric characters except decimal point
        const cleanedValue = inputValue.replace(/[^\d.]/g, '');
        
        // Prevent multiple decimal points
        const parts = cleanedValue.split('.');
        let formatted = parts[0];
        if (parts.length > 1) {
            formatted += '.' + parts.slice(1).join('').slice(0, decimals);
        }

        setDisplayValue(formatted);
        
        // Convert to number for form value
        const numValue = parseFloat(formatted);
        if (!isNaN(numValue)) {
            // Clamp value between min and max
            const clampedValue = Math.min(Math.max(numValue, min), max);
            setValue(name, clampedValue, { shouldValidate: true });
        }
    };

    const handleBlur = () => {
        if (displayValue && !isNaN(parseFloat(displayValue))) {
            const numValue = parseFloat(displayValue);
            const clampedValue = Math.min(Math.max(numValue, min), max);
            setDisplayValue(String(clampedValue));
            setValue(name, clampedValue, { shouldValidate: true });
        }
    };

    return (
        <InputWrapper name={name} error={error}>
            <div className="relative">
                <input
                    {...register(name)}
                    type="text"
                    inputMode="decimal"
                    value={displayValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        w-full px-4 pr-10 py-2.5 rounded-lg
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
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-zinc-400 pointer-events-none">
                    %
                </span>
            </div>
        </InputWrapper>
    );
}
