"use client";
import "./Select.css";
import React from "react";

export const Select = React.forwardRef(({ options, placeholder = "Seleccionar...", size = "md", error = false, disabled = false, fullWidth = false, className = "", ...props }, ref) => {
    const classes = [
        "mda-select__field",
        `mda-select__field--${size}`,
        error ? "mda-select__field--error" : "mda-select__field--default",
        disabled ? "mda-select__field--disabled" : "",
        fullWidth ? "mda-select__field--full" : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <div className={["mda-select", fullWidth ? "mda-select--full" : "mda-select--auto"].join(" ")}>
            <select ref={ref} disabled={disabled} className={classes} {...props}>
                {placeholder && <option value="" disabled>{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div className="mda-select__arrow">
                <svg className={["mda-select__arrow-icon", error ? "mda-select__arrow-icon--error" : "", disabled ? "mda-select__arrow-icon--disabled" : ""].filter(Boolean).join(" ")} width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
});

Select.displayName = "Select";
