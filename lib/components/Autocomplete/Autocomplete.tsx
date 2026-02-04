'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AutocompleteProps } from './Autocomplete.types';

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      placeholder = 'Buscar...',
      size = 'md',
      error = false,
      disabled = false,
      fullWidth = false,
      className = '',
      value,
      onChange,
      onSelect,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value || '');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const filtered = options.filter((option) =>
        String(option.label).toLowerCase().includes(String(searchTerm).toLowerCase())
      );
      setFilteredOptions(filtered);
    }, [searchTerm, options]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchTerm(newValue);
      setIsOpen(true);
      setHighlightedIndex(-1);
      onChange?.(e);
    };

    const handleOptionClick = (option: typeof options[0]) => {
      if (option.disabled) return;
      setSearchTerm(option.label);
      setIsOpen(false);
      onSelect?.(option);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleOptionClick(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    const baseStyles =
      'rounded-xl border-2 transition-all duration-300 ease-out focus:outline-none bg-white dark:bg-gray-900 shadow-sm hover:shadow-md focus:shadow-lg';

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const stateStyles = error
      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-900/30 text-red-900 dark:text-red-200'
      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:focus:border-blue-400 dark:focus:ring-blue-900/30 text-gray-900 dark:text-gray-100';

    const disabledStyles = disabled
      ? 'opacity-60 cursor-not-allowed hover:shadow-sm'
      : '';

    const widthClass = fullWidth ? 'w-full' : '';

    const inputClasses = `${baseStyles} ${sizes[size]} ${stateStyles} ${disabledStyles} ${widthClass} ${className}`;

    return (
      <div ref={containerRef} className={`relative ${fullWidth ? 'w-full' : ''}`}>
        <input
          ref={ref}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />

        {/* Dropdown with smooth animations */}
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-500 mt-2 w-full animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="max-h-60 overflow-auto rounded-xl border-2 border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900 backdrop-blur-sm">
              {filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`cursor-pointer px-4 py-3 transition-all duration-200 ease-out first:rounded-t-xl last:rounded-b-xl ${
                    option.disabled
                      ? 'cursor-not-allowed opacity-40'
                      : 'hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100/50 dark:hover:from-blue-900/30 dark:hover:to-blue-800/20 hover:pl-6'
                  } ${
                    index === highlightedIndex
                      ? 'bg-linear-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/30 pl-6 font-medium'
                      : ''
                  }`}
                >
                  <span className="block text-gray-900 dark:text-gray-100">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom arrow icon */}
        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
          <svg
            className={`transition-colors duration-300 ${
              error
                ? 'text-red-400'
                : 'text-gray-400 dark:text-gray-500'
            } ${disabled ? 'opacity-50' : ''}`}
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Empty state with animation */}
        {isOpen && filteredOptions.length === 0 && (
          <div className="absolute z-50 mt-2 w-full animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="rounded-xl border-2 border-gray-200 bg-white px-4 py-6 text-center shadow-xl dark:border-gray-700 dark:bg-gray-900">
              <svg
                className="mx-auto mb-2 h-8 w-8 text-gray-400 dark:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No se encontraron resultados
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';

