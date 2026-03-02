# InputFile Component

Componente de carga de archivos con drag & drop, vista previa de imágenes, validaciones y diseño consistente con la Municipalidad de Avellaneda.

## Características

✅ **Drag & Drop**: Arrastra y suelta archivos directamente  
✅ **Vista Previa**: Muestra thumbnails de imágenes cargadas  
✅ **Validaciones**: Tamaño máximo, tipos de archivo, número de archivos  
✅ **Múltiples Archivos**: Soporta carga de uno o varios archivos  
✅ **Iconos por Tipo**: Iconos específicos para imágenes, PDFs y otros archivos  
✅ **Eliminar Archivos**: Botón de eliminación con animación  
✅ **Estados**: Normal, disabled, error  
✅ **Responsive**: Adaptable a diferentes tamaños de pantalla  
✅ **Accesible**: Diseño inclusivo y semántico

## Importación

```tsx
import { InputFile } from "@/lib";
// O
import { InputFile } from "@/lib/components/InputFile";
```

## Uso Básico

```tsx
<InputFile
    label="Subir Archivos"
    onChange={(files) => console.log(files)}
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `accept` | `string` | `undefined` | Tipos de archivo aceptados (ej: "image/*", ".pdf") |
| `multiple` | `boolean` | `false` | Permitir múltiples archivos |
| `maxSize` | `number` | `10` | Tamaño máximo en MB |
| `maxFiles` | `number` | `5` | Número máximo de archivos |
| `label` | `string` | `undefined` | Etiqueta del input |
| `helperText` | `string` | `undefined` | Texto de ayuda |
| `error` | `boolean` | `false` | Estado de error |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño del componente |
| `fullWidth` | `boolean` | `false` | Ocupar todo el ancho |
| `onChange` | `(files: File[]) => void` | `undefined` | Callback al cambiar archivos |
| `onRemove` | `(file: File, index: number) => void` | `undefined` | Callback al eliminar archivo |
| `showPreview` | `boolean` | `true` | Mostrar vista previa de imágenes |
| `buttonText` | `string` | `"Seleccionar archivos"` | Texto del botón |
| `dropzoneText` | `string` | `"o arrastra y suelta archivos aquí"` | Texto del área de drop |
| `className` | `string` | `""` | Clases CSS adicionales |
| `value` | `File[]` | `undefined` | Archivos controlados |

## Ejemplos

### Solo Imágenes con Vista Previa

```tsx
const [images, setImages] = useState<File[]>([]);

<InputFile
    accept="image/*"
    multiple
    maxSize={5}
    maxFiles={3}
    label="Subir Imágenes"
    helperText="Hasta 3 imágenes (máx. 5MB)"
    showPreview
    value={images}
    onChange={setImages}
/>
```

### Solo PDFs

```tsx
<InputFile
    accept=".pdf,application/pdf"
    multiple
    maxSize={10}
    label="Documentos PDF"
    helperText="Sube tus documentos en formato PDF"
    buttonText="Seleccionar PDFs"
    onChange={(files) => console.log("PDFs:", files)}
/>
```

### Archivo Único

```tsx
<InputFile
    accept="image/*,.pdf,.doc,.docx"
    label="Subir Documento"
    maxSize={15}
    showPreview
/>
```

### Todos los Archivos

```tsx
<InputFile
    multiple
    maxSize={20}
    maxFiles={10}
    label="Subir Cualquier Archivo"
    fullWidth
    onChange={(files) => {
        files.forEach(file => {
            console.log(`${file.name}: ${file.size} bytes`);
        });
    }}
/>
```

### Con Validación de Errores

```tsx
const [files, setFiles] = useState<File[]>([]);
const [hasError, setHasError] = useState(false);

const handleChange = (newFiles: File[]) => {
    setFiles(newFiles);
    setHasError(false);
};

<InputFile
    label="Documentos Requeridos"
    error={hasError}
    helperText={hasError ? "Debes subir al menos un archivo" : "Sube tus documentos"}
    value={files}
    onChange={handleChange}
/>
```

### Controlado con Callback de Eliminación

```tsx
const [files, setFiles] = useState<File[]>([]);

<InputFile
    multiple
    label="Archivos"
    value={files}
    onChange={(newFiles) => {
        setFiles(newFiles);
        console.log(`Total archivos: ${newFiles.length}`);
    }}
    onRemove={(file, index) => {
        console.log(`Archivo eliminado: ${file.name} en posición ${index}`);
    }}
/>
```

### Diferentes Tamaños

```tsx
<InputFile size="sm" label="Small" buttonText="Subir" />
<InputFile size="md" label="Medium" />
<InputFile size="lg" label="Large" />
```

## Validaciones Automáticas

El componente valida automáticamente:

1. **Tamaño de archivo**: No permite archivos mayores a `maxSize` MB
2. **Tipo de archivo**: Solo acepta los tipos especificados en `accept`
3. **Número de archivos**: En modo `multiple`, limita a `maxFiles`
4. **Archivo único**: En modo single, solo acepta 1 archivo

Los mensajes de error se muestran automáticamente cuando hay validaciones fallidas.

## Formatos de `accept`

```tsx
// Solo imágenes
accept="image/*"

// Solo PDFs
accept=".pdf,application/pdf"

// Imágenes y PDFs
accept="image/*,.pdf"

// Documentos específicos
accept=".pdf,.doc,.docx,.xls,.xlsx"

// Videos
accept="video/*"

// Tipos MIME específicos
accept="image/jpeg,image/png,image/gif"
```

## Vista Previa

### Imágenes
- Muestra un thumbnail de 80x80px
- Botón de eliminación flotante (X roja)
- Nombre del archivo y tamaño

### PDFs
- Icono de PDF en rojo
- Nombre del archivo y tamaño
- Botón de eliminación al lado

### Otros Archivos
- Icono genérico de archivo
- Nombre del archivo y tamaño
- Botón de eliminación al lado

## Estilos y Colores

Siguiendo los lineamientos de la MDA:

- **Color principal**: `#83c442` (verde)
- **Borde normal**: `#70f787` (verde claro)
- **Borde hover**: `#83c442`
- **Fondo dropzone**: Transparente con hover verde claro
- **Drag activo**: Escala 1.02 + fondo verde suave
- **Iconos**: Verde para upload, rojo para eliminar

## Drag & Drop

El componente detecta automáticamente cuando:
- El usuario arrastra archivos sobre la zona
- Suelta los archivos
- Sale de la zona de drop

Estados visuales:
- **Normal**: Borde verde claro punteado
- **Hover**: Borde verde sólido + fondo verde suave
- **Dragging**: Escala aumentada + borde verde + fondo verde

## Accesibilidad

- Input file nativo pero oculto visualmente
- Click en toda la zona de drop activa el selector
- Estados disabled previenen interacción
- Mensajes de error descriptivos
- Keyboard navigation funcional

## Notas

- Las vistas previas de imágenes usan `FileReader` API
- Los archivos se almacenan como objetos `File` nativos
- Compatible con formularios controlados y no controlados
- Los previews se limpian automáticamente al eliminar archivos

## Ejemplo Completo

```tsx
import { useState } from "react";
import { InputFile, Button } from "@/lib";

export default function UploadForm() {
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("Sube al menos un archivo");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Archivos subidos correctamente!");
                setFiles([]);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            <InputFile
                multiple
                accept="image/*,.pdf"
                maxSize={10}
                maxFiles={5}
                label="Documentos e Imágenes"
                helperText="Sube hasta 5 archivos (imágenes o PDFs, máx. 10MB)"
                value={files}
                onChange={setFiles}
                disabled={isSubmitting}
            />

            <Button
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={files.length === 0}
            >
                Subir {files.length} archivo{files.length !== 1 ? "s" : ""}
            </Button>
        </div>
    );
}
```
