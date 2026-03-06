"use client";

import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { ModalProps, ModalSize } from "./Modal.types";

// ── Animation styles ──────────────────────────────────────────────────────────

const MODAL_STYLES = `
@keyframes mda-modal-in {
    from { opacity: 0; transform: translateY(-25px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes mda-modal-out {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-25px); }
}
.mda-modal-panel-in  { animation: mda-modal-in  0.3s ease forwards; }
.mda-modal-panel-out { animation: mda-modal-out 0.3s ease forwards; }
`;

// ── Size map ──────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<ModalSize, string> = {
    sm: "w-[min(90vw,480px)]",
    md: "w-[min(84vw,720px)]",
    lg: "w-[min(80vw,1000px)]",
    xl: "w-[min(80vw,1200px)]",
    full: "w-[min(96vw,100%)]",
};

// ── Back-arrow icon ───────────────────────────────────────────────────────────

const ArrowLeft = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
    >
        <path
            d="M19 12H5M5 12l7 7M5 12l7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    closeLabel = "Salir",
    headerRight,
    size = "lg",
    closeOnBackdrop = true,
    closeOnEsc = true,
    className = "",
}) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [animOut, setAnimOut] = useState(false);

    // SSR guard
    useEffect(() => {
        setMounted(true);
    }, []);

    // Open / close lifecycle with animation
    useEffect(() => {
        if (isOpen) {
            setAnimOut(false);
            setVisible(true);
            document.body.style.overflow = "hidden";
        } else if (visible) {
            setAnimOut(true);
            document.body.style.overflow = "";
            const t = setTimeout(() => {
                setVisible(false);
                setAnimOut(false);
            }, 300);
            return () => clearTimeout(t);
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Escape key
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (closeOnEsc && e.key === "Escape") onClose();
        },
        [closeOnEsc, onClose]
    );

    useEffect(() => {
        if (visible) {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [visible, handleKeyDown]);

    if (!mounted || !visible) return null;

    const panelClass = animOut ? "mda-modal-panel-out" : "mda-modal-panel-in";

    const node = (
        <>
            <style>{MODAL_STYLES}</style>

            {/* Backdrop */}
            <div
                className="fixed inset-0 z-1000 flex items-center justify-center"
                style={{
                    backgroundColor: "rgba(15,23,42,0.58)",
                    opacity: animOut ? 0 : 1,
                    transition: "opacity 0.3s ease",
                    pointerEvents: animOut ? "none" : "auto",
                }}
                onClick={closeOnBackdrop ? onClose : undefined}
                aria-modal="true"
                role="dialog"
            >
                {/* Panel */}
                <div
                    className={[
                        "relative bg-white rounded-3xl",
                        "px-10.5 py-8",
                        "max-h-[92vh] overflow-y-auto overflow-x-hidden",
                        "shadow-[0_24px_80px_rgba(15,23,42,0.22),0_8px_30px_rgba(15,23,42,0.16)]",
                        "text-base leading-relaxed",
                        "max-md:px-5.5 max-md:py-6 max-md:w-[min(94vw,100%)]",
                        "max-sm:rounded-2xl max-sm:px-3.5 max-sm:py-4 max-sm:max-h-dvh max-sm:w-full",
                        SIZE_MAP[size],
                        panelClass,
                        className,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header row */}
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-3.5">
                        {/* Close / back link */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center gap-2 text-[#0800e1] font-semibold text-[15px] leading-none cursor-pointer bg-transparent border-0 p-0 hover:underline hover:text-[#1d4ed8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0800e1]/40 rounded-sm"
                        >
                            <ArrowLeft />
                            {closeLabel}
                        </button>

                        {/* Slot derecho */}
                        {headerRight && (
                            <div className="inline-flex items-center justify-end ml-auto">
                                {headerRight}
                            </div>
                        )}
                    </div>

                    {/* Body */}
                    {children}
                </div>
            </div>
        </>
    );

    return ReactDOM.createPortal(node, document.body);
};

Modal.displayName = "Modal";
