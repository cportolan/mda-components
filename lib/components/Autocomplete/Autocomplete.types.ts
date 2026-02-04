import { InputHTMLAttributes } from 'react';

export type AutocompleteSize = 'sm' | 'md' | 'lg';

export interface AutocompleteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface AutocompleteProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onSelect'> {
  /**
   * Array de opciones para el autocomplete
   */
  options: AutocompleteOption[];

  /**
   * Texto placeholder
   * @default 'Buscar...'
   */
  placeholder?: string;

  /**
   * El tamaño del input
   * @default 'md'
   */
  size?: AutocompleteSize;

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

  /**
   * Callback cuando se selecciona una opción
   */
  onSelect?: (option: AutocompleteOption) => void;
}
