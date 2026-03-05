export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingWeight = "light" | "normal" | "medium" | "semibold" | "bold";

export type HeadingColor =
    | "default" // #3f3f3f
    | "primary" // #83c442
    | "muted" // #999
    | "dark" // #1a1a1a
    | "white";

export interface HeadingProps {
    /**
     * Nivel semántico y visual del heading
     * @default 'h2'
     */
    as?: HeadingLevel;

    /**
     * Contenido del heading
     */
    children: React.ReactNode;

    /**
     * Peso tipográfico
     * Cada nivel tiene un peso por defecto fiel al diseño original.
     * Esta prop lo sobreescribe.
     */
    weight?: HeadingWeight;

    /**
     * Color del texto
     * @default 'default'
     */
    color?: HeadingColor;

    /**
     * Trunca el texto con ellipsis en una sola línea
     * @default false
     */
    truncate?: boolean;

    /**
     * Clases CSS adicionales
     */
    className?: string;
}
