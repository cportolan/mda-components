import type { ReactNode } from "react";

// ─── Chart Types ─────────────────────────────────────────────────────────────

export type ChartType =
    | "bar"
    | "bar-horizontal"
    | "bar-stacked"
    | "bar-grouped"
    | "line"
    | "line-smooth"
    | "area"
    | "area-stacked"
    | "pie"
    | "donut"
    | "radial"
    | "radar"
    | "scatter";

// ─── Data ────────────────────────────────────────────────────────────────────

export type ChartDataItem = Record<string, string | number | null | undefined>;

export interface ChartSeries {
    /** Key in the data array */
    key: string;
    /** Display label */
    label: string;
    /** Override color (hex / css var). Falls back to palette */
    color?: string;
}

// ─── Axis ────────────────────────────────────────────────────────────────────

export interface ChartAxisConfig {
    /** Key used as the category axis (X for vertical, Y for horizontal) */
    dataKey?: string;
    /** Hide the axis entirely */
    hide?: boolean;
    /** Format tick labels */
    tickFormatter?: (value: unknown) => string;
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

export interface ChartTooltipConfig {
    /** Show / hide tooltip */
    show?: boolean;
    /** "dot" | "line" | "dashed" */
    indicator?: "dot" | "line" | "dashed";
    /** Custom value formatter */
    formatter?: (value: number, name: string) => string;
}

// ─── Legend ──────────────────────────────────────────────────────────────────

export interface ChartLegendConfig {
    /** Show / hide legend */
    show?: boolean;
    /** "top" | "bottom" */
    verticalAlign?: "top" | "bottom";
}

// ─── Main Props ──────────────────────────────────────────────────────────────

export interface ChartProps {
    /** Which chart to render */
    type: ChartType;
    /** Array of data objects */
    data: ChartDataItem[];
    /**
     * Series definitions.
     * For single-series charts (pie / donut / radial) you only need one entry.
     */
    series: ChartSeries[];
    /**
     * Category (label) key – defaults to the first string-valued key found in
     * the first data row, or `"name"`.
     */
    categoryKey?: string;
    /** Chart title rendered above the container */
    title?: string;
    /** Chart subtitle */
    description?: string;
    /** Explicit height in px. Defaults to 300. */
    height?: number;
    /** Extra className on the outer wrapper */
    className?: string;
    /** X-axis config */
    xAxis?: ChartAxisConfig;
    /** Y-axis config */
    yAxis?: ChartAxisConfig;
    /** Tooltip config */
    tooltip?: ChartTooltipConfig;
    /** Legend config */
    legend?: ChartLegendConfig;
    /** Show cartesian grid lines (default: true for cartesian charts) */
    showGrid?: boolean;
    /** Corner radius for bar charts (default: 4) */
    barRadius?: number;
    /** Inner radius for donut (0–100, default: 55) */
    innerRadius?: number;
    /** Outer radius for pie / donut (0–100, default: 80) */
    outerRadius?: number;
    /** Render a value label inside/outside each segment */
    showLabels?: boolean;
    /** Custom footer content */
    footer?: ReactNode;
    /** Stroke width for line / area charts (default: 2) */
    strokeWidth?: number;
    /** Fill opacity for area charts (default: 0.15) */
    areaOpacity?: number;
    /** Max bar size in px (default: 48) */
    maxBarSize?: number;
}
