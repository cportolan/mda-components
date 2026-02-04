# MCJ Components

Librería de componentes React reutilizables construida con Next.js, TypeScript y Tailwind CSS.

## 🚀 Componentes Disponibles

### Button

Un componente de botón versátil con múltiples variantes y tamaños.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean - Muestra un indicador de carga
- `disabled`: boolean - Deshabilita el botón
- `fullWidth`: boolean - Ocupa todo el ancho disponible

**Ejemplo:**
```tsx
import { Button } from '@/lib';

<Button variant="primary" size="md" onClick={() => console.log('Click')}>
  Click me
</Button>
```

## 📦 Estructura del Proyecto

```
lib/
├── components/          # Componentes de la librería
│   └── Button/         # Cada componente en su carpeta
│       ├── Button.tsx
│       ├── Button.types.ts
│       └── index.ts
├── types/              # Tipos compartidos
│   └── index.ts
└── index.ts            # Punto de entrada principal
```

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## 📝 Agregar Nuevos Componentes

1. Crea una carpeta en `lib/components/[NombreComponente]`
2. Crea los archivos:
   - `[NombreComponente].tsx` - El componente
   - `[NombreComponente].types.ts` - Los tipos TypeScript
   - `index.ts` - Exportaciones
3. Agrega las exportaciones en `lib/index.ts`

## 🎨 Próximos Componentes

- [ ] Autocomplete
- [ ] Toggle
- [ ] Table
- [ ] Input
- [ ] Select
- [ ] Modal
- [ ] Card

## 📄 Licencia

MIT
