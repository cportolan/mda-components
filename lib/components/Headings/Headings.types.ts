import React from "react";

export interface SectionHeadingLink {
    /**
     * Texto del link
     */
    label: string;

    /**
     * URL de destino
     */
    href: string;

    /**
     * Ícono opcional a la izquierda del label (por defecto muestra una flecha ←)
     */
    icon?: React.ReactNode;
}

export interface SectionHeadingProps {
    /**
     * Título principal (h2)
     */
    title: string;

    /**
     * Subtítulo descriptivo debajo del título
     */
    subtitle?: string;

    /**
     * Link de navegación que aparece encima del título (ej: "← Volver a trámites")
     */
    link?: SectionHeadingLink;

    /**
     * Nivel semántico del heading principal
     * @default 'h2'
     */
    as?: "h1" | "h2" | "h3" | "h4";

    /**
     * Alineación del contenido
     * @default 'left'
     */
    align?: "left" | "center";

    /**
     * Clases CSS adicionales sobre el contenedor raíz
     */
    className?: string;
}
