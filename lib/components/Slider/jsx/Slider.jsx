"use client";
import "./Slider.css";
import React, { useId, useState, useCallback } from "react";

const GREEN = "#83c442";
const TRACK_BG = "#e2e2e2";

function pct(value, min, max) {
    return ((value - min) / (max - min)) * 100;
}

const TRACK_H = {
    sm: "4px",
    md: "6px",
    lg: "8px",
};

const defaultFormat = (v) => String(v);

const Ticks = ({ min, max, step, value, size }) => {
    const count = Math.floor((max - min) / step);
    if (count > 50) return null;

    return (
        <div className="mda-slider__ticks">
            {Array.from({ length: count + 1 }).map((_, i) => {
                const v = min + i * step;
                const active = v <= value;
                return (
                    <div
                        key={i}
                        className={[
                            "mda-slider__tick",
                            `mda-slider__tick--${size}`,
                            active ? "mda-slider__tick--active" : "mda-slider__tick--inactive",
                        ].join(" ")}
                    />
                );
            })}
        </div>
    );
};

const FloatingLabel = ({ value, min, max, format, size }) => {
    const p = pct(value, min, max);
    const thumbHalf = size === "sm" ? 7 : size === "lg" ? 11 : 9;
    const offset = `calc(${p}% + ${thumbHalf - p * 0.22}px)`;

    return (
        <div className="mda-slider__floating" style={{ left: offset }}>
            <span className="mda-slider__floating-badge">{format(value)}</span>
            <span className="mda-slider__floating-arrow" />
        </div>
    );
};

const MinMaxLabels = ({ min, max, format, size }) => (
    <div className={["mda-slider__minmax", `mda-slider__minmax--${size}`].join(" ")}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
    </div>
);

export const Slider = (props) => {
    if (props.variant === "range") return <RangeSlider {...props} />;
    return <SingleSlider {...props} />;
};

Slider.displayName = "Slider";

const SingleSlider = ({ variant = "default", value: controlledValue, defaultValue = 0, min = 0, max = 100, step = 1, size = "md", disabled = false, showMinMax = false, formatValue = defaultFormat, onChange, className = "", }) => {
    const id = useId();
    const isControlled = controlledValue !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const value = isControlled ? controlledValue : internal;

    const handleChange = useCallback((e) => {
        const v = Number(e.target.value);
        if (!isControlled) setInternal(v);
        onChange?.(v);
    }, [isControlled, onChange]);

    const p = pct(value, min, max);
    const trackH = TRACK_H[size];
    const isLabeled = variant === "labeled";
    const isStepped = variant === "stepped";
    const isGradient = variant === "gradient";

    return (
        <div className={["mda-slider-wrapper", className].filter(Boolean).join(" ")}>
            <div className={["mda-slider__single", isLabeled ? "mda-slider__single--labeled" : ""].filter(Boolean).join(" ")}>
                <input
                    id={id}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    className={["mda-slider", `mda-slider--${size}`, isGradient ? "mda-slider--gradient" : ""].filter(Boolean).join(" ")}
                    style={{ "--track-h": trackH, "--pct": `${p}%` }}
                />

                {isLabeled && <FloatingLabel value={value} min={min} max={max} format={formatValue} size={size} />}
            </div>

            {isStepped && <Ticks min={min} max={max} step={step} value={value} size={size} />}
            {showMinMax && <MinMaxLabels min={min} max={max} format={formatValue} size={size} />}
        </div>
    );
};

const RangeSlider = ({ value: controlledValue, defaultValue = [20, 70], min = 0, max = 100, step = 1, size = "md", disabled = false, showMinMax = false, formatValue = defaultFormat, onChange, className = "", }) => {
    const idLow = useId();
    const idHigh = useId();
    const isControlled = controlledValue !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const [low, high] = isControlled ? controlledValue : internal;

    const update = useCallback((next) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
    }, [isControlled, onChange]);

    const handleLow = (e) => {
        const v = Math.min(Number(e.target.value), high - step);
        update([v, high]);
    };

    const handleHigh = (e) => {
        const v = Math.max(Number(e.target.value), low + step);
        update([low, v]);
    };

    const pLow = pct(low, min, max);
    const pHigh = pct(high, min, max);
    const trackH = TRACK_H[size];

    return (
        <div className={["mda-slider-wrapper", className].filter(Boolean).join(" ")}>
            <div className="mda-slider__range-values">
                <span className="mda-slider__range-badge">{formatValue(low)}</span>
                <span className="mda-slider__range-badge">{formatValue(high)}</span>
            </div>

            <div className="mda-slider__range">
                <div className="mda-slider__range-base" style={{ height: trackH, background: TRACK_BG }} />
                <div
                    className="mda-slider__range-fill"
                    style={{
                        top: "50%",
                        left: `${pLow}%`,
                        right: `${100 - pHigh}%`,
                        height: trackH,
                        background: GREEN,
                    }}
                />

                <input
                    id={idLow}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={low}
                    disabled={disabled}
                    onChange={handleLow}
                    className={["mda-slider", `mda-slider--${size}`, "mda-slider__range-input"].join(" ")}
                    style={{
                        "--track-h": trackH,
                        "--pct": "0%",
                        "--fill-color": "transparent",
                        position: "absolute",
                        inset: 0,
                        background: "transparent",
                    }}
                />

                <input
                    id={idHigh}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={high}
                    disabled={disabled}
                    onChange={handleHigh}
                    className={["mda-slider", `mda-slider--${size}`, "mda-slider__range-input"].join(" ")}
                    style={{
                        "--track-h": trackH,
                        "--pct": "0%",
                        "--fill-color": "transparent",
                    }}
                />
            </div>

            {showMinMax && <MinMaxLabels min={min} max={max} format={formatValue} size={size} />}
        </div>
    );
};
