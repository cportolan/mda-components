# Template para Nuevos Componentes

Usa estos templates para crear nuevos componentes de manera consistente.

## Pasos para crear un nuevo componente:

1. **Crea una carpeta** para tu componente en `lib/components/[NombreComponente]`

2. **Copia los archivos template** y renómbralos:
   - `Component.tsx.template` → `[NombreComponente].tsx`
   - `Component.types.ts.template` → `[NombreComponente].types.ts`
   - `index.ts.template` → `index.ts`

3. **Reemplaza los placeholders**:
   - `[COMPONENT_NAME]` → Nombre de tu componente (ej: `Autocomplete`)
   - `[ELEMENT]` → Elemento HTML (ej: `div`, `button`, `input`)
   - `[HTML_ELEMENT]` → Tipo HTML (ej: `Button`, `Input`, `Div`)

4. **Agrega las exportaciones** en `lib/index.ts`:
```typescript
export { NuevoComponente } from './components/NuevoComponente';
export type { NuevoComponenteProps } from './components/NuevoComponente';
```

## Ejemplo: Crear un componente Input

```bash
# Estructura
lib/components/Input/
├── Input.tsx
├── Input.types.ts
└── index.ts
```

Input.tsx:
```typescript
import React from 'react';
import { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border rounded px-3 py-2 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
```

## Convenciones

- Usa `React.forwardRef` para permitir acceso al elemento DOM
- Define tipos TypeScript para todas las props
- Usa `displayName` para debugging
- Documenta las props con JSDoc
- Exporta tanto el componente como sus tipos
