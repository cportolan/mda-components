export interface InputFileProps {
    /** Tipos de archivos aceptados (ej: "image/*", ".pdf", ".pdf,.doc,.docx") */
    accept?: string;
    /** Permitir múltiples archivos */
    multiple?: boolean;
    /** Tamaño máximo de archivo en MB */
    maxSize?: number;
    /** Número máximo de archivos */
    maxFiles?: number;
    /** Texto del label */
    label?: string;
    /** Texto de ayuda */
    helperText?: string;
    /** Estado de error */
    error?: boolean;
    /** Estado deshabilitado */
    disabled?: boolean;
    /** Tamaño del componente */
    size?: "sm" | "md" | "lg";
    /** Ocupar todo el ancho */
    fullWidth?: boolean;
    /** Callback cuando cambian los archivos */
    onChange?: (files: File[]) => void;
    /** Callback cuando se elimina un archivo */
    onRemove?: (file: File, index: number) => void;
    /** Mostrar vista previa de imágenes */
    showPreview?: boolean;
    /** Texto personalizado del botón */
    buttonText?: string;
    /** Texto personalizado del área de drop */
    dropzoneText?: string;
    /** Clase CSS adicional */
    className?: string;
    /** Archivos iniciales (controlado) */
    value?: File[];
}

export interface FileWithPreview extends File {
    preview?: string;
}
