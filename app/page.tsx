"use client";

import { useState } from "react";
import {
    Button,
    Select,
    Autocomplete,
    Toggle,
    Checkbox,
    Input,
    InputFile,
    Message,
    Card,
    ArticleCard,
    ImageCard,
    ProfileCard,
    StatsCard,
    Stepper,
    StepperNavigation,
    Pagination,
} from "@/lib";
import type { Step } from "@/lib";

export default function Home() {
    const [selectValue, setSelectValue] = useState("");
    const [autocompleteValue, setAutocompleteValue] = useState("");
    const [toggleChecked, setToggleChecked] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [numberValue, setNumberValue] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [pdfFiles, setPdfFiles] = useState<File[]>([]);

    // Pagination state
    const [pagDefault, setPagDefault] = useState(1);
    const [pagSm, setPagSm] = useState(3);
    const [pagLg, setPagLg] = useState(5);
    const [pagInfo, setPagInfo] = useState(4);
    const [pagFew, setPagFew] = useState(2);
    const [pagPageSize, setPagPageSize] = useState<10 | 25 | 50 | 100>(10);
    const [pagPageSizePage, setPagPageSizePage] = useState(1);

    // Stepper state
    const [stepperDefault, setStepperDefault] = useState(1);
    const [stepperOutlined, setStepperOutlined] = useState(1);
    const [stepperMinimal, setStepperMinimal] = useState(2);
    const [stepperDots, setStepperDots] = useState(1);
    const [stepperVertical, setStepperVertical] = useState(1);
    const [stepperNav, setStepperNav] = useState(0);
    const [stepperNavClickable, setStepperNavClickable] = useState(2);

    const stepsBasic: Step[] = [
        { title: "Datos personales", description: "Nombre y DNI" },
        { title: "Domicilio", description: "Dirección de residencia" },
        { title: "Documentación", description: "Adjuntar archivos" },
        { title: "Confirmación", description: "Revisar y enviar" },
    ];

    const stepsWithIcons: Step[] = [
        {
            title: "Cuenta",
            description: "Crear usuario",
            icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <circle
                        cx="12"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                </svg>
            ),
        },
        {
            title: "Pago",
            description: "Método de pago",
            icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect
                        x="1"
                        y="4"
                        width="22"
                        height="16"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path d="M1 10h22" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
        },
        {
            title: "Envío",
            description: "Dirección de envío",
            icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M5 12H19M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            title: "Listo",
            description: "Pedido confirmado",
            icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
    ];

    const stepsWithError: Step[] = [
        { title: "Datos personales" },
        {
            title: "Domicilio",
            status: "error",
            description: "Dirección inválida",
        },
        { title: "Documentación" },
        { title: "Confirmación" },
    ];

    const stepsDisabled: Step[] = [
        { title: "Paso 1", description: "Completado" },
        { title: "Paso 2", description: "En progreso" },
        { title: "Paso 3", description: "Bloqueado", disabled: true },
        { title: "Paso 4", description: "Bloqueado", disabled: true },
    ];

    const stepsNav: Step[] = [
        { title: "Información", description: "Datos del trámite" },
        { title: "Documentos", description: "Archivos requeridos" },
        { title: "Revisión", description: "Confirmar datos" },
        { title: "Envío", description: "Finalizar trámite" },
    ];

    const selectOptions = [
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
        { label: "Angular", value: "angular" },
        { label: "Svelte", value: "svelte" },
        { label: "Next.js", value: "nextjs" },
    ];

    const countries = [
        { label: "Argentina", value: "ar" },
        { label: "Brasil", value: "br" },
        { label: "Chile", value: "cl" },
        { label: "Colombia", value: "co" },
        { label: "México", value: "mx" },
        { label: "Perú", value: "pe" },
        { label: "Uruguay", value: "uy" },
        { label: "Venezuela", value: "ve" },
    ];

    return (
        <div className="px-4 py-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12">
                    <img
                        src="/images/mda_logo.svg"
                        alt="Logo de la MDA"
                        className="mb-8 h-16 w-auto"
                    />
                    <h1 className="mb-4 text-4xl lg:text-5xl">
                        Librería de Componentes - MDA
                    </h1>
                    <h2 className="mb-2 text-2xl font-bold bg-linear-to-r from-[#83c442] to-[#6fb035] bg-clip-text text-transparent">
                        Municipalidad de Avellaneda
                    </h2>
                    <p className="text-lg text-gray-600">
                        Página de muestra de todos los componentes desarrollados
                        para la Municipalidad de Avellaneda. Acá podrás ver
                        ejemplos de cada componente, sus variantes, tamaños y
                        estados. Esta librería está diseñada para ser fácil de
                        usar e integrar en cualquier proyecto web.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Button Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                            Botones
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Variantes
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">
                                        Secondary
                                    </Button>
                                    <Button variant="danger">Danger</Button>
                                    <Button variant="ghost">Ghost</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Button size="sm">Small</Button>
                                    <Button size="md">Medium</Button>
                                    <Button size="lg">Large</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Estados
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Button>Normal</Button>
                                    <Button disabled>Disabled</Button>
                                    <Button loading>Loading</Button>
                                    <Button loading disabled>
                                        Loading Disabled
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Ancho Completo
                                </h3>
                                <div className="space-y-4">
                                    <Button fullWidth variant="primary">
                                        Full Width Primary
                                    </Button>
                                    <Button fullWidth variant="secondary">
                                        Full Width Secondary
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Select Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                            Select
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Select
                                        options={selectOptions}
                                        placeholder="Small"
                                        size="sm"
                                        value={selectValue}
                                        onChange={(e) =>
                                            setSelectValue(e.target.value)
                                        }
                                    />
                                    <Select
                                        options={selectOptions}
                                        placeholder="Medium"
                                        size="md"
                                    />
                                    <Select
                                        options={selectOptions}
                                        placeholder="Large"
                                        size="lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Estados
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Select
                                        options={selectOptions}
                                        placeholder="Normal"
                                    />
                                    <Select
                                        options={selectOptions}
                                        placeholder="Disabled"
                                        disabled
                                    />
                                    <Select
                                        options={selectOptions}
                                        placeholder="Error"
                                        error
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Full Width
                                </h3>
                                <Select
                                    options={selectOptions}
                                    placeholder="Selecciona un framework"
                                    fullWidth
                                />
                            </div>
                        </div>
                    </section>

                    {/* Autocomplete Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                            Autocomplete
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Autocomplete
                                        options={countries}
                                        placeholder="Small"
                                        size="sm"
                                        onSelect={(option) =>
                                            console.log("Selected:", option)
                                        }
                                    />
                                    <Autocomplete
                                        options={countries}
                                        placeholder="Medium"
                                        size="md"
                                    />
                                    <Autocomplete
                                        options={countries}
                                        placeholder="Large"
                                        size="lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Estados
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Autocomplete
                                        options={countries}
                                        placeholder="Normal"
                                    />
                                    <Autocomplete
                                        options={countries}
                                        placeholder="Disabled"
                                        disabled
                                    />
                                    <Autocomplete
                                        options={countries}
                                        placeholder="Error"
                                        error
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Full Width
                                </h3>
                                <Autocomplete
                                    options={countries}
                                    placeholder="Busca un país..."
                                    fullWidth
                                    value={autocompleteValue}
                                    onChange={(e) =>
                                        setAutocompleteValue(e.target.value)
                                    }
                                    onSelect={(option) =>
                                        alert(`Seleccionaste: ${option.label}`)
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* Toggle Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                            Toggle
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap items-center gap-6">
                                    <Toggle
                                        size="sm"
                                        label="Small"
                                        checked={toggleChecked}
                                        onChange={(e) =>
                                            setToggleChecked(e.target.checked)
                                        }
                                    />
                                    <Toggle
                                        size="md"
                                        label="Medium"
                                        defaultChecked
                                    />
                                    <Toggle
                                        size="lg"
                                        label="Large"
                                        defaultChecked
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Estados
                                </h3>
                                <div className="flex flex-wrap items-center gap-6">
                                    <Toggle label="Off" />
                                    <Toggle label="On" defaultChecked />
                                    <Toggle label="Disabled Off" disabled />
                                    <Toggle
                                        label="Disabled On"
                                        defaultChecked
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Interactivo
                                </h3>
                                <Toggle
                                    label={`Notificaciones ${toggleChecked ? "activadas" : "desactivadas"}`}
                                    checked={toggleChecked}
                                    onChange={(e) =>
                                        setToggleChecked(e.target.checked)
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* Checkbox Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                            Checkbox
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap items-center gap-6">
                                    <Checkbox
                                        size="sm"
                                        label="Small"
                                        checked={checkboxChecked}
                                        onChange={(e) =>
                                            setCheckboxChecked(e.target.checked)
                                        }
                                    />
                                    <Checkbox
                                        size="md"
                                        label="Medium"
                                        defaultChecked
                                    />
                                    <Checkbox
                                        size="lg"
                                        label="Large"
                                        defaultChecked
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700">
                                    Estados
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-6">
                                        <Checkbox label="Unchecked" />
                                        <Checkbox
                                            label="Checked"
                                            defaultChecked
                                        />
                                        <Checkbox
                                            label="Indeterminate"
                                            indeterminate
                                            defaultChecked
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-6">
                                        <Checkbox
                                            label="Disabled Unchecked"
                                            disabled
                                        />
                                        <Checkbox
                                            label="Disabled Checked"
                                            defaultChecked
                                            disabled
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-6">
                                        <Checkbox label="Error" error />
                                        <Checkbox
                                            label="Error Checked"
                                            error
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Input Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                            Input
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Tipos de Input
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input
                                        type="text"
                                        placeholder="Ingrese texto"
                                        label="Texto"
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        fullWidth
                                    />
                                    <Input
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        label="Email"
                                        value={emailValue}
                                        onChange={(e) =>
                                            setEmailValue(e.target.value)
                                        }
                                        helperText="Ingrese un email válido"
                                        fullWidth
                                    />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        label="Contraseña"
                                        value={passwordValue}
                                        onChange={(e) =>
                                            setPasswordValue(e.target.value)
                                        }
                                        fullWidth
                                    />
                                    <Input
                                        type="number"
                                        placeholder="123"
                                        label="Número"
                                        value={numberValue}
                                        onChange={(e) =>
                                            setNumberValue(e.target.value)
                                        }
                                        helperText="Solo se permiten números"
                                        fullWidth
                                    />
                                    <Input
                                        type="tel"
                                        placeholder="+54 11 1234-5678"
                                        label="Teléfono"
                                        fullWidth
                                    />
                                    <Input
                                        type="url"
                                        placeholder="https://ejemplo.com"
                                        label="URL"
                                        fullWidth
                                    />
                                    <Input
                                        type="search"
                                        placeholder="Buscar..."
                                        label="Búsqueda"
                                        fullWidth
                                    />
                                    <Input
                                        type="date"
                                        label="Fecha"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Tamaños
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        size="sm"
                                        placeholder="Small"
                                        label="Small"
                                        fullWidth
                                    />
                                    <Input
                                        size="md"
                                        placeholder="Medium"
                                        label="Medium"
                                        fullWidth
                                    />
                                    <Input
                                        size="lg"
                                        placeholder="Large"
                                        label="Large"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Estados
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        placeholder="Input normal"
                                        label="Normal"
                                        fullWidth
                                    />
                                    <Input
                                        placeholder="Input deshabilitado"
                                        label="Deshabilitado"
                                        disabled
                                        fullWidth
                                    />
                                    <Input
                                        placeholder="Input con error"
                                        label="Con Error"
                                        error
                                        helperText="Este campo contiene un error"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Con Iconos
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        placeholder="Buscar..."
                                        label="Con icono izquierdo"
                                        leftIcon={
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="text-[#83c442]"
                                            >
                                                <path
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        }
                                        fullWidth
                                    />
                                    <Input
                                        placeholder="usuario@ejemplo.com"
                                        label="Con icono derecho"
                                        rightIcon={
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="text-[#83c442]"
                                            >
                                                <path
                                                    d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        }
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* InputFile Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                            Input File
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Upload de Imágenes
                                </h3>
                                <InputFile
                                    accept="image/*"
                                    multiple
                                    maxSize={5}
                                    maxFiles={3}
                                    label="Subir Imágenes"
                                    helperText="Arrastra o selecciona hasta 3 imágenes (máx. 5MB cada una)"
                                    showPreview
                                    value={imageFiles}
                                    onChange={(files) => {
                                        setImageFiles(files);
                                        console.log("Imágenes:", files);
                                    }}
                                    onRemove={(file, index) => {
                                        console.log(
                                            `Imagen eliminada: ${file.name}`
                                        );
                                    }}
                                />
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Upload de PDFs
                                </h3>
                                <InputFile
                                    accept=".pdf,application/pdf"
                                    multiple
                                    maxSize={10}
                                    maxFiles={5}
                                    label="Documentos PDF"
                                    helperText="Sube tus documentos en formato PDF"
                                    buttonText="Seleccionar PDFs"
                                    dropzoneText="o arrastra tus archivos PDF aquí"
                                    value={pdfFiles}
                                    onChange={(files) => {
                                        setPdfFiles(files);
                                        console.log("PDFs:", files);
                                    }}
                                />
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Archivo Único
                                </h3>
                                <InputFile
                                    accept="image/*,.pdf,.doc,.docx"
                                    label="Subir Documento o Imagen"
                                    helperText="Se acepta un solo archivo"
                                    maxSize={15}
                                    showPreview
                                />
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Todos los Archivos
                                </h3>
                                <InputFile
                                    multiple
                                    maxSize={20}
                                    maxFiles={10}
                                    label="Subir Cualquier Archivo"
                                    helperText="Acepta cualquier tipo de archivo"
                                    value={uploadedFiles}
                                    onChange={(files) => {
                                        setUploadedFiles(files);
                                        console.log("Archivos subidos:", files);
                                    }}
                                    fullWidth
                                />
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Estados
                                </h3>
                                <div className="space-y-4">
                                    <InputFile
                                        label="Normal"
                                        helperText="Sube tus archivos"
                                    />
                                    <InputFile
                                        label="Deshabilitado"
                                        disabled
                                        helperText="Este campo está deshabilitado"
                                    />
                                    <InputFile
                                        label="Con Error"
                                        error
                                        helperText="Hubo un error al subir los archivos"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Tamaños
                                </h3>
                                <div className="space-y-4">
                                    <InputFile
                                        size="sm"
                                        label="Small"
                                        buttonText="Subir"
                                    />
                                    <InputFile
                                        size="md"
                                        label="Medium"
                                        buttonText="Subir archivos"
                                    />
                                    <InputFile
                                        size="lg"
                                        label="Large"
                                        buttonText="Seleccionar archivos"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Message Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                            Mensajes
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Tipos de Mensaje
                                </h3>
                                <div className="space-y-3">
                                    <Message
                                        variant="success"
                                        title="Operación exitosa"
                                    >
                                        Tu solicitud ha sido procesada
                                        correctamente.
                                    </Message>

                                    <Message
                                        variant="error"
                                        title="Error al procesar"
                                    >
                                        Ocurrió un error al intentar guardar la
                                        información. Por favor, intenta
                                        nuevamente.
                                    </Message>

                                    <Message
                                        variant="warning"
                                        title="Atención requerida"
                                    >
                                        Algunos campos necesitan ser revisados
                                        antes de continuar.
                                    </Message>

                                    <Message
                                        variant="default"
                                        title="Información"
                                    >
                                        Esta es una notificación informativa
                                        general.
                                    </Message>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Con Botón de Cerrar
                                </h3>
                                <div className="space-y-3">
                                    <Message
                                        variant="success"
                                        title="¡Bienvenido!"
                                        closable
                                        onClose={() =>
                                            console.log("Mensaje cerrado")
                                        }
                                    >
                                        Te damos la bienvenida a la plataforma
                                        de la Municipalidad de Avellaneda.
                                    </Message>

                                    <Message variant="warning" closable>
                                        Recuerda completar tu perfil para
                                        acceder a todos los servicios.
                                    </Message>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Sin Icono
                                </h3>
                                <div className="space-y-3">
                                    <Message
                                        variant="success"
                                        title="Mensaje sin icono"
                                        showIcon={false}
                                    >
                                        Este mensaje no muestra un icono
                                        predeterminado.
                                    </Message>

                                    <Message variant="error" showIcon={false}>
                                        Mensaje simple sin título ni icono.
                                    </Message>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Con Icono Personalizado
                                </h3>
                                <div className="space-y-3">
                                    <Message
                                        variant="success"
                                        title="Trámite completado"
                                        icon={
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="text-[#83c442]"
                                            >
                                                <path
                                                    d="M9 11l3 3L22 4"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        }
                                    >
                                        Tu solicitud ha sido aprobada y está
                                        lista para retirar.
                                    </Message>

                                    <Message
                                        variant="default"
                                        title="Recordatorio"
                                        icon={
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="text-gray-500"
                                            >
                                                <path
                                                    d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        }
                                    >
                                        Tienes 3 notificaciones pendientes de
                                        revisar.
                                    </Message>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Mensajes Informativos
                                </h3>
                                <div className="space-y-3">
                                    <Message variant="success" closable>
                                        <strong>Actualización exitosa:</strong>{" "}
                                        Los datos de tu perfil han sido
                                        guardados correctamente.
                                    </Message>

                                    <Message
                                        variant="error"
                                        title="Campos incompletos"
                                        closable
                                    >
                                        Por favor completa los siguientes
                                        campos:
                                        <ul className="mt-2 ml-4 list-disc">
                                            <li>Nombre completo</li>
                                            <li>Número de documento</li>
                                            <li>Email de contacto</li>
                                        </ul>
                                    </Message>

                                    <Message variant="warning" closable>
                                        <strong>
                                            Mantenimiento programado:
                                        </strong>{" "}
                                        El sistema estará en mantenimiento el
                                        día 15/03 de 10:00 a 12:00 hs.
                                    </Message>

                                    <Message
                                        variant="default"
                                        title="¿Necesitas ayuda?"
                                        closable
                                    >
                                        Comunicate con nosotros a través del
                                        Centro de Atención al Vecino:
                                        <div className="mt-2 flex gap-4 text-sm">
                                            <span>📞 0800-333-AVELL</span>
                                            <span>
                                                ✉️ contacto@avellaneda.gob.ar
                                            </span>
                                        </div>
                                    </Message>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Card Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                            Cards
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="mb-4 text-xl font-medium text-gray-800">
                                    Cards Base
                                </h3>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Card variant="default">
                                        <h4 className="mb-2 text-lg font-semibold text-[#3f3f3f]">
                                            Card Default
                                        </h4>
                                        <p className="text-sm text-[#3f3f3f]/70">
                                            Esta es una card con estilo por
                                            defecto.
                                        </p>
                                    </Card>

                                    <Card variant="outlined">
                                        <h4 className="mb-2 text-lg font-semibold text-[#3f3f3f]">
                                            Card Outlined
                                        </h4>
                                        <p className="text-sm text-[#3f3f3f]/70">
                                            Card con borde verde característico.
                                        </p>
                                    </Card>

                                    <Card variant="elevated">
                                        <h4 className="mb-2 text-lg font-semibold text-[#3f3f3f]">
                                            Card Elevated
                                        </h4>
                                        <p className="text-sm text-[#3f3f3f]/70">
                                            Card con sombra elevada y efecto
                                            hover.
                                        </p>
                                    </Card>

                                    <Card variant="gradient">
                                        <h4 className="mb-2 text-lg font-semibold text-[#3f3f3f]">
                                            Card Gradient
                                        </h4>
                                        <p className="text-sm text-[#3f3f3f]/70">
                                            Card con gradiente verde suave.
                                        </p>
                                    </Card>

                                    <Card variant="interactive">
                                        <h4 className="mb-2 text-lg font-semibold text-[#3f3f3f]">
                                            Card Interactive
                                        </h4>
                                        <p className="text-sm text-[#3f3f3f]/70">
                                            Card clickeable con animación.
                                        </p>
                                    </Card>

                                    <Card hover>
                                        <h4 className="mb-2 text-lg font-semibold text-[#3f3f3f]">
                                            Card con Hover
                                        </h4>
                                        <p className="text-sm text-[#3f3f3f]/70">
                                            Card con efecto de elevación al
                                            hacer hover.
                                        </p>
                                    </Card>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 text-xl font-medium text-gray-800">
                                    Article Cards
                                </h3>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    <ArticleCard
                                        title="Nuevas iniciativas ambientales"
                                        description="La municipalidad lanza un programa de reciclaje comunitario para reducir los residuos y fomentar la sustentabilidad en toda la ciudad."
                                        author="Juan Pérez"
                                        date="15 Feb 2026"
                                        readTime="5 min"
                                        tags={["Ambiente", "Comunidad"]}
                                        onClick={() =>
                                            alert("Ver artículo completo")
                                        }
                                    />

                                    <ArticleCard
                                        title="Mejoras en infraestructura vial"
                                        description="Se anuncian obras de pavimentación y mejora de calles en diversos barrios de Avellaneda para mejorar la movilidad urbana."
                                        author="María González"
                                        date="12 Feb 2026"
                                        readTime="3 min"
                                        image="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=200&fit=crop"
                                        tags={["Obras", "Infraestructura"]}
                                        onClick={() =>
                                            alert("Ver artículo completo")
                                        }
                                    />

                                    <ArticleCard
                                        title="Programas culturales 2026"
                                        description="Conocé la agenda cultural del año con actividades gratuitas para toda la familia en los espacios públicos de la ciudad."
                                        author="Carlos Martínez"
                                        date="10 Feb 2026"
                                        readTime="4 min"
                                        tags={["Cultura", "Eventos"]}
                                        onClick={() =>
                                            alert("Ver artículo completo")
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 text-xl font-medium text-gray-800">
                                    Image Cards
                                </h3>
                                <div className="grid gap-6 md:grid-cols-3">
                                    <ImageCard
                                        image="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop"
                                        title="Plaza Central"
                                        description="Nuevo espacio verde"
                                        aspectRatio="square"
                                        onClick={() => alert("Ver galería")}
                                    />

                                    <ImageCard
                                        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=225&fit=crop"
                                        title="Centro Cultural"
                                        description="Agenda de eventos"
                                        aspectRatio="video"
                                        overlay={false}
                                        onClick={() => alert("Ver más")}
                                    />

                                    <ImageCard
                                        image="https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=400&h=533&fit=crop"
                                        title="Biblioteca Municipal"
                                        description="Horarios y actividades"
                                        aspectRatio="portrait"
                                        onClick={() => alert("Ver detalles")}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 text-xl font-medium text-gray-800">
                                    Profile Cards
                                </h3>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                    <ProfileCard
                                        name="Ana Torres"
                                        role="Secretaria de Cultura"
                                        email="ana.torres@avellaneda.gob.ar"
                                        phone="+54 11 4222-3333"
                                        bio="Coordinando actividades culturales para toda la comunidad."
                                    />

                                    <ProfileCard
                                        name="Roberto Silva"
                                        role="Director de Obras Públicas"
                                        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                                        email="roberto.silva@avellaneda.gob.ar"
                                        actions={
                                            <Button size="sm" fullWidth>
                                                Contactar
                                            </Button>
                                        }
                                    />

                                    <ProfileCard
                                        name="Laura Mendoza"
                                        role="Secretaria de Ambiente"
                                        email="laura.mendoza@avellaneda.gob.ar"
                                        bio="Impulsando políticas ambientales sustentables."
                                    />

                                    <ProfileCard
                                        name="Diego Ramírez"
                                        role="Coordinador de Deportes"
                                        avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
                                        phone="+54 11 4222-4444"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 text-xl font-medium text-gray-800">
                                    Stats Cards
                                </h3>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                    <StatsCard
                                        title="Vecinos Registrados"
                                        value="12,547"
                                        change="+12%"
                                        trend="up"
                                        description="Respecto al mes anterior"
                                        icon={
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="text-[#83c442]"
                                            >
                                                <path
                                                    d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                                <circle
                                                    cx="9"
                                                    cy="7"
                                                    r="4"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                            </svg>
                                        }
                                    />

                                    <StatsCard
                                        title="Trámites Completados"
                                        value="3,842"
                                        change="+8%"
                                        trend="up"
                                        description="En el último trimestre"
                                        icon={
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="text-[#83c442]"
                                            >
                                                <path
                                                    d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M22 4L12 14.01l-3-3"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                            </svg>
                                        }
                                    />

                                    <StatsCard
                                        title="Eventos Realizados"
                                        value="48"
                                        change="-5%"
                                        trend="down"
                                        description="Este mes"
                                        icon={
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="text-[#83c442]"
                                            >
                                                <rect
                                                    x="3"
                                                    y="4"
                                                    width="18"
                                                    height="18"
                                                    rx="2"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M16 2v4M8 2v4M3 10h18"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                            </svg>
                                        }
                                    />

                                    <StatsCard
                                        title="Satisfacción"
                                        value="94%"
                                        trend="neutral"
                                        description="Valoración ciudadana"
                                        icon={
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="text-[#83c442]"
                                            >
                                                <path
                                                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stepper Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                            Stepper
                        </h2>
                        <div className="space-y-10">
                            {/* Variante Default */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Variante Default
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Círculos rellenos con color primario al
                                    completar/activar.
                                </p>
                                <Stepper
                                    steps={stepsBasic}
                                    activeStep={stepperDefault}
                                />
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        disabled={stepperDefault === 0}
                                        onClick={() =>
                                            setStepperDefault((s) => s - 1)
                                        }
                                    >
                                        ← Anterior
                                    </Button>
                                    <Button
                                        size="sm"
                                        disabled={
                                            stepperDefault ===
                                            stepsBasic.length - 1
                                        }
                                        onClick={() =>
                                            setStepperDefault((s) => s + 1)
                                        }
                                    >
                                        Siguiente →
                                    </Button>
                                </div>
                            </div>

                            {/* Variante Outlined */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Variante Outlined
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Círculos con borde verde, sin relleno. Ring
                                    glow en el paso activo.
                                </p>
                                <Stepper
                                    steps={stepsBasic}
                                    activeStep={stepperOutlined}
                                    variant="outlined"
                                />
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        disabled={stepperOutlined === 0}
                                        onClick={() =>
                                            setStepperOutlined((s) => s - 1)
                                        }
                                    >
                                        ← Anterior
                                    </Button>
                                    <Button
                                        size="sm"
                                        disabled={
                                            stepperOutlined ===
                                            stepsBasic.length - 1
                                        }
                                        onClick={() =>
                                            setStepperOutlined((s) => s + 1)
                                        }
                                    >
                                        Siguiente →
                                    </Button>
                                </div>
                            </div>

                            {/* Variante Minimal */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Variante Minimal
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Estilo limpio: solo borde en completado,
                                    relleno en activo.
                                </p>
                                <Stepper
                                    steps={stepsBasic}
                                    activeStep={stepperMinimal}
                                    variant="minimal"
                                />
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        disabled={stepperMinimal === 0}
                                        onClick={() =>
                                            setStepperMinimal((s) => s - 1)
                                        }
                                    >
                                        ← Anterior
                                    </Button>
                                    <Button
                                        size="sm"
                                        disabled={
                                            stepperMinimal ===
                                            stepsBasic.length - 1
                                        }
                                        onClick={() =>
                                            setStepperMinimal((s) => s + 1)
                                        }
                                    >
                                        Siguiente →
                                    </Button>
                                </div>
                            </div>

                            {/* Variante Dots */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Variante Dots
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Representación compacta con puntos. Ideal
                                    para wizards simples.
                                </p>
                                <Stepper
                                    steps={stepsBasic}
                                    activeStep={stepperDots}
                                    variant="dots"
                                />
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        disabled={stepperDots === 0}
                                        onClick={() =>
                                            setStepperDots((s) => s - 1)
                                        }
                                    >
                                        ← Anterior
                                    </Button>
                                    <Button
                                        size="sm"
                                        disabled={
                                            stepperDots ===
                                            stepsBasic.length - 1
                                        }
                                        onClick={() =>
                                            setStepperDots((s) => s + 1)
                                        }
                                    >
                                        Siguiente →
                                    </Button>
                                </div>
                            </div>

                            {/* Orientación Vertical */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Orientación Vertical
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Pasos apilados verticalmente. Compatible con
                                    todas las variantes.
                                </p>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div>
                                        <p className="mb-3 text-sm font-medium text-gray-600">
                                            Default vertical
                                        </p>
                                        <Stepper
                                            steps={stepsBasic}
                                            activeStep={stepperVertical}
                                            orientation="vertical"
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-3 text-sm font-medium text-gray-600">
                                            Outlined vertical
                                        </p>
                                        <Stepper
                                            steps={stepsBasic}
                                            activeStep={stepperVertical}
                                            orientation="vertical"
                                            variant="outlined"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        disabled={stepperVertical === 0}
                                        onClick={() =>
                                            setStepperVertical((s) => s - 1)
                                        }
                                    >
                                        ← Anterior
                                    </Button>
                                    <Button
                                        size="sm"
                                        disabled={
                                            stepperVertical ===
                                            stepsBasic.length - 1
                                        }
                                        onClick={() =>
                                            setStepperVertical((s) => s + 1)
                                        }
                                    >
                                        Siguiente →
                                    </Button>
                                </div>
                            </div>

                            {/* Con iconos personalizados */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Con Íconos Personalizados
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Cada paso puede tener un ícono SVG propio.
                                </p>
                                <Stepper
                                    steps={stepsWithIcons}
                                    activeStep={2}
                                    variant="default"
                                />
                            </div>

                            {/* Con estado de error */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Con Estado de Error
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Un paso puede marcarse con{" "}
                                    <code className="bg-gray-100 px-1 rounded text-xs">
                                        status: "error"
                                    </code>{" "}
                                    para indicar un problema.
                                </p>
                                <Stepper
                                    steps={stepsWithError}
                                    activeStep={1}
                                />
                            </div>

                            {/* Con pasos deshabilitados */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Con Pasos Deshabilitados
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Los pasos con{" "}
                                    <code className="bg-gray-100 px-1 rounded text-xs">
                                        disabled: true
                                    </code>{" "}
                                    no son interactuables.
                                </p>
                                <Stepper
                                    steps={stepsDisabled}
                                    activeStep={1}
                                    clickable
                                    onStepClick={(i) =>
                                        alert(`Paso ${i + 1} clickeado`)
                                    }
                                />
                            </div>

                            {/* Clickeable */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Clickeable
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Con{" "}
                                    <code className="bg-gray-100 px-1 rounded text-xs">
                                        clickable
                                    </code>{" "}
                                    el usuario puede saltar entre pasos
                                    directamente.
                                </p>
                                <Stepper
                                    steps={stepsBasic}
                                    activeStep={stepperNavClickable}
                                    variant="outlined"
                                    clickable
                                    onStepClick={setStepperNavClickable}
                                />
                            </div>

                            {/* Tamaños */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Tamaños
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Disponibles en{" "}
                                    <code className="bg-gray-100 px-1 rounded text-xs">
                                        sm
                                    </code>
                                    ,{" "}
                                    <code className="bg-gray-100 px-1 rounded text-xs">
                                        md
                                    </code>{" "}
                                    y{" "}
                                    <code className="bg-gray-100 px-1 rounded text-xs">
                                        lg
                                    </code>
                                    .
                                </p>
                                <div className="space-y-6">
                                    <div>
                                        <p className="mb-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                                            Small
                                        </p>
                                        <Stepper
                                            steps={stepsBasic}
                                            activeStep={1}
                                            size="sm"
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                                            Medium (default)
                                        </p>
                                        <Stepper
                                            steps={stepsBasic}
                                            activeStep={1}
                                            size="md"
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                                            Large
                                        </p>
                                        <Stepper
                                            steps={stepsBasic}
                                            activeStep={1}
                                            size="lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* StepperNavigation */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    StepperNavigation
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Componente completo con botones de
                                    navegación, contenido de paso y contador.
                                </p>
                                <StepperNavigation
                                    steps={stepsNav}
                                    activeStep={stepperNav}
                                    onNext={() =>
                                        setStepperNav((s) =>
                                            Math.min(s + 1, stepsNav.length - 1)
                                        )
                                    }
                                    onBack={() =>
                                        setStepperNav((s) => Math.max(s - 1, 0))
                                    }
                                    onFinish={() =>
                                        alert("¡Trámite enviado con éxito!")
                                    }
                                >
                                    {stepperNav === 0 && (
                                        <div className="space-y-2">
                                            <p className="font-medium text-[#3f3f3f]">
                                                Información del trámite
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Completá los datos personales
                                                para iniciar el trámite
                                                municipal.
                                            </p>
                                        </div>
                                    )}
                                    {stepperNav === 1 && (
                                        <div className="space-y-2">
                                            <p className="font-medium text-[#3f3f3f]">
                                                Documentos requeridos
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Adjuntá tu DNI y comprobante de
                                                domicilio en formato PDF.
                                            </p>
                                        </div>
                                    )}
                                    {stepperNav === 2 && (
                                        <div className="space-y-2">
                                            <p className="font-medium text-[#3f3f3f]">
                                                Revisión de datos
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Verificá que toda la información
                                                sea correcta antes de enviar.
                                            </p>
                                        </div>
                                    )}
                                    {stepperNav === 3 && (
                                        <div className="space-y-2">
                                            <p className="font-medium text-[#3f3f3f]">
                                                ¡Todo listo!
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Hacé click en{" "}
                                                <strong>Finalizar</strong> para
                                                enviar el trámite.
                                            </p>
                                        </div>
                                    )}
                                </StepperNavigation>
                            </div>

                            {/* StepperNavigation Outlined */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    StepperNavigation — Outlined + Dots
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    El componente de navegación también acepta
                                    todas las variantes del Stepper.
                                </p>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <StepperNavigation
                                        steps={stepsNav.slice(0, 3)}
                                        activeStep={1}
                                        variant="outlined"
                                        nextLabel="Continuar"
                                        backLabel="Volver"
                                        finishLabel="Guardar"
                                    >
                                        <p className="text-sm text-gray-500">
                                            Contenido del paso activo
                                            (outlined).
                                        </p>
                                    </StepperNavigation>
                                    <StepperNavigation
                                        steps={stepsNav}
                                        activeStep={2}
                                        variant="dots"
                                        nextLabel="Continuar"
                                        backLabel="Volver"
                                        finishLabel="Guardar"
                                    >
                                        <p className="text-sm text-gray-500">
                                            Contenido del paso activo (dots).
                                        </p>
                                    </StepperNavigation>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pagination Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                            Paginación
                        </h2>
                        <div className="space-y-8">
                            {/* Default */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Default
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Paginación estándar con puntos suspensivos
                                    automáticos al alejarse del inicio o el
                                    final.
                                </p>
                                <Pagination
                                    totalPages={20}
                                    currentPage={pagDefault}
                                    onPageChange={setPagDefault}
                                />
                            </div>

                            {/* Con contador */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Con Contador de Página
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Muestra "Página X de Y" sobre los controles
                                    con{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        showPageInfo
                                    </code>
                                    .
                                </p>
                                <Pagination
                                    totalPages={15}
                                    currentPage={pagInfo}
                                    onPageChange={setPagInfo}
                                    showPageInfo
                                />
                            </div>

                            {/* Pocas páginas */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Pocas Páginas
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Sin puntos suspensivos cuando el total es
                                    pequeño.
                                </p>
                                <Pagination
                                    totalPages={5}
                                    currentPage={pagFew}
                                    onPageChange={setPagFew}
                                />
                            </div>

                            {/* Tamaños */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Tamaños
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Disponibles en{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        sm
                                    </code>
                                    ,{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        md
                                    </code>{" "}
                                    y{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        lg
                                    </code>
                                    .
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                                            Small
                                        </p>
                                        <Pagination
                                            totalPages={10}
                                            currentPage={pagSm}
                                            onPageChange={setPagSm}
                                            size="sm"
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                                            Medium (default)
                                        </p>
                                        <Pagination
                                            totalPages={10}
                                            currentPage={pagSm}
                                            onPageChange={setPagSm}
                                            size="md"
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                                            Large
                                        </p>
                                        <Pagination
                                            totalPages={10}
                                            currentPage={pagLg}
                                            onPageChange={setPagLg}
                                            size="lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Mostrando X resultados */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Mostrando X Resultados
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Pasando{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        pageSize
                                    </code>{" "}
                                    y{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        onPageSizeChange
                                    </code>{" "}
                                    aparece el texto{" "}
                                    <em>"Mostrando X resultados"</em> con un
                                    select de opciones.
                                </p>
                                <Pagination
                                    totalPages={Math.ceil(247 / pagPageSize)}
                                    currentPage={pagPageSizePage}
                                    onPageChange={(p) => setPagPageSizePage(p)}
                                    pageSize={pagPageSize}
                                    onPageSizeChange={(ps) => {
                                        setPagPageSize(ps);
                                        setPagPageSizePage(1);
                                    }}
                                    showPageInfo
                                />
                            </div>

                            {/* Deshabilitado */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Deshabilitado
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Con{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        disabled
                                    </code>{" "}
                                    todos los botones quedan inactivos.
                                </p>
                                <Pagination
                                    totalPages={10}
                                    currentPage={3}
                                    onPageChange={() => {}}
                                    disabled
                                />
                            </div>

                            {/* Una sola página */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Una Sola Página
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Los botones anterior/siguiente se
                                    deshabilitan automáticamente en los
                                    extremos.
                                </p>
                                <Pagination
                                    totalPages={1}
                                    currentPage={1}
                                    onPageChange={() => {}}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
