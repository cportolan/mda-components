"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import type {
    CalendarProps,
    CalendarView,
    CalendarEvent,
    CalendarSize,
} from "./Calendar.types";

// ── Helpers ───────────────────────────────────────────────────────────────────

const TODAY_ISO = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();

function toISO(y: number, m: number, d: number): string {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function parseISO(iso: string): { y: number; m: number; d: number } | null {
    if (!iso) return null;
    const [y, m, d] = iso.split("-").map(Number);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    return { y, m: m - 1, d };
}

function getDaysInMonth(y: number, m: number): number {
    return new Date(y, m + 1, 0).getDate();
}

/** ISO week number (ISO 8601) */
function getWeekNumber(y: number, m: number, d: number): number {
    const date = new Date(y, m, d);
    const jan4 = new Date(y, 0, 4);
    const startOfWeek1 = new Date(jan4);
    startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
    const diff = date.getTime() - startOfWeek1.getTime();
    const week = Math.floor(diff / 86400000 / 7) + 1;
    if (week < 1) return getWeekNumber(y - 1, 11, 31);
    if (week > 52) {
        const next = new Date(y + 1, 0, 4);
        const nextStart = new Date(next);
        nextStart.setDate(next.getDate() - ((next.getDay() + 6) % 7));
        if (date >= nextStart) return 1;
    }
    return week;
}

function compareISO(a: string, b: string): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

// ── Size tokens ───────────────────────────────────────────────────────────────

const SIZE: Record<
    CalendarSize,
    {
        root: string;
        header: string;
        navBtn: string;
        dayHeader: string;
        cell: string;
        cellText: string;
        dot: string;
        footerBtn: string;
    }
> = {
    sm: {
        root: "w-[280px]",
        header: "text-sm",
        navBtn: "w-7 h-7 text-base",
        dayHeader: "text-[11px] h-7",
        cell: "h-7 w-7 text-[12px]",
        cellText: "text-[11px]",
        dot: "w-1 h-1",
        footerBtn: "text-xs px-3 py-1",
    },
    md: {
        root: "w-[320px]",
        header: "text-sm",
        navBtn: "w-8 h-8 text-base",
        dayHeader: "text-xs h-8",
        cell: "h-8 w-8 text-[13px]",
        cellText: "text-xs",
        dot: "w-1.5 h-1.5",
        footerBtn: "text-sm px-4 py-1.5",
    },
    lg: {
        root: "w-[380px]",
        header: "text-base",
        navBtn: "w-9 h-9 text-lg",
        dayHeader: "text-sm h-9",
        cell: "h-9 w-9 text-sm",
        cellText: "text-xs",
        dot: "w-2 h-2",
        footerBtn: "text-sm px-4 py-2",
    },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Calendar(props: CalendarProps) {
    const {
        size = "md",
        minDate,
        maxDate,
        disabledDates = [],
        disabledDate,
        events = [],
        showWeekNumbers = false,
        locale = "es-AR",
        firstDayOfWeek = 1,
        showTodayButton = false,
        todayButtonLabel = "Hoy",
        showClearButton = false,
        clearButtonLabel = "Limpiar",
        className = "",
        disabled = false,
        showViewNavigation = true,
    } = props;

    const sz = SIZE[size];

    // ── Controlled / uncontrolled value normalization ─────────────────────────

    const getInitialSingle = (): string | null => {
        if (props.mode === "single") {
            return props.value !== undefined
                ? (props.value ?? null)
                : (props.defaultValue ?? null);
        }
        return null;
    };

    const getInitialRange = (): [string | null, string | null] => {
        if (props.mode === "range") {
            return props.value !== undefined
                ? props.value
                : (props.defaultValue ?? [null, null]);
        }
        return [null, null];
    };

    const getInitialMultiple = (): string[] => {
        if (props.mode === "multiple") {
            return props.value !== undefined
                ? (props.value ?? [])
                : (props.defaultValue ?? []);
        }
        return [];
    };

    // Internal state (used only when uncontrolled)
    const [internalSingle, setInternalSingle] = useState<string | null>(
        getInitialSingle
    );
    const [internalRange, setInternalRange] =
        useState<[string | null, string | null]>(getInitialRange);
    const [internalMultiple, setInternalMultiple] =
        useState<string[]>(getInitialMultiple);

    // Derive the "effective" values (controlled overrides uncontrolled)
    const singleValue =
        props.mode === "single"
            ? props.value !== undefined
                ? (props.value ?? null)
                : internalSingle
            : null;

    const rangeValue: [string | null, string | null] =
        props.mode === "range"
            ? props.value !== undefined
                ? props.value
                : internalRange
            : [null, null];

    const multipleValue: string[] =
        props.mode === "multiple"
            ? props.value !== undefined
                ? (props.value ?? [])
                : internalMultiple
            : [];

    // ── Calendar navigation state ─────────────────────────────────────────────

    const seedDate = (() => {
        const anchor =
            props.mode === "single"
                ? singleValue
                : props.mode === "range"
                  ? rangeValue[0]
                  : multipleValue[0];
        if (anchor) {
            const p = parseISO(anchor);
            if (p) return { y: p.y, m: p.m };
        }
        const now = new Date();
        return { y: now.getFullYear(), m: now.getMonth() };
    })();

    const [viewYear, setViewYear] = useState(seedDate.y);
    const [viewMonth, setViewMonth] = useState(seedDate.m);
    const [view, setView] = useState<CalendarView>("month");

    // For range: track if we're picking first or second end
    const [rangePicking, setRangePicking] = useState<0 | 1>(
        rangeValue[0] === null ? 0 : rangeValue[1] === null ? 1 : 0
    );

    // Sync controlled value → seed when value changes from outside
    useEffect(() => {
        if (
            props.mode === "single" &&
            props.value !== undefined &&
            props.value
        ) {
            const p = parseISO(props.value);
            if (p) {
                setViewYear(p.y);
                setViewMonth(p.m);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Disable check ─────────────────────────────────────────────────────────

    const isDateDisabled = useCallback(
        (iso: string): boolean => {
            if (disabled) return true;
            if (minDate && compareISO(iso, minDate) < 0) return true;
            if (maxDate && compareISO(iso, maxDate) > 0) return true;
            if (disabledDates.includes(iso)) return true;
            if (disabledDate && disabledDate(iso)) return true;
            return false;
        },
        [disabled, minDate, maxDate, disabledDates, disabledDate]
    );

    // ── Event lookup map ─────────────────────────────────────────────────────

    const eventMap = useMemo(() => {
        const map: Record<string, CalendarEvent[]> = {};
        for (const ev of events) {
            if (!map[ev.date]) map[ev.date] = [];
            map[ev.date].push(ev);
        }
        return map;
    }, [events]);

    // ── Date click handler ────────────────────────────────────────────────────

    const handleDateClick = useCallback(
        (iso: string) => {
            if (isDateDisabled(iso)) return;

            if (props.mode === "single") {
                const next = singleValue === iso ? null : iso;
                setInternalSingle(next);
                props.onChange?.(next);
            } else if (props.mode === "multiple") {
                const cur = multipleValue;
                const next = cur.includes(iso)
                    ? cur.filter((d) => d !== iso)
                    : [...cur, iso].sort();
                setInternalMultiple(next);
                (props as { onChange?: (dates: string[]) => void }).onChange?.(
                    next
                );
            } else if (props.mode === "range") {
                let next: [string | null, string | null];
                if (rangePicking === 0) {
                    next = [iso, null];
                    setRangePicking(1);
                } else {
                    const start = rangeValue[0];
                    if (start && compareISO(iso, start) < 0) {
                        next = [iso, start];
                    } else {
                        next = [start, iso];
                    }
                    setRangePicking(0);
                }
                setInternalRange(next);
                (
                    props as {
                        onChange?: (
                            range: [string | null, string | null]
                        ) => void;
                    }
                ).onChange?.(next);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            props.mode,
            singleValue,
            multipleValue,
            rangeValue,
            rangePicking,
            isDateDisabled,
        ]
    );

    // ── Navigation ────────────────────────────────────────────────────────────

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((y) => y - 1);
        } else setViewMonth((m) => m - 1);
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((y) => y + 1);
        } else setViewMonth((m) => m + 1);
    };

    const prevYear = () => setViewYear((y) => y - 1);
    const nextYear = () => setViewYear((y) => y + 1);

    const prevDecade = () => setViewYear((y) => y - 10);
    const nextDecade = () => setViewYear((y) => y + 10);

    // ── Clear / Today ─────────────────────────────────────────────────────────

    const handleClear = () => {
        if (props.mode === "single") {
            setInternalSingle(null);
            props.onChange?.(null);
        } else if (props.mode === "multiple") {
            setInternalMultiple([]);
            (props as { onChange?: (d: string[]) => void }).onChange?.([]);
        } else if (props.mode === "range") {
            setInternalRange([null, null]);
            setRangePicking(0);
            (
                props as {
                    onChange?: (r: [string | null, string | null]) => void;
                }
            ).onChange?.([null, null]);
        }
    };

    const handleToday = () => {
        const now = new Date();
        setViewYear(now.getFullYear());
        setViewMonth(now.getMonth());
        setView("month");
    };

    // ── Localized names ───────────────────────────────────────────────────────

    const monthName = useMemo(() => {
        try {
            return new Intl.DateTimeFormat(locale, { month: "long" }).format(
                new Date(viewYear, viewMonth, 1)
            );
        } catch {
            return String(viewMonth);
        }
    }, [locale, viewYear, viewMonth]);

    const dayHeaders = useMemo(() => {
        const base = new Date(2024, 0, firstDayOfWeek === 1 ? 1 : 7); // Mon 1 Jan 2024 or Sun 7 Jan 2024
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(base);
            d.setDate(base.getDate() + i);
            try {
                return new Intl.DateTimeFormat(locale, { weekday: "short" })
                    .format(d)
                    .slice(0, 2);
            } catch {
                return ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"][i];
            }
        });
    }, [locale, firstDayOfWeek]);

    // ── Build month grid ──────────────────────────────────────────────────────

    type DayCell = {
        iso: string;
        day: number;
        inMonth: boolean;
        isToday: boolean;
        disabled: boolean;
        selected: boolean;
        inRange: boolean;
        rangeStart: boolean;
        rangeEnd: boolean;
        events: CalendarEvent[];
        weekNum?: number;
    };

    const monthGrid = useMemo((): DayCell[][] => {
        const firstDay = new Date(viewYear, viewMonth, 1).getDay();
        // offset: how many leading blank cells before day 1
        const offset = (firstDay - firstDayOfWeek + 7) % 7;
        const days = getDaysInMonth(viewYear, viewMonth);

        // total cells: fill up to complete weeks
        const total = Math.ceil((offset + days) / 7) * 7;

        const cells: DayCell[] = [];

        for (let i = 0; i < total; i++) {
            const dayNum = i - offset + 1;
            let y = viewYear,
                mo = viewMonth,
                d = dayNum;
            let inMonth = true;

            if (dayNum < 1) {
                inMonth = false;
                const prev = new Date(viewYear, viewMonth, 0);
                y = prev.getFullYear();
                mo = prev.getMonth();
                d = prev.getDate() + dayNum;
            } else if (dayNum > days) {
                inMonth = false;
                const next = new Date(viewYear, viewMonth + 1, 1);
                y = next.getFullYear();
                mo = next.getMonth();
                d = dayNum - days;
            }

            const iso = toISO(y, mo, d);
            const isToday = iso === TODAY_ISO;
            const dis = isDateDisabled(iso);

            // selection state
            let selected = false;
            let inRange = false;
            let rangeStart = false;
            let rangeEnd = false;

            if (props.mode === "single") {
                selected = iso === singleValue;
            } else if (props.mode === "multiple") {
                selected = multipleValue.includes(iso);
            } else if (props.mode === "range") {
                const [s, e] = rangeValue;
                if (s && iso === s) {
                    selected = true;
                    rangeStart = true;
                }
                if (e && iso === e) {
                    selected = true;
                    rangeEnd = true;
                }
                if (
                    s &&
                    e &&
                    compareISO(iso, s) > 0 &&
                    compareISO(iso, e) < 0
                ) {
                    inRange = true;
                }
            }

            const weekNum = i % 7 === 0 ? getWeekNumber(y, mo, d) : undefined;

            cells.push({
                iso,
                day: d,
                inMonth,
                isToday,
                disabled: dis,
                selected,
                inRange,
                rangeStart,
                rangeEnd,
                events: eventMap[iso] ?? [],
                weekNum,
            });
        }

        // Group into rows
        const rows: DayCell[][] = [];
        for (let r = 0; r < cells.length / 7; r++) {
            rows.push(cells.slice(r * 7, r * 7 + 7));
        }
        return rows;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        viewYear,
        viewMonth,
        firstDayOfWeek,
        singleValue,
        multipleValue,
        rangeValue,
        eventMap,
        isDateDisabled,
        props.mode,
    ]);

    // ── Cell style resolver ───────────────────────────────────────────────────

    const cellClass = (cell: DayCell): string => {
        const base = `relative flex flex-col items-center justify-center rounded-lg cursor-pointer select-none transition-all duration-150 ${sz.cell}`;
        if (cell.disabled) return `${base} opacity-30 cursor-not-allowed`;
        if (cell.selected)
            return `${base} bg-[#83c442] text-white font-semibold shadow-sm`;
        if (cell.inRange)
            return `${base} bg-[#83c442]/15 text-[#3f3f3f] rounded-none`;
        if (cell.isToday)
            return `${base} border border-[#83c442] text-[#83c442] font-semibold hover:bg-[#83c442]/10`;
        if (!cell.inMonth) return `${base} text-[#bbb] hover:bg-[#f6f6f6]`;
        return `${base} text-[#3f3f3f] hover:bg-[#f0f7e8]`;
    };

    // range start/end rounding
    const cellWrapClass = (cell: DayCell): string => {
        if (!cell.inRange && !cell.rangeStart && !cell.rangeEnd) return "";
        if (cell.rangeStart) return "rounded-l-lg";
        if (cell.rangeEnd) return "rounded-r-lg";
        return "";
    };

    // ── Month view ────────────────────────────────────────────────────────────

    const renderMonthView = () => (
        <div>
            {/* Day headers */}
            <div
                className={`grid ${showWeekNumbers ? "grid-cols-8" : "grid-cols-7"} mb-1`}
            >
                {showWeekNumbers && (
                    <div
                        className={`flex items-center justify-center font-medium text-[#bbb] ${sz.dayHeader}`}
                    >
                        #
                    </div>
                )}
                {dayHeaders.map((h) => (
                    <div
                        key={h}
                        className={`flex items-center justify-center font-semibold text-[#83c442] uppercase tracking-wide ${sz.dayHeader}`}
                    >
                        {h}
                    </div>
                ))}
            </div>

            {/* Day grid */}
            <div className="space-y-0.5">
                {monthGrid.map((row, ri) => (
                    <div
                        key={ri}
                        className={`grid ${showWeekNumbers ? "grid-cols-8" : "grid-cols-7"}`}
                    >
                        {showWeekNumbers && (
                            <div
                                className={`flex items-center justify-center text-[#bbb] ${sz.cellText} ${sz.cell}`}
                            >
                                {row[0]?.weekNum}
                            </div>
                        )}
                        {row.map((cell) => (
                            <div
                                key={cell.iso}
                                className={`flex items-center justify-center ${cell.inRange || cell.rangeStart || cell.rangeEnd ? "bg-[#83c442]/10" : ""} ${cellWrapClass(cell)}`}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDateClick(cell.iso)}
                                    disabled={cell.disabled}
                                    title={
                                        cell.events.length > 0
                                            ? cell.events
                                                  .map(
                                                      (e) => e.title ?? e.label
                                                  )
                                                  .filter(Boolean)
                                                  .join(", ")
                                            : undefined
                                    }
                                    className={cellClass(cell)}
                                    aria-label={cell.iso}
                                    aria-selected={cell.selected}
                                    aria-pressed={cell.selected}
                                >
                                    <span>{cell.day}</span>
                                    {/* Event dots */}
                                    {cell.events.length > 0 && (
                                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                                            {cell.events
                                                .slice(0, 3)
                                                .map((ev, ei) => (
                                                    <span
                                                        key={ei}
                                                        className={`rounded-full ${sz.dot}`}
                                                        style={{
                                                            backgroundColor:
                                                                cell.selected
                                                                    ? "rgba(255,255,255,0.8)"
                                                                    : (ev.color ??
                                                                      "#83c442"),
                                                        }}
                                                    />
                                                ))}
                                        </span>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    // ── Year view (month picker) ───────────────────────────────────────────────

    const renderYearView = () => {
        const months = Array.from({ length: 12 }, (_, i) => {
            try {
                return new Intl.DateTimeFormat(locale, {
                    month: "short",
                }).format(new Date(viewYear, i, 1));
            } catch {
                return String(i + 1);
            }
        });

        const now = new Date();
        return (
            <div className="grid grid-cols-3 gap-2 py-2">
                {months.map((name, mi) => {
                    const isCurrentMonth =
                        mi === now.getMonth() && viewYear === now.getFullYear();
                    const isSelectedMonth =
                        props.mode === "single" && singleValue
                            ? (() => {
                                  const p = parseISO(singleValue);
                                  return p
                                      ? p.m === mi && p.y === viewYear
                                      : false;
                              })()
                            : false;
                    return (
                        <button
                            key={mi}
                            type="button"
                            onClick={() => {
                                setViewMonth(mi);
                                setView("month");
                            }}
                            className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                                isSelectedMonth
                                    ? "bg-[#83c442] text-white shadow-sm"
                                    : isCurrentMonth
                                      ? "border border-[#83c442] text-[#83c442]"
                                      : "text-[#3f3f3f] hover:bg-[#f0f7e8]"
                            }`}
                        >
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </button>
                    );
                })}
            </div>
        );
    };

    // ── Decade view (year picker) ─────────────────────────────────────────────

    const renderDecadeView = () => {
        const start = Math.floor(viewYear / 10) * 10;
        const years = Array.from({ length: 12 }, (_, i) => start - 1 + i);
        const now = new Date();

        return (
            <div className="grid grid-cols-3 gap-2 py-2">
                {years.map((yr) => {
                    const inDecade = yr >= start && yr < start + 10;
                    const isCurrent = yr === now.getFullYear();
                    const isSelected =
                        props.mode === "single" && singleValue
                            ? parseISO(singleValue)?.y === yr
                            : false;
                    return (
                        <button
                            key={yr}
                            type="button"
                            onClick={() => {
                                setViewYear(yr);
                                setView("year");
                            }}
                            className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                                !inDecade
                                    ? "text-[#bbb] hover:bg-[#f6f6f6]"
                                    : isSelected
                                      ? "bg-[#83c442] text-white shadow-sm"
                                      : isCurrent
                                        ? "border border-[#83c442] text-[#83c442]"
                                        : "text-[#3f3f3f] hover:bg-[#f0f7e8]"
                            }`}
                        >
                            {yr}
                        </button>
                    );
                })}
            </div>
        );
    };

    // ── Header nav helpers ────────────────────────────────────────────────────

    const navBtnClass = `inline-flex items-center justify-center rounded-lg text-[#3f3f3f] hover:bg-[#f0f7e8] hover:text-[#83c442] transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${sz.navBtn}`;

    const headerLabel = (() => {
        if (view === "month") {
            return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${viewYear}`;
        }
        if (view === "year") return String(viewYear);
        const start = Math.floor(viewYear / 10) * 10;
        return `${start} – ${start + 9}`;
    })();

    const onPrev =
        view === "month" ? prevMonth : view === "year" ? prevYear : prevDecade;
    const onNext =
        view === "month" ? nextMonth : view === "year" ? nextYear : nextDecade;

    const onHeaderClick = showViewNavigation
        ? () => {
              if (view === "month") setView("year");
              else if (view === "year") setView("decade");
          }
        : undefined;

    // ── Render ────────────────────────────────────────────────────────────────

    const showFooter = showTodayButton || showClearButton;

    return (
        <>
            <style>{`
                .cal-range-inrange {
                    border-radius: 0 !important;
                }
            `}</style>
            <div
                className={`inline-block rounded-2xl border border-[#e2e2e2] bg-white shadow-md select-none ${sz.root} ${disabled ? "opacity-60 pointer-events-none" : ""} ${className}`}
                role="application"
                aria-label="Calendario"
            >
                {/* ── Header ──────────────────────────────────────────────── */}
                <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#f0f0f0]">
                    <button
                        type="button"
                        onClick={onPrev}
                        className={navBtnClass}
                        aria-label="Mes anterior"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-4 h-4"
                        >
                            <path
                                d="M15 18l-6-6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={onHeaderClick}
                        className={`font-semibold text-[#3f3f3f] ${sz.header} ${showViewNavigation && view !== "decade" ? "hover:text-[#83c442] transition-colors cursor-pointer" : "cursor-default"}`}
                    >
                        {headerLabel}
                    </button>

                    <button
                        type="button"
                        onClick={onNext}
                        className={navBtnClass}
                        aria-label="Mes siguiente"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-4 h-4"
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
                </div>

                {/* ── Body ────────────────────────────────────────────────── */}
                <div className="px-3 py-3">
                    {view === "month" && renderMonthView()}
                    {view === "year" && renderYearView()}
                    {view === "decade" && renderDecadeView()}
                </div>

                {/* ── Footer ──────────────────────────────────────────────── */}
                {showFooter && (
                    <div className="flex items-center justify-between border-t border-[#f0f0f0] px-4 py-2.5 gap-2">
                        {showClearButton && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className={`rounded-lg border border-[#e2e2e2] text-[#3f3f3f] hover:bg-[#f6f6f6] transition-colors font-medium ${sz.footerBtn}`}
                            >
                                {clearButtonLabel}
                            </button>
                        )}
                        {showTodayButton && (
                            <button
                                type="button"
                                onClick={handleToday}
                                className={`rounded-lg bg-[#83c442] text-white hover:bg-[#6fb035] transition-colors font-medium ml-auto ${sz.footerBtn}`}
                            >
                                {todayButtonLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
