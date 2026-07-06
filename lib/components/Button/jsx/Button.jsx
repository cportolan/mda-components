"use client";
import "./Button.css";
import React from "react";
export const Button = React.forwardRef(({ children, variant = "primary", size = "md", disabled = false, loading = false, fullWidth = false, className = "", onClick, type = "button", ...props }, ref) => {
    const classes = [
        "mda-button",
        `mda-button--${variant}`,
        `mda-button--${size}`,
        fullWidth ? "mda-button--full" : "",
        className,
    ].filter(Boolean).join(" ");
    return (<button ref={ref} type={type} disabled={disabled || loading} onClick={onClick} className={classes} {...props}>
                {children}
                {loading && (<svg className="mda-button__spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="mda-button__spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="mda-button__spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>)}
            </button>);
});
Button.displayName = "Button";
