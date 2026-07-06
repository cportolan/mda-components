"use client";
import "./Loader.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const PulseLogo = ({ color, size }) => (
    <img src="/images/mda_logo.svg" alt="Cargando…" className={["mda-loader__logo", `mda-loader__logo--${color}`, `mda-loader__logo--${size}`].join(" ")} />
);

const LoaderContent = ({ color = "green", size = "md", icon, label }) => (
    <div className="mda-loader__content">
        {icon ? (
            <div className={["mda-loader__icon", `mda-loader__icon--${size}`].join(" ")}>{icon}</div>
        ) : (
            <PulseLogo color={color} size={size} />
        )}

        {label && <p className={["mda-loader__label", `mda-loader__label--${size}`, `mda-loader__label--${color}`].join(" ")}>{label}</p>}
    </div>
);

export const Loader = ({ variant = "full", color = "green", size = "md", icon, label, className = "", }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (variant === "inline") {
        return (
            <div className={["mda-loader", "mda-loader--inline", className].filter(Boolean).join(" ")}>
                <LoaderContent color={color} size={size} icon={icon} label={label} />
            </div>
        );
    }

    const loaderNode = (
        <div className={["mda-loader", variant === "overlay" ? "mda-loader--overlay" : "mda-loader--full", className].filter(Boolean).join(" ")}>
            <LoaderContent color={color} size={size} icon={icon} label={label} />
        </div>
    );

    if (!mounted || typeof document === "undefined") {
        return loaderNode;
    }

    return ReactDOM.createPortal(loaderNode, document.body);
};

Loader.displayName = "Loader";
