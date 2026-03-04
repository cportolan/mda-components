"use client";

import React from "react";
import { PaginationProps } from "./Pagination.index";

// ── helpers ───────────────────────────────────────────────────────────────────

type PageItem = number | "prevDots" | "nextDots";

function buildPageRange(currentPage: number, totalPages: number): PageItem[] {
    const pages: PageItem[] = [];

    // Siempre mostrar la primera página
    pages.push(1);

    // "..." antes del rango si la página actual está lejos del inicio
    if (currentPage > 4) {
        pages.push("prevDots");
    }

    // Páginas alrededor de la actual
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    // "..." después del rango si la página actual está lejos del final
    if (currentPage < totalPages - 3) {
        pages.push("nextDots");
    }

    // Siempre mostrar la última página si hay más de 1
    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return pages;
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const ChevronLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ChevronRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
    size = "md",
    disabled = false,
    showPageInfo = false,
    className = "",
}) => {
    // Guardar currentPage en 1 si totalPages es 1
    const safePage = totalPages === 1 ? 1 : currentPage;

    const pages = buildPageRange(safePage, totalPages);

    const sizeClasses: Record<NonNullable<PaginationProps["size"]>, string> = {
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
    };

    const btnBase =
        "inline-flex items-center justify-center rounded-lg border border-[#dfe3e8] bg-transparent font-semibold transition-all duration-200 select-none";

    const btnSize = sizeClasses[size];

    function getButtonClasses(isActive: boolean, isDisabled: boolean): string {
        if (isDisabled) {
            return `${btnBase} ${btnSize} bg-[#f0f2f5] text-[#a1a6ad] cursor-not-allowed opacity-70`;
        }
        if (isActive) {
            return `${btnBase} ${btnSize} border-[#83c442] text-[#83c442] hover:bg-[#83c442]/10 cursor-pointer`;
        }
        return `${btnBase} ${btnSize} text-[#3f3f3f] hover:bg-[#f0f2f5] cursor-pointer`;
    }

    const isFirst = safePage === 1;
    const isLast = safePage === totalPages;

    return (
        <div className={`flex flex-col items-end gap-2 ${className}`}>
            {showPageInfo && (
                <p className="text-xs text-[#3f3f3f]/60">
                    Página{" "}
                    <span className="font-semibold text-[#3f3f3f]">
                        {safePage}
                    </span>{" "}
                    de{" "}
                    <span className="font-semibold text-[#3f3f3f]">
                        {totalPages}
                    </span>
                </p>
            )}

            <div className="flex items-center gap-2">
                {/* Botón anterior */}
                <button
                    type="button"
                    aria-label="Página anterior"
                    disabled={isFirst || disabled}
                    onClick={() => !disabled && onPageChange(safePage - 1)}
                    className={getButtonClasses(false, isFirst || disabled)}
                >
                    <ChevronLeft />
                </button>

                {/* Páginas */}
                {pages.map((page, index) => {
                    if (page === "prevDots" || page === "nextDots") {
                        return (
                            <button
                                key={page}
                                type="button"
                                disabled
                                aria-hidden="true"
                                className={`${btnBase} ${btnSize} bg-transparent text-[#a1a6ad] cursor-default`}
                            >
                                …
                            </button>
                        );
                    }

                    const isActive = page === safePage;

                    return (
                        <button
                            key={`page-${page}`}
                            type="button"
                            aria-label={`Ir a página ${page}`}
                            aria-current={isActive ? "page" : undefined}
                            disabled={disabled}
                            onClick={() => !disabled && onPageChange(page)}
                            className={getButtonClasses(
                                isActive,
                                disabled && !isActive
                            )}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Botón siguiente */}
                <button
                    type="button"
                    aria-label="Página siguiente"
                    disabled={isLast || disabled}
                    onClick={() => !disabled && onPageChange(safePage + 1)}
                    className={getButtonClasses(false, isLast || disabled)}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

Pagination.displayName = "Pagination";
