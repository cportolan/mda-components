"use client";

import React, { useState, useRef, useEffect } from "react";
import { InputFileProps, FileWithPreview } from "./InputFile.types";

export const InputFile: React.FC<InputFileProps> = ({
    accept,
    multiple = false,
    maxSize = 10, // 10MB por defecto
    maxFiles = 5,
    label,
    helperText,
    error = false,
    disabled = false,
    size = "md",
    fullWidth = false,
    onChange,
    onRemove,
    showPreview = true,
    buttonText = "Seleccionar archivos",
    dropzoneText = "o arrastra y suelta archivos aquí",
    className = "",
    value,
}) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Sincronizar con value controlado
    useEffect(() => {
        if (value !== undefined) {
            setFiles(value as FileWithPreview[]);
        }
    }, [value]);

    const validateFile = (file: File): string | null => {
        // Validar tamaño
        const fileSizeMB = file.size / 1024 / 1024;
        if (fileSizeMB > maxSize) {
            return `El archivo "${file.name}" excede el tamaño máximo de ${maxSize}MB`;
        }

        // Validar tipo de archivo
        if (accept) {
            const acceptedTypes = accept.split(",").map((t) => t.trim());
            const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
            const fileMimeType = file.type;

            const isAccepted = acceptedTypes.some((type) => {
                if (type.startsWith(".")) {
                    return fileExtension === type.toLowerCase();
                }
                if (type.includes("*")) {
                    const [mainType] = type.split("/");
                    return fileMimeType.startsWith(mainType);
                }
                return fileMimeType === type;
            });

            if (!isAccepted) {
                return `El archivo "${file.name}" no es un tipo de archivo válido`;
            }
        }

        return null;
    };

    const createPreview = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                resolve("");
            }
        });
    };

    const handleFiles = async (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return;

        setErrorMessage("");
        const newFilesArray = Array.from(fileList);

        // Validar número máximo de archivos
        const totalFiles = files.length + newFilesArray.length;
        if (!multiple && newFilesArray.length > 1) {
            setErrorMessage("Solo se permite un archivo");
            return;
        }
        if (totalFiles > maxFiles) {
            setErrorMessage(
                `No puedes subir más de ${maxFiles} archivo${maxFiles > 1 ? "s" : ""}`
            );
            return;
        }

        // Validar cada archivo
        for (const file of newFilesArray) {
            const validationError = validateFile(file);
            if (validationError) {
                setErrorMessage(validationError);
                return;
            }
        }

        // Crear previews para imágenes
        const filesWithPreviews: FileWithPreview[] = await Promise.all(
            newFilesArray.map(async (file) => {
                const preview = await createPreview(file);
                return Object.assign(file, { preview });
            })
        );

        const updatedFiles = multiple
            ? [...files, ...filesWithPreviews]
            : filesWithPreviews;

        setFiles(updatedFiles);
        onChange?.(updatedFiles);

        // Limpiar input
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const removeFile = (index: number) => {
        const fileToRemove = files[index];
        const updatedFiles = files.filter((_, i) => i !== index);
        
        // Revocar URL de preview si existe
        if (fileToRemove.preview) {
            URL.revokeObjectURL(fileToRemove.preview);
        }

        setFiles(updatedFiles);
        onChange?.(updatedFiles);
        onRemove?.(fileToRemove, index);
        setErrorMessage("");
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (!disabled) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) {
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#83c442]"
                >
                    <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                    <path
                        d="M21 15l-5-5L5 21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );
        }
        if (file.type === "application/pdf") {
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-red-500"
                >
                    <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14 2v6h6M10 12h4M10 16h4M10 8h1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );
        }
        return (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-500"
            >
                <path
                    d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M13 2v7h7"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>
        );
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-5 py-2.5 text-[15px]",
        lg: "px-6 py-3 text-lg",
    };

    const dropzoneStyles = `
        rounded-[10px] border-2 border-dashed transition-all duration-300
        ${isDragging ? "border-[#83c442] bg-green-50/50 scale-[1.02]" : "border-[#70f787]"}
        ${disabled ? "bg-[#f0f0f0] border-[#e2e2e2] cursor-not-allowed opacity-60" : "hover:border-[#83c442] hover:bg-green-50/30 cursor-pointer"}
        ${error || errorMessage ? "border-red-400 bg-red-50/30" : ""}
    `;

    return (
        <div className={`flex flex-col gap-3 ${fullWidth ? "w-full" : "w-auto"} ${className}`}>
            {label && (
                <label className={`text-sm font-medium ${error || errorMessage ? "text-red-600" : "text-[#3f3f3f]"}`}>
                    {label}
                </label>
            )}

            {/* Dropzone */}
            <div
                className={dropzoneStyles}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !disabled && inputRef.current?.click()}
            >
                <div className="flex flex-col items-center justify-center gap-3 py-8">
                    <div className="rounded-full bg-green-50 p-4">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-[#83c442]"
                        >
                            <path
                                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            className={`font-medium text-[#83c442] hover:text-[#6fb035] transition-colors ${sizes[size]}`}
                            disabled={disabled}
                        >
                            {buttonText}
                        </button>
                        <p className="text-sm text-[#3f3f3f]/70 mt-1">{dropzoneText}</p>
                    </div>

                    <div className="text-xs text-[#3f3f3f]/60 text-center">
                        {accept && <p>Archivos permitidos: {accept}</p>}
                        <p>Tamaño máximo: {maxSize}MB {multiple && `• Máximo ${maxFiles} archivos`}</p>
                    </div>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                />
            </div>

            {/* Error Message */}
            {(errorMessage || (error && helperText)) && (
                <p className="text-xs text-red-600">
                    {errorMessage || helperText}
                </p>
            )}

            {/* Helper Text (cuando no hay error) */}
            {helperText && !error && !errorMessage && (
                <p className="text-xs text-[#3f3f3f]/70">{helperText}</p>
            )}

            {/* Files List */}
            {files.length > 0 && (
                <div className="space-y-3 mt-2">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="rounded-[10px] border border-[#70f787] bg-white/90 p-3 transition-all duration-300 hover:border-[#83c442] hover:shadow-md"
                        >
                            {showPreview && file.preview ? (
                                // Vista previa de imagen
                                <div className="flex items-start gap-3">
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={file.preview}
                                            alt={file.name}
                                            className="h-20 w-20 rounded-lg object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile(index);
                                            }}
                                            disabled={disabled}
                                            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-lg transition-all hover:bg-red-600 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M18 6L6 18M6 6l12 12"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#3f3f3f] truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-[#3f3f3f]/70">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                // Vista de archivo no-imagen
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        {getFileIcon(file)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#3f3f3f] truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-[#3f3f3f]/70">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(index);
                                        }}
                                        disabled={disabled}
                                        className="flex-shrink-0 rounded-full p-1.5 text-red-500 transition-all hover:bg-red-50 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M18 6L6 18M6 6l12 12"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

InputFile.displayName = "InputFile";
