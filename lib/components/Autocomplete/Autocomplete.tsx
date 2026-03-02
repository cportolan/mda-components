"use client";

import React, { useState, useRef, useEffect } from "react";
import { AutocompleteProps } from "./Autocomplete.types";

export const Autocomplete = React.forwardRef<
    HTMLInputElement,
    AutocompleteProps
>(
    (
        {
            options,
            placeholder = "Buscar...",
            size = "md",
            error = false,
            disabled = false,
            fullWidth = false,
            className = "",
            value,
            onChange,
            onSelect,
            ...props
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [searchTerm, setSearchTerm] = useState(value || "");
        const [filteredOptions, setFilteredOptions] = useState(options);
        const [highlightedIndex, setHighlightedIndex] = useState(-1);
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const filtered = options.filter((option) =>
                String(option.label)
                    .toLowerCase()
                    .includes(String(searchTerm).toLowerCase())
            );
            setFilteredOptions(filtered);
        }, [searchTerm, options]);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
                ) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setSearchTerm(newValue);
            setIsOpen(true);
            setHighlightedIndex(-1);
            onChange?.(e);
        };

        const handleOptionClick = (option: (typeof options)[0]) => {
            if (option.disabled) return;
            setSearchTerm(option.label);
            setIsOpen(false);
            onSelect?.(option);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!isOpen) {
                if (e.key === "ArrowDown" || e.key === "Enter") {
                    setIsOpen(true);
                }
                return;
            }

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setHighlightedIndex((prev) =>
                        prev < filteredOptions.length - 1 ? prev + 1 : prev
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                    break;
                case "Enter":
                    e.preventDefault();
                    if (
                        highlightedIndex >= 0 &&
                        filteredOptions[highlightedIndex]
                    ) {
                        handleOptionClick(filteredOptions[highlightedIndex]);
                    }
                    break;
                case "Escape":
                    setIsOpen(false);
                    setHighlightedIndex(-1);
                    break;
            }
        };

        const baseStyles =
            "rounded-[10px] border transition-all duration-300 ease-out focus:outline-none bg-[#f6f6f6] pr-[45px]";

        const sizes = {
            sm: "px-3 py-2 text-sm",
            md: "px-5 py-2.5 text-[15px]",
            lg: "px-6 py-3 text-lg",
        };

        const stateStyles = error
            ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.3)] text-red-900"
            : "border-[#70f787] focus:border-[#83c442] focus:shadow-[0_0_10px_rgba(128,255,0,0.426)] text-[#3f3f3f]";

        const disabledStyles = disabled
            ? "bg-[#f0f0f0] border-[#e2e2e2] cursor-not-allowed opacity-60"
            : "";

        const widthClass = fullWidth ? "w-full" : "";

        const inputClasses = `${baseStyles} ${sizes[size]} ${stateStyles} ${disabledStyles} ${widthClass} ${className}`;

        return (
            <div
                ref={containerRef}
                className={`relative inline-flex self-start ${fullWidth ? "w-full" : "w-auto"}`}
            >
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

                {/* Custom arrow icon */}
                <div className="pointer-events-none absolute right-3 top-[55%] z-1 -translate-y-1/2 opacity-75">
                    <svg
                        className={`transition-colors duration-300 ${
                            error ? "text-red-400" : "text-[#83c442]"
                        } ${disabled ? "opacity-50" : ""}`}
                        width="22"
                        height="22"
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

                {/* Dropdown with smooth animations */}
                {isOpen && filteredOptions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-2 mt-1.5 animate-[fadeIn_0.12s_ease-out]">
                        <div className="max-h-[200px] overflow-y-auto rounded-[14px] border border-[rgba(131,196,66,0.35)] bg-white py-1.5 shadow-[0_10px_24px_rgba(131,196,66,0.18)] [&::-webkit-scrollbar-thumb:hover]:bg-[rgba(131,196,66,0.65)] [&::-webkit-scrollbar-thumb]:rounded-[20px] [&::-webkit-scrollbar-thumb]:bg-[rgba(131,196,66,0.45)] [&::-webkit-scrollbar]:w-1.5">
                            {filteredOptions.map((option, index) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleOptionClick(option)}
                                    className={`mx-1.5 my-0.5 cursor-pointer rounded-[10px] px-3.5 py-2.5 text-[15px] text-[#2f2f2f] transition-all duration-150 ease-out ${
                                        option.disabled
                                            ? "cursor-not-allowed opacity-40"
                                            : "hover:bg-[rgba(131,196,66,0.12)] hover:pl-5"
                                    } ${
                                        index === highlightedIndex
                                            ? "bg-[rgba(131,196,66,0.22)] pl-5 font-semibold text-[#1f3a0f]"
                                            : ""
                                    }`}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty state with animation */}
                {isOpen && filteredOptions.length === 0 && (
                    <div className="absolute left-0 right-0 top-full z-2 mt-1.5 animate-[fadeIn_0.12s_ease-out]">
                        <div className="rounded-[14px] border border-[rgba(131,196,66,0.35)] bg-white px-4 py-6 text-center shadow-[0_10px_24px_rgba(131,196,66,0.18)]">
                            <svg
                                className="mx-auto mb-2 h-8 w-8 text-[#83c442] opacity-75"
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
                            <p className="text-[15px] text-[#2f2f2f]">
                                No se encontraron resultados
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

Autocomplete.displayName = "Autocomplete";
