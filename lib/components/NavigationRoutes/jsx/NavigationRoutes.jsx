"use client";
import "./NavigationRoutes.css";
import React from "react";

const SeparatorChevron = ({ size }) => {
    const s = size === "sm" ? 12 : size === "lg" ? 18 : 14;
    return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mda-breadcrumb__separator-icon">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const SeparatorSlash = ({ size }) => (
    <span className={["mda-breadcrumb__separator-text", `mda-breadcrumb__separator-text--${size}`].join(" ")} aria-hidden="true">
        /
    </span>
);

const SeparatorDot = () => <span className="mda-breadcrumb__separator-dot" aria-hidden="true" />;

const Separator = ({ type, size }) => {
    if (type === "slash") return <SeparatorSlash size={size} />;
    if (type === "dot") return <SeparatorDot />;
    return <SeparatorChevron size={size} />;
};

const BreadcrumbItem = ({ item, isLast, size }) => {
    const inner = (
        <span className={["mda-breadcrumb__item-inner", `mda-breadcrumb__item-inner--${size}`].join(" ")}>
            {item.icon && <span className={["mda-breadcrumb__item-icon", `mda-breadcrumb__item-icon--${size}`].join(" ")}>{item.icon}</span>}
            {item.label}
        </span>
    );

    if (isLast || !item.href) {
        return (
            <span className="mda-breadcrumb__item-current" aria-current={isLast ? "page" : undefined}>
                {inner}
            </span>
        );
    }

    return <a href={item.href} className="mda-breadcrumb__item-link">{inner}</a>;
};

function buildDisplayItems(items, maxItems) {
    if (!maxItems || maxItems <= 0 || items.length <= maxItems) {
        return items.map((item, i) => ({ type: "item", item, isLast: i === items.length - 1 }));
    }

    const middleSlots = Math.max(0, maxItems - 3);
    const result = [{ type: "item", item: items[0], isLast: false }];
    const middleItems = items.slice(1, items.length - 1);

    if (middleItems.length <= middleSlots) {
        middleItems.forEach((item) => result.push({ type: "item", item, isLast: false }));
    }
    else {
        result.push({ type: "ellipsis" });
        middleItems.slice(-middleSlots).forEach((item) => result.push({ type: "item", item, isLast: false }));
    }

    result.push({ type: "item", item: items[items.length - 1], isLast: true });
    return result;
}

export const NavigationRoutes = ({ items, separator = "chevron", size = "md", maxItems = 0, className = "", }) => {
    if (!items || items.length === 0) return null;

    const displayItems = buildDisplayItems(items, maxItems);

    return (
        <nav aria-label="breadcrumb" className={className}>
            <ol className={["mda-breadcrumb", `mda-breadcrumb--${size}`].join(" ")}>
                {displayItems.map((displayItem, idx) => (
                    <React.Fragment key={idx}>
                        {idx > 0 && (
                            <li className="mda-breadcrumb__separator" aria-hidden="true">
                                <Separator type={separator} size={size} />
                            </li>
                        )}

                        <li className="mda-breadcrumb__item">
                            {displayItem.type === "ellipsis" ? (
                                <span className={["mda-breadcrumb__ellipsis", `mda-breadcrumb__ellipsis--${size}`].join(" ")} title="Segmentos ocultos">…</span>
                            ) : (
                                <BreadcrumbItem item={displayItem.item} isLast={displayItem.isLast} size={size} />
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

NavigationRoutes.displayName = "NavigationRoutes";
