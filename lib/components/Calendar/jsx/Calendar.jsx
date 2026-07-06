"use client";
import "./Calendar.css";
import React, { useState, useCallback, useMemo, useEffect } from "react";

const TODAY_ISO = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();

function toISO(y, m, d) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function parseISO(iso) {
    if (!iso) return null;
    const [y, m, d] = iso.split("-").map(Number);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    return { y, m: m - 1, d };
}

function getDaysInMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
}

function getWeekNumber(y, m, d) {
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

function compareISO(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

const SIZE = {
    sm: {
        root: "mda-calendar--sm",
        header: "mda-calendar__header-label--sm",
        navBtn: "mda-calendar__nav-button--sm",
        dayHeader: "mda-calendar__day-header--sm",
        cell: "mda-calendar__cell-button--sm",
        cellText: "mda-calendar__cell-text--sm",
        dot: "mda-calendar__event-dot--sm",
        footerBtn: "mda-calendar__footer-button--sm",
    },
    md: {
        root: "mda-calendar--md",
        header: "mda-calendar__header-label--md",
        navBtn: "mda-calendar__nav-button--md",
        dayHeader: "mda-calendar__day-header--md",
        cell: "mda-calendar__cell-button--md",
        cellText: "mda-calendar__cell-text--md",
        dot: "mda-calendar__event-dot--md",
        footerBtn: "mda-calendar__footer-button--md",
    },
    lg: {
        root: "mda-calendar--lg",
        header: "mda-calendar__header-label--lg",
        navBtn: "mda-calendar__nav-button--lg",
        dayHeader: "mda-calendar__day-header--lg",
        cell: "mda-calendar__cell-button--lg",
        cellText: "mda-calendar__cell-text--lg",
        dot: "mda-calendar__event-dot--lg",
        footerBtn: "mda-calendar__footer-button--lg",
    },
};

export function Calendar(props) {
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

    const getInitialSingle = () => {
        if (props.mode === "single") {
            return props.value !== undefined ? (props.value ?? null) : (props.defaultValue ?? null);
        }
        return null;
    };

    const getInitialRange = () => {
        if (props.mode === "range") {
            return props.value !== undefined ? props.value : (props.defaultValue ?? [null, null]);
        }
        return [null, null];
    };

    const getInitialMultiple = () => {
        if (props.mode === "multiple") {
            return props.value !== undefined ? (props.value ?? []) : (props.defaultValue ?? []);
        }
        return [];
    };

    const [internalSingle, setInternalSingle] = useState(getInitialSingle);
    const [internalRange, setInternalRange] = useState(getInitialRange);
    const [internalMultiple, setInternalMultiple] = useState(getInitialMultiple);

    const singleValue = props.mode === "single"
        ? props.value !== undefined ? (props.value ?? null) : internalSingle
        : null;

    const rangeValue = props.mode === "range"
        ? props.value !== undefined ? props.value : internalRange
        : [null, null];

    const multipleValue = props.mode === "multiple"
        ? props.value !== undefined ? (props.value ?? []) : internalMultiple
        : [];

    const seedDate = (() => {
        const anchor = props.mode === "single"
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
    const [view, setView] = useState("month");
    const [rangePicking, setRangePicking] = useState(rangeValue[0] === null ? 0 : rangeValue[1] === null ? 1 : 0);

    useEffect(() => {
        if (props.mode === "single" && props.value !== undefined && props.value) {
            const p = parseISO(props.value);
            if (p) {
                setViewYear(p.y);
                setViewMonth(p.m);
            }
        }
    }, []);

    const isDateDisabled = useCallback((iso) => {
        if (disabled) return true;
        if (minDate && compareISO(iso, minDate) < 0) return true;
        if (maxDate && compareISO(iso, maxDate) > 0) return true;
        if (disabledDates.includes(iso)) return true;
        if (disabledDate && disabledDate(iso)) return true;
        return false;
    }, [disabled, minDate, maxDate, disabledDates, disabledDate]);

    const eventMap = useMemo(() => {
        const map = {};
        for (const ev of events) {
            if (!map[ev.date]) map[ev.date] = [];
            map[ev.date].push(ev);
        }
        return map;
    }, [events]);

    const handleDateClick = useCallback((iso) => {
        if (isDateDisabled(iso)) return;

        if (props.mode === "single") {
            const next = singleValue === iso ? null : iso;
            setInternalSingle(next);
            props.onChange?.(next);
        }
        else if (props.mode === "multiple") {
            const cur = multipleValue;
            const next = cur.includes(iso) ? cur.filter((d) => d !== iso) : [...cur, iso].sort();
            setInternalMultiple(next);
            props.onChange?.(next);
        }
        else if (props.mode === "range") {
            let next;
            if (rangePicking === 0) {
                next = [iso, null];
                setRangePicking(1);
            }
            else {
                const start = rangeValue[0];
                next = start && compareISO(iso, start) < 0 ? [iso, start] : [start, iso];
                setRangePicking(0);
            }
            setInternalRange(next);
            props.onChange?.(next);
        }
    }, [props, singleValue, multipleValue, rangeValue, rangePicking, isDateDisabled]);

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((y) => y - 1);
        }
        else setViewMonth((m) => m - 1);
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((y) => y + 1);
        }
        else setViewMonth((m) => m + 1);
    };

    const prevYear = () => setViewYear((y) => y - 1);
    const nextYear = () => setViewYear((y) => y + 1);
    const prevDecade = () => setViewYear((y) => y - 10);
    const nextDecade = () => setViewYear((y) => y + 10);

    const handleClear = () => {
        if (props.mode === "single") {
            setInternalSingle(null);
            props.onChange?.(null);
        }
        else if (props.mode === "multiple") {
            setInternalMultiple([]);
            props.onChange?.([]);
        }
        else if (props.mode === "range") {
            setInternalRange([null, null]);
            setRangePicking(0);
            props.onChange?.([null, null]);
        }
    };

    const handleToday = () => {
        const now = new Date();
        setViewYear(now.getFullYear());
        setViewMonth(now.getMonth());
        setView("month");
    };

    const monthName = useMemo(() => {
        try {
            return new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(viewYear, viewMonth, 1));
        }
        catch {
            return String(viewMonth);
        }
    }, [locale, viewYear, viewMonth]);

    const dayHeaders = useMemo(() => {
        const base = new Date(2024, 0, firstDayOfWeek === 1 ? 1 : 7);
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(base);
            d.setDate(base.getDate() + i);
            try {
                return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d).slice(0, 2);
            }
            catch {
                return ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"][i];
            }
        });
    }, [locale, firstDayOfWeek]);

    const monthGrid = useMemo(() => {
        const firstDay = new Date(viewYear, viewMonth, 1).getDay();
        const offset = (firstDay - firstDayOfWeek + 7) % 7;
        const days = getDaysInMonth(viewYear, viewMonth);
        const total = Math.ceil((offset + days) / 7) * 7;
        const cells = [];

        for (let i = 0; i < total; i++) {
            const dayNum = i - offset + 1;
            let y = viewYear;
            let mo = viewMonth;
            let d = dayNum;
            let inMonth = true;

            if (dayNum < 1) {
                inMonth = false;
                const prev = new Date(viewYear, viewMonth, 0);
                y = prev.getFullYear();
                mo = prev.getMonth();
                d = prev.getDate() + dayNum;
            }
            else if (dayNum > days) {
                inMonth = false;
                const next = new Date(viewYear, viewMonth + 1, 1);
                y = next.getFullYear();
                mo = next.getMonth();
                d = dayNum - days;
            }

            const iso = toISO(y, mo, d);
            const isToday = iso === TODAY_ISO;
            const isDisabledCell = isDateDisabled(iso);

            let selected = false;
            let inRange = false;
            let rangeStart = false;
            let rangeEnd = false;

            if (props.mode === "single") {
                selected = iso === singleValue;
            }
            else if (props.mode === "multiple") {
                selected = multipleValue.includes(iso);
            }
            else if (props.mode === "range") {
                const [s, e] = rangeValue;
                if (s && iso === s) {
                    selected = true;
                    rangeStart = true;
                }
                if (e && iso === e) {
                    selected = true;
                    rangeEnd = true;
                }
                if (s && e && compareISO(iso, s) > 0 && compareISO(iso, e) < 0) {
                    inRange = true;
                }
            }

            const weekNum = i % 7 === 0 ? getWeekNumber(y, mo, d) : undefined;

            cells.push({
                iso,
                day: d,
                inMonth,
                isToday,
                disabled: isDisabledCell,
                selected,
                inRange,
                rangeStart,
                rangeEnd,
                events: eventMap[iso] ?? [],
                weekNum,
            });
        }

        const rows = [];
        for (let r = 0; r < cells.length / 7; r++) {
            rows.push(cells.slice(r * 7, r * 7 + 7));
        }
        return rows;
    }, [viewYear, viewMonth, firstDayOfWeek, singleValue, multipleValue, rangeValue, eventMap, isDateDisabled, props.mode]);

    const cellClass = (cell) => {
        const classes = ["mda-calendar__cell-button", sz.cell];
        if (cell.disabled) classes.push("mda-calendar__cell-button--disabled");
        else if (cell.selected) classes.push("mda-calendar__cell-button--selected");
        else if (cell.inRange) classes.push("mda-calendar__cell-button--in-range");
        else if (cell.isToday) classes.push("mda-calendar__cell-button--today");
        else if (!cell.inMonth) classes.push("mda-calendar__cell-button--outside");
        else classes.push("mda-calendar__cell-button--default");
        return classes.join(" ");
    };

    const cellWrapClass = (cell) => {
        if (!cell.inRange && !cell.rangeStart && !cell.rangeEnd) return "";
        if (cell.rangeStart) return "mda-calendar__cell-wrap--range-start";
        if (cell.rangeEnd) return "mda-calendar__cell-wrap--range-end";
        return "";
    };

    const renderMonthView = () => (
        <div>
            <div className={["mda-calendar__day-headers", showWeekNumbers ? "mda-calendar__day-headers--with-week" : "mda-calendar__day-headers--regular"].join(" ")}>
                {showWeekNumbers && (
                    <div className={["mda-calendar__week-header", sz.dayHeader].join(" ")}>#</div>
                )}

                {dayHeaders.map((h) => (
                    <div key={h} className={["mda-calendar__day-header", sz.dayHeader].join(" ")}>{h}</div>
                ))}
            </div>

            <div className="mda-calendar__month-grid">
                {monthGrid.map((row, ri) => (
                    <div key={ri} className={["mda-calendar__week-row", showWeekNumbers ? "mda-calendar__week-row--with-week" : "mda-calendar__week-row--regular"].join(" ")}>
                        {showWeekNumbers && (
                            <div className={["mda-calendar__week-number", sz.cellText, sz.cell].join(" ")}>{row[0]?.weekNum}</div>
                        )}

                        {row.map((cell) => (
                            <div
                                key={cell.iso}
                                className={[
                                    "mda-calendar__cell-wrap",
                                    cell.inRange || cell.rangeStart || cell.rangeEnd ? "mda-calendar__cell-wrap--range" : "",
                                    cellWrapClass(cell),
                                ].filter(Boolean).join(" ")}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDateClick(cell.iso)}
                                    disabled={cell.disabled}
                                    title={cell.events.length > 0 ? cell.events.map((e) => e.title ?? e.label).filter(Boolean).join(", ") : undefined}
                                    className={cellClass(cell)}
                                    aria-label={cell.iso}
                                    aria-selected={cell.selected}
                                    aria-pressed={cell.selected}
                                >
                                    <span>{cell.day}</span>

                                    {cell.events.length > 0 && (
                                        <span className="mda-calendar__event-dots">
                                            {cell.events.slice(0, 3).map((ev, ei) => (
                                                <span
                                                    key={ei}
                                                    className={["mda-calendar__event-dot", sz.dot].join(" ")}
                                                    style={{
                                                        backgroundColor: cell.selected ? "rgba(255,255,255,0.8)" : (ev.color ?? "#83c442"),
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

    const renderYearView = () => {
        const months = Array.from({ length: 12 }, (_, i) => {
            try {
                return new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(viewYear, i, 1));
            }
            catch {
                return String(i + 1);
            }
        });

        const now = new Date();

        return (
            <div className="mda-calendar__picker-grid">
                {months.map((name, mi) => {
                    const isCurrentMonth = mi === now.getMonth() && viewYear === now.getFullYear();
                    const isSelectedMonth = props.mode === "single" && singleValue
                        ? (() => {
                            const p = parseISO(singleValue);
                            return p ? p.m === mi && p.y === viewYear : false;
                        })()
                        : false;

                    const stateClass = isSelectedMonth
                        ? "mda-calendar__picker-button--selected"
                        : isCurrentMonth
                            ? "mda-calendar__picker-button--current"
                            : "mda-calendar__picker-button--default";

                    return (
                        <button
                            key={mi}
                            type="button"
                            onClick={() => {
                                setViewMonth(mi);
                                setView("month");
                            }}
                            className={["mda-calendar__picker-button", stateClass].join(" ")}
                        >
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </button>
                    );
                })}
            </div>
        );
    };

    const renderDecadeView = () => {
        const start = Math.floor(viewYear / 10) * 10;
        const years = Array.from({ length: 12 }, (_, i) => start - 1 + i);
        const now = new Date();

        return (
            <div className="mda-calendar__picker-grid">
                {years.map((yr) => {
                    const inDecade = yr >= start && yr < start + 10;
                    const isCurrent = yr === now.getFullYear();
                    const isSelected = props.mode === "single" && singleValue ? parseISO(singleValue)?.y === yr : false;

                    const stateClass = !inDecade
                        ? "mda-calendar__picker-button--outside"
                        : isSelected
                            ? "mda-calendar__picker-button--selected"
                            : isCurrent
                                ? "mda-calendar__picker-button--current"
                                : "mda-calendar__picker-button--default";

                    return (
                        <button
                            key={yr}
                            type="button"
                            onClick={() => {
                                setViewYear(yr);
                                setView("year");
                            }}
                            className={["mda-calendar__picker-button", stateClass].join(" ")}
                        >
                            {yr}
                        </button>
                    );
                })}
            </div>
        );
    };

    const headerLabel = (() => {
        if (view === "month") return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${viewYear}`;
        if (view === "year") return String(viewYear);
        const start = Math.floor(viewYear / 10) * 10;
        return `${start} – ${start + 9}`;
    })();

    const onPrev = view === "month" ? prevMonth : view === "year" ? prevYear : prevDecade;
    const onNext = view === "month" ? nextMonth : view === "year" ? nextYear : nextDecade;

    const onHeaderClick = showViewNavigation
        ? () => {
            if (view === "month") setView("year");
            else if (view === "year") setView("decade");
        }
        : undefined;

    const showFooter = showTodayButton || showClearButton;

    return (
        <div
            className={[
                "mda-calendar",
                sz.root,
                disabled ? "mda-calendar--disabled" : "",
                className,
            ].filter(Boolean).join(" ")}
            role="application"
            aria-label="Calendario"
        >
            <div className="mda-calendar__header">
                <button type="button" onClick={onPrev} className={["mda-calendar__nav-button", sz.navBtn].join(" ")} aria-label="Mes anterior">
                    <svg viewBox="0 0 24 24" fill="none" className="mda-calendar__nav-icon">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={onHeaderClick}
                    className={[
                        "mda-calendar__header-label",
                        sz.header,
                        showViewNavigation && view !== "decade" ? "mda-calendar__header-label--interactive" : "mda-calendar__header-label--static",
                    ].join(" ")}
                >
                    {headerLabel}
                </button>

                <button type="button" onClick={onNext} className={["mda-calendar__nav-button", sz.navBtn].join(" ")} aria-label="Mes siguiente">
                    <svg viewBox="0 0 24 24" fill="none" className="mda-calendar__nav-icon">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="mda-calendar__body">
                {view === "month" && renderMonthView()}
                {view === "year" && renderYearView()}
                {view === "decade" && renderDecadeView()}
            </div>

            {showFooter && (
                <div className="mda-calendar__footer">
                    {showClearButton && (
                        <button type="button" onClick={handleClear} className={["mda-calendar__footer-button", "mda-calendar__footer-button--secondary", sz.footerBtn].join(" ")}>
                            {clearButtonLabel}
                        </button>
                    )}

                    {showTodayButton && (
                        <button type="button" onClick={handleToday} className={["mda-calendar__footer-button", "mda-calendar__footer-button--primary", "mda-calendar__footer-button--push", sz.footerBtn].join(" ")}>
                            {todayButtonLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
