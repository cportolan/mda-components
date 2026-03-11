import React from "react";

// ── Variant & size tokens ─────────────────────────────────────────────────────

export type CarouselVariant =
    | "default" // slide with arrows + dots
    | "fade" // crossfade between slides
    | "cards" // peek adjacent slides (partial sides visible)
    | "thumbnails" // main slide + thumbnail strip below
    | "fullscreen"; // edge-to-edge, full-bleed

export type CarouselSize = "sm" | "md" | "lg" | "full";

export type CarouselArrowStyle = "rounded" | "square" | "circle" | "none";

export type CarouselDotsStyle = "dots" | "bars" | "numbers" | "none";

// ── Single slide definition ───────────────────────────────────────────────────

export interface CarouselSlide {
    /** Unique key – defaults to index if omitted */
    key?: string;
    /** Any content you want rendered inside the slide */
    content: React.ReactNode;
    /** Alt text used when content is an image */
    alt?: string;
    /** Optional thumbnail for `thumbnails` variant */
    thumbnail?: React.ReactNode;
    /** Optional badge/label overlay */
    label?: string;
}

// ── Main props ────────────────────────────────────────────────────────────────

export interface CarouselProps {
    /** Array of slides to display */
    slides: CarouselSlide[];

    /**
     * Visual variant
     * @default 'default'
     */
    variant?: CarouselVariant;

    /**
     * Height preset for the slide track
     * @default 'md'
     */
    size?: CarouselSize;

    /**
     * Controlled active index
     */
    activeIndex?: number;

    /**
     * Uncontrolled starting index
     * @default 0
     */
    defaultIndex?: number;

    /**
     * Called whenever the active slide changes
     */
    onChange?: (index: number) => void;

    /**
     * Auto-play interval in ms. 0 = disabled.
     * @default 0
     */
    autoPlay?: number;

    /**
     * Pause auto-play on hover
     * @default true
     */
    pauseOnHover?: boolean;

    /**
     * Loop back to the first slide after the last
     * @default true
     */
    loop?: boolean;

    /**
     * Style of the previous/next arrow buttons
     * @default 'circle'
     */
    arrowStyle?: CarouselArrowStyle;

    /**
     * Style of the indicator dots below the carousel
     * @default 'dots'
     */
    dotsStyle?: CarouselDotsStyle;

    /**
     * Show prev/next arrow buttons
     * @default true
     */
    showArrows?: boolean;

    /**
     * Show indicator dots / bars / numbers
     * @default true
     */
    showDots?: boolean;

    /**
     * Enable drag/swipe to change slides
     * @default true
     */
    draggable?: boolean;

    /**
     * Gap between cards in `cards` variant (px)
     * @default 24
     */
    cardGap?: number;

    /**
     * How much of the adjacent card peeks in the `cards` variant (px)
     * @default 48
     */
    cardPeek?: number;

    /**
     * Extra CSS classes on the root wrapper
     */
    className?: string;
}
