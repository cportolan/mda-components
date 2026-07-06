"use client";
import "./Carousel.css";
import React, { useState, useEffect, useRef, useCallback } from "react";

const HEIGHT = {
    sm: "mda-carousel__viewport--sm",
    md: "mda-carousel__viewport--md",
    lg: "mda-carousel__viewport--lg",
    full: "mda-carousel__viewport--full",
};

function ChevronIcon({ dir }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="mda-carousel__arrow-icon" aria-hidden="true">
            {dir === "left" ? (
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
        </svg>
    );
}

function ArrowBtn({ dir, onClick, arrowStyle, variant }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={dir === "left" ? "Anterior" : "Siguiente"}
            className={[
                "mda-carousel__arrow",
                `mda-carousel__arrow--${dir}`,
                `mda-carousel__arrow--${arrowStyle}`,
                variant === "fullscreen" ? "mda-carousel__arrow--fullscreen" : "mda-carousel__arrow--default",
            ].join(" ")}
        >
            <ChevronIcon dir={dir} />
        </button>
    );
}

export function Carousel({ slides, variant = "default", size = "md", activeIndex: controlledIndex, defaultIndex = 0, onChange, autoPlay = 0, pauseOnHover = true, loop = true, arrowStyle = "circle", dotsStyle = "dots", showArrows = true, showDots = true, draggable = true, cardGap = 24, cardPeek = 48, className = "", }) {
    const count = slides.length;
    const [internalIndex, setInternalIndex] = useState(defaultIndex);
    const current = controlledIndex !== undefined ? controlledIndex : internalIndex;
    const paused = useRef(false);
    const dragStart = useRef(null);
    const heightClass = HEIGHT[size] ?? HEIGHT.md;

    const goTo = useCallback((next) => {
        let idx = next;
        if (loop) idx = ((next % count) + count) % count;
        else idx = Math.max(0, Math.min(count - 1, next));
        setInternalIndex(idx);
        onChange?.(idx);
    }, [count, loop, onChange]);

    const prev = useCallback(() => goTo(current - 1), [current, goTo]);
    const next = useCallback(() => goTo(current + 1), [current, goTo]);

    useEffect(() => {
        if (!autoPlay) return;
        const id = setInterval(() => {
            if (!paused.current) next();
        }, autoPlay);
        return () => clearInterval(id);
    }, [autoPlay, next]);

    const onPointerDown = (e) => {
        if (!draggable) return;
        dragStart.current = e.clientX;
    };

    const onPointerUp = (e) => {
        if (dragStart.current === null) return;
        const delta = e.clientX - dragStart.current;
        dragStart.current = null;
        if (Math.abs(delta) < 40) return;
        if (delta < 0) next();
        else prev();
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    const renderSlideContent = (slide, fullscreen) => (
        <>
            <div className="mda-carousel__slide-content">{slide.content}</div>
            {slide.label && (
                <span className={["mda-carousel__slide-label", fullscreen ? "mda-carousel__slide-label--fullscreen" : ""].filter(Boolean).join(" ")}>
                    {slide.label}
                </span>
            )}
        </>
    );

    const renderDefault = (fullscreen) => (
        <div className={["mda-carousel__viewport", fullscreen ? "mda-carousel__viewport--full" : heightClass].join(" ")}>
            <div
                className="mda-carousel__track"
                style={{ transform: `translateX(-${current * 100}%)` }}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
            >
                {slides.map((slide, i) => (
                    <div key={slide.key ?? i} className="mda-carousel__slide" aria-hidden={i !== current}>
                        {renderSlideContent(slide, fullscreen)}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFade = () => (
        <div className={["mda-carousel__viewport", heightClass].join(" ")}>
            {slides.map((slide, i) => (
                <div
                    key={slide.key ?? i}
                    className={["mda-carousel__fade-slide", i === current ? "mda-carousel__fade-slide--active" : "mda-carousel__fade-slide--inactive"].join(" ")}
                    aria-hidden={i !== current}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                >
                    {renderSlideContent(slide, false)}
                </div>
            ))}
        </div>
    );

    const renderCards = () => (
        <div className={["mda-carousel__cards", heightClass].join(" ")} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
            <div
                className="mda-carousel__cards-track"
                style={{
                    gap: `${cardGap}px`,
                    paddingLeft: `${cardPeek}px`,
                    paddingRight: `${cardPeek}px`,
                    transform: `translateX(-${current * (100 / count)}%)`,
                    width: `${count * 100}%`,
                }}
            >
                {slides.map((slide, i) => (
                    <div
                        key={slide.key ?? i}
                        onClick={() => goTo(i)}
                        className={["mda-carousel__card-slide", i === current ? "mda-carousel__card-slide--active" : "mda-carousel__card-slide--inactive"].join(" ")}
                        style={{ width: `calc(${100 / count}% - ${cardGap}px)` }}
                        aria-hidden={i !== current}
                    >
                        {renderSlideContent(slide, false)}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderThumbnails = () => (
        <div className="mda-carousel__thumbnails-layout">
            <div className={["mda-carousel__viewport", heightClass].join(" ")}>
                <div
                    className="mda-carousel__track"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                >
                    {slides.map((slide, i) => (
                        <div key={slide.key ?? i} className="mda-carousel__slide" aria-hidden={i !== current}>
                            {renderSlideContent(slide, false)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mda-carousel__thumb-strip">
                {slides.map((slide, i) => (
                    <button
                        key={slide.key ?? i}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Ir a la imagen ${i + 1}`}
                        className={["mda-carousel__thumb", i === current ? "mda-carousel__thumb--active" : "mda-carousel__thumb--inactive"].join(" ")}
                    >
                        {slide.thumbnail ?? <div className="mda-carousel__thumb-fallback">{i + 1}</div>}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderSlides = () => {
        if (variant === "fade") return renderFade();
        if (variant === "cards") return renderCards();
        if (variant === "thumbnails") return renderThumbnails();
        if (variant === "fullscreen") return renderDefault(true);
        return renderDefault(false);
    };

    const renderDots = () => {
        if (!showDots || dotsStyle === "none") return null;

        if (dotsStyle === "numbers") {
            return (
                <div className="mda-carousel__dots mda-carousel__dots--numbers">
                    <span className="mda-carousel__numbers-current">{current + 1}</span>
                    <span className="mda-carousel__numbers-separator">/</span>
                    <span className="mda-carousel__numbers-total">{count}</span>
                </div>
            );
        }

        if (dotsStyle === "bars") {
            return (
                <div className="mda-carousel__dots mda-carousel__dots--bars">
                    {slides.map((slide, i) => (
                        <button
                            key={slide.key ?? i}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Ir a la diapositiva ${i + 1}`}
                            aria-current={i === current}
                            className={["mda-carousel__bar-dot", i === current ? "mda-carousel__bar-dot--active" : "mda-carousel__bar-dot--inactive"].join(" ")}
                        />
                    ))}
                </div>
            );
        }

        return (
            <div className="mda-carousel__dots mda-carousel__dots--round">
                {slides.map((slide, i) => (
                    <button
                        key={slide.key ?? i}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Ir a la diapositiva ${i + 1}`}
                        aria-current={i === current}
                        className={["mda-carousel__round-dot", i === current ? "mda-carousel__round-dot--active" : "mda-carousel__round-dot--inactive"].join(" ")}
                    />
                ))}
            </div>
        );
    };

    const shouldShowPrev = showArrows && arrowStyle !== "none" && (loop || current > 0);
    const shouldShowNext = showArrows && arrowStyle !== "none" && (loop || current < count - 1);

    return (
        <div
            className={["mda-carousel", className].filter(Boolean).join(" ")}
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
            <div className="mda-carousel__stage">
                {renderSlides()}

                {variant !== "cards" && (
                    <>
                        {shouldShowPrev && <ArrowBtn dir="left" onClick={prev} arrowStyle={arrowStyle} variant={variant} />}
                        {shouldShowNext && <ArrowBtn dir="right" onClick={next} arrowStyle={arrowStyle} variant={variant} />}
                    </>
                )}
            </div>

            {variant !== "thumbnails" && renderDots()}
        </div>
    );
}
