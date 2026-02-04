// Tipos globales compartidos por los componentes

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface BaseComponentProps {
  className?: string;
  testId?: string;
}
