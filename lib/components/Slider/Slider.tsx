"use client";

import React, { useId, useState, useCallback, useRef } from "react";
import { SliderProps, RangeSliderProps, SliderSize } from "./Slider.types";

// ── Design tokens ─────────────────────────────────────────────────────────────

const GREEN = "#83c442";
const GREEN_DK = "#6fb035";
const TRACK_BG = "#e2e2e2";

// ── Injected base styles (thumb + track cross-browser) ────────────────────────

const SLIDER_STYLES = `
.mda-slider {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    width: 100%;
}
.mda-slider:disabled { cursor: not-allowed; opacity: 0.45; }

/* ── WebKit thumb ── */
.mda-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: white;
    border: 2.5px solid ${GREEN};
    border-radius: 50%;
    box-shadow: 0 1px 4px rgba(0,0,0,.18);
    transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease;
}
.mda-slider:not(:disabled)::-webkit-slider-thumb:hover {
    transform: scale(1.18);
    border-color: ${GREEN_DK};
    box-shadow: 0 0 0 5px rgba(131,196,66,.18);
}
.mda-slider:not(:disabled):active::-webkit-slider-thumb {
    transform: scale(1.08);
    box-shadow: 0 0 0 7px rgba(131,196,66,.22);
}

/* ── Firefox thumb ── */
.mda-slider::-moz-range-thumb {
    background: white;
    border: 2.5px solid ${GREEN};
    border-radius: 50%;
    box-shadow: 0 1px 4px rgba(0,0,0,.18);
    transition: transform .15s ease, border-color .15s ease;
}
.mda-slider:not(:disabled)::-moz-range-thumb:hover {
    transform: scale(1.18);
    border-color: ${GREEN_DK};
}

/* Sizes */
.mda-slider-sm::-webkit-slider-thumb { width:14px; height:14px; margin-top:-5px; }
.mda-slider-sm::-moz-range-thumb    { width:14px; height:14px; }
.mda-slider-md::-webkit-slider-thumb { width:18px; height:18px; margin-top:-7px; }
.mda-slider-md::-moz-range-thumb    { width:18px; height:18px; }
.mda-slider-lg::-webkit-slider-thumb { width:22px; height:22px; margin-top:-9px; }
.mda-slider-lg::-moz-range-thumb    { width:22px; height:22px; }

/* Track WebKit */
.mda-slider::-webkit-slider-runnable-track {
    border-radius: 999px;
    height: var(--track-h);
    background: linear-gradient(
        to right,
        var(--fill-color, ${GREEN}) 0%,
        var(--fill-color, ${GREEN}) var(--pct, 0%),
        ${TRACK_BG} var(--pct, 0%),
        ${TRACK_BG} 100%
    );
}
/* Track Firefox */
.mda-slider::-moz-range-track {
    border-radius: 999px;
    height: var(--track-h);
    background: ${TRACK_BG};
}
.mda-slider::-moz-range-progress {
    border-radius: 999px;
    height: var(--track-h);
    background: var(--fill-color, ${GREEN});
}

/* Gradient variant fill */
.mda-slider-gradient::-webkit-slider-runnable-track {
    background: linear-gradient(
        to right,
        #83c442 0%,
        #f5c518 var(--pct, 0%),
        ${TRACK_BG} var(--pct, 0%),
        ${TRACK_BG} 100%
    );
}
.mda-slider-gradient::-moz-range-progress {
    background: linear-gradient(to right, #83c442, #f5c518);
}

/* Focus ring */
.mda-slider:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px white, 0 0 0 5px ${GREEN};
}
.mda-slider:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 3px white, 0 0 0 5px ${GREEN};
}
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function pct(value: number, min: number, max: number) {
    return ((value - min) / (max - min)) * 100;
}

const TRACK_H: Record<SliderSize, string> = {
    sm: "4px",
    md: "6px",
    lg: "8px",
};

const defaultFormat = (v: number) => String(v);

// ── Tick marks (stepped variant) ──────────────────────────────────────────────

const Ticks = ({
    min,
    max,
    step,
    value,
    size,
}: {
    min: number;
    max: number;
    step: number;
    value: number;
    size: SliderSize;
}) => {
    const count = Math.floor((max - min) / step);
    if (count > 50) return null; // too many ticks
    const tickSize =
        size === "sm"
            ? "w-0.5 h-1.5"
            : size === "lg"
              ? "w-0.5 h-2.5"
              : "w-0.5 h-2";

    return (
        <div className="relative w-full flex justify-between px-0 mt-1">
            {Array.from({ length: count + 1 }).map((_, i) => {
                const v = min + i * step;
                const active = v <= value;
                return (
                    <div
                        key={i}
                        className={`${tickSize} rounded-full transition-colors ${
                            active ? "bg-[#83c442]" : "bg-[#d0d0d0]"
                        }`}
                    />
                );
            })}
        </div>
    );
};

// ── Floating label (labeled variant) ─────────────────────────────────────────

const FloatingLabel = ({
    value,
    min,
    max,
    format,
    size,
}: {
    value: number;
    min: number;
    max: number;
    format: (v: number) => string;
    size: SliderSize;
}) => {
    const p = pct(value, min, max);
    // Compensate thumb half-width so label stays centered
    const thumbHalf = size === "sm" ? 7 : size === "lg" ? 11 : 9;
    const offset = `calc(${p}% + ${thumbHalf - p * 0.22}px)`;

    return (
        <div
            className="absolute -top-8 -translate-x-1/2 pointer-events-none"
            style={{ left: offset }}
        >
            <span className="inline-flex items-center justify-center rounded-md bg-[#83c442] text-white text-xs font-semibold px-1.5 py-0.5 shadow-sm whitespace-nowrap">
                {format(value)}
            </span>
            {/* Arrow */}
            <span className="block w-0 h-0 mx-auto border-x-4 border-x-transparent border-t-4 border-t-[#83c442]" />
        </div>
    );
};

// ── MinMax labels ─────────────────────────────────────────────────────────────

const MinMaxLabels = ({
    min,
    max,
    format,
    size,
}: {
    min: number;
    max: number;
    format: (v: number) => string;
    size: SliderSize;
}) => {
    const cls =
        size === "sm" ? "text-[11px]" : size === "lg" ? "text-sm" : "text-xs";
    return (
        <div
            className={`flex justify-between mt-1 ${cls} text-[#999] select-none`}
        >
            <span>{format(min)}</span>
            <span>{format(max)}</span>
        </div>
    );
};

// ── Single Slider ─────────────────────────────────────────────────────────────

export const Slider: React.FC<SliderProps | RangeSliderProps> = (props) => {
    if (props.variant === "range") {
        return <RangeSlider {...(props as RangeSliderProps)} />;
    }
    return <SingleSlider {...(props as SliderProps)} />;
};

Slider.displayName = "Slider";

// ── Single implementation ─────────────────────────────────────────────────────

const SingleSlider: React.FC<SliderProps> = ({
    variant = "default",
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    size = "md",
    disabled = false,
    showMinMax = false,
    formatValue = defaultFormat,
    onChange,
    className = "",
}) => {
    const id = useId();
    const isControlled = controlledValue !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const value = isControlled ? controlledValue! : internal;

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const v = Number(e.target.value);
            if (!isControlled) setInternal(v);
            onChange?.(v);
        },
        [isControlled, onChange]
    );

    const p = pct(value, min, max);
    const trackH = TRACK_H[size];
    const isLabeled = variant === "labeled";
    const isStepped = variant === "stepped";
    const isGradient = variant === "gradient";

    return (
        <>
            <style>{SLIDER_STYLES}</style>
            <div className={`w-full ${className}`}>
                <div className={`relative w-full ${isLabeled ? "pt-9" : ""}`}>
                    <input
                        id={id}
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        disabled={disabled}
                        onChange={handleChange}
                        className={[
                            "mda-slider",
                            `mda-slider-${size}`,
                            isGradient ? "mda-slider-gradient" : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        style={
                            {
                                "--track-h": trackH,
                                "--pct": `${p}%`,
                            } as React.CSSProperties
                        }
                    />

                    {isLabeled && (
                        <FloatingLabel
                            value={value}
                            min={min}
                            max={max}
                            format={formatValue}
                            size={size}
                        />
                    )}
                </div>

                {isStepped && (
                    <Ticks
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        size={size}
                    />
                )}

                {showMinMax && (
                    <MinMaxLabels
                        min={min}
                        max={max}
                        format={formatValue}
                        size={size}
                    />
                )}
            </div>
        </>
    );
};

// ── Range implementation ──────────────────────────────────────────────────────

const RangeSlider: React.FC<RangeSliderProps> = ({
    value: controlledValue,
    defaultValue = [20, 70],
    min = 0,
    max = 100,
    step = 1,
    size = "md",
    disabled = false,
    showMinMax = false,
    formatValue = defaultFormat,
    onChange,
    className = "",
}) => {
    const idLow = useId();
    const idHigh = useId();

    const isControlled = controlledValue !== undefined;
    const [internal, setInternal] = useState<[number, number]>(defaultValue);
    const [low, high] = isControlled ? controlledValue! : internal;

    const update = useCallback(
        (next: [number, number]) => {
            if (!isControlled) setInternal(next);
            onChange?.(next);
        },
        [isControlled, onChange]
    );

    const handleLow = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Math.min(Number(e.target.value), high - step);
        update([v, high]);
    };

    const handleHigh = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Math.max(Number(e.target.value), low + step);
        update([low, v]);
    };

    const pLow = pct(low, min, max);
    const pHigh = pct(high, min, max);
    const trackH = TRACK_H[size];

    // Active fill between the two thumbs
    const fillStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: `${pLow}%`,
        right: `${100 - pHigh}%`,
        height: trackH,
        background: GREEN,
        borderRadius: 999,
        pointerEvents: "none",
    };

    return (
        <>
            <style>{SLIDER_STYLES}</style>
            <div className={`w-full ${className}`}>
                {/* Dual thumb values */}
                <div className="flex justify-between mb-1 text-xs font-medium text-[#3f3f3f] select-none">
                    <span className="rounded-md bg-[#83c442]/12 text-[#5a9428] px-1.5 py-0.5">
                        {formatValue(low)}
                    </span>
                    <span className="rounded-md bg-[#83c442]/12 text-[#5a9428] px-1.5 py-0.5">
                        {formatValue(high)}
                    </span>
                </div>

                <div className="relative w-full">
                    {/* Base track (grey, rendered by second input but hidden visually) */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-full rounded-full"
                        style={{ height: trackH, background: TRACK_BG }}
                    />
                    {/* Active fill */}
                    <div style={fillStyle} />

                    {/* Low thumb — rendered on top with z-index */}
                    <input
                        id={idLow}
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={low}
                        disabled={disabled}
                        onChange={handleLow}
                        className={[
                            "mda-slider",
                            `mda-slider-${size}`,
                            "relative z-10",
                        ].join(" ")}
                        style={
                            {
                                "--track-h": trackH,
                                "--pct": "0%", // no fill on track itself
                                "--fill-color": "transparent",
                                position: "absolute",
                                inset: 0,
                                background: "transparent",
                            } as React.CSSProperties
                        }
                    />

                    {/* High thumb */}
                    <input
                        id={idHigh}
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={high}
                        disabled={disabled}
                        onChange={handleHigh}
                        className={[
                            "mda-slider",
                            `mda-slider-${size}`,
                            "relative z-10",
                        ].join(" ")}
                        style={
                            {
                                "--track-h": trackH,
                                "--pct": "0%",
                                "--fill-color": "transparent",
                            } as React.CSSProperties
                        }
                    />
                </div>

                {showMinMax && (
                    <MinMaxLabels
                        min={min}
                        max={max}
                        format={formatValue}
                        size={size}
                    />
                )}
            </div>
        </>
    );
};
