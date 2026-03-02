"use client";

import React, { useState } from "react";
import { CheckboxProps } from "./Checkbox.types";

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            checked,
            defaultChecked = false,
            onChange,
            size = "md",
            disabled = false,
            label,
            error = false,
            indeterminate = false,
            className = "",
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
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6",
        };

        const checkboxRef = React.useRef<HTMLInputElement>(null);
        const combinedRef = (ref as any) || checkboxRef;

        React.useEffect(() => {
            if (combinedRef.current) {
                combinedRef.current.indeterminate = indeterminate || false;
            }
        }, [indeterminate, combinedRef]);

        const stateStyles = error
            ? "border-red-400 focus:ring-red-100"
            : "border-[#70f787] focus:ring-[#83c442]/20";

        return (
            <label
                className={`group inline-flex items-center gap-2.5 ${
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                } ${className}`}
            >
                <div className="relative flex items-center justify-center">
                    <input
                        ref={combinedRef}
                        type="checkbox"
                        checked={isControlled ? checked : undefined}
                        defaultChecked={
                            isControlled ? undefined : defaultChecked
                        }
                        onChange={handleChange}
                        disabled={disabled}
                        className={`peer appearance-none rounded-lg border-2 transition-all duration-300 ease-out focus:outline-none focus:ring-4 ${
                            sizes[size]
                        } ${stateStyles} ${
                            isChecked || indeterminate
                                ? "bg-[#83c442] border-[#83c442]"
                                : "bg-white hover:border-[#83c442] hover:shadow-md"
                        } ${!disabled && "group-hover:scale-110"}`}
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
                                ? "text-red-600"
                                : "text-[#3f3f3f] group-hover:text-[#1f3a0f]"
                        }`}
                    >
                        {label}
                    </span>
                )}
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";
