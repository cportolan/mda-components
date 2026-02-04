'use client';

import { useState } from 'react';
import { Button, Select, Autocomplete, Toggle, Checkbox } from '@/lib';

export default function Home() {
    const [selectValue, setSelectValue] = useState('');
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [toggleChecked, setToggleChecked] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const selectOptions = [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte' },
        { label: 'Next.js', value: 'nextjs' },
    ];

    const countries = [
        { label: 'Argentina', value: 'ar' },
        { label: 'Brasil', value: 'br' },
        { label: 'Chile', value: 'cl' },
        { label: 'Colombia', value: 'co' },
        { label: 'México', value: 'mx' },
        { label: 'Perú', value: 'pe' },
        { label: 'Uruguay', value: 'uy' },
        { label: 'Venezuela', value: 've' },
    ];

    return (
        <div className="min-h-screen px-4 py-8 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="mb-4 text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 lg:text-5xl">
                        Todos los Componentes
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Button, Select, Autocomplete, Toggle y Checkbox con animaciones modernas
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Button Component */}
                    <section className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            Button
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Variantes
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="danger">Danger</Button>
                                    <Button className='bg-green-600 text-white hover:bg-green-700 rounded-xl'>Portal Avellaneda</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Button size="sm">Small</Button>
                                    <Button size="md">Medium</Button>
                                    <Button size="lg">Large</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
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
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
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

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Ejemplos Interactivos
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Button
                                        variant="primary"
                                        onClick={() => alert('¡Botón clickeado!')}
                                    >
                                        Click me
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            console.log('Button clicked!')
                                        }
                                    >
                                        Log to Console
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Select Component */}
                    <section className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            Select
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
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
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
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
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
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
                    <section className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            Autocomplete
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Autocomplete
                                        options={countries}
                                        placeholder="Small"
                                        size="sm"
                                        onSelect={(option) =>
                                            console.log('Selected:', option)
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
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
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
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Full Width con Callback
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
                                        alert(
                                            `Seleccionaste: ${option.label}`
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* Toggle Component */}
                    <section className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            Toggle (Estilo iPhone)
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
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
                                    <Toggle size="md" label="Medium" defaultChecked />
                                    <Toggle size="lg" label="Large" defaultChecked />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Estados
                                </h3>
                                <div className="flex flex-wrap items-center gap-6">
                                    <Toggle label="Off" />
                                    <Toggle label="On" defaultChecked />
                                    <Toggle
                                        label="Disabled Off"
                                        disabled
                                    />
                                    <Toggle
                                        label="Disabled On"
                                        defaultChecked
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Interactivo
                                </h3>
                                <Toggle
                                    label={`Notificaciones ${toggleChecked ? 'activadas' : 'desactivadas'}`}
                                    checked={toggleChecked}
                                    onChange={(e) =>
                                        setToggleChecked(e.target.checked)
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* Checkbox Component */}
                    <section className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            Checkbox
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Tamaños
                                </h3>
                                <div className="flex flex-wrap items-center gap-6">
                                    <Checkbox
                                        size="sm"
                                        label="Small"
                                        checked={checkboxChecked}
                                        onChange={(e) =>
                                            setCheckboxChecked(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <Checkbox size="md" label="Medium" defaultChecked />
                                    <Checkbox size="lg" label="Large" defaultChecked />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Estados
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-6">
                                        <Checkbox label="Unchecked" />
                                        <Checkbox label="Checked" defaultChecked />
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

                            <div>
                                <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Lista Interactiva
                                </h3>
                                <div className="space-y-2">
                                    <Checkbox
                                        label="Acepto los términos y condiciones"
                                        checked={checkboxChecked}
                                        onChange={(e) =>
                                            setCheckboxChecked(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <Checkbox label="Quiero recibir notificaciones por email" defaultChecked />
                                    <Checkbox label="Suscribirse al newsletter" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Info */}
                    <section className="rounded-2xl border border-blue-200/50 bg-linear-to-br from-blue-50/80 to-purple-50/80 p-8 backdrop-blur-xl dark:border-blue-700/50 dark:from-blue-900/20 dark:to-purple-900/20">
                        <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-300">
                            💡 Próximos componentes
                        </h3>
                        <p className="text-blue-800 dark:text-blue-400">
                            Input, Modal, Card, Table y más...
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

