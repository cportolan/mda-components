"use client";
import "./Stepper.css";
import React from "react";
// ── helpers ──────────────────────────────────────────────────────────────────
function getStepStatus(index, activeStep, overrideStatus) {
    if (overrideStatus)
        return overrideStatus;
    if (index < activeStep)
        return "completed";
    if (index === activeStep)
        return "active";
    return "pending";
}
// ── Check icon ────────────────────────────────────────────────────────────────
const CheckIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
const ErrorIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>);
// ── Stepper ───────────────────────────────────────────────────────────────────
export const Stepper = ({ steps, activeStep = 0, variant = "default", size = "md", orientation = "horizontal", clickable = false, onStepClick, className = "", }) => {
    function getCircleStyles(status, disabled) {
        if (disabled) return "mda-stepper__circle mda-stepper__circle--disabled";
        return ["mda-stepper__circle", `mda-stepper__circle--${variant}-${status}`].join(" ");
    }
    function getConnectorStyles(index) {
        const completed = index < activeStep;
        return ["mda-stepper__connector", `mda-stepper__connector--${orientation}`, completed ? "mda-stepper__connector--done" : "mda-stepper__connector--pending", `mda-stepper__size-connector--${orientation}-${size}`].join(" ");
    }
    function getLabelStyles(status, disabled) {
        const effective = disabled ? "disabled" : status;
        return {
            title: `mda-stepper__title--${effective}`,
            description: `mda-stepper__description--${effective}`,
        };
    }
    if (variant === "dots") {
        return (<div className={["mda-stepper", "mda-stepper--dots", className].filter(Boolean).join(" ")}>
                <div className="mda-stepper__dots-row">
                    {steps.map((step, index) => {
                const status = getStepStatus(index, activeStep, step.status);
                const isActive = status === "active";
                const isCompleted = status === "completed";
                const isError = status === "error";
                return (<React.Fragment key={index}>
                                <button type="button" disabled={step.disabled || !clickable} onClick={() => clickable &&
                        !step.disabled &&
                        onStepClick?.(index)} className={["mda-stepper__dot", isActive ? `mda-stepper__dot--${size}-active` : `mda-stepper__dot--${size}-inactive`, isActive ? "mda-stepper__dot--active" : isCompleted ? "mda-stepper__dot--completed" : isError ? "mda-stepper__dot--error" : "mda-stepper__dot--pending", clickable && !step.disabled ? "mda-stepper__dot--clickable" : ""].filter(Boolean).join(" ")} title={step.title}/>
                                {index < steps.length - 1 && (<div className={["mda-stepper__dot-connector", index < activeStep ? "mda-stepper__dot-connector--done" : "mda-stepper__dot-connector--pending"].join(" ")}/>)}
                            </React.Fragment>);
            })}
                </div>
                <div className="mda-stepper__active-copy">
                    <p className={["mda-stepper__active-title", `mda-stepper__size-title--${size}`].join(" ")}>
                        {steps[activeStep]?.title}
                    </p>
                    {steps[activeStep]?.description && (<p className={["mda-stepper__active-description", `mda-stepper__size-description--${size}`].join(" ")}>
                            {steps[activeStep].description}
                        </p>)}
                </div>
            </div>);
    }
    if (orientation === "vertical") {
        return (<div className={["mda-stepper", "mda-stepper--vertical", className].filter(Boolean).join(" ")}>
                {steps.map((step, index) => {
                const status = getStepStatus(index, activeStep, step.status);
                const circleStyles = getCircleStyles(status, step.disabled);
                const labelStyles = getLabelStyles(status, step.disabled);
                const isLast = index === steps.length - 1;
                return (<div key={index} className="mda-stepper__step mda-stepper__step--vertical">
                            <div className="mda-stepper__step-left">
                                <button type="button" disabled={step.disabled || !clickable} onClick={() => clickable &&
                        !step.disabled &&
                        onStepClick?.(index)} className={[circleStyles, `mda-stepper__size-circle--${size}`, clickable && !step.disabled ? "mda-stepper__circle--clickable" : ""].filter(Boolean).join(" ")}>
                                    {status === "completed" && !step.icon ? (<CheckIcon />) : status === "error" && !step.icon ? (<ErrorIcon />) : step.icon ? (step.icon) : (<span>{index + 1}</span>)}
                                </button>
                                {!isLast && <div className={getConnectorStyles(index)} />}
                            </div>

                            <div className="mda-stepper__step-content mda-stepper__step-content--vertical">
                                <p className={["mda-stepper__title", `mda-stepper__size-title--${size}`, labelStyles.title].join(" ")}>
                                    {step.title}
                                </p>
                                {step.description && (<p className={["mda-stepper__description", `mda-stepper__size-description--${size}`, labelStyles.description].join(" ")}>
                                        {step.description}
                                    </p>)}
                            </div>
                        </div>);
            })}
            </div>);
    }
    return (<div className={["mda-stepper", "mda-stepper--horizontal", className].filter(Boolean).join(" ")}>
            {steps.map((step, index) => {
            const status = getStepStatus(index, activeStep, step.status);
            const circleStyles = getCircleStyles(status, step.disabled);
            const labelStyles = getLabelStyles(status, step.disabled);
            const isLast = index === steps.length - 1;
            return (<React.Fragment key={index}>
                        <div className="mda-stepper__step mda-stepper__step--horizontal">
                            <button type="button" disabled={step.disabled || !clickable} onClick={() => clickable &&
                    !step.disabled &&
                    onStepClick?.(index)} className={[circleStyles, `mda-stepper__size-circle--${size}`, clickable && !step.disabled ? "mda-stepper__circle--clickable" : ""].filter(Boolean).join(" ")}>
                                {status === "completed" && !step.icon ? (<CheckIcon />) : status === "error" && !step.icon ? (<ErrorIcon />) : step.icon ? (step.icon) : (<span>{index + 1}</span>)}
                            </button>

                            <div className="mda-stepper__step-content">
                                <p className={["mda-stepper__title", `mda-stepper__size-title--${size}`, labelStyles.title].join(" ")}>
                                    {step.title}
                                </p>
                                {step.description && (<p className={["mda-stepper__description", `mda-stepper__size-description--${size}`, labelStyles.description].join(" ")}>
                                        {step.description}
                                    </p>)}
                            </div>
                        </div>

                        {!isLast && <div className={getConnectorStyles(index)} />}
                    </React.Fragment>);
        })}
        </div>);
};
Stepper.displayName = "Stepper";
// ── StepperNavigation ─────────────────────────────────────────────────────────
export const StepperNavigation = ({ steps, activeStep = 0, onNext, onBack, onFinish, children, variant = "default", size = "md", orientation = "horizontal", nextLabel = "Siguiente", backLabel = "Anterior", finishLabel = "Finalizar", className = "", }) => {
    const isFirst = activeStep === 0;
    const isLast = activeStep === steps.length - 1;
    return (<div className={["mda-stepper-navigation", className].filter(Boolean).join(" ")}>
            <Stepper steps={steps} activeStep={activeStep} variant={variant} size={size} orientation={orientation}/>

            {children && (<div className="mda-stepper-navigation__panel">
                    {children}
                </div>)}

            <div className="mda-stepper-navigation__actions">
                <button type="button" onClick={onBack} disabled={isFirst} className="mda-stepper-navigation__button mda-stepper-navigation__button--secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {backLabel}
                </button>

                <span className="mda-stepper-navigation__meta">
                    Paso {activeStep + 1} de {steps.length}
                </span>

                {isLast ? (<button type="button" onClick={onFinish} className="mda-stepper-navigation__button mda-stepper-navigation__button--primary">
                        {finishLabel}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>) : (<button type="button" onClick={onNext} className="mda-stepper-navigation__button mda-stepper-navigation__button--primary">
                        {nextLabel}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>)}
            </div>
        </div>);
};
StepperNavigation.displayName = "StepperNavigation";
