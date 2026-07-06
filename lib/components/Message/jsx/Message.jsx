"use client";
import "./Message.css";
import React, { useState } from "react";

export const Message = ({ variant = "default", title, children, showIcon = true, icon, closable = false, onClose, className = "", }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    if (!isVisible) {
        return null;
    }

    const getDefaultIcon = () => {
        switch (variant) {
            case "success":
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mda-message__icon-tone--success">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case "error":
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mda-message__icon-tone--error">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                );
            case "warning":
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mda-message__icon-tone--warning">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                );
            default:
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mda-message__icon-tone--default">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                );
        }
    };

    return (
        <div className={["mda-message", `mda-message--${variant}`, className].filter(Boolean).join(" ")}>
            <div className="mda-message__content">
                {showIcon && <div className="mda-message__icon">{icon || getDefaultIcon()}</div>}

                <div className="mda-message__body">
                    {title && <h4 className="mda-message__title">{title}</h4>}
                    <div className="mda-message__text">{children}</div>
                </div>

                {closable && (
                    <button type="button" onClick={handleClose} className={["mda-message__close", `mda-message__close--${variant}`].join(" ")}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

Message.displayName = "Message";
