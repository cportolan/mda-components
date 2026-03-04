export type PaginationSize = "sm" | "md" | "lg";
export type PaginationPageSize = 10 | 25 | 50 | 100;

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
     * Cantidad de resultados por página actualmente seleccionada.
     * Al pasarla se muestra el texto "Mostrando X resultados" con un select.
     */
    pageSize?: PaginationPageSize;
    /**
     * Callback al cambiar la cantidad de resultados por página
     */
    onPageSizeChange?: (pageSize: PaginationPageSize) => void;
    /**
     * Opciones disponibles en el select de resultados por página
     * @default [10, 25, 50, 100]
     */
    pageSizeOptions?: PaginationPageSize[];
    /**
     * Clases CSS adicionales
     */
    className?: string;
}
