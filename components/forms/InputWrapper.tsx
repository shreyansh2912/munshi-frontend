/**
 * Simple Input Wrapper with Error Display
 * Use this to quickly add validation error display to existing forms
 */

import React from 'react';

interface InputWrapperProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactElement;
}

export function InputWrapper({ name, label, error, required, children }: InputWrapperProps) {
  // Clone child and add error styling
  const childWithError = React.cloneElement(children, {
    className: error 
      ? children.props.className?.replace('border-gray-300', 'border-red-500') + ' focus:border-red-500 focus:ring-red-200'
      : children.props.className,
  });

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {childWithError}
      
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
