"use client";
import "./Modal.css";
import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";

const SIZE_MAP = {
    sm: "mda-modal__panel--sm",
    md: "mda-modal__panel--md",
    lg: "mda-modal__panel--lg",
    xl: "mda-modal__panel--xl",
    full: "mda-modal__panel--full",
};

const ArrowLeft = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mda-modal__back-icon">
        <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Modal = ({ isOpen, onClose, children, closeLabel = "Salir", headerRight, size = "lg", closeOnBackdrop = true, closeOnEsc = true, className = "", }) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [animOut, setAnimOut] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setAnimOut(false);
            setVisible(true);
            document.body.style.overflow = "hidden";
        }
        else if (visible) {
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
    }, [isOpen, visible]);

    const handleKeyDown = useCallback((e) => {
        if (closeOnEsc && e.key === "Escape") onClose();
    }, [closeOnEsc, onClose]);

    useEffect(() => {
        if (visible) {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [visible, handleKeyDown]);

    if (!mounted || !visible) return null;

    const node = (
        <div
            className={["mda-modal", animOut ? "mda-modal--closing" : "",].filter(Boolean).join(" ")}
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-modal="true"
            role="dialog"
        >
            <div
                className={["mda-modal__panel", SIZE_MAP[size], animOut ? "mda-modal__panel--out" : "mda-modal__panel--in", className].filter(Boolean).join(" ")}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mda-modal__header">
                    <button type="button" onClick={onClose} className="mda-modal__back">
                        <ArrowLeft />
                        {closeLabel}
                    </button>

                    {headerRight && <div className="mda-modal__header-right">{headerRight}</div>}
                </div>

                {children}
            </div>
        </div>
    );

    return ReactDOM.createPortal(node, document.body);
};

Modal.displayName = "Modal";
