"use client";

import React from "react";
import { ButtonProps } from "./Button.types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "md",
            disabled = false,
            loading = false,
            fullWidth = false,
            className = "",
            onClick,
            type = "button",
            ...props
        },
        ref
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary:
                "bg-[#83C442] text-white hover:bg-[#6fb035] active:bg-[#5a9428]",
            secondary:
                "bg-transparent text-[#83C442] border-2 border-[#83C442] hover:bg-[#83C442]/10 active:bg-[#83C442]/20 dark:border-[#83C442] dark:text-[#83C442] dark:hover:bg-[#83C442]/20",
            ghost: "text-[#83C442] hover:bg-[#83C442]/10 active:bg-[#83C442]/20 dark:text-[#83C442] dark:hover:bg-[#83C442]/20",
            danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm gap-1.5",
            md: "px-4 py-2 text-base gap-2",
            lg: "px-6 py-3 text-lg gap-2.5",
        };

        const widthClass = fullWidth ? "w-full" : "";

        const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || loading}
                onClick={onClick}
                className={classes}
                {...props}
            >
                {children}
                {loading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
