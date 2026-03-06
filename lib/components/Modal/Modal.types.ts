import React from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
    /**
     * Controla si el modal está abierto
     */
    isOpen: boolean;

    /**
     * Callback al cerrar (click en backdrop, botón de salir o Escape)
     */
    onClose: () => void;

    /**
     * Contenido del modal
     */
    children?: React.ReactNode;

    /**
     * Texto del botón/link "Salir" en el header
     * @default 'Salir'
     */
    closeLabel?: string;

    /**
     * Contenido opcional a la derecha del header (ej: acciones, estado)
     */
    headerRight?: React.ReactNode;

    /**
     * Ancho máximo del modal
     * @default 'lg'
     */
    size?: ModalSize;

    /**
     * Cierra el modal al hacer click en el backdrop
     * @default true
     */
    closeOnBackdrop?: boolean;

    /**
     * Cierra el modal al presionar Escape
     * @default true
     */
    closeOnEsc?: boolean;

    /**
     * Clases CSS adicionales sobre el panel del modal
     */
    className?: string;
}
