import React from "react";
import { SectionHeadingProps } from "./Headings.types";

// ── Default back-arrow icon ───────────────────────────────────────────────────

const ArrowLeft = () => (
    <svg
        width="20"
        height="20"
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

export const SectionHeading: React.FC<SectionHeadingProps> = ({
    title,
    subtitle,
    link,
    as: Tag = "h2",
    align = "left",
    className = "",
}) => {
    const alignClass =
        align === "center" ? "items-center text-center" : "items-start";

    // Title size map — mirrors the original h2 font-size: 35px + font-weight: 500
    const titleSizeMap: Record<
        NonNullable<SectionHeadingProps["as"]>,
        string
    > = {
        h1: "text-[42px] font-medium leading-tight",
        h2: "text-[35px] font-medium leading-tight",
        h3: "text-[28px] font-medium leading-tight",
        h4: "text-[22px] font-medium leading-tight",
    };

    return (
        <div className={`flex flex-col gap-2 ${alignClass} ${className}`}>
            {/* Link ← */}
            {link && (
                <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-[#0800e1] hover:underline underline-offset-2 text-[18px] leading-none transition-colors mt-1.25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0800e1]/40 rounded-sm"
                >
                    <span className="w-7.5 h-7.5 flex items-center justify-center shrink-0">
                        {link.icon ?? <ArrowLeft />}
                    </span>
                    {link.label}
                </a>
            )}

            {/* Título principal */}
            <Tag className={`m-0 text-[#3f3f3f] ${titleSizeMap[Tag]}`}>
                {title}
            </Tag>

            {/* Subtítulo */}
            {subtitle && (
                <p className="m-0 text-[22px] text-[#303030] leading-snug">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

SectionHeading.displayName = "SectionHeading";
