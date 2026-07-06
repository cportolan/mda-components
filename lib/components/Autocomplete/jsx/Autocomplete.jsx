"use client";
import "./Autocomplete.css";
import React, { useState, useRef, useEffect } from "react";

export const Autocomplete = React.forwardRef(({ options, placeholder = "Buscar...", size = "md", error = false, disabled = false, fullWidth = false, className = "", value, onChange, onSelect, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value || "");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef(null);

    useEffect(() => {
        const filtered = options.filter((option) => String(option.label).toLowerCase().includes(String(searchTerm).toLowerCase()));
        setFilteredOptions(filtered);
    }, [searchTerm, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        setIsOpen(true);
        setHighlightedIndex(-1);
        onChange?.(e);
    };

    const handleOptionClick = (option) => {
        if (option.disabled) return;
        setSearchTerm(option.label);
        setIsOpen(false);
        onSelect?.(option);
    };

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === "ArrowDown" || e.key === "Enter") setIsOpen(true);
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setHighlightedIndex((prev) => prev < filteredOptions.length - 1 ? prev + 1 : prev);
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex((prev) => prev > 0 ? prev - 1 : -1);
                break;
            case "Enter":
                e.preventDefault();
                if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    handleOptionClick(filteredOptions[highlightedIndex]);
                }
                break;
            case "Escape":
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    const inputClasses = [
        "mda-autocomplete__input",
        `mda-autocomplete__input--${size}`,
        error ? "mda-autocomplete__input--error" : "mda-autocomplete__input--default",
        disabled ? "mda-autocomplete__input--disabled" : "",
        fullWidth ? "mda-autocomplete__input--full" : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <div ref={containerRef} className={["mda-autocomplete", fullWidth ? "mda-autocomplete--full" : "mda-autocomplete--auto"].join(" ")}>
            <input
                ref={ref}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClasses}
                {...props}
            />

            <div className="mda-autocomplete__arrow">
                <svg className={["mda-autocomplete__arrow-icon", error ? "mda-autocomplete__arrow-icon--error" : "", disabled ? "mda-autocomplete__arrow-icon--disabled" : ""].filter(Boolean).join(" ")} width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {isOpen && filteredOptions.length > 0 && (
                <div className="mda-autocomplete__dropdown">
                    <div className="mda-autocomplete__list">
                        {filteredOptions.map((option, index) => (
                            <div
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                className={[
                                    "mda-autocomplete__option",
                                    option.disabled ? "mda-autocomplete__option--disabled" : "mda-autocomplete__option--enabled",
                                    index === highlightedIndex ? "mda-autocomplete__option--highlighted" : "",
                                ].filter(Boolean).join(" ")}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isOpen && filteredOptions.length === 0 && (
                <div className="mda-autocomplete__dropdown">
                    <div className="mda-autocomplete__empty">
                        <svg className="mda-autocomplete__empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="mda-autocomplete__empty-text">No se encontraron resultados</p>
                    </div>
                </div>
            )}
        </div>
    );
});

Autocomplete.displayName = "Autocomplete";
