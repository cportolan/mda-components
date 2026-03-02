export type MessageVariant = "success" | "error" | "warning" | "default";

export interface MessageProps {
    /** Variante del mensaje */
    variant?: MessageVariant;
    /** Título del mensaje */
    title?: string;
    /** Contenido del mensaje */
    children: React.ReactNode;
    /** Mostrar icono */
    showIcon?: boolean;
    /** Icono personalizado */
    icon?: React.ReactNode;
    /** Mostrar botón de cerrar */
    closable?: boolean;
    /** Callback al cerrar */
    onClose?: () => void;
    /** Clase CSS adicional */
    className?: string;
}
