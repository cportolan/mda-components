import { InputHTMLAttributes } from 'react';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Si el toggle está activado (componente controlado)
   */
  checked?: boolean;

  /**
   * Estado inicial del toggle (componente no controlado)
   */
  defaultChecked?: boolean;

  /**
   * Callback cuando cambia el estado
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * El tamaño del toggle
   * @default 'md'
   */
  size?: ToggleSize;

  /**
   * Si está deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Etiqueta opcional para el toggle
   */
  label?: string;

  /**
   * Clases CSS adicionales
   */
  className?: string;
}
