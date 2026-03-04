# MDA Components

Librería de componentes React reutilizables construida con Next.js, TypeScript y Tailwind CSS.

## 📚 Tabla de Contenidos

- [Instalación](#-instalación)
- [Componentes](#-componentes)
    - [Button](#button)
    - [Input](#input)
    - [Select](#select)
    - [Autocomplete](#autocomplete)
    - [Checkbox](#checkbox)
    - [Toggle](#toggle)
    - [InputFile](#inputfile)
    - [Card](#card)
    - [Message](#message)
    - [Stepper](#stepper)
    - [Pagination](#pagination)
    - [Loader](#loader)
- [Desarrollo](#️-desarrollo)
- [Agregar Nuevos Componentes](#-agregar-nuevos-componentes)

---

## 🚀 Instalación

```bash
npm install
```

---

## 📦 Componentes

### Button

Un componente de botón versátil con múltiples variantes, tamaños y estados.

#### Props

| Prop        | Tipo                                              | Default     | Descripción                    |
| ----------- | ------------------------------------------------- | ----------- | ------------------------------ |
| `variant`   | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Variante visual del botón      |
| `size`      | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | Tamaño del botón               |
| `loading`   | `boolean`                                         | `false`     | Muestra indicador de carga     |
| `disabled`  | `boolean`                                         | `false`     | Deshabilita el botón           |
| `fullWidth` | `boolean`                                         | `false`     | Ocupa todo el ancho disponible |
| `className` | `string`                                          | `''`        | Clases CSS adicionales         |
| `children`  | `ReactNode`                                       | -           | Contenido del botón            |

#### Ejemplos

```tsx
import { Button } from '@/lib';

// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Tamaños
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Estados
<Button loading>Cargando...</Button>
<Button disabled>Deshabilitado</Button>

// Ancho completo
<Button fullWidth>Botón de Ancho Completo</Button>

// Con eventos
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>
```

---

### Input

Componente de entrada de texto con soporte para múltiples tipos, iconos y estados.

#### Props

| Prop          | Tipo                                                                                                                | Default  | Descripción             |
| ------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------- |
| `type`        | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search' \| 'date' \| 'time' \| 'datetime-local'` | `'text'` | Tipo de input           |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                                                              | `'md'`   | Tamaño del input        |
| `error`       | `boolean`                                                                                                           | `false`  | Muestra estado de error |
| `disabled`    | `boolean`                                                                                                           | `false`  | Deshabilita el input    |
| `fullWidth`   | `boolean`                                                                                                           | `false`  | Ocupa todo el ancho     |
| `label`       | `string`                                                                                                            | -        | Etiqueta del input      |
| `helperText`  | `string`                                                                                                            | -        | Texto de ayuda          |
| `leftIcon`    | `ReactNode`                                                                                                         | -        | Icono izquierdo         |
| `rightIcon`   | `ReactNode`                                                                                                         | -        | Icono derecho           |
| `placeholder` | `string`                                                                                                            | -        | Texto placeholder       |

#### Ejemplos

```tsx
import { Input } from '@/lib';

// Tipos de input
<Input type="text" placeholder="Nombre" />
<Input type="email" placeholder="correo@ejemplo.com" />
<Input type="password" placeholder="Contraseña" />
<Input type="number" placeholder="Edad" />
<Input type="tel" placeholder="Teléfono" />
<Input type="url" placeholder="https://ejemplo.com" />
<Input type="search" placeholder="Buscar..." />
<Input type="date" />
<Input type="time" />

// Con label y helper text
<Input
  label="Correo Electrónico"
  type="email"
  placeholder="tu@email.com"
  helperText="Te enviaremos un código de verificación"
/>

// Con iconos
<Input
  leftIcon={<SearchIcon />}
  placeholder="Buscar..."
/>

<Input
  type="password"
  rightIcon={<EyeIcon />}
  placeholder="Contraseña"
/>

// Estados
<Input error helperText="Este campo es requerido" />
<Input disabled placeholder="Campo deshabilitado" />

// Tamaños
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />

// Ancho completo
<Input fullWidth placeholder="Ancho completo" />

// Controlado
const [value, setValue] = useState('');
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Input controlado"
/>
```

---

### Select

Componente de selección con soporte para opciones personalizadas.

#### Props

| Prop          | Tipo                   | Default            | Descripción             |
| ------------- | ---------------------- | ------------------ | ----------------------- |
| `options`     | `SelectOption[]`       | -                  | Array de opciones       |
| `placeholder` | `string`               | `'Seleccionar...'` | Texto placeholder       |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`             | Tamaño del select       |
| `error`       | `boolean`              | `false`            | Muestra estado de error |
| `disabled`    | `boolean`              | `false`            | Deshabilita el select   |
| `fullWidth`   | `boolean`              | `false`            | Ocupa todo el ancho     |
| `className`   | `string`               | `''`               | Clases CSS adicionales  |

#### Tipo SelectOption

```typescript
interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
```

#### Ejemplos

```tsx
import { Select } from '@/lib';

// Básico
const options = [
  { label: 'Opción 1', value: '1' },
  { label: 'Opción 2', value: '2' },
  { label: 'Opción 3', value: '3' }
];

<Select options={options} />

// Con placeholder personalizado
<Select
  options={options}
  placeholder="Elige una opción..."
/>

// Con opciones deshabilitadas
const optionsWithDisabled = [
  { label: 'Activo', value: '1' },
  { label: 'Inactivo (No disponible)', value: '2', disabled: true },
  { label: 'Pendiente', value: '3' }
];

<Select options={optionsWithDisabled} />

// Estados
<Select options={options} error />
<Select options={options} disabled />

// Tamaños
<Select options={options} size="sm" />
<Select options={options} size="md" />
<Select options={options} size="lg" />

// Ancho completo
<Select options={options} fullWidth />

// Controlado
const [selected, setSelected] = useState('');
<Select
  options={options}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
/>

// Ejemplos prácticos
const paises = [
  { label: 'México', value: 'mx' },
  { label: 'Colombia', value: 'co' },
  { label: 'Argentina', value: 'ar' },
  { label: 'España', value: 'es' }
];

<Select
  options={paises}
  placeholder="Selecciona tu país"
  fullWidth
/>
```

---

### Autocomplete

Componente de autocompletado con búsqueda y filtrado de opciones.

#### Props

| Prop          | Tipo                                   | Default       | Descripción               |
| ------------- | -------------------------------------- | ------------- | ------------------------- |
| `options`     | `AutocompleteOption[]`                 | -             | Array de opciones         |
| `placeholder` | `string`                               | `'Buscar...'` | Texto placeholder         |
| `size`        | `'sm' \| 'md' \| 'lg'`                 | `'md'`        | Tamaño del input          |
| `error`       | `boolean`                              | `false`       | Muestra estado de error   |
| `disabled`    | `boolean`                              | `false`       | Deshabilita el componente |
| `fullWidth`   | `boolean`                              | `false`       | Ocupa todo el ancho       |
| `onSelect`    | `(option: AutocompleteOption) => void` | -             | Callback al seleccionar   |
| `className`   | `string`                               | `''`          | Clases CSS adicionales    |

#### Tipo AutocompleteOption

```typescript
interface AutocompleteOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
```

#### Ejemplos

```tsx
import { Autocomplete } from '@/lib';

// Básico
const opciones = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'py' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' }
];

<Autocomplete options={opciones} />

// Con callback de selección
<Autocomplete
  options={opciones}
  onSelect={(option) => console.log('Seleccionado:', option)}
/>

// Con placeholder personalizado
<Autocomplete
  options={opciones}
  placeholder="Busca un lenguaje..."
/>

// Estados
<Autocomplete options={opciones} error />
<Autocomplete options={opciones} disabled />

// Tamaños
<Autocomplete options={opciones} size="sm" />
<Autocomplete options={opciones} size="md" />
<Autocomplete options={opciones} size="lg" />

// Ancho completo
<Autocomplete options={opciones} fullWidth />

// Ejemplo práctico - Buscador de ciudades
const ciudades = [
  { label: 'Ciudad de México', value: 'cdmx' },
  { label: 'Guadalajara', value: 'gdl' },
  { label: 'Monterrey', value: 'mty' },
  { label: 'Puebla', value: 'pue' },
  { label: 'Querétaro', value: 'qro' }
];

const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);

<Autocomplete
  options={ciudades}
  placeholder="Buscar ciudad..."
  onSelect={(option) => setCiudadSeleccionada(option)}
  fullWidth
/>
```

---

### Checkbox

Componente de casilla de verificación con soporte para estados controlados y no controlados.

#### Props

| Prop             | Tipo                   | Default | Descripción                    |
| ---------------- | ---------------------- | ------- | ------------------------------ |
| `checked`        | `boolean`              | -       | Estado marcado (controlado)    |
| `defaultChecked` | `boolean`              | -       | Estado inicial (no controlado) |
| `onChange`       | `(event) => void`      | -       | Callback al cambiar            |
| `size`           | `'sm' \| 'md' \| 'lg'` | `'md'`  | Tamaño del checkbox            |
| `disabled`       | `boolean`              | `false` | Deshabilita el checkbox        |
| `label`          | `string`               | -       | Etiqueta del checkbox          |
| `error`          | `boolean`              | `false` | Muestra estado de error        |
| `indeterminate`  | `boolean`              | `false` | Estado indeterminado           |
| `className`      | `string`               | `''`    | Clases CSS adicionales         |

#### Ejemplos

```tsx
import { Checkbox } from '@/lib';

// Básico
<Checkbox />

// Con etiqueta
<Checkbox label="Acepto los términos y condiciones" />

// Controlado
const [checked, setChecked] = useState(false);
<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Checkbox controlado"
/>

// No controlado
<Checkbox
  defaultChecked={true}
  label="Checkbox no controlado"
/>

// Tamaños
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />

// Estados
<Checkbox disabled label="Deshabilitado" />
<Checkbox error label="Con error" />
<Checkbox indeterminate label="Indeterminado" />

// Ejemplo práctico - Lista de tareas
const [tareas, setTareas] = useState([
  { id: 1, text: 'Comprar leche', completada: false },
  { id: 2, text: 'Hacer ejercicio', completada: true },
  { id: 3, text: 'Leer 30 minutos', completada: false }
]);

{tareas.map(tarea => (
  <Checkbox
    key={tarea.id}
    checked={tarea.completada}
    onChange={(e) => {
      setTareas(tareas.map(t =>
        t.id === tarea.id
          ? { ...t, completada: e.target.checked }
          : t
      ));
    }}
    label={tarea.text}
  />
))}

// Select all con indeterminate
const allChecked = tareas.every(t => t.completada);
const someChecked = tareas.some(t => t.completada);

<Checkbox
  checked={allChecked}
  indeterminate={someChecked && !allChecked}
  onChange={(e) => {
    setTareas(tareas.map(t => ({
      ...t,
      completada: e.target.checked
    })));
  }}
  label="Seleccionar todas"
/>
```

---

### Toggle

Componente de interruptor on/off con diseño moderno.

#### Props

| Prop             | Tipo                   | Default | Descripción                    |
| ---------------- | ---------------------- | ------- | ------------------------------ |
| `checked`        | `boolean`              | -       | Estado activado (controlado)   |
| `defaultChecked` | `boolean`              | -       | Estado inicial (no controlado) |
| `onChange`       | `(event) => void`      | -       | Callback al cambiar            |
| `size`           | `'sm' \| 'md' \| 'lg'` | `'md'`  | Tamaño del toggle              |
| `disabled`       | `boolean`              | `false` | Deshabilita el toggle          |
| `label`          | `string`               | -       | Etiqueta del toggle            |
| `className`      | `string`               | `''`    | Clases CSS adicionales         |

#### Ejemplos

```tsx
import { Toggle } from '@/lib';

// Básico
<Toggle />

// Con etiqueta
<Toggle label="Activar notificaciones" />

// Controlado
const [enabled, setEnabled] = useState(false);
<Toggle
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
  label="Modo oscuro"
/>

// No controlado
<Toggle
  defaultChecked={true}
  label="Toggle activado por defecto"
/>

// Tamaños
<Toggle size="sm" label="Small" />
<Toggle size="md" label="Medium" />
<Toggle size="lg" label="Large" />

// Deshabilitado
<Toggle disabled label="Deshabilitado" />

// Ejemplo práctico - Configuración
const [config, setConfig] = useState({
  notificaciones: true,
  modoOscuro: false,
  autoGuardado: true,
  sonido: false
});

<div className="space-y-4">
  <Toggle
    checked={config.notificaciones}
    onChange={(e) => setConfig({
      ...config,
      notificaciones: e.target.checked
    })}
    label="Notificaciones push"
  />

  <Toggle
    checked={config.modoOscuro}
    onChange={(e) => setConfig({
      ...config,
      modoOscuro: e.target.checked
    })}
    label="Modo oscuro"
  />

  <Toggle
    checked={config.autoGuardado}
    onChange={(e) => setConfig({
      ...config,
      autoGuardado: e.target.checked
    })}
    label="Guardado automático"
  />

  <Toggle
    checked={config.sonido}
    onChange={(e) => setConfig({
      ...config,
      sonido: e.target.checked
    })}
    label="Efectos de sonido"
  />
</div>
```

---

### InputFile

Componente de carga de archivos con soporte para drag & drop, vista previa y validaciones.

#### Props

| Prop           | Tipo                                  | Default | Descripción                  |
| -------------- | ------------------------------------- | ------- | ---------------------------- |
| `accept`       | `string`                              | -       | Tipos de archivos aceptados  |
| `multiple`     | `boolean`                             | `false` | Permitir múltiples archivos  |
| `maxSize`      | `number`                              | -       | Tamaño máximo en MB          |
| `maxFiles`     | `number`                              | -       | Número máximo de archivos    |
| `label`        | `string`                              | -       | Etiqueta del componente      |
| `helperText`   | `string`                              | -       | Texto de ayuda               |
| `error`        | `boolean`                             | `false` | Muestra estado de error      |
| `disabled`     | `boolean`                             | `false` | Deshabilita el componente    |
| `size`         | `'sm' \| 'md' \| 'lg'`                | `'md'`  | Tamaño del componente        |
| `fullWidth`    | `boolean`                             | `false` | Ocupa todo el ancho          |
| `onChange`     | `(files: File[]) => void`             | -       | Callback al cambiar archivos |
| `onRemove`     | `(file: File, index: number) => void` | -       | Callback al eliminar archivo |
| `showPreview`  | `boolean`                             | `false` | Mostrar vista previa         |
| `buttonText`   | `string`                              | -       | Texto del botón              |
| `dropzoneText` | `string`                              | -       | Texto del área de drop       |
| `value`        | `File[]`                              | -       | Archivos (controlado)        |

#### Ejemplos

```tsx
import { InputFile } from '@/lib';

// Básico
<InputFile />

// Solo imágenes
<InputFile
  accept="image/*"
  label="Subir foto de perfil"
/>

// Múltiples archivos
<InputFile
  multiple
  maxFiles={5}
  label="Subir documentos"
  helperText="Puedes subir hasta 5 archivos"
/>

// Con validación de tamaño
<InputFile
  accept="application/pdf"
  maxSize={5}
  label="Subir PDF"
  helperText="Tamaño máximo: 5MB"
/>

// Con vista previa de imágenes
<InputFile
  accept="image/*"
  showPreview
  multiple
  maxFiles={4}
  label="Galería de imágenes"
/>

// Controlado con callback
const [archivos, setArchivos] = useState<File[]>([]);

<InputFile
  value={archivos}
  onChange={(files) => setArchivos(files)}
  onRemove={(file, index) => {
    setArchivos(archivos.filter((_, i) => i !== index));
  }}
  multiple
  label="Archivos seleccionados"
/>

// Tipos específicos
<InputFile
  accept=".pdf,.doc,.docx"
  label="Documentos (PDF, Word)"
/>

<InputFile
  accept="image/png,image/jpeg"
  label="Solo PNG y JPG"
/>

// Tamaños
<InputFile size="sm" />
<InputFile size="md" />
<InputFile size="lg" />

// Ancho completo
<InputFile fullWidth />

// Estados
<InputFile disabled label="Deshabilitado" />
<InputFile error helperText="Error al subir archivo" />

// Textos personalizados
<InputFile
  buttonText="Seleccionar archivo"
  dropzoneText="O arrastra y suelta aquí"
/>

// Ejemplo completo - Formulario de registro
const [foto, setFoto] = useState<File[]>([]);
const [documentos, setDocumentos] = useState<File[]>([]);

<form>
  <InputFile
    accept="image/*"
    maxSize={2}
    showPreview
    label="Foto de perfil"
    helperText="JPG o PNG, máximo 2MB"
    value={foto}
    onChange={setFoto}
    fullWidth
  />

  <InputFile
    accept=".pdf"
    multiple
    maxFiles={3}
    maxSize={10}
    label="Documentos de identificación"
    helperText="Hasta 3 PDFs, máximo 10MB cada uno"
    value={documentos}
    onChange={setDocumentos}
    fullWidth
  />
</form>
```

---

### Card

Componente de tarjeta versátil con múltiples variantes y tarjetas pre-configuradas.

#### Card Base

##### Props

| Prop        | Tipo                                                                   | Default     | Descripción             |
| ----------- | ---------------------------------------------------------------------- | ----------- | ----------------------- |
| `variant`   | `'default' \| 'outlined' \| 'elevated' \| 'gradient' \| 'interactive'` | `'default'` | Variante visual         |
| `padding`   | `'none' \| 'sm' \| 'md' \| 'lg'`                                       | `'md'`      | Padding interno         |
| `rounded`   | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                               | `'lg'`      | Radio de bordes         |
| `hover`     | `boolean`                                                              | `false`     | Efecto hover            |
| `fullWidth` | `boolean`                                                              | `false`     | Ocupa todo el ancho     |
| `children`  | `ReactNode`                                                            | -           | Contenido de la tarjeta |

##### Ejemplos

```tsx
import { Card } from '@/lib';

// Variantes
<Card variant="default">
  <h3>Card Default</h3>
  <p>Contenido de la tarjeta</p>
</Card>

<Card variant="outlined">
  <h3>Card Outlined</h3>
</Card>

<Card variant="elevated">
  <h3>Card Elevated</h3>
</Card>

<Card variant="gradient">
  <h3>Card Gradient</h3>
</Card>

<Card variant="interactive">
  <h3>Card Interactive</h3>
</Card>

// Padding
<Card padding="none">Sin padding</Card>
<Card padding="sm">Padding pequeño</Card>
<Card padding="md">Padding mediano</Card>
<Card padding="lg">Padding grande</Card>

// Bordes redondeados
<Card rounded="none">Sin bordes</Card>
<Card rounded="sm">Bordes pequeños</Card>
<Card rounded="md">Bordes medianos</Card>
<Card rounded="lg">Bordes grandes</Card>
<Card rounded="xl">Bordes extra grandes</Card>

// Con hover
<Card hover>
  Card con efecto hover
</Card>

// Ancho completo
<Card fullWidth>
  Card de ancho completo
</Card>
```

#### ArticleCard

Tarjeta pre-configurada para artículos de blog.

##### Props

| Prop          | Tipo         | Descripción              |
| ------------- | ------------ | ------------------------ |
| `title`       | `string`     | Título del artículo      |
| `description` | `string`     | Descripción del artículo |
| `author`      | `string`     | Autor del artículo       |
| `date`        | `string`     | Fecha de publicación     |
| `readTime`    | `string`     | Tiempo de lectura        |
| `image`       | `string`     | URL de la imagen         |
| `tags`        | `string[]`   | Array de etiquetas       |
| `onClick`     | `() => void` | Callback al hacer click  |

##### Ejemplos

```tsx
import { ArticleCard } from "@/lib";

<ArticleCard
    title="Introducción a TypeScript"
    description="Aprende los fundamentos de TypeScript y cómo puede mejorar tu código JavaScript."
    author="Juan Pérez"
    date="15 Mar 2024"
    readTime="5 min"
    image="/article.jpg"
    tags={["TypeScript", "JavaScript", "Tutorial"]}
    onClick={() => navigate("/article/1")}
/>;
```

#### ImageCard

Tarjeta optimizada para mostrar imágenes.

##### Props

| Prop          | Tipo                                | Default   | Descripción             |
| ------------- | ----------------------------------- | --------- | ----------------------- |
| `image`       | `string`                            | -         | URL de la imagen        |
| `title`       | `string`                            | -         | Título                  |
| `description` | `string`                            | -         | Descripción             |
| `overlay`     | `boolean`                           | `true`    | Overlay al hacer hover  |
| `aspectRatio` | `'square' \| 'video' \| 'portrait'` | `'video'` | Relación de aspecto     |
| `onClick`     | `() => void`                        | -         | Callback al hacer click |

##### Ejemplos

```tsx
import { ImageCard } from '@/lib';

<ImageCard
  image="/foto.jpg"
  title="Atardecer en la playa"
  description="Hermosa vista del océano"
  aspectRatio="square"
  overlay={true}
  onClick={() => openGallery()}
/>

// Sin overlay
<ImageCard
  image="/producto.jpg"
  title="Producto destacado"
  overlay={false}
  aspectRatio="portrait"
/>
```

#### ProfileCard

Tarjeta para perfiles de usuario.

##### Props

| Prop      | Tipo        | Descripción        |
| --------- | ----------- | ------------------ |
| `name`    | `string`    | Nombre             |
| `role`    | `string`    | Rol o cargo        |
| `avatar`  | `string`    | URL del avatar     |
| `email`   | `string`    | Correo electrónico |
| `phone`   | `string`    | Teléfono           |
| `bio`     | `string`    | Biografía          |
| `actions` | `ReactNode` | Botones de acción  |

##### Ejemplos

```tsx
import { ProfileCard } from "@/lib";

<ProfileCard
    name="María González"
    role="Desarrolladora Frontend"
    avatar="/avatar.jpg"
    email="maria@ejemplo.com"
    phone="+52 123 456 7890"
    bio="Apasionada por crear interfaces de usuario increíbles."
    actions={
        <>
            <Button variant="primary" fullWidth>
                Seguir
            </Button>
            <Button variant="ghost" fullWidth>
                Mensaje
            </Button>
        </>
    }
/>;
```

#### StatsCard

Tarjeta para mostrar estadísticas.

##### Props

| Prop          | Tipo                          | Default     | Descripción              |
| ------------- | ----------------------------- | ----------- | ------------------------ |
| `title`       | `string`                      | -           | Título de la estadística |
| `value`       | `string \| number`            | -           | Valor                    |
| `change`      | `string \| number`            | -           | Cambio porcentual        |
| `trend`       | `'up' \| 'down' \| 'neutral'` | `'neutral'` | Tendencia                |
| `icon`        | `ReactNode`                   | -           | Icono                    |
| `description` | `string`                      | -           | Descripción adicional    |

##### Ejemplos

```tsx
import { StatsCard } from '@/lib';

<StatsCard
  title="Ventas Totales"
  value="$45,231"
  change={12.5}
  trend="up"
  icon={<DollarIcon />}
  description="vs. mes anterior"
/>

<StatsCard
  title="Usuarios Activos"
  value="2,431"
  change={-5.2}
  trend="down"
  icon={<UsersIcon />}
/>

<StatsCard
  title="Productos"
  value="189"
  icon={<PackageIcon />}
/>
```

#### ProductCard

Tarjeta para productos de e-commerce.

##### Props

| Prop          | Tipo         | Default | Descripción                 |
| ------------- | ------------ | ------- | --------------------------- |
| `name`        | `string`     | -       | Nombre del producto         |
| `price`       | `number`     | -       | Precio                      |
| `image`       | `string`     | -       | URL de la imagen            |
| `description` | `string`     | -       | Descripción                 |
| `rating`      | `number`     | `0`     | Calificación (0-5)          |
| `reviews`     | `number`     | `0`     | Número de reseñas           |
| `inStock`     | `boolean`    | `true`  | Disponibilidad              |
| `onAddToCart` | `() => void` | -       | Callback agregar al carrito |

##### Ejemplos

```tsx
import { ProductCard } from '@/lib';

<ProductCard
  name="Laptop Gaming Pro"
  price={24999}
  image="/laptop.jpg"
  description="Laptop de alto rendimiento con procesador Intel i7"
  rating={4}
  reviews={128}
  inStock={true}
  onAddToCart={() => addToCart(product)}
/>

// Producto agotado
<ProductCard
  name="Mouse Inalámbrico"
  price={599}
  image="/mouse.jpg"
  inStock={false}
/>
```

---

### Message

Componente para mostrar mensajes de alerta, éxito, error y advertencia.

#### Props

| Prop        | Tipo                                             | Default     | Descripción            |
| ----------- | ------------------------------------------------ | ----------- | ---------------------- |
| `variant`   | `'success' \| 'error' \| 'warning' \| 'default'` | `'default'` | Tipo de mensaje        |
| `title`     | `string`                                         | -           | Título del mensaje     |
| `children`  | `ReactNode`                                      | -           | Contenido del mensaje  |
| `showIcon`  | `boolean`                                        | `true`      | Mostrar icono          |
| `icon`      | `ReactNode`                                      | -           | Icono personalizado    |
| `closable`  | `boolean`                                        | `false`     | Mostrar botón cerrar   |
| `onClose`   | `() => void`                                     | -           | Callback al cerrar     |
| `className` | `string`                                         | `''`        | Clases CSS adicionales |

#### Ejemplos

```tsx
import { Message } from '@/lib';

// Variantes
<Message variant="success">
  Operación completada exitosamente
</Message>

<Message variant="error">
  Ha ocurrido un error al procesar tu solicitud
</Message>

<Message variant="warning">
  Tu sesión expirará en 5 minutos
</Message>

<Message variant="default">
  Información general del sistema
</Message>

// Con título
<Message variant="success" title="¡Éxito!">
  Tu pedido ha sido procesado correctamente
</Message>

<Message variant="error" title="Error de validación">
  Por favor completa todos los campos requeridos
</Message>

// Cerrable
const [visible, setVisible] = useState(true);

{visible && (
  <Message
    variant="warning"
    closable
    onClose={() => setVisible(false)}
  >
    Este es un mensaje que se puede cerrar
  </Message>
)}

// Sin icono
<Message variant="success" showIcon={false}>
  Mensaje sin icono
</Message>

// Con icono personalizado
<Message
  variant="default"
  icon={<CustomIcon />}
>
  Mensaje con icono personalizado
</Message>

// Ejemplo práctico - Sistema de notificaciones
const [mensajes, setMensajes] = useState([
  { id: 1, tipo: 'success', texto: 'Perfil actualizado' },
  { id: 2, tipo: 'warning', texto: 'Revisa tu información de pago' },
  { id: 3, tipo: 'error', texto: 'Error al cargar datos' }
]);

<div className="space-y-4">
  {mensajes.map(mensaje => (
    <Message
      key={mensaje.id}
      variant={mensaje.tipo}
      closable
      onClose={() => setMensajes(mensajes.filter(m => m.id !== mensaje.id))}
    >
      {mensaje.texto}
    </Message>
  ))}
</div>
```

---

### Stepper

Componente de pasos para guiar al usuario a través de flujos multi-etapa (wizards, formularios, trámites). Incluye `Stepper` para mostrar el progreso y `StepperNavigation` como wrapper completo con botones de navegación.

#### Tipos

```typescript
type StepperVariant = "default" | "outlined" | "minimal" | "dots";
type StepperSize = "sm" | "md" | "lg";
type StepperOrientation = "horizontal" | "vertical";
type StepStatus = "completed" | "active" | "pending" | "error";

interface Step {
    title: string;
    description?: string;
    icon?: ReactNode;
    status?: StepStatus; // sobreescribe el estado calculado
    disabled?: boolean;
}
```

#### Props — `Stepper`

| Prop          | Tipo                      | Default        | Descripción                                    |
| ------------- | ------------------------- | -------------- | ---------------------------------------------- |
| `steps`       | `Step[]`                  | -              | Array de pasos                                 |
| `activeStep`  | `number`                  | `0`            | Índice del paso activo (0-based)               |
| `variant`     | `StepperVariant`          | `'default'`    | Variante visual                                |
| `size`        | `StepperSize`             | `'md'`         | Tamaño del stepper                             |
| `orientation` | `StepperOrientation`      | `'horizontal'` | Orientación                                    |
| `clickable`   | `boolean`                 | `false`        | Permite navegar haciendo click en los pasos    |
| `onStepClick` | `(index: number) => void` | -              | Callback al hacer click en un paso (clickable) |
| `className`   | `string`                  | `''`           | Clases CSS adicionales                         |

#### Props — `StepperNavigation`

| Prop          | Tipo                 | Default        | Descripción                         |
| ------------- | -------------------- | -------------- | ----------------------------------- |
| `steps`       | `Step[]`             | -              | Array de pasos                      |
| `activeStep`  | `number`             | `0`            | Índice del paso activo              |
| `onNext`      | `() => void`         | -              | Callback al avanzar                 |
| `onBack`      | `() => void`         | -              | Callback al retroceder              |
| `onFinish`    | `() => void`         | -              | Callback al finalizar (último paso) |
| `children`    | `ReactNode`          | -              | Contenido del paso activo           |
| `variant`     | `StepperVariant`     | `'default'`    | Variante visual del stepper interno |
| `size`        | `StepperSize`        | `'md'`         | Tamaño                              |
| `orientation` | `StepperOrientation` | `'horizontal'` | Orientación                         |
| `nextLabel`   | `string`             | `'Siguiente'`  | Texto del botón siguiente           |
| `backLabel`   | `string`             | `'Anterior'`   | Texto del botón anterior            |
| `finishLabel` | `string`             | `'Finalizar'`  | Texto del botón finalizar           |
| `className`   | `string`             | `''`           | Clases CSS adicionales              |

#### Ejemplos

```tsx
import { Stepper, StepperNavigation } from '@/lib';
import type { Step } from '@/lib';

const steps: Step[] = [
  { title: 'Datos personales', description: 'Nombre y DNI' },
  { title: 'Domicilio',        description: 'Dirección de residencia' },
  { title: 'Documentación',   description: 'Adjuntar archivos' },
  { title: 'Confirmación',    description: 'Revisar y enviar' },
];

// ── Variante default ──────────────────────────────────────────────────────────
<Stepper steps={steps} activeStep={1} />

// ── Variante outlined ─────────────────────────────────────────────────────────
<Stepper steps={steps} activeStep={2} variant="outlined" />

// ── Variante minimal ──────────────────────────────────────────────────────────
<Stepper steps={steps} activeStep={1} variant="minimal" />

// ── Variante dots ─────────────────────────────────────────────────────────────
// Muestra puntos con la etiqueta del paso activo debajo.
<Stepper steps={steps} activeStep={2} variant="dots" />

// ── Orientación vertical ──────────────────────────────────────────────────────
<Stepper steps={steps} activeStep={1} orientation="vertical" />
<Stepper steps={steps} activeStep={1} orientation="vertical" variant="outlined" />

// ── Tamaños ───────────────────────────────────────────────────────────────────
<Stepper steps={steps} activeStep={1} size="sm" />
<Stepper steps={steps} activeStep={1} size="md" />
<Stepper steps={steps} activeStep={1} size="lg" />

// ── Clickeable ────────────────────────────────────────────────────────────────
const [active, setActive] = useState(0);

<Stepper
  steps={steps}
  activeStep={active}
  clickable
  onStepClick={setActive}
/>

// ── Con íconos personalizados ─────────────────────────────────────────────────
const stepsConIconos: Step[] = [
  { title: 'Cuenta',  icon: <UserIcon /> },
  { title: 'Pago',    icon: <CardIcon /> },
  { title: 'Envío',   icon: <ArrowIcon /> },
  { title: 'Listo',   icon: <CheckIcon /> },
];

<Stepper steps={stepsConIconos} activeStep={2} />

// ── Con estado de error ───────────────────────────────────────────────────────
const stepsConError: Step[] = [
  { title: 'Datos personales' },
  { title: 'Domicilio', status: 'error', description: 'Dirección inválida' },
  { title: 'Documentación' },
  { title: 'Confirmación' },
];

<Stepper steps={stepsConError} activeStep={1} />

// ── Con pasos deshabilitados ──────────────────────────────────────────────────
const stepsConDisabled: Step[] = [
  { title: 'Paso 1' },
  { title: 'Paso 2' },
  { title: 'Paso 3', disabled: true },
  { title: 'Paso 4', disabled: true },
];

<Stepper steps={stepsConDisabled} activeStep={1} clickable onStepClick={setActive} />

// ── StepperNavigation — básico ────────────────────────────────────────────────
const [activeStep, setActiveStep] = useState(0);

<StepperNavigation
  steps={steps}
  activeStep={activeStep}
  onNext={()   => setActiveStep(s => Math.min(s + 1, steps.length - 1))}
  onBack={()   => setActiveStep(s => Math.max(s - 1, 0))}
  onFinish={()  => console.log('¡Finalizado!')}
>
  {activeStep === 0 && <p>Contenido del paso 1</p>}
  {activeStep === 1 && <p>Contenido del paso 2</p>}
  {activeStep === 2 && <p>Contenido del paso 3</p>}
  {activeStep === 3 && <p>Contenido del paso 4</p>}
</StepperNavigation>

// ── StepperNavigation — variante outlined con labels personalizados ────────────
<StepperNavigation
  steps={steps}
  activeStep={activeStep}
  variant="outlined"
  nextLabel="Continuar"
  backLabel="Volver"
  finishLabel="Enviar trámite"
  onNext={()  => setActiveStep(s => s + 1)}
  onBack={()  => setActiveStep(s => s - 1)}
  onFinish={() => submitForm()}
>
  <FormularioPaso paso={activeStep} />
</StepperNavigation>

// ── StepperNavigation — variante dots ─────────────────────────────────────────
<StepperNavigation
  steps={steps}
  activeStep={activeStep}
  variant="dots"
  onNext={()  => setActiveStep(s => s + 1)}
  onBack={()  => setActiveStep(s => s - 1)}
  onFinish={() => finish()}
/>

// ── Ejemplo completo — Trámite municipal ──────────────────────────────────────
const pasosTramite: Step[] = [
  { title: 'Inicio',       description: 'Tipo de trámite' },
  { title: 'Solicitante',  description: 'Datos del vecino' },
  { title: 'Documentos',   description: 'Adjuntar archivos' },
  { title: 'Pago',         description: 'Abonar tasa' },
  { title: 'Confirmación', description: 'Revisar y enviar' },
];

const [paso, setPaso] = useState(0);

<StepperNavigation
  steps={pasosTramite}
  activeStep={paso}
  variant="default"
  size="md"
  onNext={()   => setPaso(p => Math.min(p + 1, pasosTramite.length - 1))}
  onBack={()   => setPaso(p => Math.max(p - 1, 0))}
  onFinish={()  => enviarTramite()}
  nextLabel="Continuar"
  backLabel="Volver"
  finishLabel="Enviar Trámite"
>
  {paso === 0 && <FormularioTipoTramite />}
  {paso === 1 && <FormularioSolicitante />}
  {paso === 2 && <FormularioDocumentos />}
  {paso === 3 && <FormularioPago />}
  {paso === 4 && <ResumenTramite />}
</StepperNavigation>
```

---

### Pagination

Componente de paginación con rango de páginas dinámico, puntos suspensivos automáticos, múltiples tamaños y estado deshabilitado.

#### Props

| Prop               | Tipo                                     | Default             | Descripción                                              |
| ------------------ | ---------------------------------------- | ------------------- | -------------------------------------------------------- |
| `totalPages`       | `number`                                 | -                   | Número total de páginas                                  |
| `currentPage`      | `number`                                 | -                   | Página activa (1-based)                                  |
| `onPageChange`     | `(page: number) => void`                 | -                   | Callback al cambiar de página                            |
| `size`             | `'sm' \| 'md' \| 'lg'`                   | `'md'`              | Tamaño de los botones                                    |
| `disabled`         | `boolean`                                | `false`             | Deshabilita toda la paginación                           |
| `showPageInfo`     | `boolean`                                | `false`             | Muestra el contador "Página X de Y"                      |
| `pageSize`         | `10 \| 25 \| 50 \| 100`                  | -                   | Resultados por página activos. Activa el selector        |
| `onPageSizeChange` | `(pageSize: PaginationPageSize) => void` | -                   | Callback al cambiar la cantidad de resultados por página |
| `pageSizeOptions`  | `PaginationPageSize[]`                   | `[10, 25, 50, 100]` | Opciones disponibles en el select                        |
| `className`        | `string`                                 | `''`                | Clases CSS adicionales                                   |

#### Comportamiento del rango

- Siempre muestra la **primera** y la **última** página.
- Muestra las páginas adyacentes (`currentPage - 1`, `currentPage`, `currentPage + 1`).
- Inserta `…` automáticamente cuando hay un hueco entre el inicio o el final y el rango visible.
- Los botones ← y → se deshabilitan automáticamente en los extremos.

#### Ejemplos

```tsx
import { Pagination } from '@/lib';
import type { PaginationPageSize } from '@/lib';

// Básico
const [page, setPage] = useState(1);

<Pagination
  totalPages={20}
  currentPage={page}
  onPageChange={setPage}
/>

// Con contador "Página X de Y"
<Pagination
  totalPages={15}
  currentPage={page}
  onPageChange={setPage}
  showPageInfo
/>

// Pocas páginas (sin puntos suspensivos)
<Pagination
  totalPages={5}
  currentPage={page}
  onPageChange={setPage}
/>

// Tamaños
<Pagination totalPages={10} currentPage={page} onPageChange={setPage} size="sm" />
<Pagination totalPages={10} currentPage={page} onPageChange={setPage} size="md" />
<Pagination totalPages={10} currentPage={page} onPageChange={setPage} size="lg" />

// Deshabilitado
<Pagination
  totalPages={10}
  currentPage={3}
  onPageChange={() => {}}
  disabled
/>

// Con selector "Mostrando X resultados"
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState<PaginationPageSize>(10);

<Pagination
  totalPages={Math.ceil(247 / pageSize)}
  currentPage={page}
  onPageChange={setPage}
  pageSize={pageSize}
  onPageSizeChange={(ps) => {
    setPageSize(ps);
    setPage(1); // resetear a la primera página al cambiar el tamaño
  }}
  showPageInfo
/>

// Con opciones personalizadas de pageSize
<Pagination
  totalPages={Math.ceil(500 / pageSize)}
  currentPage={page}
  onPageChange={setPage}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
  pageSizeOptions={[10, 25, 50]}
/>

// Ejemplo práctico — lista de trámites con selector de resultados
const [paginaTramites, setPaginaTramites] = useState(1);
const [itemsPorPagina, setItemsPorPagina] = useState<PaginationPageSize>(10);
const totalTramites = 234;

<div className="space-y-4">
  {tramites
    .slice((paginaTramites - 1) * itemsPorPagina, paginaTramites * itemsPorPagina)
    .map(tramite => <TramiteRow key={tramite.id} tramite={tramite} />)
  }

  <Pagination
    totalPages={Math.ceil(totalTramites / itemsPorPagina)}
    currentPage={paginaTramites}
    onPageChange={setPaginaTramites}
    pageSize={itemsPorPagina}
    onPageSizeChange={(ps) => {
      setItemsPorPagina(ps);
      setPaginaTramites(1);
    }}
    showPageInfo
  />
</div>
```

---

### Loader

Componente de carga que soporta tres variantes: pantalla completa opaca, overlay semitransparente e inline dentro de un contenedor. Las variantes `full` y `overlay` usan un **portal al body** para no interferir con el layout. Incluye soporte para SSR sin parpadeo.

#### Props

| Prop        | Tipo                              | Default   | Descripción                                                                                        |
| ----------- | --------------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `variant`   | `'full' \| 'overlay' \| 'inline'` | `'full'`  | Tipo de loader. `full` = fondo opaco, `overlay` = fondo semitransparente, `inline` = en contenedor |
| `color`     | `'green' \| 'blue'`               | `'green'` | Color del spinner. `green` para rutas estándar, `blue` para secciones municipales                  |
| `size`      | `'sm' \| 'md' \| 'lg'`            | `'md'`    | Tamaño del ícono animado                                                                           |
| `icon`      | `ReactNode`                       | -         | Ícono o imagen personalizada. Si se omite, se usa el spinner SVG por defecto                       |
| `label`     | `string`                          | -         | Texto opcional debajo del ícono                                                                    |
| `className` | `string`                          | `''`      | Clases CSS adicionales sobre el contenedor raíz                                                    |

#### Variantes

| Variante  | Fondo             | Posición   | Portal | Uso típico                        |
| --------- | ----------------- | ---------- | ------ | --------------------------------- |
| `full`    | Blanco 100% opaco | `fixed`    | ✅     | Carga inicial de página           |
| `overlay` | Blanco 85% + blur | `fixed`    | ✅     | Procesando una acción del usuario |
| `inline`  | Blanco 80% + blur | `absolute` | ❌     | Carga de una sección o tabla      |

> El componente padre de un `Loader` con `variant="inline"` debe tener `position: relative`.

#### Ejemplos

```tsx
import { Loader } from '@/lib';

// ── Variante full (pantalla completa opaca) ───────────────────────────────────
const [loading, setLoading] = useState(false);

{loading && <Loader variant="full" />}

// Con color azul municipal y etiqueta
{loading && (
  <Loader variant="full" color="blue" size="lg" label="Cargando..." />
)}

// ── Variante overlay (pantalla semitransparente) ──────────────────────────────
{loading && (
  <Loader variant="overlay" color="green" label="Procesando solicitud..." />
)}

// ── Variante inline (dentro de un contenedor) ─────────────────────────────────
// El padre DEBE tener position: relative
<div className="relative h-40 rounded-xl border bg-gray-50">
  <Loader variant="inline" />
</div>

// Con etiqueta
<div className="relative h-40 rounded-xl border bg-gray-50">
  <Loader variant="inline" color="green" size="md" label="Cargando datos..." />
</div>

// ── Tamaños ───────────────────────────────────────────────────────────────────
<div className="relative h-20 w-20">
  <Loader variant="inline" size="sm" />
</div>

<div className="relative h-28 w-28">
  <Loader variant="inline" size="md" />
</div>

<div className="relative h-40 w-40">
  <Loader variant="inline" size="lg" />
</div>

// ── Con ícono personalizado ───────────────────────────────────────────────────
<Loader
  variant="inline"
  icon={
    <img src="/images/mda_logo.svg" alt="Cargando" className="w-full h-full animate-pulse" />
  }
  label="Cargando..."
/>

// ── Ejemplo práctico — loader controlado por fetch ────────────────────────────
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);

const fetchData = async () => {
  setLoading(true);
  try {
    const res = await fetch('/api/tramites');
    setData(await res.json());
  } finally {
    setLoading(false);
  }
};

{loading && <Loader variant="overlay" color="green" label="Cargando trámites..." />}

// ── Ejemplo práctico — loader inline en tabla ─────────────────────────────────
<div className="relative rounded-xl border">
  <table>...</table>
  {loading && <Loader variant="inline" label="Actualizando..." />}
</div>
```

---

## 📦 Estructura del Proyecto

```
lib/
├── components/
│   ├── Autocomplete/
│   ├── Button/
│   ├── Card/
│   ├── Checkbox/
│   ├── Input/
│   ├── InputFile/
│   ├── Loader/
│   │   ├── Loader.tsx
│   │   ├── Loader.types.ts
│   │   └── index.ts
│   ├── Message/
│   ├── Pagination/
│   │   ├── Pagination.tsx
│   │   ├── Pagination.index.ts   ← tipos
│   │   └── index.ts
│   ├── Select/
│   ├── Stepper/
│   │   ├── Stepper.tsx
│   │   ├── Stepper.types.ts
│   │   └── index.ts
│   └── Toggle/
├── types/
│   └── index.ts
└── index.ts
```

---

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

---

## 📝 Agregar Nuevos Componentes

1. Crea una carpeta en `lib/components/[NombreComponente]`
2. Crea los archivos:
    - `[NombreComponente].tsx` - El componente
    - `[NombreComponente].types.ts` - Los tipos TypeScript
    - `index.ts` - Exportaciones
3. Agrega las exportaciones en `lib/index.ts`

### Ejemplo

```tsx
// lib/components/MiComponente/MiComponente.types.ts
export interface MiComponenteProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}

// lib/components/MiComponente/MiComponente.tsx
import { MiComponenteProps } from "./MiComponente.types";

export const MiComponente = ({
    children,
    variant = "primary",
}: MiComponenteProps) => {
    return <div className={variant}>{children}</div>;
};

// lib/components/MiComponente/index.ts
export { MiComponente } from "./MiComponente";
export type { MiComponenteProps } from "./MiComponente.types";

// lib/index.ts
export { MiComponente } from "./components/MiComponente";
export type { MiComponenteProps } from "./components/MiComponente";
```

---

## 🎨 Convenciones de Diseño

### Colores

- **Primary**: `#83c442` (Verde principal)
- **Primary Dark**: `#6fb035`, `#5a9428`
- **Text**: `#3f3f3f`
- **Background**: `white`, `green-50`, `green-100`
- **Borders**: `green-200`, `green-300`

### Espaciado

- **sm**: `4px - 8px`
- **md**: `12px - 16px`
- **lg**: `20px - 24px`

### Bordes

- **sm**: `rounded-lg` (8px)
- **md**: `rounded-xl` (12px)
- **lg**: `rounded-2xl` (16px)
- **xl**: `rounded-3xl` (24px)

---

## 📄 Licencia

MIT
