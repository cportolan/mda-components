"use client";
import "./Toggle.css";
import React, { useState } from "react";
export const Toggle = React.forwardRef(({ checked, defaultChecked = false, onChange, size = "md", disabled = false, label, className = "", ...props }, ref) => {
    // Estado interno para componentes no controlados
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const handleChange = (e) => {
        if (!isControlled) {
            setInternalChecked(e.target.checked);
        }
        onChange?.(e);
    };
    return (<label className={["mda-toggle", disabled ? "mda-toggle--disabled" : "mda-toggle--interactive", className].filter(Boolean).join(" ")}>
                <input ref={ref} type="checkbox" checked={isControlled ? checked : undefined} defaultChecked={isControlled ? undefined : defaultChecked} onChange={handleChange} disabled={disabled} className="mda-toggle__input" {...props}/>

                {/* Track con gradiente y sombras */}
                <div className={[
            "mda-toggle__track",
            `mda-toggle__track--${size}`,
            isChecked ? "mda-toggle__track--on" : "mda-toggle__track--off",
            !disabled ? "mda-toggle__track--hoverable" : "",
        ].filter(Boolean).join(" ")}>
                    {/* Thumb con efecto glassmorphism */}
                    <div className={[
            "mda-toggle__thumb",
            `mda-toggle__thumb--${size}`,
            isChecked ? `mda-toggle__thumb--on-${size}` : "mda-toggle__thumb--off",
        ].filter(Boolean).join(" ")}></div>
                </div>

                {label && (<span className="mda-toggle__label">
                        {label}
                    </span>)}
            </label>);
});
Toggle.displayName = "Toggle";
