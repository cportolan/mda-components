import React from "react";

// ── Shared types ──────────────────────────────────────────────────────────────

export type CalendarMode = "single" | "range" | "multiple";
export type CalendarView = "month" | "year" | "decade";
export type CalendarSize = "sm" | "md" | "lg";

/**
 * An event/mark displayed on a specific date
 */
export interface CalendarEvent {
    /** ISO date string "YYYY-MM-DD" */
    date: string;
    /** Short label shown inside the cell */
    label?: string;
    /** Color dot: defaults to primary green */
    color?: string;
    /** Optional tooltip/title attribute */
    title?: string;
}

// ── Single-date mode ──────────────────────────────────────────────────────────

export interface CalendarSingleProps {
    mode: "single";
    /** Controlled selected date (ISO string) */
    value?: string | null;
    /** Uncontrolled default date */
    defaultValue?: string | null;
    /** Called when user picks a date */
    onChange?: (date: string | null) => void;
}

// ── Range mode ────────────────────────────────────────────────────────────────

export interface CalendarRangeProps {
    mode: "range";
    /** Controlled range [start, end] (ISO strings) */
    value?: [string | null, string | null];
    /** Uncontrolled default range */
    defaultValue?: [string | null, string | null];
    /** Called with [start, end] whenever either end changes */
    onChange?: (range: [string | null, string | null]) => void;
}

// ── Multiple mode ─────────────────────────────────────────────────────────────

export interface CalendarMultipleProps {
    mode: "multiple";
    /** Controlled set of selected dates (ISO strings) */
    value?: string[];
    /** Uncontrolled default selection */
    defaultValue?: string[];
    /** Called with full updated array */
    onChange?: (dates: string[]) => void;
}

// ── Common props shared by all modes ─────────────────────────────────────────

export interface CalendarCommonProps {
    /**
     * Visual size
     * @default 'md'
     */
    size?: CalendarSize;

    /**
     * Minimum selectable date (ISO string "YYYY-MM-DD")
     */
    minDate?: string;

    /**
     * Maximum selectable date (ISO string "YYYY-MM-DD")
     */
    maxDate?: string;

    /**
     * Array of disabled dates (ISO strings)
     */
    disabledDates?: string[];

    /**
     * Predicate to disable arbitrary dates
     */
    disabledDate?: (date: string) => boolean;

    /**
     * Events/marks to display on specific days
     */
    events?: CalendarEvent[];

    /**
     * Show week numbers in the leftmost column
     * @default false
     */
    showWeekNumbers?: boolean;

    /**
     * Locale used for day/month names. Uses navigator.language by default.
     * @default 'es-AR'
     */
    locale?: string;

    /**
     * First day of week: 0 = Sunday, 1 = Monday
     * @default 1
     */
    firstDayOfWeek?: 0 | 1;

    /**
     * Show a "Today" button that jumps to the current month
     * @default false
     */
    showTodayButton?: boolean;

    /**
     * Label for the "Today" button
     * @default 'Hoy'
     */
    todayButtonLabel?: string;

    /**
     * Show a "Clear" button that clears the selection
     * @default false
     */
    showClearButton?: boolean;

    /**
     * Label for the "Clear" button
     * @default 'Limpiar'
     */
    clearButtonLabel?: string;

    /**
     * Extra CSS classes for the root element
     */
    className?: string;

    /**
     * Whether the entire calendar is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Show navigation to drill into year/decade views
     * @default true
     */
    showViewNavigation?: boolean;
}

// ── Final union prop type ─────────────────────────────────────────────────────

export type CalendarProps = CalendarCommonProps &
    (CalendarSingleProps | CalendarRangeProps | CalendarMultipleProps);
