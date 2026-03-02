"use client";

import React, { useState, useEffect } from "react";
import { ToggleProps } from "./Toggle.types";

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
    (
        {
            checked,
            defaultChecked = false,
            onChange,
            size = "md",
            disabled = false,
            label,
            className = "",
            ...props
        },
        ref
    ) => {
        // Estado interno para componentes no controlados
        const [internalChecked, setInternalChecked] = useState(defaultChecked);
        const isControlled = checked !== undefined;
        const isChecked = isControlled ? checked : internalChecked;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setInternalChecked(e.target.checked);
            }
            onChange?.(e);
        };

        const sizeClasses = {
            sm: {
                track: "w-10 h-6",
                thumb: "w-5 h-5",
                translate: "translate-x-4",
            },
            md: {
                track: "w-12 h-7",
                thumb: "w-6 h-6",
                translate: "translate-x-5",
            },
            lg: {
                track: "w-16 h-9",
                thumb: "w-8 h-8",
                translate: "translate-x-7",
            },
        };

        const sizeConfig = sizeClasses[size];

        return (
            <label
                className={`group inline-flex items-center gap-3 ${
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                } ${className}`}
            >
                <input
                    ref={ref}
                    type="checkbox"
                    checked={isControlled ? checked : undefined}
                    defaultChecked={isControlled ? undefined : defaultChecked}
                    onChange={handleChange}
                    disabled={disabled}
                    className="sr-only"
                    {...props}
                />

                {/* Track con gradiente y sombras */}
                <div
                    className={`relative rounded-full transition-all duration-300 ease-out ${
                        sizeConfig.track
                    } ${isChecked ? "bg-[#83c442]" : "bg-gray-200"} ${
                        !disabled && "group-hover:scale-105"
                    }`}
                >
                    {/* Thumb con efecto glassmorphism */}
                    <div
                        className={`absolute top-0.5 left-0.5 rounded-full bg-white transition-all duration-300 ease-out shadow-md ${
                            sizeConfig.thumb
                        } ${
                            isChecked ? sizeConfig.translate : "translate-x-0"
                        }`}
                    ></div>
                </div>

                {label && (
                    <span className="select-none text-[#3f3f3f] transition-colors duration-200 group-hover:text-[#1f3a0f]">
                        {label}
                    </span>
                )}
            </label>
        );
    }
);

Toggle.displayName = "Toggle";
