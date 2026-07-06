"use client";
import "./Pagination.css";
import React from "react";

function buildPageRange(currentPage, totalPages) {
    const pages = [];
    pages.push(1);
    if (currentPage > 4) {
        pages.push("prevDots");
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    if (currentPage < totalPages - 3) {
        pages.push("nextDots");
    }
    if (totalPages > 1) {
        pages.push(totalPages);
    }
    return pages;
}

const ChevronLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Pagination = ({ totalPages, currentPage, onPageChange, size = "md", disabled = false, showPageInfo = false, pageSize, onPageSizeChange, pageSizeOptions = [10, 25, 50, 100], className = "", }) => {
    const safePage = totalPages === 1 ? 1 : currentPage;
    const pages = buildPageRange(safePage, totalPages);
    const isFirst = safePage === 1;
    const isLast = safePage === totalPages;

    const getButtonClasses = (isActive, isDisabled, isDots = false) => {
        return [
            "mda-pagination__button",
            `mda-pagination__button--${size}`,
            isDots ? "mda-pagination__button--dots" : "",
            isActive ? "mda-pagination__button--active" : "",
            isDisabled ? "mda-pagination__button--disabled" : "",
            !isActive && !isDisabled && !isDots ? "mda-pagination__button--default" : "",
        ].filter(Boolean).join(" ");
    };

    return (
        <div className={["mda-pagination", className].filter(Boolean).join(" ")}>
            {pageSize !== undefined && (
                <div className="mda-pagination__page-size">
                    <span>Mostrando</span>
                    <select
                        value={pageSize}
                        disabled={disabled}
                        onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                        className="mda-pagination__page-size-select"
                    >
                        {pageSizeOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <span>resultados</span>
                </div>
            )}

            <div className="mda-pagination__controls">
                {showPageInfo && (
                    <p className="mda-pagination__info">
                        Página <span className="mda-pagination__info-value">{safePage}</span> de <span className="mda-pagination__info-value">{totalPages}</span>
                    </p>
                )}

                <div className="mda-pagination__buttons">
                    <button
                        type="button"
                        aria-label="Página anterior"
                        disabled={isFirst || disabled}
                        onClick={() => !disabled && onPageChange(safePage - 1)}
                        className={getButtonClasses(false, isFirst || disabled)}
                    >
                        <ChevronLeft />
                    </button>

                    {pages.map((page) => {
                        if (page === "prevDots" || page === "nextDots") {
                            return (
                                <button key={page} type="button" disabled aria-hidden="true" className={getButtonClasses(false, false, true)}>
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
                                className={getButtonClasses(isActive, disabled && !isActive)}
                            >
                                {page}
                            </button>
                        );
                    })}

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
        </div>
    );
};

Pagination.displayName = "Pagination";
