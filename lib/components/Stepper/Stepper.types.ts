import { ReactNode } from "react";

export type StepperVariant = "default" | "outlined" | "minimal" | "dots";
export type StepperSize = "sm" | "md" | "lg";
export type StepperOrientation = "horizontal" | "vertical";
export type StepStatus = "completed" | "active" | "pending" | "error";

export interface Step {
    /**
     * Título del paso
     */
    title: string;
    /**
     * Descripción opcional del paso
     */
    description?: string;
    /**
     * Icono personalizado para el paso
     */
    icon?: ReactNode;
    /**
     * Estado del paso (sobreescribe el estado calculado)
     */
    status?: StepStatus;
    /**
     * Si el paso está deshabilitado
     */
    disabled?: boolean;
}

export interface StepperProps {
    /**
     * Array de pasos a mostrar
     */
    steps: Step[];
    /**
     * Índice del paso activo (0-based)
     * @default 0
     */
    activeStep?: number;
    /**
     * Variante visual del stepper
     * @default 'default'
     */
    variant?: StepperVariant;
    /**
     * Tamaño del stepper
     * @default 'md'
     */
    size?: StepperSize;
    /**
     * Orientación del stepper
     * @default 'horizontal'
     */
    orientation?: StepperOrientation;
    /**
     * Si el stepper es clickeable (permite navegar entre pasos)
     * @default false
     */
    clickable?: boolean;
    /**
     * Callback al hacer click en un paso (solo si clickable=true)
     */
    onStepClick?: (index: number) => void;
    /**
     * Clases CSS adicionales
     */
    className?: string;
}

export interface StepperNavigationProps {
    /**
     * Array de pasos
     */
    steps: Step[];
    /**
     * Índice del paso activo
     * @default 0
     */
    activeStep?: number;
    /**
     * Callback al avanzar
     */
    onNext?: () => void;
    /**
     * Callback al retroceder
     */
    onBack?: () => void;
    /**
     * Callback al finalizar (último paso)
     */
    onFinish?: () => void;
    /**
     * Contenido del paso activo
     */
    children?: ReactNode;
    /**
     * Variante visual del stepper
     * @default 'default'
     */
    variant?: StepperVariant;
    /**
     * Tamaño del stepper
     * @default 'md'
     */
    size?: StepperSize;
    /**
     * Orientación del stepper
     * @default 'horizontal'
     */
    orientation?: StepperOrientation;
    /**
     * Texto del botón siguiente
     * @default 'Siguiente'
     */
    nextLabel?: string;
    /**
     * Texto del botón anterior
     * @default 'Anterior'
     */
    backLabel?: string;
    /**
     * Texto del botón finalizar
     * @default 'Finalizar'
     */
    finishLabel?: string;
    /**
     * Clases CSS adicionales
     */
    className?: string;
}
