'use client';

import React, { useState } from 'react';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      size = 'md',
      disabled = false,
      label,
      error = false,
      indeterminate = false,
      className = '',
      ...props
    },
    ref
  ) => {
    // Estado interno para componentes no controlados
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const checkboxRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (ref as any) || checkboxRef;

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate, combinedRef]);

    const stateStyles = error
      ? 'border-red-400 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-900/30'
      : 'border-gray-300 focus:ring-blue-100 dark:border-gray-600 dark:focus:ring-blue-900/30';

    return (
      <label
        className={`group inline-flex items-center gap-2.5 ${
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        } ${className}`}
      >
        <div className="relative flex items-center justify-center">
          <input
            ref={combinedRef}
            type="checkbox"
            checked={isControlled ? checked : undefined}
            defaultChecked={isControlled ? undefined : defaultChecked}
            onChange={handleChange}
            disabled={disabled}
            className={`peer appearance-none rounded-lg border-2 transition-all duration-300 ease-out focus:outline-none focus:ring-4 ${
              sizes[size]
            } ${stateStyles} ${
              isChecked || indeterminate
                ? 'bg-linear-to-br from-blue-500 to-blue-600 border-blue-600 dark:from-blue-600 dark:to-blue-700 dark:border-blue-700 shadow-lg shadow-blue-500/30'
                : 'bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'
            } ${
              !disabled && 'group-hover:scale-110'
            }`}
            {...props}
          />
          
          {/* Check icon */}
          {isChecked && !indeterminate && (
            <svg
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-white animate-in zoom-in duration-200"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          
          {/* Indeterminate line */}
          {indeterminate && (
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 w-2.5 rounded-full bg-white animate-in zoom-in duration-200" />
          )}
        </div>
        
        {label && (
          <span
            className={`select-none transition-colors duration-200 ${
              error
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100'
            }`}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';


