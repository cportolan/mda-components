"use client";

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import type { CarouselProps, CarouselSlide } from "./Carousel.types";

// ── Height map ────────────────────────────────────────────────────────────────

const HEIGHT: Record<string, string> = {
    sm: "h-40",
    md: "h-64",
    lg: "h-96",
    full: "h-screen",
};

// ── Arrow icon ────────────────────────────────────────────────────────────────

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5"
            aria-hidden="true"
        >
            {dir === "left" ? (
                <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ) : (
                <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
}

// ── Arrow button ──────────────────────────────────────────────────────────────

function ArrowBtn({
    dir,
    onClick,
    arrowStyle,
    variant,
}: {
    dir: "left" | "right";
    onClick: () => void;
    arrowStyle: string;
    variant: string;
}) {
    const shapeClass =
        arrowStyle === "circle"
            ? "rounded-full"
            : arrowStyle === "rounded"
              ? "rounded-lg"
              : arrowStyle === "square"
                ? "rounded-none"
                : "";

    const basePos =
        dir === "left"
            ? "absolute left-3 top-1/2 -translate-y-1/2 z-10"
            : "absolute right-3 top-1/2 -translate-y-1/2 z-10";

    const colorClass =
        variant === "fullscreen"
            ? "bg-black/40 hover:bg-black/60 text-white"
            : "bg-white/90 hover:bg-white text-[#3f3f3f] shadow-md border border-[#e2e2e2]";

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={dir === "left" ? "Anterior" : "Siguiente"}
            className={`${basePos} ${shapeClass} ${colorClass} w-9 h-9 flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95`}
        >
            <ChevronIcon dir={dir} />
        </button>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Carousel({
    slides,
    variant = "default",
    size = "md",
    activeIndex: controlledIndex,
    defaultIndex = 0,
    onChange,
    autoPlay = 0,
    pauseOnHover = true,
    loop = true,
    arrowStyle = "circle",
    dotsStyle = "dots",
    showArrows = true,
    showDots = true,
    draggable = true,
    cardGap = 24,
    cardPeek = 48,
    className = "",
}: CarouselProps) {
    const count = slides.length;

    // ── Controlled / uncontrolled index ──────────────────────────────────────

    const [internalIndex, setInternalIndex] = useState(defaultIndex);
    const current =
        controlledIndex !== undefined ? controlledIndex : internalIndex;

    const goTo = useCallback(
        (next: number) => {
            let idx = next;
            if (loop) idx = ((next % count) + count) % count;
            else idx = Math.max(0, Math.min(count - 1, next));
            setInternalIndex(idx);
            onChange?.(idx);
        },
        [count, loop, onChange]
    );

    const prev = useCallback(() => goTo(current - 1), [current, goTo]);
    const next = useCallback(() => goTo(current + 1), [current, goTo]);

    // ── Auto-play ─────────────────────────────────────────────────────────────

    const paused = useRef(false);

    useEffect(() => {
        if (!autoPlay) return;
        const id = setInterval(() => {
            if (!paused.current) next();
        }, autoPlay);
        return () => clearInterval(id);
    }, [autoPlay, next]);

    // ── Drag / swipe ──────────────────────────────────────────────────────────

    const dragStart = useRef<number | null>(null);

    const onPointerDown = (e: React.PointerEvent) => {
        if (!draggable) return;
        dragStart.current = e.clientX;
    };

    const onPointerUp = (e: React.PointerEvent) => {
        if (dragStart.current === null) return;
        const delta = e.clientX - dragStart.current;
        dragStart.current = null;
        if (Math.abs(delta) < 40) return;
        if (delta < 0) next();
        else prev();
    };

    const heightClass = HEIGHT[size] ?? HEIGHT.md;

    // ── Keyboard nav ──────────────────────────────────────────────────────────

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    // ── Slide track style per variant ────────────────────────────────────────

    const renderSlides = () => {
        if (variant === "fade") return renderFade();
        if (variant === "cards") return renderCards();
        if (variant === "thumbnails") return renderThumbnails();
        if (variant === "fullscreen") return renderDefault(true);
        return renderDefault(false);
    };

    // ── Default slide variant ─────────────────────────────────────────────────

    const renderDefault = (fullscreen: boolean) => (
        <div
            className={`relative overflow-hidden w-full ${fullscreen ? "h-screen" : heightClass} rounded-xl`}
        >
            <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
            >
                {slides.map((slide, i) => (
                    <div
                        key={slide.key ?? i}
                        className="relative shrink-0 w-full h-full"
                        aria-hidden={i !== current}
                    >
                        {renderSlideContent(slide, fullscreen)}
                    </div>
                ))}
            </div>
        </div>
    );

    // ── Fade variant ──────────────────────────────────────────────────────────

    const renderFade = () => (
        <div
            className={`relative overflow-hidden w-full ${heightClass} rounded-xl`}
        >
            {slides.map((slide, i) => (
                <div
                    key={slide.key ?? i}
                    className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
                        i === current
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0 pointer-events-none"
                    }`}
                    aria-hidden={i !== current}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                >
                    {renderSlideContent(slide, false)}
                </div>
            ))}
        </div>
    );

    // ── Cards variant ─────────────────────────────────────────────────────────

    const renderCards = () => {
        // center the active card; peek cardPeek px on each side
        const offset = `calc(-${current * 100}% + ${current === 0 ? 0 : cardPeek}px - ${current === count - 1 ? 0 : cardPeek / 2}px)`;

        return (
            <div
                className={`relative overflow-hidden w-full ${heightClass}`}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
            >
                <div
                    className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{
                        gap: cardGap,
                        paddingLeft: cardPeek,
                        paddingRight: cardPeek,
                        transform: `translateX(-${current * (100 / count)}%)`,
                        width: `${count * 100}%`,
                    }}
                >
                    {slides.map((slide, i) => (
                        <div
                            key={slide.key ?? i}
                            onClick={() => goTo(i)}
                            className={`relative shrink-0 h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                                i === current
                                    ? "opacity-100 scale-100 shadow-xl"
                                    : "opacity-50 scale-95"
                            }`}
                            style={{
                                width: `calc(${100 / count}% - ${cardGap}px)`,
                            }}
                            aria-hidden={i !== current}
                        >
                            {renderSlideContent(slide, false)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ── Thumbnails variant ───────────────────────────────────────────────────

    const renderThumbnails = () => (
        <div className="flex flex-col gap-3">
            {/* Main slide */}
            <div
                className={`relative overflow-hidden w-full ${heightClass} rounded-xl`}
            >
                <div
                    className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                >
                    {slides.map((slide, i) => (
                        <div
                            key={slide.key ?? i}
                            className="relative shrink-0 w-full h-full"
                            aria-hidden={i !== current}
                        >
                            {renderSlideContent(slide, false)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {slides.map((slide, i) => (
                    <button
                        key={slide.key ?? i}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Ir a la imagen ${i + 1}`}
                        className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            i === current
                                ? "border-[#83c442] scale-105 shadow-md"
                                : "border-transparent opacity-60 hover:opacity-90"
                        }`}
                    >
                        {slide.thumbnail ?? (
                            <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center text-xs text-[#999]">
                                {i + 1}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );

    // ── Slide content helper ──────────────────────────────────────────────────

    const renderSlideContent = (slide: CarouselSlide, fullscreen: boolean) => (
        <>
            <div className="w-full h-full">{slide.content}</div>
            {slide.label && (
                <span
                    className={`absolute bottom-3 left-3 z-20 rounded-lg bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ${
                        fullscreen ? "text-sm px-4 py-2" : ""
                    }`}
                >
                    {slide.label}
                </span>
            )}
        </>
    );

    // ── Dots indicator ────────────────────────────────────────────────────────

    const renderDots = () => {
        if (!showDots || dotsStyle === "none") return null;

        if (dotsStyle === "numbers") {
            return (
                <div className="flex items-center justify-center gap-1.5 mt-3">
                    <span className="text-sm font-semibold text-[#83c442]">
                        {current + 1}
                    </span>
                    <span className="text-sm text-[#bbb]">/</span>
                    <span className="text-sm text-[#bbb]">{count}</span>
                </div>
            );
        }

        if (dotsStyle === "bars") {
            return (
                <div className="flex items-center justify-center gap-1.5 mt-3">
                    {slides.map((slide, i) => (
                        <button
                            key={slide.key ?? i}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Ir a la diapositiva ${i + 1}`}
                            aria-current={i === current}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === current
                                    ? "bg-[#83c442] w-8"
                                    : "bg-[#dfe3e8] hover:bg-[#b0c8a0] w-4"
                            }`}
                        />
                    ))}
                </div>
            );
        }

        // dots (default)
        return (
            <div className="flex items-center justify-center gap-2 mt-3">
                {slides.map((slide, i) => (
                    <button
                        key={slide.key ?? i}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Ir a la diapositiva ${i + 1}`}
                        aria-current={i === current}
                        className={`rounded-full transition-all duration-300 ${
                            i === current
                                ? "bg-[#83c442] w-2.5 h-2.5"
                                : "bg-[#dfe3e8] hover:bg-[#b0c8a0] w-2 h-2"
                        }`}
                    />
                ))}
            </div>
        );
    };

    // ── Arrows (rendered inside the track wrapper) ────────────────────────────

    const shouldShowPrev =
        showArrows && arrowStyle !== "none" && (loop || current > 0);
    const shouldShowNext =
        showArrows && arrowStyle !== "none" && (loop || current < count - 1);

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div
            className={`relative w-full select-none outline-none ${className}`}
            role="region"
            aria-label="Carrusel"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => {
                if (pauseOnHover) paused.current = true;
            }}
            onMouseLeave={() => {
                paused.current = false;
            }}
        >
            {/* Slide area */}
            <div className="relative">
                {renderSlides()}

                {/* Arrow buttons (overlay) — not shown for cards variant
                    because the cards themselves are clickable */}
                {variant !== "cards" && (
                    <>
                        {shouldShowPrev && (
                            <ArrowBtn
                                dir="left"
                                onClick={prev}
                                arrowStyle={arrowStyle}
                                variant={variant}
                            />
                        )}
                        {shouldShowNext && (
                            <ArrowBtn
                                dir="right"
                                onClick={next}
                                arrowStyle={arrowStyle}
                                variant={variant}
                            />
                        )}
                    </>
                )}
            </div>

            {/* Dots / bars / numbers (not shown for thumbnails — strip acts as nav) */}
            {variant !== "thumbnails" && renderDots()}
        </div>
    );
}
