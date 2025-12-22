/**
 * HSNInput Component
 * HSN/SAC code input with validation and formatting
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputWrapper } from '../InputWrapper';

interface HSNInputProps {
    name: string;
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
    type?: 'hsn' | 'sac'; // HSN for goods, SAC for services
    className?: string;
}

export function HSNInput({
    name,
    placeholder = 'e.g., 12345678',
    disabled,
    maxLength = 8,
    type = 'hsn',
    className = '',
}: HSNInputProps) {
    const { register, setValue, watch, formState: { errors } } = useFormContext();
    const error = errors[name]?.message as string | undefined;
    const value = watch(name) || '';
    const [displayValue, setDisplayValue] = useState('');

    // Format display value
    useEffect(() => {
        if (value) {
            setDisplayValue(String(value));
        } else {
            setDisplayValue('');
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        
        // Remove non-numeric characters
        const cleaned = inputValue.replace(/\D/g, '');
        
        // Limit to maxLength
        const limited = cleaned.slice(0, maxLength);
        
        setDisplayValue(limited);
        setValue(name, limited || undefined, { shouldValidate: true });
    };

    const label = type === 'hsn' ? 'HSN' : 'SAC';
    
    return (
        <InputWrapper name={name} error={error}>
            <>
                <div className="relative">
                    <input
                        {...register(name)}
                        type="text"
                        inputMode="numeric"
                        value={displayValue}
                        onChange={handleChange}
                        disabled={disabled}
                        placeholder={placeholder}
                        maxLength={maxLength}
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
                    {displayValue && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-zinc-500">
                            {displayValue.length}/{maxLength}
                        </span>
                    )}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
                    {label} code (4-8 digits)
                </p>
            </>
        </InputWrapper>
    );
}
