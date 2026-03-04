export type PaginationSize = "sm" | "md" | "lg";

export interface PaginationProps {
    /**
     * Número total de páginas
     */
    totalPages: number;
    /**
     * Página actualmente activa (1-based)
     */
    currentPage: number;
    /**
     * Callback al cambiar de página
     */
    onPageChange: (page: number) => void;
    /**
     * Tamaño de los botones
     * @default 'md'
     */
    size?: PaginationSize;
    /**
     * Deshabilita toda la paginación
     * @default false
     */
    disabled?: boolean;
    /**
     * Muestra el contador "Página X de Y"
     * @default false
     */
    showPageInfo?: boolean;
    /**
     * Clases CSS adicionales
     */
    className?: string;
}
