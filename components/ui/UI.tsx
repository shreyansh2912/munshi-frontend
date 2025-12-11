'use client';

import React, { useEffect, useRef } from 'react';
import { Loader2, X } from 'lucide-react';

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', isLoading, className = '', ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-heading font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-munshi-indigo text-white hover:bg-[#1f2d4d] focus:ring-munshi-indigo shadow-md shadow-munshi-indigo/20 dark:bg-zinc-100 dark:text-black dark:hover:bg-white dark:focus:ring-white",
    secondary: "bg-munshi-teal text-white hover:bg-[#095c55] focus:ring-munshi-teal dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white",
    ghost: "text-munshi-indigo hover:bg-munshi-indigo/5 dark:text-zinc-300 dark:hover:bg-zinc-800",
    outline: "border border-gray-300 text-munshi-subtext hover:bg-gray-50 bg-white dark:bg-black dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/30"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

// --- Cards ---
export const Card: React.FC<{ children: React.ReactNode, className?: string, elevated?: boolean, noPadding?: boolean }> = ({ 
  children, className = '', elevated = false, noPadding = false
}) => {
  return (
    <div className={`bg-white dark:bg-munshi-dark-card rounded-2xl ${elevated ? 'shadow-xl shadow-munshi-indigo/10 dark:shadow-none' : 'border border-gray-100 dark:border-munshi-dark-border shadow-sm dark:shadow-none'} ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode, variant?: 'success' | 'warning' | 'error' | 'neutral' | 'info' }> = ({ 
  children, variant = 'neutral' 
}) => {
  const styles = {
    success: "bg-munshi-mint/20 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30",
    warning: "bg-munshi-gold/20 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30",
    error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30",
    neutral: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800",
    info: "bg-blue-50 text-munshi-indigo border-blue-100 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800"
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]} inline-flex items-center`}>
      {children}
    </span>
  );
};

// --- Inputs ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">{label}</label>}
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600">{icon}</div>}
      <input 
        className={`w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 focus:border-munshi-indigo focus:ring-1 focus:ring-munshi-indigo dark:focus:ring-zinc-600 dark:focus:border-zinc-600 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-700 ${icon ? 'pl-10' : ''} ${className}`}
        {...props}
      />
    </div>
  </div>
);

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
      <div 
        ref={modalRef}
        className="bg-white dark:bg-munshi-dark-card w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// --- AI Suggestion Box ---
export const AISuggestionBox: React.FC<{ title: string, description: string, onAction?: () => void, actionLabel?: string }> = ({
  title, description, onAction, actionLabel
}) => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#F8FAFF] to-[#EFF4FF] dark:from-zinc-900 dark:to-black border border-blue-100 dark:border-zinc-800 p-5">
    <div className="absolute top-0 right-0 p-3 opacity-10">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-munshi-indigo dark:text-zinc-600"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
    </div>
    <div className="flex items-start gap-3 relative z-10">
      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-black shadow-sm flex items-center justify-center text-munshi-indigo dark:text-white">
         <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-heading font-semibold text-munshi-indigo dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-munshi-subtext dark:text-zinc-400 leading-relaxed mb-3">{description}</p>
        {onAction && (
          <button onClick={onAction} className="text-xs font-medium text-munshi-teal dark:text-teal-400 hover:text-munshi-indigo dark:hover:text-white transition-colors flex items-center">
            {actionLabel} <span className="ml-1">→</span>
          </button>
        )}
      </div>
    </div>
  </div>
);
