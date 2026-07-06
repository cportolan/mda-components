"use client";
import "./InputFile.css";
import React, { useState, useRef, useEffect } from "react";

export const InputFile = ({ accept, multiple = false, maxSize = 10, maxFiles = 5, label, helperText, error = false, disabled = false, size = "md", fullWidth = false, onChange, onRemove, showPreview = true, buttonText = "Seleccionar archivos", dropzoneText = "o arrastra y suelta archivos aquí", className = "", value, }) => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (value !== undefined) {
            setFiles(value);
        }
    }, [value]);

    const validateFile = (file) => {
        const fileSizeMB = file.size / 1024 / 1024;
        if (fileSizeMB > maxSize) {
            return `El archivo "${file.name}" excede el tamaño máximo de ${maxSize}MB`;
        }

        if (accept) {
            const acceptedTypes = accept.split(",").map((t) => t.trim());
            const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
            const fileMimeType = file.type;

            const isAccepted = acceptedTypes.some((type) => {
                if (type.startsWith(".")) return fileExtension === type.toLowerCase();
                if (type.includes("*")) return fileMimeType.startsWith(type.split("/")[0]);
                return fileMimeType === type;
            });

            if (!isAccepted) {
                return `El archivo "${file.name}" no es un tipo de archivo válido`;
            }
        }

        return null;
    };

    const createPreview = (file) => new Promise((resolve) => {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        }
        else {
            resolve("");
        }
    });

    const handleFiles = async (fileList) => {
        if (!fileList || fileList.length === 0) return;

        setErrorMessage("");
        const newFilesArray = Array.from(fileList);
        const totalFiles = files.length + newFilesArray.length;

        if (!multiple && newFilesArray.length > 1) {
            setErrorMessage("Solo se permite un archivo");
            return;
        }

        if (totalFiles > maxFiles) {
            setErrorMessage(`No puedes subir más de ${maxFiles} archivo${maxFiles > 1 ? "s" : ""}`);
            return;
        }

        for (const file of newFilesArray) {
            const validationError = validateFile(file);
            if (validationError) {
                setErrorMessage(validationError);
                return;
            }
        }

        const filesWithPreviews = await Promise.all(newFilesArray.map(async (file) => {
            const preview = await createPreview(file);
            return Object.assign(file, { preview });
        }));

        const updatedFiles = multiple ? [...files, ...filesWithPreviews] : filesWithPreviews;
        setFiles(updatedFiles);
        onChange?.(updatedFiles);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const removeFile = (index) => {
        const fileToRemove = files[index];
        const updatedFiles = files.filter((_, i) => i !== index);

        if (fileToRemove.preview) {
            URL.revokeObjectURL(fileToRemove.preview);
        }

        setFiles(updatedFiles);
        onChange?.(updatedFiles);
        onRemove?.(fileToRemove, index);
        setErrorMessage("");
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (!disabled) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
    };

    const getFileIcon = (file) => {
        if (file.type.startsWith("image/")) {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mda-input-file__file-icon mda-input-file__file-icon--image">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                    <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        }

        if (file.type === "application/pdf") {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mda-input-file__file-icon mda-input-file__file-icon--pdf">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6M10 12h4M10 16h4M10 8h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        }

        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mda-input-file__file-icon mda-input-file__file-icon--default">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" />
                <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    };

    return (
        <div className={["mda-input-file", fullWidth ? "mda-input-file--full" : "mda-input-file--auto", className].filter(Boolean).join(" ")}>
            {label && (
                <label className={["mda-input-file__label", error || errorMessage ? "mda-input-file__label--error" : ""].filter(Boolean).join(" ")}>
                    {label}
                </label>
            )}

            <div
                className={[
                    "mda-input-file__dropzone",
                    `mda-input-file__dropzone--${size}`,
                    isDragging ? "mda-input-file__dropzone--dragging" : "",
                    disabled ? "mda-input-file__dropzone--disabled" : "mda-input-file__dropzone--interactive",
                    error || errorMessage ? "mda-input-file__dropzone--error" : "",
                ].filter(Boolean).join(" ")}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !disabled && inputRef.current?.click()}
            >
                <div className="mda-input-file__dropzone-content">
                    <div className="mda-input-file__dropzone-icon-wrap">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mda-input-file__dropzone-icon">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="mda-input-file__dropzone-copy">
                        <button type="button" className={["mda-input-file__button", `mda-input-file__button--${size}`].join(" ")} disabled={disabled}>
                            {buttonText}
                        </button>
                        <p className="mda-input-file__dropzone-text">{dropzoneText}</p>
                    </div>

                    <div className="mda-input-file__dropzone-meta">
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
                    className="mda-input-file__native"
                />
            </div>

            {(errorMessage || (error && helperText)) && (
                <p className="mda-input-file__feedback mda-input-file__feedback--error">
                    {errorMessage || helperText}
                </p>
            )}

            {helperText && !error && !errorMessage && (
                <p className="mda-input-file__feedback">{helperText}</p>
            )}

            {files.length > 0 && (
                <div className="mda-input-file__list">
                    {files.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="mda-input-file__item">
                            {showPreview && file.preview ? (
                                <div className="mda-input-file__item-preview">
                                    <div className="mda-input-file__image-wrap">
                                        <img src={file.preview} alt={file.name} className="mda-input-file__image" />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile(index);
                                            }}
                                            disabled={disabled}
                                            className="mda-input-file__remove mda-input-file__remove--floating"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mda-input-file__item-copy">
                                        <p className="mda-input-file__file-name">{file.name}</p>
                                        <p className="mda-input-file__file-size">{formatFileSize(file.size)}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="mda-input-file__item-file">
                                    <div className="mda-input-file__file-visual">{getFileIcon(file)}</div>
                                    <div className="mda-input-file__item-copy">
                                        <p className="mda-input-file__file-name">{file.name}</p>
                                        <p className="mda-input-file__file-size">{formatFileSize(file.size)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(index);
                                        }}
                                        disabled={disabled}
                                        className="mda-input-file__remove"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
