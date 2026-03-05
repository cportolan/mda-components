import React from "react";
import {
    HeadingProps,
    HeadingLevel,
    HeadingWeight,
    HeadingColor,
} from "./Heading.types";

// ── Scale ─────────────────────────────────────────────────────────────────────
// Tamaños y pesos por defecto para cada nivel, basados en el diseño original:
//   h2 → 35px / font-weight 500  (referencia central del CSS)
//   El resto escala proporcionalmente.

const SIZE_MAP: Record<HeadingLevel, string> = {
    h1: "text-[48px] leading-tight",
    h2: "text-[35px] leading-tight",
    h3: "text-[28px] leading-snug",
    h4: "text-[22px] leading-snug",
    h5: "text-[18px] leading-normal",
    h6: "text-[15px] leading-normal",
};

const DEFAULT_WEIGHT_MAP: Record<HeadingLevel, string> = {
    h1: "font-semibold",
    h2: "font-medium",
    h3: "font-medium",
    h4: "font-medium",
    h5: "font-medium",
    h6: "font-medium",
};

const WEIGHT_MAP: Record<HeadingWeight, string> = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
};

const COLOR_MAP: Record<HeadingColor, string> = {
    default: "text-[#3f3f3f]",
    primary: "text-[#83c442]",
    muted: "text-[#999999]",
    dark: "text-[#1a1a1a]",
    white: "text-white",
};

// ── Component ─────────────────────────────────────────────────────────────────

export const Heading: React.FC<HeadingProps> = ({
    as: Tag = "h2",
    children,
    weight,
    color = "default",
    truncate = false,
    className = "",
}) => {
    const sizeClass = SIZE_MAP[Tag];
    const weightClass = weight ? WEIGHT_MAP[weight] : DEFAULT_WEIGHT_MAP[Tag];
    const colorClass = COLOR_MAP[color];
    const truncClass = truncate ? "truncate" : "";

    return (
        <Tag
            className={[
                "m-0 p-0",
                sizeClass,
                weightClass,
                colorClass,
                truncClass,
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </Tag>
    );
};

Heading.displayName = "Heading";
