"use client";
import "./Input.css";
import React, { useState } from "react";

export const Input = React.forwardRef(({ type = "text", placeholder, size = "md", error = false, disabled = false, fullWidth = false, label, helperText, leftIcon, rightIcon, className = "", value, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleNumberInput = (e) => {
        if (type === "number") {
            const allowedKeys = ["Backspace", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "Delete", ".", "-"];
            const isNumber = /^[0-9]$/.test(e.key);
            if (!isNumber && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
            }
        }
    };

    const handleEmailValidation = (e) => {
        if (type === "email" && e.target.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(e.target.value)) {
                e.target.setCustomValidity("Por favor, ingrese un email válido");
            }
            else {
                e.target.setCustomValidity("");
            }
        }
        onChange?.(e);
    };

    const handleTelInput = (e) => {
        if (type === "tel") {
            const allowedKeys = ["Backspace", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "Delete"];
            const allowedChars = /^[0-9+\-() ]$/;
            if (!allowedChars.test(e.key) && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
            }
        }
    };

    const inputClasses = [
        "mda-input__field",
        `mda-input__field--${size}`,
        error ? "mda-input__field--error" : "mda-input__field--default",
        disabled ? "mda-input__field--disabled" : "",
        fullWidth ? "mda-input__field--full" : "",
        leftIcon ? "mda-input__field--with-left-icon" : "",
        rightIcon || type === "password" ? "mda-input__field--with-right-icon" : "",
        className,
    ].filter(Boolean).join(" ");

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className={["mda-input", fullWidth ? "mda-input--full" : "mda-input--auto"].join(" ")}>
            {label && (
                <label className={["mda-input__label", error ? "mda-input__label--error" : ""].filter(Boolean).join(" ")}>
                    {label}
                </label>
            )}

            <div className={["mda-input__control", fullWidth ? "mda-input__control--full" : "mda-input__control--auto"].join(" ")}>
                {leftIcon && <div className="mda-input__icon mda-input__icon--left">{leftIcon}</div>}

                <input
                    ref={ref}
                    type={inputType}
                    value={value}
                    onChange={type === "email" ? handleEmailValidation : onChange}
                    onKeyDown={type === "number" ? handleNumberInput : type === "tel" ? handleTelInput : undefined}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputClasses}
                    {...props}
                />

                {type === "password" ? (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="mda-input__toggle"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <svg className="mda-input__toggle-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3L21 21M10.584 10.587C10.2087 10.9624 9.99775 11.4708 9.99756 12.0014C9.99737 12.5319 10.208 13.0405 10.583 13.416C10.958 13.7915 11.4664 14.0025 11.997 14.0027C12.5275 14.0029 13.0361 13.7922 13.4116 13.4172M17.882 17.882C16.1232 19.1495 13.9969 19.8418 11.8145 19.8514C8.49109 19.8514 5.55539 18.1004 3 14.5984C4.19345 12.8478 5.73281 11.3699 7.52 10.254M9.878 5.878C10.505 5.6284 11.1567 5.43739 11.822 5.308C15.1454 5.308 18.081 7.059 20.636 10.561C19.6913 11.9517 18.5385 13.1903 17.218 14.234" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg className="mda-input__toggle-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5C8.24261 5 5.43602 6.94 3 10.5C5.43602 14.06 8.24261 16 12 16C15.7574 16 18.564 14.06 21 10.5C18.564 6.94 15.7574 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                ) : rightIcon ? (
                    <div className="mda-input__icon mda-input__icon--right">{rightIcon}</div>
                ) : null}
            </div>

            {helperText && (
                <p className={["mda-input__helper", error ? "mda-input__helper--error" : ""].filter(Boolean).join(" ")}>
                    {helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";
