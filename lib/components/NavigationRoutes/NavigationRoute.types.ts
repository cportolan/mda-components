import React from "react";

export interface NavigationRouteItem {
    /**
     * Texto visible del ítem
     */
    label: string;

    /**
     * URL de destino. Si se omite, el ítem se renderiza como texto plano (último segmento activo).
     */
    href?: string;

    /**
     * Icono opcional a la izquierda del label
     */
    icon?: React.ReactNode;
}

export type NavigationRouteSeparator = "chevron" | "slash" | "dot";
export type NavigationRouteSize = "sm" | "md" | "lg";

export interface NavigationRoutesProps {
    /**
     * Lista ordenada de segmentos de la ruta
     */
    items: NavigationRouteItem[];

    /**
     * Separador entre ítems
     * @default 'chevron'
     */
    separator?: NavigationRouteSeparator;

    /**
     * Tamaño del componente
     * @default 'md'
     */
    size?: NavigationRouteSize;

    /**
     * Cantidad máxima de ítems visibles antes de colapsar con "…".
     * Cuando se colapsa siempre se muestran el primero y el último.
     * Si es 0 o undefined, se muestran todos.
     * @default 0
     */
    maxItems?: number;

    /**
     * Clases CSS adicionales
     */
    className?: string;
}
