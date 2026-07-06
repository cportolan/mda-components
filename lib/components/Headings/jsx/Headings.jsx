import "./Headings.css";
import React from "react";
// ── Default back-arrow icon ───────────────────────────────────────────────────
const ArrowLeft = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
// ── Component ─────────────────────────────────────────────────────────────────
export const SectionHeading = ({ title, subtitle, link, as: Tag = "h2", align = "left", className = "", }) => {
    return (<div className={["mda-section-heading", `mda-section-heading--${align}`, className].filter(Boolean).join(" ")}>
            {/* Link ← */}
            {link && (<a href={link.href} className="mda-section-heading__link">
                    <span className="mda-section-heading__link-icon">
                        {link.icon ?? <ArrowLeft />}
                    </span>
                    {link.label}
                </a>)}

            {/* Título principal */}
            <Tag className={["mda-section-heading__title", `mda-section-heading__title--${Tag}`].join(" ")}>
                {title}
            </Tag>

            {/* Subtítulo */}
            {subtitle && (<p className="mda-section-heading__subtitle">
                    {subtitle}
                </p>)}
        </div>);
};
SectionHeading.displayName = "SectionHeading";
