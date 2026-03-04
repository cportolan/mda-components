"use client";

import React from "react";
import {
    StepperProps,
    StepperNavigationProps,
    StepStatus,
} from "./Stepper.types";

// ── helpers ──────────────────────────────────────────────────────────────────

function getStepStatus(
    index: number,
    activeStep: number,
    overrideStatus?: StepStatus
): StepStatus {
    if (overrideStatus) return overrideStatus;
    if (index < activeStep) return "completed";
    if (index === activeStep) return "active";
    return "pending";
}

// ── Check icon ────────────────────────────────────────────────────────────────

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ErrorIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
    </svg>
);

// ── Stepper ───────────────────────────────────────────────────────────────────

export const Stepper: React.FC<StepperProps> = ({
    steps,
    activeStep = 0,
    variant = "default",
    size = "md",
    orientation = "horizontal",
    clickable = false,
    onStepClick,
    className = "",
}) => {
    // ── size config ──────────────────────────────────────────────────────────

    const sizeConfig = {
        sm: {
            circle: "w-7 h-7 text-xs",
            dotCircle: "w-5 h-5",
            dotActive: "w-3 h-3",
            dotPending: "w-2 h-2",
            title: "text-xs font-medium",
            description: "text-[11px]",
            connector: "h-0.5",
            connectorV: "w-0.5 min-h-[24px]",
            gap: orientation === "vertical" ? "gap-3" : "gap-0",
        },
        md: {
            circle: "w-9 h-9 text-sm",
            dotCircle: "w-6 h-6",
            dotActive: "w-3.5 h-3.5",
            dotPending: "w-2.5 h-2.5",
            title: "text-sm font-medium",
            description: "text-xs",
            connector: "h-0.5",
            connectorV: "w-0.5 min-h-[28px]",
            gap: orientation === "vertical" ? "gap-4" : "gap-0",
        },
        lg: {
            circle: "w-11 h-11 text-base",
            dotCircle: "w-8 h-8",
            dotActive: "w-4 h-4",
            dotPending: "w-3 h-3",
            title: "text-base font-semibold",
            description: "text-sm",
            connector: "h-0.5",
            connectorV: "w-0.5 min-h-[32px]",
            gap: orientation === "vertical" ? "gap-5" : "gap-0",
        },
    }[size];

    // ── step circle styles per variant + status ──────────────────────────────

    function getCircleStyles(status: StepStatus, disabled?: boolean): string {
        const base = `${sizeConfig.circle} rounded-full flex items-center justify-center transition-all duration-300 shrink-0`;

        if (disabled)
            return `${base} bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed`;

        if (variant === "minimal") {
            const map: Record<StepStatus, string> = {
                completed:
                    "bg-transparent border-2 border-[#83c442] text-[#83c442]",
                active: "bg-[#83c442] border-2 border-[#83c442] text-white shadow-[0_0_12px_rgba(131,196,66,0.4)]",
                pending:
                    "bg-transparent border-2 border-gray-300 text-gray-400",
                error: "bg-transparent border-2 border-red-400 text-red-500",
            };
            return `${base} ${map[status]}`;
        }

        if (variant === "outlined") {
            const map: Record<StepStatus, string> = {
                completed: "bg-white border-2 border-[#83c442] text-[#83c442]",
                active: "bg-white border-2 border-[#83c442] text-[#83c442] shadow-[0_0_0_4px_rgba(131,196,66,0.15)]",
                pending: "bg-white border-2 border-gray-300 text-gray-400",
                error: "bg-white border-2 border-red-400 text-red-400",
            };
            return `${base} ${map[status]}`;
        }

        // default
        const map: Record<StepStatus, string> = {
            completed: "bg-[#83c442] border-2 border-[#83c442] text-white",
            active: "bg-[#83c442] border-2 border-[#83c442] text-white shadow-[0_0_14px_rgba(131,196,66,0.45)]",
            pending: "bg-white border-2 border-gray-300 text-gray-400",
            error: "bg-red-500 border-2 border-red-500 text-white",
        };
        return `${base} ${map[status]}`;
    }

    // ── connector styles ─────────────────────────────────────────────────────

    function getConnectorStyles(index: number): string {
        const completed = index < activeStep;
        const base = "transition-all duration-500";

        if (orientation === "vertical") {
            return `${base} ${sizeConfig.connectorV} ${completed ? "bg-[#83c442]" : "bg-gray-200"} mx-auto`;
        }
        return `${base} flex-1 ${sizeConfig.connector} ${completed ? "bg-[#83c442]" : "bg-gray-200"}`;
    }

    // ── title / description colors ────────────────────────────────────────────

    function getLabelStyles(status: StepStatus, disabled?: boolean) {
        if (disabled)
            return { title: "text-gray-400", description: "text-gray-300" };
        const map: Record<StepStatus, { title: string; description: string }> =
            {
                completed: {
                    title: "text-[#3f3f3f]",
                    description: "text-[#3f3f3f]/60",
                },
                active: {
                    title: "text-[#3f3f3f] font-semibold",
                    description: "text-[#3f3f3f]/70",
                },
                pending: {
                    title: "text-gray-400",
                    description: "text-gray-300",
                },
                error: { title: "text-red-600", description: "text-red-400" },
            };
        return map[status];
    }

    // ── dots variant ──────────────────────────────────────────────────────────

    if (variant === "dots") {
        return (
            <div className={`flex flex-col items-center gap-4 ${className}`}>
                {/* dots row */}
                <div className="flex items-center gap-2">
                    {steps.map((step, index) => {
                        const status = getStepStatus(
                            index,
                            activeStep,
                            step.status
                        );
                        const isActive = status === "active";
                        const isCompleted = status === "completed";
                        const isError = status === "error";

                        return (
                            <React.Fragment key={index}>
                                <button
                                    type="button"
                                    disabled={step.disabled || !clickable}
                                    onClick={() =>
                                        clickable &&
                                        !step.disabled &&
                                        onStepClick?.(index)
                                    }
                                    className={`rounded-full transition-all duration-300 ${
                                        isActive
                                            ? `${sizeConfig.dotActive} bg-[#83c442] shadow-[0_0_10px_rgba(131,196,66,0.5)]`
                                            : isCompleted
                                              ? `${sizeConfig.dotPending} bg-[#83c442]`
                                              : isError
                                                ? `${sizeConfig.dotPending} bg-red-500`
                                                : `${sizeConfig.dotPending} bg-gray-300`
                                    } ${clickable && !step.disabled ? "cursor-pointer hover:scale-125" : "cursor-default"}`}
                                    title={step.title}
                                />
                                {index < steps.length - 1 && (
                                    <div
                                        className={`h-0.5 w-8 rounded-full transition-all duration-500 ${
                                            index < activeStep
                                                ? "bg-[#83c442]"
                                                : "bg-gray-200"
                                        }`}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
                {/* active step label */}
                <div className="text-center">
                    <p className={`${sizeConfig.title} text-[#3f3f3f]`}>
                        {steps[activeStep]?.title}
                    </p>
                    {steps[activeStep]?.description && (
                        <p
                            className={`${sizeConfig.description} text-[#3f3f3f]/60 mt-0.5`}
                        >
                            {steps[activeStep].description}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // ── vertical orientation ──────────────────────────────────────────────────

    if (orientation === "vertical") {
        return (
            <div className={`flex flex-col ${className}`}>
                {steps.map((step, index) => {
                    const status = getStepStatus(
                        index,
                        activeStep,
                        step.status
                    );
                    const circleStyles = getCircleStyles(status, step.disabled);
                    const labelStyles = getLabelStyles(status, step.disabled);
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={index} className="flex gap-4">
                            {/* left col: circle + connector */}
                            <div className="flex flex-col items-center">
                                <button
                                    type="button"
                                    disabled={step.disabled || !clickable}
                                    onClick={() =>
                                        clickable &&
                                        !step.disabled &&
                                        onStepClick?.(index)
                                    }
                                    className={`${circleStyles} ${clickable && !step.disabled ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
                                >
                                    {status === "completed" && !step.icon ? (
                                        <CheckIcon />
                                    ) : status === "error" && !step.icon ? (
                                        <ErrorIcon />
                                    ) : step.icon ? (
                                        step.icon
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </button>
                                {!isLast && (
                                    <div
                                        className={`${getConnectorStyles(index)} my-1`}
                                    />
                                )}
                            </div>

                            {/* right col: labels */}
                            <div className={`pb-6 ${isLast ? "" : ""}`}>
                                <p
                                    className={`${sizeConfig.title} ${labelStyles.title} leading-snug`}
                                >
                                    {step.title}
                                </p>
                                {step.description && (
                                    <p
                                        className={`${sizeConfig.description} ${labelStyles.description} mt-0.5`}
                                    >
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    // ── horizontal (default) ──────────────────────────────────────────────────

    return (
        <div className={`flex items-start w-full ${className}`}>
            {steps.map((step, index) => {
                const status = getStepStatus(index, activeStep, step.status);
                const circleStyles = getCircleStyles(status, step.disabled);
                const labelStyles = getLabelStyles(status, step.disabled);
                const isLast = index === steps.length - 1;

                return (
                    <React.Fragment key={index}>
                        {/* step */}
                        <div className="flex flex-col items-center gap-2 shrink-0">
                            <button
                                type="button"
                                disabled={step.disabled || !clickable}
                                onClick={() =>
                                    clickable &&
                                    !step.disabled &&
                                    onStepClick?.(index)
                                }
                                className={`${circleStyles} ${clickable && !step.disabled ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
                            >
                                {status === "completed" && !step.icon ? (
                                    <CheckIcon />
                                ) : status === "error" && !step.icon ? (
                                    <ErrorIcon />
                                ) : step.icon ? (
                                    step.icon
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </button>

                            <div className="text-center max-w-25">
                                <p
                                    className={`${sizeConfig.title} ${labelStyles.title} leading-tight`}
                                >
                                    {step.title}
                                </p>
                                {step.description && (
                                    <p
                                        className={`${sizeConfig.description} ${labelStyles.description} mt-0.5`}
                                    >
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* connector */}
                        {!isLast && (
                            <div
                                className={`${getConnectorStyles(index)} mt-4 mx-2`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

Stepper.displayName = "Stepper";

// ── StepperNavigation ─────────────────────────────────────────────────────────

export const StepperNavigation: React.FC<StepperNavigationProps> = ({
    steps,
    activeStep = 0,
    onNext,
    onBack,
    onFinish,
    children,
    variant = "default",
    size = "md",
    orientation = "horizontal",
    nextLabel = "Siguiente",
    backLabel = "Anterior",
    finishLabel = "Finalizar",
    className = "",
}) => {
    const isFirst = activeStep === 0;
    const isLast = activeStep === steps.length - 1;

    return (
        <div className={`flex flex-col gap-6 ${className}`}>
            <Stepper
                steps={steps}
                activeStep={activeStep}
                variant={variant}
                size={size}
                orientation={orientation}
            />

            {/* step content */}
            {children && (
                <div className="rounded-xl border border-green-200/60 bg-white p-6 shadow-sm min-h-30">
                    {children}
                </div>
            )}

            {/* navigation buttons */}
            <div className="flex items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isFirst}
                    className={`inline-flex items-center gap-2 rounded-lg border-2 border-[#83c442] px-4 py-2 text-sm font-medium text-[#83c442] transition-all duration-200 hover:bg-[#83c442]/10 active:bg-[#83c442]/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none`}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15 18l-6-6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {backLabel}
                </button>

                <span className="text-xs text-gray-400">
                    Paso {activeStep + 1} de {steps.length}
                </span>

                {isLast ? (
                    <button
                        type="button"
                        onClick={onFinish}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#83c442] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#6fb035] active:bg-[#5a9428]"
                    >
                        {finishLabel}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M20 6L9 17l-5-5"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onNext}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#83c442] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#6fb035] active:bg-[#5a9428]"
                    >
                        {nextLabel}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M9 18l6-6-6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

StepperNavigation.displayName = "StepperNavigation";
