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
            "appearance-none rounded-[10px] border transition-all duration-300 ease-out focus:outline-none bg-[#f6f6f6] cursor-pointer";

        const sizes = {
            sm: "px-3 py-2 text-sm pr-10",
            md: "px-5 py-2.5 text-base pr-11",
            lg: "px-6 py-3 text-lg pr-12",
        };

        const stateStyles = error
            ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.3)] text-red-900"
            : "border-[#70f787] focus:border-[#83c442] focus:shadow-[0_0_10px_rgba(128,255,0,0.426)] text-[#3f3f3f]";

        const disabledStyles = disabled
            ? "bg-[#f0f0f0] border-[#e2e2e2] cursor-not-allowed opacity-60"
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
                            error ? "text-red-400" : "text-[#83c442]"
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
