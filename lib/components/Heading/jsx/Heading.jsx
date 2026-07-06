import "./Heading.css";
import React from "react";
// ── Scale ─────────────────────────────────────────────────────────────────────
// Tamaños y pesos por defecto para cada nivel, basados en el diseño original:
//   h2 → 35px / font-weight 500  (referencia central del CSS)
//   El resto escala proporcionalmente.
const SIZE_MAP = {
    h1: "text-[48px] leading-tight",
    h2: "text-[35px] leading-tight",
    h3: "text-[28px] leading-snug",
    h4: "text-[22px] leading-snug",
    h5: "text-[18px] leading-normal",
    h6: "text-[15px] leading-normal",
};
const DEFAULT_WEIGHT_MAP = {
    h1: "font-semibold",
    h2: "font-medium",
    h3: "font-medium",
    h4: "font-medium",
    h5: "font-medium",
    h6: "font-medium",
};
const WEIGHT_MAP = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
};
const COLOR_MAP = {
    default: "text-[#3f3f3f]",
    primary: "text-[#83c442]",
    muted: "text-[#999999]",
    dark: "text-[#1a1a1a]",
    white: "text-white",
};
// ── Component ─────────────────────────────────────────────────────────────────
export const Heading = ({ as: Tag = "h2", children, weight, color = "default", truncate = false, className = "", }) => {
    const resolvedWeight = weight ? `mda-heading--${weight}` : `mda-heading--default-weight-${Tag}`;
    return (<Tag className={["mda-heading", `mda-heading--${Tag}`, resolvedWeight, `mda-heading--${color}`, truncate ? "mda-heading--truncate" : "", className].filter(Boolean).join(" ")}>
            {children}
        </Tag>);
};
Heading.displayName = "Heading";
