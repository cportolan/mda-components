import { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * El contenido del botón
   */
  children: React.ReactNode;

  /**
   * La variante visual del botón
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * El tamaño del botón
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Si está deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Muestra un indicador de carga
   * @default false
   */
  loading?: boolean;

  /**
   * Si el botón debe ocupar todo el ancho disponible
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Tipo de botón HTML
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
}
