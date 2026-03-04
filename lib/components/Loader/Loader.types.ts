import { ReactNode } from "react";

/**
 * full     → overlay blanco 100% opacidad, fixed, cubre toda la pantalla (portal al body)
 * overlay  → overlay blanco 85% opacidad, fixed, cubre toda la pantalla (portal al body)
 * inline   → se ajusta al contenedor padre (position: absolute), sin portal
 */
export type LoaderVariant = "full" | "overlay" | "inline";

export type LoaderColor = "green" | "blue";

export type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps {
    /**
     * Variante visual del loader
     * - `full`    → fondo blanco opaco al 100%, ocupa toda la pantalla
     * - `overlay` → fondo blanco semitransparente al 85%, ocupa toda la pantalla
     * - `inline`  → se ajusta al contenedor padre, sin portal
     * @default 'full'
     */
    variant?: LoaderVariant;

    /**
     * Color de la animación del ícono
     * - `green` → verde primario #83c442
     * - `blue`  → azul municipal
     * @default 'green'
     */
    color?: LoaderColor;

    /**
     * Tamaño del ícono animado
     * @default 'md'
     */
    size?: LoaderSize;

    /**
     * Ícono o imagen personalizada. Si se omite se usa el spinner SVG por defecto.
     */
    icon?: ReactNode;

    /**
     * Texto opcional que aparece debajo del ícono
     */
    label?: string;

    /**
     * Clases CSS adicionales aplicadas al contenedor raíz
     */
    className?: string;
}
