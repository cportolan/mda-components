"use client";
import "./Checkbox.css";
import React, { useState } from "react";

export const Checkbox = React.forwardRef(({ checked, defaultChecked = false, onChange, size = "md", disabled = false, label, error = false, indeterminate = false, className = "", ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const checkboxRef = React.useRef(null);
    const combinedRef = ref || checkboxRef;

    const handleChange = (e) => {
        if (!isControlled) {
            setInternalChecked(e.target.checked);
        }
        onChange?.(e);
    };

    React.useEffect(() => {
        if (combinedRef.current) {
            combinedRef.current.indeterminate = indeterminate || false;
        }
    }, [indeterminate, combinedRef]);

    const classes = [
        "mda-checkbox__input",
        `mda-checkbox__input--${size}`,
        error ? "mda-checkbox__input--error" : "mda-checkbox__input--default",
        isChecked || indeterminate ? "mda-checkbox__input--checked" : "mda-checkbox__input--unchecked",
        !disabled ? "mda-checkbox__input--hoverable" : "",
    ].filter(Boolean).join(" ");

    return (
        <label className={["mda-checkbox", disabled ? "mda-checkbox--disabled" : "mda-checkbox--interactive", className].filter(Boolean).join(" ")}>
            <div className="mda-checkbox__control">
                <input
                    ref={combinedRef}
                    type="checkbox"
                    checked={isControlled ? checked : undefined}
                    defaultChecked={isControlled ? undefined : defaultChecked}
                    onChange={handleChange}
                    disabled={disabled}
                    className={classes}
                    {...props}
                />

                {isChecked && !indeterminate && (
                    <svg className="mda-checkbox__check-icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}

                {indeterminate && <div className="mda-checkbox__indeterminate" />}
            </div>

            {label && (
                <span className={["mda-checkbox__label", error ? "mda-checkbox__label--error" : ""].filter(Boolean).join(" ")}>
                    {label}
                </span>
            )}
        </label>
    );
});

Checkbox.displayName = "Checkbox";
