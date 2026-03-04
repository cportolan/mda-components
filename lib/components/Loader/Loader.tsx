"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { LoaderProps } from "./Loader.types";

// ── CSS keyframes injected once ───────────────────────────────────────────────

const PULSE_STYLES = `
@keyframes mda-pulse-green {
  0%, 100% { transform: scale(0.9); opacity: 0.7; filter: invert(48%) sepia(77%) saturate(200%) hue-rotate(76deg); }
  50%       { transform: scale(1.1); opacity: 1;   filter: invert(48%) sepia(77%) saturate(200%) hue-rotate(76deg); }
}
@keyframes mda-pulse-blue {
  0%, 100% { transform: scale(0.9); opacity: 0.7; filter: invert(34%) sepia(93%) saturate(600%) hue-rotate(182deg) brightness(80%) contrast(110%); }
  50%       { transform: scale(1.1); opacity: 1;   filter: invert(34%) sepia(93%) saturate(600%) hue-rotate(182deg) brightness(80%) contrast(110%); }
}
`;

// ── Pulse logo icon ────────────────────────────────────────────────────────────

const PulseLogo = ({
    color,
    sizeClass,
}: {
    color: "green" | "blue";
    sizeClass: string;
}) => (
    <>
        <style>{PULSE_STYLES}</style>
        <img
            src="/images/mda_logo.svg"
            alt="Cargando…"
            className={sizeClass}
            style={{ animation: `mda-pulse-${color} 2s ease-in-out infinite` }}
        />
    </>
);

// ── Loader inner content ───────────────────────────────────────────────────────

const LoaderContent = ({
    color = "green",
    size = "md",
    icon,
    label,
}: Pick<LoaderProps, "color" | "size" | "icon" | "label">) => {
    const sizeMap = {
        sm: "w-10 h-10",
        md: "w-16 h-16",
        lg: "w-24 h-24",
    };

    const labelColorMap = {
        green: "text-[#83c442]",
        blue: "text-[#1a6fa8]",
    };

    const labelSizeMap = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    const resolvedColor = color ?? "green";
    const sizeClass = sizeMap[size ?? "md"];
    const labelColorClass = labelColorMap[resolvedColor];

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            {icon ? (
                <div
                    className={`${sizeClass} flex items-center justify-center`}
                >
                    {icon}
                </div>
            ) : (
                <PulseLogo color={resolvedColor} sizeClass={sizeClass} />
            )}

            {label && (
                <p
                    className={`font-medium ${labelSizeMap[size ?? "md"]} ${labelColorClass} select-none`}
                >
                    {label}
                </p>
            )}
        </div>
    );
};

// ── Main Loader component ─────────────────────────────────────────────────────

export const Loader: React.FC<LoaderProps> = ({
    variant = "full",
    color = "green",
    size = "md",
    icon,
    label,
    className = "",
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // ── Variant: inline ───────────────────────────────────────────────────────
    // Ocupa el contenedor padre (necesita que el padre tenga position: relative)
    if (variant === "inline") {
        return (
            <div
                className={`absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[2px] rounded-[inherit] ${className}`}
            >
                <LoaderContent
                    color={color}
                    size={size}
                    icon={icon}
                    label={label}
                />
            </div>
        );
    }

    // ── Variant: full | overlay ───────────────────────────────────────────────
    // Se renderizan en un portal al body
    const bgClass =
        variant === "overlay" ? "bg-white/85 backdrop-blur-sm" : "bg-white";

    const loaderNode = (
        <div
            className={`fixed inset-0 z-10005 flex items-center justify-center pointer-events-none select-none ${bgClass} ${className}`}
        >
            <LoaderContent
                color={color}
                size={size}
                icon={icon}
                label={label}
            />
        </div>
    );

    // SSR guard: antes de montar renderizamos sin portal
    if (!mounted || typeof document === "undefined") {
        return loaderNode;
    }

    return ReactDOM.createPortal(loaderNode, document.body);
};

Loader.displayName = "Loader";
