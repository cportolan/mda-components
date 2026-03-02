"use client";

import { useState } from "react";
import { Button, Select, Autocomplete, Toggle, Checkbox, Input } from "@/lib";

export default function Home() {
    const [selectValue, setSelectValue] = useState("");
    const [autocompleteValue, setAutocompleteValue] = useState("");
    const [toggleChecked, setToggleChecked] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [numberValue, setNumberValue] = useState("");

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
                                    />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        label="Contraseña"
                                        value={passwordValue}
                                        onChange={(e) =>
                                            setPasswordValue(e.target.value)
                                        }
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
                                    />
                                    <Input
                                        type="tel"
                                        placeholder="+54 11 1234-5678"
                                        label="Teléfono"
                                    />
                                    <Input
                                        type="url"
                                        placeholder="https://ejemplo.com"
                                        label="URL"
                                    />
                                    <Input
                                        type="search"
                                        placeholder="Buscar..."
                                        label="Búsqueda"
                                    />
                                    <Input type="date" label="Fecha" />
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
                                    />
                                    <Input
                                        size="md"
                                        placeholder="Medium"
                                        label="Medium"
                                    />
                                    <Input
                                        size="lg"
                                        placeholder="Large"
                                        label="Large"
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
                                    />
                                    <Input
                                        placeholder="Input deshabilitado"
                                        label="Deshabilitado"
                                        disabled
                                    />
                                    <Input
                                        placeholder="Input con error"
                                        label="Con Error"
                                        error
                                        helperText="Este campo contiene un error"
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
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-medium text-gray-800">
                                    Full Width
                                </h3>
                                <Input
                                    placeholder="Este input ocupa todo el ancho"
                                    label="Ancho Completo"
                                    fullWidth
                                />
                            </div>
                        </div>
                    </section>

                    {/* Info */}
                    <section className="rounded-2xl border border-green-300/60 bg-linear-to-br from-green-50/80 to-[#83c442]/10 p-8 backdrop-blur-sm shadow-lg">
                        <h3 className="mb-2 text-lg font-semibold text-[#5a9428]">
                            💡 Próximos componentes
                        </h3>
                        <p className="text-gray-700">
                            Modal, Card, Table y más...
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
