import { SelectHTMLAttributes } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Array de opciones para el select
   */
  options: SelectOption[];

  /**
   * Texto placeholder
   * @default 'Seleccionar...'
   */
  placeholder?: string;

  /**
   * El tamaño del select
   * @default 'md'
   */
  size?: SelectSize;

  /**
   * Si muestra estado de error
   * @default false
   */
  error?: boolean;

  /**
   * Si está deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Si debe ocupar todo el ancho disponible
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Clases CSS adicionales
   */
  className?: string;
}
