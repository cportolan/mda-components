# Guía de Uso en Otros Proyectos

## Método 1: Copiar la carpeta `lib`

La forma más simple de usar estos componentes en otros proyectos:

1. Copia la carpeta `lib` completa a tu nuevo proyecto
2. Asegúrate de tener las mismas dependencias instaladas
3. Importa los componentes:

```tsx
import { Button } from '@/lib';

function MyComponent() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked')}>
      Click me
    </Button>
  );
}
```

## Método 2: npm Link (Desarrollo Local)

Para desarrollo activo y testing:

1. En este proyecto (mcj-components):
```bash
npm link
```

2. En tu otro proyecto:
```bash
npm link mcj-components
```

3. Importa los componentes:
```tsx
import { Button } from 'mcj-components';
```

## Método 3: Publicar a npm (Producción)

Para producción, puedes publicar el paquete a npm:

1. Actualiza el `package.json`:
```json
{
  "name": "mcj-components",
  "version": "1.0.0",
  "private": false,
  "main": "lib/index.ts",
  "types": "lib/index.ts",
  "exports": {
    ".": "./lib/index.ts"
  }
}
```

2. Publica a npm:
```bash
npm publish
```

3. En otros proyectos:
```bash
npm install mcj-components
```

```tsx
import { Button } from 'mcj-components';
```

## Dependencias Requeridas

Asegúrate de que tu proyecto tenga instalado:
- React 19+
- Next.js 16+ (o cualquier framework compatible con React)
- TailwindCSS 4+
- TypeScript 5+

## Configuración de Tailwind

Los componentes usan Tailwind CSS. Asegúrate de tener configurado Tailwind en tu proyecto objetivo.

```js
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}', // Agregar esta línea
  ],
  // ... resto de la configuración
}
```
