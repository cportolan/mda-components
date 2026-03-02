"use client";

import React, { useState } from "react";
import { MessageProps } from "./Message.types";

export const Message: React.FC<MessageProps> = ({
    variant = "default",
    title,
    children,
    showIcon = true,
    icon,
    closable = false,
    onClose,
    className = "",
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    if (!isVisible) return null;

    const variantStyles = {
        success: {
            container:
                "bg-green-50 border-none text-[#1f3a0f] hover:bg-green-100/50",
            icon: "text-[#83c442]",
            closeButton: "text-[#83c442] hover:bg-[#83c442] hover:text-white",
        },
        error: {
            container: "bg-red-50 border-none text-red-900 hover:bg-red-100/50",
            icon: "text-red-500",
            closeButton: "text-red-500 hover:bg-red-500 hover:text-white",
        },
        warning: {
            container:
                "bg-amber-50 border-none text-amber-900 hover:bg-amber-100/50",
            icon: "text-amber-500",
            closeButton: "text-amber-600 hover:bg-amber-500 hover:text-white",
        },
        default: {
            container:
                "bg-gray-50 border-none text-[#3f3f3f] hover:bg-gray-100/50",
            icon: "text-gray-500",
            closeButton: "text-gray-500 hover:bg-gray-500 hover:text-white",
        },
    };

    const styles = variantStyles[variant];

    const getDefaultIcon = () => {
        switch (variant) {
            case "success":
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={styles.icon}
                    >
                        <path
                            d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22 4L12 14.01l-3-3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case "error":
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={styles.icon}
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M15 9l-6 6M9 9l6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                );
            case "warning":
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={styles.icon}
                    >
                        <path
                            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 9v4M12 17h.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                );
            case "default":
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={styles.icon}
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M12 16v-4M12 8h.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                );
        }
    };

    return (
        <div
            className={`rounded-[10px] border-2 p-4 transition-all duration-300 ${styles.container} ${className}`}
        >
            <div className="flex gap-3">
                {showIcon && (
                    <div className="shrink-0 pt-0.5">
                        {icon || getDefaultIcon()}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    {title && (
                        <h4 className="mb-1 text-sm font-semibold">{title}</h4>
                    )}
                    <div className="text-sm">{children}</div>
                </div>

                {closable && (
                    <button
                        type="button"
                        onClick={handleClose}
                        className={`shrink-0 rounded-md p-1 transition-all duration-200 ${styles.closeButton}`}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

Message.displayName = "Message";
