import React from "react";

export type SliderVariant =
    | "default"   // track liso + thumb circular
    | "range"     // dos thumbs (valor mínimo y máximo)
    | "stepped"   // con marcas (ticks) en cada step
    | "labeled"   // valor flotante sobre el thumb
    | "gradient"; // track relleno con gradiente verde→amarillo

export type SliderSize = "sm" | "md" | "lg";

// ── Single-value slider ───────────────────────────────────────────────────────

export interface SliderProps {
    /**
     * Variante visual
     * @default 'default'
     */
    variant?: Exclude<SliderVariant, "range">;

    /**
     * Valor actual (controlado)
     */
    value?: number;

    /**
     * Valor inicial (no controlado)
     */
    defaultValue?: number;

    /**
     * Valor mínimo
     * @default 0
     */
    min?: number;

    /**
     * Valor máximo
     * @default 100
     */
    max?: number;

    /**
     * Incremento entre pasos
     * @default 1
     */
    step?: number;

    /**
     * Tamaño del track y el thumb
     * @default 'md'
     */
    size?: SliderSize;

    /**
     * Deshabilita la interacción
     * @default false
     */
    disabled?: boolean;

    /**
     * Muestra el valor mínimo y máximo a los extremos
     * @default false
     */
    showMinMax?: boolean;

    /**
     * Formatea el valor mostrado (tooltip, label, minMax)
     */
    formatValue?: (value: number) => string;

    /**
     * Callback al cambiar el valor
     */
    onChange?: (value: number) => void;

    /**
     * Clases CSS adicionales sobre el contenedor
     */
    className?: string;
}

// ── Range slider (two thumbs) ─────────────────────────────────────────────────

export interface RangeSliderProps {
    /**
     * Siempre "range"
     */
    variant: "range";

    /**
     * Par de valores [min, max] del rango seleccionado (controlado)
     */
    value?: [number, number];

    /**
     * Par de valores iniciales (no controlado)
     */
    defaultValue?: [number, number];

    /** @default 0 */
    min?: number;
    /** @default 100 */
    max?: number;
    /** @default 1 */
    step?: number;

    /** @default 'md' */
    size?: SliderSize;

    /** @default false */
    disabled?: boolean;

    /** @default false */
    showMinMax?: boolean;

    formatValue?: (value: number) => string;

    /**
     * Callback al cambiar el rango
     */
    onChange?: (value: [number, number]) => void;

    className?: string;
}
