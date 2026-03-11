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
    Loader,
    NavigationRoutes,
    SectionHeading,
    Heading,
    Modal,
    Slider,
    Chart,
    Calendar,
    Carousel,
} from "@/lib";
import type {
    Step,
    RangeSliderProps,
    CalendarEvent,
    CarouselSlide,
} from "@/lib";

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

    // Loader state
    const [loaderFull, setLoaderFull] = useState(false);
    const [loaderOverlay, setLoaderOverlay] = useState(false);
    const [loaderBlue, setLoaderBlue] = useState(false);

    // Modal state
    const [modalBasic, setModalBasic] = useState(false);
    const [modalSm, setModalSm] = useState(false);
    const [modalXl, setModalXl] = useState(false);
    const [modalHeader, setModalHeader] = useState(false);

    // Slider state
    const [sliderDefault, setSliderDefault] = useState(40);
    const [sliderLabeled, setSliderLabeled] = useState(65);
    const [sliderStepped, setSliderStepped] = useState(3);
    const [sliderGradient, setSliderGradient] = useState(55);
    const [sliderRange, setSliderRange] = useState<[number, number]>([20, 75]);
    const [sliderSm, setSliderSm] = useState(30);
    const [sliderLg, setSliderLg] = useState(70);
    const [sliderDisabled] = useState(45);

    // Calendar state
    const [calSingle, setCalSingle] = useState<string | null>(null);
    const [calRange, setCalRange] = useState<[string | null, string | null]>([
        null,
        null,
    ]);
    const [calMultiple, setCalMultiple] = useState<string[]>([]);

    // Carousel state
    const [carouselIdx, setCarouselIdx] = useState(0);
    const carouselSlides: CarouselSlide[] = [
        {
            key: "slide-1",
            content: (
                <div className="w-full h-full bg-gradient-to-br from-[#83c442] to-[#5a9a2a] flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-5xl mb-3">🏛️</div>
                        <p className="text-2xl font-bold">Municipalidad</p>
                        <p className="text-base opacity-80">de Avellaneda</p>
                    </div>
                </div>
            ),
            label: "Inicio",
        },
        {
            key: "slide-2",
            content: (
                <div className="w-full h-full bg-gradient-to-br from-[#3f80c4] to-[#1a5a9a] flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-5xl mb-3">🌳</div>
                        <p className="text-2xl font-bold">Espacios Verdes</p>
                        <p className="text-base opacity-80">
                            Cuidamos nuestra ciudad
                        </p>
                    </div>
                </div>
            ),
            label: "Espacios verdes",
        },
        {
            key: "slide-3",
            content: (
                <div className="w-full h-full bg-gradient-to-br from-[#e67e22] to-[#c0392b] flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-5xl mb-3">📋</div>
                        <p className="text-2xl font-bold">Trámites Online</p>
                        <p className="text-base opacity-80">
                            Gestiones desde tu casa
                        </p>
                    </div>
                </div>
            ),
            label: "Trámites",
        },
        {
            key: "slide-4",
            content: (
                <div className="w-full h-full bg-gradient-to-br from-[#8e44ad] to-[#6c3483] flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-5xl mb-3">🎭</div>
                        <p className="text-2xl font-bold">Cultura y Arte</p>
                        <p className="text-base opacity-80">
                            Eventos para todos
                        </p>
                    </div>
                </div>
            ),
            label: "Cultura",
        },
    ];

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

                    {/* Loader Component */}
                    <section className="rounded-2xl border border-green-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                            Loader
                        </h2>
                        <div className="space-y-8">
                            {/* Inline */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Inline
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Se ajusta al contenedor padre (necesita{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        position: relative
                                    </code>{" "}
                                    en el padre). Ideal para secciones o tablas
                                    con carga individual.
                                </p>
                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="relative h-32 rounded-xl border border-green-200/60 bg-gray-50">
                                        <Loader
                                            variant="inline"
                                            color="green"
                                            size="md"
                                            label="Cargando..."
                                        />
                                    </div>
                                    <div className="relative h-32 rounded-xl border border-green-200/60 bg-gray-50">
                                        <Loader
                                            variant="inline"
                                            color="blue"
                                            size="md"
                                            label="Cargando..."
                                        />
                                    </div>
                                    <div className="relative h-32 rounded-xl border border-green-200/60 bg-gray-50">
                                        <Loader
                                            variant="inline"
                                            color="green"
                                            size="lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tamaños inline */}
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
                                <div className="flex flex-wrap items-center gap-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="relative h-20 w-20 rounded-xl border border-green-200/60 bg-gray-50">
                                            <Loader
                                                variant="inline"
                                                size="sm"
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            sm
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="relative h-24 w-24 rounded-xl border border-green-200/60 bg-gray-50">
                                            <Loader
                                                variant="inline"
                                                size="md"
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            md
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="relative h-32 w-32 rounded-xl border border-green-200/60 bg-gray-50">
                                            <Loader
                                                variant="inline"
                                                size="lg"
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            lg
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Colores */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Colores
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Color{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        green
                                    </code>{" "}
                                    para rutas estándar,{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        blue
                                    </code>{" "}
                                    para secciones municipales.
                                </p>
                                <div className="flex flex-wrap gap-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="relative h-28 w-28 rounded-xl border border-green-200/60 bg-gray-50">
                                            <Loader
                                                variant="inline"
                                                color="green"
                                                size="md"
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            green
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="relative h-28 w-28 rounded-xl border border-blue-200/60 bg-gray-50">
                                            <Loader
                                                variant="inline"
                                                color="blue"
                                                size="md"
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            blue
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Con etiqueta */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Con Etiqueta
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Prop{" "}
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        label
                                    </code>{" "}
                                    muestra un texto debajo del spinner.
                                </p>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="relative h-36 rounded-xl border border-green-200/60 bg-gray-50">
                                        <Loader
                                            variant="inline"
                                            color="green"
                                            label="Cargando datos..."
                                        />
                                    </div>
                                    <div className="relative h-36 rounded-xl border border-blue-200/60 bg-gray-50">
                                        <Loader
                                            variant="inline"
                                            color="blue"
                                            label="Procesando..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pantalla completa — full y overlay */}
                            <div>
                                <h3 className="mb-1 text-xl font-medium text-gray-800">
                                    Full Screen — Full y Overlay
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    Se renderizan mediante un{" "}
                                    <strong>portal al body</strong>. <br />
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        full
                                    </code>{" "}
                                    → fondo blanco 100% opaco. &nbsp;
                                    <code className="rounded bg-gray-100 px-1 text-xs">
                                        overlay
                                    </code>{" "}
                                    → fondo blanco 85% con blur. &nbsp; El
                                    loader desaparece automáticamente a los 2
                                    segundos en este demo.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoaderFull(true);
                                            setTimeout(
                                                () => setLoaderFull(false),
                                                2000
                                            );
                                        }}
                                        className="inline-flex items-center gap-2 rounded-lg bg-[#83c442] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#6fb035]"
                                    >
                                        Ver Full (verde)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoaderOverlay(true);
                                            setTimeout(
                                                () => setLoaderOverlay(false),
                                                2000
                                            );
                                        }}
                                        className="inline-flex items-center gap-2 rounded-lg border-2 border-[#83c442] px-4 py-2 text-sm font-medium text-[#83c442] transition-all hover:bg-[#83c442]/10"
                                    >
                                        Ver Overlay (verde)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoaderBlue(true);
                                            setTimeout(
                                                () => setLoaderBlue(false),
                                                2000
                                            );
                                        }}
                                        className="inline-flex items-center gap-2 rounded-lg border-2 border-[#1a6fa8] px-4 py-2 text-sm font-medium text-[#1a6fa8] transition-all hover:bg-[#1a6fa8]/10"
                                    >
                                        Ver Overlay (azul municipal)
                                    </button>
                                </div>

                                {loaderFull && (
                                    <Loader
                                        variant="full"
                                        color="green"
                                        size="lg"
                                        label="Cargando..."
                                    />
                                )}
                                {loaderOverlay && (
                                    <Loader
                                        variant="overlay"
                                        color="green"
                                        size="lg"
                                        label="Procesando..."
                                    />
                                )}
                                {loaderBlue && (
                                    <Loader
                                        variant="overlay"
                                        color="blue"
                                        size="lg"
                                        label="Cargando..."
                                    />
                                )}
                            </div>
                        </div>
                    </section>

                    {/* ── NavigationRoutes ── */}
                    <section>
                        <h2 className="text-xl font-semibold text-[#3f3f3f] mb-6">
                            NavigationRoutes
                        </h2>
                        <div className="space-y-8">
                            {/* Separadores */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Separadores
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-[#999] mb-2">
                                            chevron (default)
                                        </p>
                                        <NavigationRoutes
                                            items={[
                                                { label: "Inicio", href: "/" },
                                                {
                                                    label: "Trámites",
                                                    href: "/tramites",
                                                },
                                                {
                                                    label: "Habilitaciones",
                                                    href: "/tramites/habilitaciones",
                                                },
                                                { label: "Nueva solicitud" },
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#999] mb-2">
                                            slash
                                        </p>
                                        <NavigationRoutes
                                            separator="slash"
                                            items={[
                                                { label: "Inicio", href: "/" },
                                                {
                                                    label: "Trámites",
                                                    href: "/tramites",
                                                },
                                                {
                                                    label: "Habilitaciones",
                                                    href: "/tramites/habilitaciones",
                                                },
                                                { label: "Nueva solicitud" },
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#999] mb-2">
                                            dot
                                        </p>
                                        <NavigationRoutes
                                            separator="dot"
                                            items={[
                                                { label: "Inicio", href: "/" },
                                                {
                                                    label: "Trámites",
                                                    href: "/tramites",
                                                },
                                                {
                                                    label: "Habilitaciones",
                                                    href: "/tramites/habilitaciones",
                                                },
                                                { label: "Nueva solicitud" },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tamaños */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Tamaños
                                </h3>
                                <div className="space-y-4">
                                    {(["sm", "md", "lg"] as const).map((s) => (
                                        <div key={s}>
                                            <p className="text-xs text-[#999] mb-2">
                                                {s}
                                            </p>
                                            <NavigationRoutes
                                                size={s}
                                                items={[
                                                    {
                                                        label: "Inicio",
                                                        href: "/",
                                                    },
                                                    {
                                                        label: "Servicios",
                                                        href: "/servicios",
                                                    },
                                                    { label: "Detalle" },
                                                ]}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Colapso con maxItems */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Colapso con{" "}
                                    <code className="font-mono bg-[#f6f6f6] px-1 rounded">
                                        maxItems
                                    </code>
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-[#999] mb-2">
                                            Sin colapso (todos los ítems)
                                        </p>
                                        <NavigationRoutes
                                            items={[
                                                { label: "Inicio", href: "/" },
                                                {
                                                    label: "Municipio",
                                                    href: "/municipio",
                                                },
                                                {
                                                    label: "Secretarías",
                                                    href: "/municipio/secretarias",
                                                },
                                                {
                                                    label: "Obras Públicas",
                                                    href: "/municipio/secretarias/obras",
                                                },
                                                {
                                                    label: "Licitaciones",
                                                    href: "/municipio/secretarias/obras/licitaciones",
                                                },
                                                { label: "Detalle #4821" },
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#999] mb-2">
                                            maxItems=4 → primero + … + últimos +
                                            actual
                                        </p>
                                        <NavigationRoutes
                                            maxItems={4}
                                            items={[
                                                { label: "Inicio", href: "/" },
                                                {
                                                    label: "Municipio",
                                                    href: "/municipio",
                                                },
                                                {
                                                    label: "Secretarías",
                                                    href: "/municipio/secretarias",
                                                },
                                                {
                                                    label: "Obras Públicas",
                                                    href: "/municipio/secretarias/obras",
                                                },
                                                {
                                                    label: "Licitaciones",
                                                    href: "/municipio/secretarias/obras/licitaciones",
                                                },
                                                { label: "Detalle #4821" },
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#999] mb-2">
                                            maxItems=3 → primero + … + actual
                                        </p>
                                        <NavigationRoutes
                                            maxItems={3}
                                            items={[
                                                { label: "Inicio", href: "/" },
                                                {
                                                    label: "Municipio",
                                                    href: "/municipio",
                                                },
                                                {
                                                    label: "Secretarías",
                                                    href: "/municipio/secretarias",
                                                },
                                                {
                                                    label: "Obras Públicas",
                                                    href: "/municipio/secretarias/obras",
                                                },
                                                {
                                                    label: "Licitaciones",
                                                    href: "/municipio/secretarias/obras/licitaciones",
                                                },
                                                { label: "Detalle #4821" },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Con íconos */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Con íconos
                                </h3>
                                <NavigationRoutes
                                    items={[
                                        {
                                            label: "Inicio",
                                            href: "/",
                                            icon: (
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="w-full h-full"
                                                >
                                                    <path
                                                        d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M9 21V12h6v9"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            ),
                                        },
                                        {
                                            label: "Trámites",
                                            href: "/tramites",
                                            icon: (
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="w-full h-full"
                                                >
                                                    <rect
                                                        x="4"
                                                        y="4"
                                                        width="16"
                                                        height="16"
                                                        rx="2"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    />
                                                    <path
                                                        d="M8 9h8M8 13h5"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            ),
                                        },
                                        { label: "Nueva solicitud" },
                                    ]}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ── SectionHeading ── */}
                    <section>
                        <h2 className="text-xl font-semibold text-[#3f3f3f] mb-6">
                            SectionHeading
                        </h2>
                        <div className="space-y-8">
                            {/* Completo: link + título + subtítulo */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-8">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Completo — link + título + subtítulo
                                </h3>
                                <SectionHeading
                                    link={{
                                        label: "Volver a trámites",
                                        href: "#",
                                    }}
                                    title="Habilitación Comercial"
                                    subtitle="Completá el formulario para solicitar la habilitación de tu local."
                                />
                            </div>

                            {/* Solo título + subtítulo */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-8">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Sin link
                                </h3>
                                <SectionHeading
                                    title="Mis trámites"
                                    subtitle="Revisá el estado de tus solicitudes en curso."
                                />
                            </div>

                            {/* Solo título */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-8">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Solo título
                                </h3>
                                <SectionHeading title="Novedades del municipio" />
                            </div>

                            {/* Niveles semánticos */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-6">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide mb-2">
                                    Niveles semánticos (as)
                                </h3>
                                {(["h1", "h2", "h3", "h4"] as const).map(
                                    (tag) => (
                                        <div
                                            key={tag}
                                            className="flex items-baseline gap-4"
                                        >
                                            <span className="text-xs font-mono text-[#999] w-6 shrink-0">
                                                {tag}
                                            </span>
                                            <SectionHeading
                                                as={tag}
                                                title="Título de sección de ejemplo"
                                            />
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Ícono personalizado en el link */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-8">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Link con ícono personalizado
                                </h3>
                                <SectionHeading
                                    link={{
                                        label: "Ir al inicio",
                                        href: "#",
                                        icon: (
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M9 21V12h6v9"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        ),
                                    }}
                                    title="Panel de control"
                                    subtitle="Administrá tus datos y configuraciones."
                                />
                            </div>
                        </div>
                    </section>

                    {/* ── Heading ── */}
                    <section>
                        <h2 className="text-xl font-semibold text-[#3f3f3f] mb-6">
                            Heading
                        </h2>
                        <div className="space-y-8">
                            {/* Escala h1–h6 */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-4">
                                <p className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-6">
                                    Escala tipográfica — h1 → h6
                                </p>
                                {(
                                    [
                                        "h1",
                                        "h2",
                                        "h3",
                                        "h4",
                                        "h5",
                                        "h6",
                                    ] as const
                                ).map((level) => (
                                    <div
                                        key={level}
                                        className="flex items-baseline gap-6 border-b border-[#f0f0f0] pb-4 last:border-0 last:pb-0"
                                    >
                                        <span className="text-xs font-mono text-[#bbb] w-6 shrink-0">
                                            {level}
                                        </span>
                                        <Heading
                                            as={level}
                                        >{`Titular de sección ${level.toUpperCase()}`}</Heading>
                                    </div>
                                ))}
                            </div>

                            {/* Pesos */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-4">
                                <p className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-6">
                                    Pesos tipográficos (en h2)
                                </p>
                                {(
                                    [
                                        "light",
                                        "normal",
                                        "medium",
                                        "semibold",
                                        "bold",
                                    ] as const
                                ).map((w) => (
                                    <div
                                        key={w}
                                        className="flex items-baseline gap-6"
                                    >
                                        <span className="text-xs font-mono text-[#bbb] w-16 shrink-0">
                                            {w}
                                        </span>
                                        <Heading as="h2" weight={w}>
                                            Municipalidad de Avellaneda
                                        </Heading>
                                    </div>
                                ))}
                            </div>

                            {/* Colores */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-4">
                                <p className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-6">
                                    Colores
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-baseline gap-6">
                                        <span className="text-xs font-mono text-[#bbb] w-16 shrink-0">
                                            default
                                        </span>
                                        <Heading as="h3">
                                            Trámites y servicios municipales
                                        </Heading>
                                    </div>
                                    <div className="flex items-baseline gap-6">
                                        <span className="text-xs font-mono text-[#bbb] w-16 shrink-0">
                                            primary
                                        </span>
                                        <Heading as="h3" color="primary">
                                            Trámites y servicios municipales
                                        </Heading>
                                    </div>
                                    <div className="flex items-baseline gap-6">
                                        <span className="text-xs font-mono text-[#bbb] w-16 shrink-0">
                                            muted
                                        </span>
                                        <Heading as="h3" color="muted">
                                            Trámites y servicios municipales
                                        </Heading>
                                    </div>
                                    <div className="flex items-baseline gap-6">
                                        <span className="text-xs font-mono text-[#bbb] w-16 shrink-0">
                                            dark
                                        </span>
                                        <Heading as="h3" color="dark">
                                            Trámites y servicios municipales
                                        </Heading>
                                    </div>
                                    <div className="flex items-baseline gap-6 rounded-lg bg-[#3f3f3f] p-4">
                                        <span className="text-xs font-mono text-[#999] w-16 shrink-0">
                                            white
                                        </span>
                                        <Heading as="h3" color="white">
                                            Trámites y servicios municipales
                                        </Heading>
                                    </div>
                                </div>
                            </div>

                            {/* Truncate */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-4">
                                <p className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-6">
                                    Truncate
                                </p>
                                <div className="max-w-xs">
                                    <Heading as="h4" truncate>
                                        Este es un título muy largo que debería
                                        cortarse con puntos suspensivos
                                    </Heading>
                                </div>
                                <div className="max-w-xs">
                                    <Heading as="h4">
                                        Este es un título muy largo que debería
                                        cortarse con puntos suspensivos
                                    </Heading>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Modal ── */}
                    <section>
                        <h2 className="text-xl font-semibold text-[#3f3f3f] mb-6">
                            Modal
                        </h2>
                        <div className="space-y-8">
                            {/* Tamaños */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setModalSm(true)}
                                        className="inline-flex items-center gap-2 rounded-lg border-2 border-[#83c442] px-4 py-2 text-sm font-medium text-[#83c442] transition-all hover:bg-[#83c442]/10"
                                    >
                                        Abrir sm
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalBasic(true)}
                                        className="inline-flex items-center gap-2 rounded-lg border-2 border-[#83c442] px-4 py-2 text-sm font-medium text-[#83c442] transition-all hover:bg-[#83c442]/10"
                                    >
                                        Abrir lg (default)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalXl(true)}
                                        className="inline-flex items-center gap-2 rounded-lg border-2 border-[#83c442] px-4 py-2 text-sm font-medium text-[#83c442] transition-all hover:bg-[#83c442]/10"
                                    >
                                        Abrir xl
                                    </button>
                                </div>
                            </div>

                            {/* Header right */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Con headerRight
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setModalHeader(true)}
                                    className="inline-flex items-center gap-2 rounded-lg border-2 border-[#83c442] px-4 py-2 text-sm font-medium text-[#83c442] transition-all hover:bg-[#83c442]/10"
                                >
                                    Abrir con acciones en header
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ── Instancias de Modal ── */}
                    <Modal
                        isOpen={modalBasic}
                        onClose={() => setModalBasic(false)}
                        size="lg"
                    >
                        <SectionHeading
                            title="Habilitación Comercial"
                            subtitle="Completá los datos para iniciar el trámite de habilitación de tu local."
                        />
                        <div className="mt-6 space-y-4 text-[#3f3f3f]">
                            <p>
                                Este es el contenido del modal. Podés poner
                                cualquier componente acá adentro: formularios,
                                tablas, texto enriquecido, lo que necesites.
                            </p>
                            <p>
                                El modal cierra con el botón{" "}
                                <strong>Salir</strong>, presionando{" "}
                                <kbd className="rounded bg-[#f6f6f6] border border-[#e2e2e2] px-1.5 py-0.5 text-xs font-mono">
                                    Esc
                                </kbd>{" "}
                                o haciendo click fuera del panel.
                            </p>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={modalSm}
                        onClose={() => setModalSm(false)}
                        size="sm"
                        closeLabel="Volver"
                    >
                        <SectionHeading
                            title="Confirmación"
                            subtitle="¿Estás seguro de que querés eliminar este elemento?"
                        />
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setModalSm(false)}
                                className="rounded-lg border border-[#e2e2e2] px-4 py-2 text-sm font-medium text-[#3f3f3f] hover:bg-[#f6f6f6] transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalSm(false)}
                                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={modalXl}
                        onClose={() => setModalXl(false)}
                        size="xl"
                    >
                        <SectionHeading
                            title="Detalle del Trámite"
                            subtitle="Expediente N° 2024-00423 · Habilitación comercial"
                        />
                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-[#3f3f3f]">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border border-[#e2e2e2] bg-[#f6f6f6] p-4"
                                >
                                    <p className="text-xs text-[#999] mb-1">
                                        Campo {i + 1}
                                    </p>
                                    <p className="font-medium">
                                        Valor de ejemplo {i + 1}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Modal>

                    <Modal
                        isOpen={modalHeader}
                        onClose={() => setModalHeader(false)}
                        headerRight={
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#83c442]/15 px-3 py-1 text-xs font-semibold text-[#5a9428]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#83c442]" />
                                En proceso
                            </span>
                        }
                    >
                        <SectionHeading
                            title="Solicitud de Permiso de Obra"
                            subtitle="Los datos ingresados pueden modificarse mientras el trámite esté en proceso."
                        />
                        <div className="mt-6 text-[#3f3f3f] space-y-3 text-sm">
                            <p>
                                El slot{" "}
                                <code className="bg-[#f6f6f6] border border-[#e2e2e2] rounded px-1 font-mono">
                                    headerRight
                                </code>{" "}
                                acepta cualquier{" "}
                                <code className="bg-[#f6f6f6] border border-[#e2e2e2] rounded px-1 font-mono">
                                    ReactNode
                                </code>
                                : badges de estado, botones de acción, íconos,
                                etc.
                            </p>
                        </div>
                    </Modal>

                    {/* ── Slider ── */}
                    <section>
                        <h2 className="text-xl font-semibold text-[#3f3f3f] mb-6">
                            Slider
                        </h2>
                        <div className="space-y-8">
                            {/* Variantes */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-10">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Variantes
                                </h3>

                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-3">
                                        default — valor: {sliderDefault}
                                    </p>
                                    <Slider
                                        value={sliderDefault}
                                        onChange={setSliderDefault}
                                        showMinMax
                                    />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-3">
                                        labeled — valor: {sliderLabeled}
                                    </p>
                                    <Slider
                                        variant="labeled"
                                        value={sliderLabeled}
                                        onChange={setSliderLabeled}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-4">
                                        stepped — paso 5, valor:{" "}
                                        {sliderStepped * 5}
                                    </p>
                                    <Slider
                                        variant="stepped"
                                        min={0}
                                        max={10}
                                        step={1}
                                        value={sliderStepped}
                                        onChange={setSliderStepped}
                                        formatValue={(v) => String(v * 5)}
                                        showMinMax
                                    />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-3">
                                        gradient — valor: {sliderGradient}%
                                    </p>
                                    <Slider
                                        variant="gradient"
                                        value={sliderGradient}
                                        onChange={setSliderGradient}
                                        formatValue={(v) => `${v}%`}
                                        showMinMax
                                    />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-3">
                                        range — [{sliderRange[0]},{" "}
                                        {sliderRange[1]}]
                                    </p>
                                    <Slider
                                        variant="range"
                                        value={sliderRange}
                                        onChange={setSliderRange}
                                        showMinMax
                                    />
                                </div>
                            </div>

                            {/* Tamaños */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-8">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Tamaños
                                </h3>
                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-2">
                                        sm
                                    </p>
                                    <Slider
                                        size="sm"
                                        value={sliderSm}
                                        onChange={setSliderSm}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-2">
                                        md (default)
                                    </p>
                                    <Slider
                                        size="md"
                                        value={sliderDefault}
                                        onChange={setSliderDefault}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-2">
                                        lg
                                    </p>
                                    <Slider
                                        size="lg"
                                        value={sliderLg}
                                        onChange={setSliderLg}
                                    />
                                </div>
                            </div>

                            {/* Formateo + deshabilitado */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 space-y-8">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Formateo y deshabilitado
                                </h3>
                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-3">
                                        formatValue — moneda
                                    </p>
                                    <Slider
                                        variant="labeled"
                                        value={sliderLabeled}
                                        onChange={setSliderLabeled}
                                        min={0}
                                        max={10000}
                                        step={500}
                                        formatValue={(v) =>
                                            `$${v.toLocaleString()}`
                                        }
                                        showMinMax
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-[#999] mb-2">
                                        disabled
                                    </p>
                                    <Slider
                                        value={sliderDisabled}
                                        disabled
                                        showMinMax
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── CHART ─────────────────────────────────────── */}
                    <section id="chart" className="space-y-6">
                        <SectionHeading
                            title="Chart"
                            subtitle="Visualización de datos con múltiples tipos de gráfico"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Bar */}
                            <Chart
                                type="bar"
                                title="Barras verticales"
                                description="Comparativa mensual de ventas"
                                data={[
                                    { month: "Ene", ventas: 186, gastos: 80 },
                                    { month: "Feb", ventas: 305, gastos: 200 },
                                    { month: "Mar", ventas: 237, gastos: 120 },
                                    { month: "Abr", ventas: 73, gastos: 190 },
                                    { month: "May", ventas: 209, gastos: 130 },
                                    { month: "Jun", ventas: 264, gastos: 140 },
                                ]}
                                series={[
                                    { key: "ventas", label: "Ventas" },
                                    { key: "gastos", label: "Gastos" },
                                ]}
                                categoryKey="month"
                            />

                            {/* Bar Horizontal */}
                            <Chart
                                type="bar-horizontal"
                                title="Barras horizontales"
                                description="Ranking de productos más vendidos"
                                data={[
                                    { product: "Producto A", valor: 400 },
                                    { product: "Producto B", valor: 300 },
                                    { product: "Producto C", valor: 250 },
                                    { product: "Producto D", valor: 180 },
                                    { product: "Producto E", valor: 90 },
                                ]}
                                series={[{ key: "valor", label: "Unidades" }]}
                                categoryKey="product"
                            />

                            {/* Bar Stacked */}
                            <Chart
                                type="bar-stacked"
                                title="Barras apiladas"
                                description="Distribución de presupuesto por trimestre"
                                data={[
                                    {
                                        q: "Q1",
                                        infra: 120,
                                        rrhh: 80,
                                        marketing: 40,
                                    },
                                    {
                                        q: "Q2",
                                        infra: 150,
                                        rrhh: 90,
                                        marketing: 60,
                                    },
                                    {
                                        q: "Q3",
                                        infra: 100,
                                        rrhh: 110,
                                        marketing: 80,
                                    },
                                    {
                                        q: "Q4",
                                        infra: 180,
                                        rrhh: 95,
                                        marketing: 70,
                                    },
                                ]}
                                series={[
                                    { key: "infra", label: "Infraestructura" },
                                    { key: "rrhh", label: "RRHH" },
                                    { key: "marketing", label: "Marketing" },
                                ]}
                                categoryKey="q"
                            />

                            {/* Line Smooth */}
                            <Chart
                                type="line-smooth"
                                title="Línea suavizada"
                                description="Evolución de visitas al sitio web"
                                data={[
                                    {
                                        week: "Sem 1",
                                        visitas: 420,
                                        sesiones: 310,
                                    },
                                    {
                                        week: "Sem 2",
                                        visitas: 380,
                                        sesiones: 290,
                                    },
                                    {
                                        week: "Sem 3",
                                        visitas: 510,
                                        sesiones: 400,
                                    },
                                    {
                                        week: "Sem 4",
                                        visitas: 490,
                                        sesiones: 380,
                                    },
                                    {
                                        week: "Sem 5",
                                        visitas: 620,
                                        sesiones: 470,
                                    },
                                    {
                                        week: "Sem 6",
                                        visitas: 740,
                                        sesiones: 560,
                                    },
                                ]}
                                series={[
                                    { key: "visitas", label: "Visitas" },
                                    { key: "sesiones", label: "Sesiones" },
                                ]}
                                categoryKey="week"
                            />

                            {/* Line */}
                            <Chart
                                type="line"
                                title="Línea recta"
                                description="Temperatura promedio mensual (°C)"
                                data={[
                                    { mes: "Ene", temp: 28 },
                                    { mes: "Feb", temp: 30 },
                                    { mes: "Mar", temp: 25 },
                                    { mes: "Abr", temp: 20 },
                                    { mes: "May", temp: 16 },
                                    { mes: "Jun", temp: 12 },
                                    { mes: "Jul", temp: 11 },
                                    { mes: "Ago", temp: 13 },
                                    { mes: "Sep", temp: 17 },
                                    { mes: "Oct", temp: 21 },
                                    { mes: "Nov", temp: 24 },
                                    { mes: "Dic", temp: 27 },
                                ]}
                                series={[{ key: "temp", label: "Temperatura" }]}
                                categoryKey="mes"
                                strokeWidth={3}
                                yAxis={{ tickFormatter: (v) => `${v}°` }}
                            />

                            {/* Area */}
                            <Chart
                                type="area"
                                title="Área"
                                description="Ingresos vs egresos mensuales"
                                data={[
                                    { mes: "Ene", ingresos: 800, egresos: 600 },
                                    { mes: "Feb", ingresos: 950, egresos: 700 },
                                    { mes: "Mar", ingresos: 880, egresos: 650 },
                                    {
                                        mes: "Abr",
                                        ingresos: 1100,
                                        egresos: 720,
                                    },
                                    {
                                        mes: "May",
                                        ingresos: 1050,
                                        egresos: 690,
                                    },
                                    {
                                        mes: "Jun",
                                        ingresos: 1300,
                                        egresos: 800,
                                    },
                                ]}
                                series={[
                                    { key: "ingresos", label: "Ingresos" },
                                    { key: "egresos", label: "Egresos" },
                                ]}
                                categoryKey="mes"
                                areaOpacity={0.2}
                            />

                            {/* Area Stacked */}
                            <Chart
                                type="area-stacked"
                                title="Área apilada"
                                description="Consumo energético por fuente"
                                data={[
                                    {
                                        año: "2020",
                                        solar: 120,
                                        eolica: 80,
                                        hidro: 200,
                                    },
                                    {
                                        año: "2021",
                                        solar: 160,
                                        eolica: 110,
                                        hidro: 190,
                                    },
                                    {
                                        año: "2022",
                                        solar: 210,
                                        eolica: 140,
                                        hidro: 185,
                                    },
                                    {
                                        año: "2023",
                                        solar: 280,
                                        eolica: 180,
                                        hidro: 175,
                                    },
                                    {
                                        año: "2024",
                                        solar: 350,
                                        eolica: 220,
                                        hidro: 170,
                                    },
                                ]}
                                series={[
                                    { key: "solar", label: "Solar" },
                                    { key: "eolica", label: "Eólica" },
                                    { key: "hidro", label: "Hidro" },
                                ]}
                                categoryKey="año"
                            />

                            {/* Pie */}
                            <Chart
                                type="pie"
                                title="Torta"
                                description="Distribución de tipos de trámite"
                                height={280}
                                data={[
                                    { tipo: "Habilitación", value: 35 },
                                    { tipo: "Permiso", value: 25 },
                                    { tipo: "Licencia", value: 20 },
                                    { tipo: "Certificado", value: 12 },
                                    { tipo: "Otros", value: 8 },
                                ]}
                                series={[
                                    { key: "value", label: "Habilitación" },
                                    { key: "value", label: "Permiso" },
                                    { key: "value", label: "Licencia" },
                                    { key: "value", label: "Certificado" },
                                    { key: "value", label: "Otros" },
                                ]}
                                categoryKey="tipo"
                            />

                            {/* Donut */}
                            <Chart
                                type="donut"
                                title="Rosquilla (donut)"
                                description="Estado de expedientes activos"
                                height={280}
                                data={[
                                    { estado: "En proceso", value: 48 },
                                    { estado: "Aprobados", value: 31 },
                                    { estado: "Observados", value: 14 },
                                    { estado: "Rechazados", value: 7 },
                                ]}
                                series={[
                                    { key: "value", label: "En proceso" },
                                    { key: "value", label: "Aprobados" },
                                    { key: "value", label: "Observados" },
                                    { key: "value", label: "Rechazados" },
                                ]}
                                categoryKey="estado"
                                innerRadius={55}
                                footer={
                                    <span>
                                        Total: <strong>100 expedientes</strong>
                                    </span>
                                }
                            />

                            {/* Radar */}
                            <Chart
                                type="radar"
                                title="Radar"
                                description="Evaluación de desempeño por área"
                                height={300}
                                data={[
                                    { area: "Atención", dpto1: 80, dpto2: 65 },
                                    {
                                        area: "Eficiencia",
                                        dpto1: 70,
                                        dpto2: 85,
                                    },
                                    { area: "Calidad", dpto1: 90, dpto2: 75 },
                                    {
                                        area: "Puntualidad",
                                        dpto1: 60,
                                        dpto2: 90,
                                    },
                                    {
                                        area: "Innovación",
                                        dpto1: 75,
                                        dpto2: 55,
                                    },
                                ]}
                                series={[
                                    { key: "dpto1", label: "Dpto. A" },
                                    { key: "dpto2", label: "Dpto. B" },
                                ]}
                                categoryKey="area"
                                areaOpacity={0.15}
                            />

                            {/* Radial */}
                            <Chart
                                type="radial"
                                title="Radial"
                                description="Progreso de metas por sector"
                                height={280}
                                data={[
                                    { sector: "Obras", value: 75 },
                                    { sector: "Salud", value: 60 },
                                    { sector: "Educación", value: 88 },
                                    { sector: "Ambiente", value: 45 },
                                ]}
                                series={[
                                    { key: "value", label: "Obras" },
                                    { key: "value", label: "Salud" },
                                    { key: "value", label: "Educación" },
                                    { key: "value", label: "Ambiente" },
                                ]}
                                categoryKey="sector"
                            />

                            {/* Scatter */}
                            <Chart
                                type="scatter"
                                title="Dispersión"
                                description="Relación entre superficie y precio de propiedades"
                                height={280}
                                data={[
                                    { x: 45, y: 120000 },
                                    { x: 62, y: 155000 },
                                    { x: 78, y: 190000 },
                                    { x: 90, y: 210000 },
                                    { x: 105, y: 260000 },
                                    { x: 120, y: 295000 },
                                    { x: 55, y: 138000 },
                                    { x: 83, y: 198000 },
                                    { x: 97, y: 235000 },
                                    { x: 140, y: 350000 },
                                ]}
                                series={[
                                    { key: "value", label: "Propiedades" },
                                ]}
                                xAxis={{ tickFormatter: (v) => `${v}m²` }}
                                yAxis={{
                                    tickFormatter: (v) =>
                                        `$${Number(v) / 1000}k`,
                                }}
                            />
                        </div>
                    </section>

                    {/* ── Calendar ────────────────────────────────────────── */}
                    <section id="calendar" className="space-y-6">
                        <SectionHeading
                            title="Calendar"
                            subtitle="Selector de fechas con modos single, range y multiple. Soporte para eventos, navegación por año/década, semanas y más."
                        />

                        <div className="space-y-8">
                            {/* Single + Range side by side */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Single vs Range
                                </h3>
                                <div className="flex flex-wrap gap-8">
                                    {/* Single */}
                                    <div className="space-y-3">
                                        <p className="text-xs text-[#999]">
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                mode="single"
                                            </code>
                                            {calSingle ? (
                                                <span className="ml-2 text-[#83c442] font-medium">
                                                    {calSingle}
                                                </span>
                                            ) : (
                                                <span className="ml-2 text-[#bbb]">
                                                    Sin selección
                                                </span>
                                            )}
                                        </p>
                                        <Calendar
                                            mode="single"
                                            value={calSingle}
                                            onChange={setCalSingle}
                                            showTodayButton
                                            showClearButton
                                            events={[
                                                {
                                                    date: "2026-03-15",
                                                    label: "Reunión",
                                                    color: "#83c442",
                                                    title: "Reunión de equipo",
                                                },
                                                {
                                                    date: "2026-03-20",
                                                    label: "Evento",
                                                    color: "#1a6fa8",
                                                    title: "Capacitación",
                                                },
                                                {
                                                    date: "2026-03-25",
                                                    color: "#e07a2b",
                                                    title: "Vencimiento",
                                                },
                                            ]}
                                        />
                                    </div>

                                    {/* Range */}
                                    <div className="space-y-3">
                                        <p className="text-xs text-[#999]">
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                mode="range"
                                            </code>
                                            {calRange[0] || calRange[1] ? (
                                                <span className="ml-2 text-[#83c442] font-medium">
                                                    {calRange[0] ?? "…"} →{" "}
                                                    {calRange[1] ?? "…"}
                                                </span>
                                            ) : (
                                                <span className="ml-2 text-[#bbb]">
                                                    Seleccioná inicio y fin
                                                </span>
                                            )}
                                        </p>
                                        <Calendar
                                            mode="range"
                                            value={calRange}
                                            onChange={setCalRange}
                                            showTodayButton
                                            showClearButton
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Multiple */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Multiple
                                </h3>
                                <div className="flex flex-wrap gap-8 items-start">
                                    <div className="space-y-3">
                                        <p className="text-xs text-[#999]">
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                mode="multiple"
                                            </code>
                                        </p>
                                        <Calendar
                                            mode="multiple"
                                            value={calMultiple}
                                            onChange={setCalMultiple}
                                            showClearButton
                                            showTodayButton
                                        />
                                    </div>
                                    <div className="flex-1 min-w-45 space-y-2">
                                        <p className="text-xs font-semibold text-[#999] uppercase tracking-wide">
                                            Fechas seleccionadas
                                        </p>
                                        {calMultiple.length === 0 ? (
                                            <p className="text-sm text-[#bbb]">
                                                Ninguna
                                            </p>
                                        ) : (
                                            <ul className="space-y-1">
                                                {calMultiple.map((d) => (
                                                    <li
                                                        key={d}
                                                        className="flex items-center gap-2 text-sm text-[#3f3f3f]"
                                                    >
                                                        <span className="w-2 h-2 rounded-full bg-[#83c442] shrink-0" />
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Tamaños */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap gap-6 items-start">
                                    <div className="space-y-2">
                                        <p className="text-xs text-[#999] font-medium uppercase tracking-wide">
                                            sm
                                        </p>
                                        <Calendar
                                            mode="single"
                                            size="sm"
                                            defaultValue="2026-03-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs text-[#999] font-medium uppercase tracking-wide">
                                            md (default)
                                        </p>
                                        <Calendar
                                            mode="single"
                                            size="md"
                                            defaultValue="2026-03-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs text-[#999] font-medium uppercase tracking-wide">
                                            lg
                                        </p>
                                        <Calendar
                                            mode="single"
                                            size="lg"
                                            defaultValue="2026-03-11"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Con eventos */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Con eventos y números de semana
                                </h3>
                                <p className="text-xs text-[#999]">
                                    Cada fecha puede tener uno o más eventos
                                    representados con puntos de colores. Con{" "}
                                    <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                        showWeekNumbers
                                    </code>{" "}
                                    se muestra la columna de semana ISO.
                                </p>
                                <Calendar
                                    mode="single"
                                    showWeekNumbers
                                    showTodayButton
                                    events={
                                        [
                                            {
                                                date: "2026-03-02",
                                                color: "#83c442",
                                                title: "Apertura de licitación",
                                            },
                                            {
                                                date: "2026-03-05",
                                                color: "#1a6fa8",
                                                title: "Reunión de concejo",
                                            },
                                            {
                                                date: "2026-03-10",
                                                color: "#e07a2b",
                                                title: "Vencimiento de tasas",
                                            },
                                            {
                                                date: "2026-03-10",
                                                color: "#83c442",
                                                title: "Taller vecinal",
                                            },
                                            {
                                                date: "2026-03-15",
                                                color: "#83c442",
                                                title: "Día del vecino",
                                            },
                                            {
                                                date: "2026-03-18",
                                                color: "#c44282",
                                                title: "Evento cultural",
                                            },
                                            {
                                                date: "2026-03-24",
                                                color: "#e07a2b",
                                                title: "Feriado nacional",
                                            },
                                            {
                                                date: "2026-03-25",
                                                color: "#e07a2b",
                                                title: "Feriado nacional",
                                            },
                                            {
                                                date: "2026-03-28",
                                                color: "#1a6fa8",
                                                title: "Asamblea",
                                            },
                                        ] satisfies CalendarEvent[]
                                    }
                                />
                            </div>

                            {/* minDate / maxDate / disabledDates */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Restricciones de fecha
                                </h3>
                                <div className="flex flex-wrap gap-8 items-start">
                                    <div className="space-y-2">
                                        <p className="text-xs text-[#999]">
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                minDate
                                            </code>{" "}
                                            y{" "}
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                maxDate
                                            </code>
                                        </p>
                                        <Calendar
                                            mode="single"
                                            minDate="2026-03-05"
                                            maxDate="2026-03-25"
                                            showTodayButton
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs text-[#999]">
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                disabledDates
                                            </code>{" "}
                                            y{" "}
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                disabledDate
                                            </code>
                                        </p>
                                        <Calendar
                                            mode="single"
                                            disabledDates={[
                                                "2026-03-10",
                                                "2026-03-11",
                                                "2026-03-12",
                                            ]}
                                            disabledDate={(iso) => {
                                                const d = new Date(
                                                    iso + "T00:00:00"
                                                );
                                                return (
                                                    d.getDay() === 0 ||
                                                    d.getDay() === 6
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Navegación año/década */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Navegación de vistas — mes → año → década
                                </h3>
                                <p className="text-xs text-[#999]">
                                    Hacé click en el título del header para
                                    navegar hacia vistas más amplias. Con{" "}
                                    <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                        showViewNavigation=false
                                    </code>{" "}
                                    se deshabilita esa navegación.
                                </p>
                                <div className="flex flex-wrap gap-8 items-start">
                                    <div className="space-y-2">
                                        <p className="text-xs text-[#999] font-medium">
                                            Con navegación (default)
                                        </p>
                                        <Calendar
                                            mode="single"
                                            showViewNavigation
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs text-[#999] font-medium">
                                            Sin navegación
                                        </p>
                                        <Calendar
                                            mode="single"
                                            showViewNavigation={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Locale y primer día */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Locale y primer día de semana
                                </h3>
                                <div className="flex flex-wrap gap-8 items-start">
                                    <div className="space-y-2">
                                        <p className="text-xs text-[#999]">
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                locale="es-AR"
                                            </code>{" "}
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                firstDayOfWeek=1
                                            </code>{" "}
                                            (lunes)
                                        </p>
                                        <Calendar
                                            mode="single"
                                            locale="es-AR"
                                            firstDayOfWeek={1}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs text-[#999]">
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                locale="en-US"
                                            </code>{" "}
                                            <code className="bg-[#f6f6f6] px-1 rounded font-mono">
                                                firstDayOfWeek=0
                                            </code>{" "}
                                            (domingo)
                                        </p>
                                        <Calendar
                                            mode="single"
                                            locale="en-US"
                                            firstDayOfWeek={0}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Disabled */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-5">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Deshabilitado
                                </h3>
                                <Calendar
                                    mode="single"
                                    defaultValue="2026-03-11"
                                    disabled
                                    showTodayButton
                                    showClearButton
                                />
                            </div>
                        </div>
                    </section>

                    {/* ── CAROUSEL ─────────────────────────────────────── */}
                    <section id="carousel" className="space-y-6">
                        <SectionHeading
                            title="Carousel"
                            subtitle="Presentación de contenidos en diapositivas con soporte para múltiples variantes, autoplay, arrastre y accesibilidad."
                            link={{ label: "Ver en GitHub", href: "#" }}
                        />

                        <div className="space-y-8">
                            {/* Default */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Default — slide con flechas y dots
                                </h3>
                                <Carousel
                                    slides={carouselSlides}
                                    variant="default"
                                    size="md"
                                    activeIndex={carouselIdx}
                                    onChange={setCarouselIdx}
                                    loop
                                    dotsStyle="dots"
                                    arrowStyle="circle"
                                />
                            </div>

                            {/* Fade */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Fade — transición cruzada
                                </h3>
                                <Carousel
                                    slides={carouselSlides}
                                    variant="fade"
                                    size="md"
                                    loop
                                    dotsStyle="bars"
                                    arrowStyle="rounded"
                                />
                            </div>

                            {/* Cards */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Cards — peek de slides adyacentes
                                </h3>
                                <Carousel
                                    slides={carouselSlides}
                                    variant="cards"
                                    size="md"
                                    loop
                                    dotsStyle="numbers"
                                    cardGap={16}
                                    cardPeek={40}
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Thumbnails — tira de miniaturas
                                </h3>
                                <Carousel
                                    slides={carouselSlides.map((s, i) => ({
                                        ...s,
                                        thumbnail: (
                                            <div
                                                className={`w-full h-full flex items-center justify-center text-white text-xs font-bold ${
                                                    [
                                                        "bg-[#83c442]",
                                                        "bg-[#3f80c4]",
                                                        "bg-[#e67e22]",
                                                        "bg-[#8e44ad]",
                                                    ][i]
                                                }`}
                                            >
                                                {i + 1}
                                            </div>
                                        ),
                                    }))}
                                    variant="thumbnails"
                                    size="md"
                                    loop
                                    showDots={false}
                                    arrowStyle="square"
                                />
                            </div>

                            {/* Autoplay */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Autoplay — avance automático (2 s, pausa al
                                    hover)
                                </h3>
                                <Carousel
                                    slides={carouselSlides}
                                    variant="default"
                                    size="sm"
                                    autoPlay={2000}
                                    pauseOnHover
                                    loop
                                    dotsStyle="bars"
                                    arrowStyle="none"
                                />
                            </div>

                            {/* Sizes */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-6">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Tamaños — sm / md / lg
                                </h3>
                                <div className="space-y-4">
                                    {(["sm", "md", "lg"] as const).map((sz) => (
                                        <div key={sz} className="space-y-1">
                                            <p className="text-xs text-[#999] font-mono">
                                                {sz}
                                            </p>
                                            <Carousel
                                                slides={carouselSlides.slice(
                                                    0,
                                                    2
                                                )}
                                                size={sz}
                                                loop
                                                arrowStyle="circle"
                                                dotsStyle="dots"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Arrow styles */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-6">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Estilos de flecha — circle / rounded /
                                    square / none
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(
                                        [
                                            "circle",
                                            "rounded",
                                            "square",
                                            "none",
                                        ] as const
                                    ).map((as) => (
                                        <div key={as} className="space-y-1">
                                            <p className="text-xs text-[#999] font-mono">
                                                {as}
                                            </p>
                                            <Carousel
                                                slides={carouselSlides.slice(
                                                    0,
                                                    3
                                                )}
                                                size="sm"
                                                arrowStyle={as}
                                                dotsStyle="none"
                                                loop
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dots styles */}
                            <div className="rounded-xl border border-[#e2e2e2] bg-white p-6 space-y-6">
                                <h3 className="text-sm font-semibold text-[#3f3f3f] uppercase tracking-wide">
                                    Estilos de indicador — dots / bars / numbers
                                    / none
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(
                                        [
                                            "dots",
                                            "bars",
                                            "numbers",
                                            "none",
                                        ] as const
                                    ).map((ds) => (
                                        <div key={ds} className="space-y-1">
                                            <p className="text-xs text-[#999] font-mono">
                                                {ds}
                                            </p>
                                            <Carousel
                                                slides={carouselSlides.slice(
                                                    0,
                                                    3
                                                )}
                                                size="sm"
                                                dotsStyle={ds}
                                                arrowStyle="circle"
                                                loop
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
