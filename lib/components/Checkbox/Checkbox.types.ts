import { InputHTMLAttributes } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Si el checkbox está marcado (componente controlado)
   */
  checked?: boolean;

  /**
   * Estado inicial del checkbox (componente no controlado)
   */
  defaultChecked?: boolean;

  /**
   * Callback cuando cambia el estado
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * El tamaño del checkbox
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * Si está deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Etiqueta opcional para el checkbox
   */
  label?: string;

  /**
   * Si muestra estado de error
   * @default false
   */
  error?: boolean;

  /**
   * Estado indeterminado (línea horizontal)
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Clases CSS adicionales
   */
  className?: string;
}
