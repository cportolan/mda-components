"use client";

import React from "react";
import {
    NavigationRoutesProps,
    NavigationRouteItem,
    NavigationRouteSeparator,
    NavigationRouteSize,
} from "./NavigationRoute.types";

// ── Separators ────────────────────────────────────────────────────────────────

const SeparatorChevron = ({ size }: { size: NavigationRouteSize }) => {
    const s = size === "sm" ? 12 : size === "lg" ? 18 : 14;
    return (
        <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-[#c0c0c0]"
        >
            <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const SeparatorSlash = ({ size }: { size: NavigationRouteSize }) => {
    const cls =
        size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm";
    return (
        <span
            className={`${cls} text-[#c0c0c0] select-none`}
            aria-hidden="true"
        >
            /
        </span>
    );
};

const SeparatorDot = () => (
    <span
        className="w-1 h-1 rounded-full bg-[#c0c0c0] shrink-0"
        aria-hidden="true"
    />
);

const Separator = ({
    type,
    size,
}: {
    type: NavigationRouteSeparator;
    size: NavigationRouteSize;
}) => {
    if (type === "slash") return <SeparatorSlash size={size} />;
    if (type === "dot") return <SeparatorDot />;
    return <SeparatorChevron size={size} />;
};

// ── Single breadcrumb item ────────────────────────────────────────────────────

const BreadcrumbItem = ({
    item,
    isLast,
    size,
}: {
    item: NavigationRouteItem;
    isLast: boolean;
    size: NavigationRouteSize;
}) => {
    const textSize =
        size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";
    const iconSize =
        size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4";

    const inner = (
        <span
            className={`inline-flex items-center gap-1.5 ${textSize} font-medium leading-none`}
        >
            {item.icon && (
                <span className={`${iconSize} shrink-0`}>{item.icon}</span>
            )}
            {item.label}
        </span>
    );

    if (isLast || !item.href) {
        return (
            <span
                className={
                    isLast
                        ? "text-[#3f3f3f] cursor-default"
                        : "text-[#3f3f3f] cursor-default"
                }
                aria-current={isLast ? "page" : undefined}
            >
                {inner}
            </span>
        );
    }

    return (
        <a
            href={item.href}
            className="text-[#83c442] hover:text-[#6fb035] hover:underline underline-offset-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#83c442] focus-visible:ring-offset-1 rounded-sm"
        >
            {inner}
        </a>
    );
};

// ── Collapse logic ────────────────────────────────────────────────────────────

type DisplayItem =
    | { type: "item"; item: NavigationRouteItem; isLast: boolean }
    | { type: "ellipsis" };

function buildDisplayItems(
    items: NavigationRouteItem[],
    maxItems: number
): DisplayItem[] {
    if (!maxItems || maxItems <= 0 || items.length <= maxItems) {
        return items.map((item, i) => ({
            type: "item",
            item,
            isLast: i === items.length - 1,
        }));
    }

    // Always show first and last; fill remaining with middle items
    // Layout: [first] [ellipsis] [...middle...] [last]
    // We reserve 3 slots: first + ellipsis + last = 3 fixed, rest for middle
    const middleSlots = Math.max(0, maxItems - 3);

    const result: DisplayItem[] = [];

    // First item
    result.push({ type: "item", item: items[0], isLast: false });

    // Middle items (just before the last)
    const middleItems = items.slice(1, items.length - 1);

    if (middleItems.length <= middleSlots) {
        // No need to collapse middle
        middleItems.forEach((item) =>
            result.push({ type: "item", item, isLast: false })
        );
    } else {
        // Show ellipsis + last few middle items
        result.push({ type: "ellipsis" });
        const tail = middleItems.slice(-middleSlots);
        tail.forEach((item) =>
            result.push({ type: "item", item, isLast: false })
        );
    }

    // Last item
    result.push({
        type: "item",
        item: items[items.length - 1],
        isLast: true,
    });

    return result;
}

// ── Main component ────────────────────────────────────────────────────────────

export const NavigationRoutes: React.FC<NavigationRoutesProps> = ({
    items,
    separator = "chevron",
    size = "md",
    maxItems = 0,
    className = "",
}) => {
    if (!items || items.length === 0) return null;

    const displayItems = buildDisplayItems(items, maxItems);

    const textSize =
        size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";
    const gapClass =
        size === "sm" ? "gap-1" : size === "lg" ? "gap-2.5" : "gap-1.5";

    return (
        <nav aria-label="breadcrumb" className={className}>
            <ol
                className={`flex flex-wrap items-center ${gapClass} list-none p-0 m-0`}
            >
                {displayItems.map((displayItem, idx) => (
                    <React.Fragment key={idx}>
                        {/* Separator before every item except the first */}
                        {idx > 0 && (
                            <li
                                className="flex items-center"
                                aria-hidden="true"
                            >
                                <Separator type={separator} size={size} />
                            </li>
                        )}

                        <li className="flex items-center">
                            {displayItem.type === "ellipsis" ? (
                                <span
                                    className={`${textSize} text-[#999] select-none font-medium`}
                                    title="Segmentos ocultos"
                                >
                                    …
                                </span>
                            ) : (
                                <BreadcrumbItem
                                    item={displayItem.item}
                                    isLast={displayItem.isLast}
                                    size={size}
                                />
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

NavigationRoutes.displayName = "NavigationRoutes";
