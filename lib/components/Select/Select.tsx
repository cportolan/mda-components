"use client";

import React from "react";
import { SelectProps } from "./Select.types";

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            options,
            placeholder = "Seleccionar...",
            size = "md",
            error = false,
            disabled = false,
            fullWidth = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const baseStyles =
            "appearance-none rounded-xl border-2 transition-all duration-300 ease-out focus:outline-none bg-white dark:bg-gray-900 cursor-pointer shadow-sm hover:shadow-md";

        const sizes = {
            sm: "px-3 py-2 text-sm pr-10",
            md: "px-4 py-3 text-base pr-11",
            lg: "px-5 py-4 text-lg pr-12",
        };

        const stateStyles = error
            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-900/30 text-red-900 dark:text-red-200"
            : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:focus:border-blue-400 dark:focus:ring-blue-900/30 text-gray-900 dark:text-gray-100";

        const disabledStyles = disabled
            ? "opacity-60 cursor-not-allowed hover:shadow-sm"
            : "";

        const widthClass = fullWidth ? "w-full" : "";

        const classes = `${baseStyles} ${sizes[size]} ${stateStyles} ${disabledStyles} ${widthClass} ${className}`;

        return (
            <div
                className={`relative inline-flex self-start ${
                    fullWidth ? "w-full" : "w-auto"
                }`}
            >
                <select
                    ref={ref}
                    disabled={disabled}
                    className={classes}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* Custom arrow icon */}
                <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                    <svg
                        className={`transition-colors duration-300 ${
                            error
                                ? "text-red-400"
                                : "text-gray-400 dark:text-gray-500"
                        } ${disabled ? "opacity-50" : ""}`}
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
            </div>
        );
    }
);

Select.displayName = "Select";
