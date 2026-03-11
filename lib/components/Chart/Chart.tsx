"use client";

import React, { useMemo, useState, useEffect, useId, useRef } from "react";
import {
    BarChart, Bar,
    LineChart, Line,
    AreaChart, Area,
    PieChart, Pie, Cell,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    RadialBarChart, RadialBar,
    ScatterChart, Scatter,
    XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, LabelList,
    ResponsiveContainer,
} from "recharts";
import {
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartContextProvider,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import type { ChartProps, ChartDataItem } from "./Chart.types";

const PALETTE = ["#83c442","#3f7fbf","#f0a500","#e05252","#9b59b6","#1abc9c","#e67e22","#34495e"];

function resolveColor(s: ChartProps["series"][number], i: number) {
    return s.color ?? PALETTE[i % PALETTE.length];
}

function buildChartConfig(series: ChartProps["series"]): ChartConfig {
    return series.reduce<ChartConfig>((acc, s, i) => {
        acc[s.key] = { label: s.label, color: resolveColor(s, i) };
        return acc;
    }, {});
}

function resolveCategoryKey(explicit: string | undefined, data: ChartDataItem[]): string {
    if (explicit) return explicit;
    if (!data.length) return "name";
    const first = data[0];
    return Object.keys(first).find((k) => typeof first[k] === "string") ?? "name";
}

function CssVars({ chartId, config }: { chartId: string; config: ChartConfig }) {
    const vars = Object.entries(config)
        .filter(([, v]) => v.color)
        .map(([k, v]) => `  --color-${k}: ${v.color};`)
        .join("\n");
    if (!vars) return null;
    return (
        <style dangerouslySetInnerHTML={{ __html: `[data-chart-id="${chartId}"] {\n${vars}\n}` }} />
    );
}

function BarRenderer(p: ChartProps) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const isH = p.type === "bar-horizontal";
    const isS = p.type === "bar-stacked";
    const r = p.barRadius ?? 4;
    const showGrid = p.showGrid !== false;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (
        <BarChart data={p.data} layout={isH ? "vertical" : "horizontal"} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e2" vertical={isH} horizontal={!isH} />}
            {isH ? (
                <>
                    <XAxis type="number" hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                    <YAxis dataKey={catKey} type="category" hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} width={80} />
                </>
            ) : (
                <>
                    <XAxis dataKey={catKey} hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                    <YAxis hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                </>
            )}
            {showTip && <ChartTooltip cursor={{ fill: "#f6f6f6" }} content={<ChartTooltipContent indicator={p.tooltip?.indicator ?? "dot"} />} />}
            {showLeg && <ChartLegend verticalAlign={p.legend?.verticalAlign ?? "bottom"} content={<ChartLegendContent />} />}
            {p.series.map((s, i) => (
                <Bar key={s.key} dataKey={s.key} fill={`var(--color-${s.key})`}
                    stackId={isS ? "stack" : undefined}
                    radius={isS ? (i === p.series.length - 1 ? [r, r, 0, 0] : [0, 0, 0, 0]) : [r, r, 0, 0]}
                    maxBarSize={p.maxBarSize ?? 48}>
                    {p.showLabels && <LabelList position={isH ? "right" : "top"} style={{ fontSize: 10, fill: "#3f3f3f" }} />}
                </Bar>
            ))}
        </BarChart>
    );
}

function LineRenderer(p: ChartProps) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const showGrid = p.showGrid !== false;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (
        <LineChart data={p.data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e2" />}
            <XAxis dataKey={catKey} hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
            <YAxis hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
            {showTip && <ChartTooltip cursor={false} content={<ChartTooltipContent indicator={p.tooltip?.indicator ?? "line"} />} />}
            {showLeg && <ChartLegend verticalAlign={p.legend?.verticalAlign ?? "bottom"} content={<ChartLegendContent />} />}
            {p.series.map((s) => (
                <Line key={s.key} dataKey={s.key} stroke={`var(--color-${s.key})`}
                    strokeWidth={p.strokeWidth ?? 2}
                    type={p.type === "line-smooth" ? "monotone" : "linear"}
                    dot={{ r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            ))}
        </LineChart>
    );
}

function AreaRenderer(p: ChartProps) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const opacity = p.areaOpacity ?? 0.15;
    const showGrid = p.showGrid !== false;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (
        <AreaChart data={p.data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            <defs>
                {p.series.map((s, i) => (
                    <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={resolveColor(s, i)} stopOpacity={opacity * 4} />
                        <stop offset="95%" stopColor={resolveColor(s, i)} stopOpacity={0} />
                    </linearGradient>
                ))}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e2" />}
            <XAxis dataKey={catKey} hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
            <YAxis hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
            {showTip && <ChartTooltip cursor={false} content={<ChartTooltipContent indicator={p.tooltip?.indicator ?? "line"} />} />}
            {showLeg && <ChartLegend verticalAlign={p.legend?.verticalAlign ?? "bottom"} content={<ChartLegendContent />} />}
            {p.series.map((s) => (
                <Area key={s.key} dataKey={s.key} stroke={`var(--color-${s.key})`}
                    strokeWidth={p.strokeWidth ?? 2} type="monotone"
                    fill={`url(#grad-${s.key})`}
                    stackId={p.type === "area-stacked" ? "stack" : undefined} />
            ))}
        </AreaChart>
    );
}

function PieRenderer(p: ChartProps) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const isDonut = p.type === "donut";
    const valueKey = p.series[0]?.key ?? "value";
    const colorAt = (i: number) => p.series[i] ? resolveColor(p.series[i], i) : PALETTE[i % PALETTE.length];
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (
        <PieChart margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
            {showTip && (
                <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0];
                    return (
                        <div className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 shadow-md text-xs">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: item.payload.fill }} />
                                <span className="font-medium text-[#3f3f3f]">{item.name}</span>
                            </div>
                            <span className="text-[#666] tabular-nums">
                                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                            </span>
                        </div>
                    );
                }} />
            )}
            {showLeg && <Legend verticalAlign={p.legend?.verticalAlign ?? "bottom"} iconType="circle" iconSize={8}
                formatter={(v) => <span style={{ fontSize: 11, color: "#3f3f3f" }}>{v}</span>} />}
            <Pie data={p.data} dataKey={valueKey} nameKey={catKey} cx="50%" cy="50%"
                innerRadius={isDonut ? `${p.innerRadius ?? 55}%` : 0}
                outerRadius={`${p.outerRadius ?? 80}%`}
                paddingAngle={isDonut ? 2 : 0} strokeWidth={2} stroke="#fff">
                {p.data.map((_, i) => <Cell key={i} fill={colorAt(i)} />)}
                {p.showLabels && <LabelList dataKey={catKey} style={{ fontSize: 10, fill: "#fff" }} />}
            </Pie>
        </PieChart>
    );
}

function RadialRenderer(p: ChartProps) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const valueKey = p.series[0]?.key ?? "value";
    const coloredData = p.data.map((row, i) => ({
        ...row,
        fill: p.series[i] ? resolveColor(p.series[i], i) : PALETTE[i % PALETTE.length],
    }));
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (
        <RadialBarChart data={coloredData} innerRadius="20%" outerRadius="90%" startAngle={180} endAngle={0} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
            <PolarGrid gridType="circle" radialLines={false} stroke="#e2e2e2" />
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
            <RadialBar dataKey={valueKey} background={{ fill: "#f6f6f6" }} cornerRadius={6}
                label={{ position: "insideStart", fill: "#fff", fontSize: 10, formatter: (v: number) => `${v}` }} />
            {showTip && (
                <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0];
                    return (
                        <div className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 shadow-md text-xs">
                            <div className="font-medium text-[#3f3f3f] mb-1">{String(item.payload[catKey] ?? "")}</div>
                            <span className="text-[#666] tabular-nums">
                                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                            </span>
                        </div>
                    );
                }} />
            )}
            {showLeg && <Legend verticalAlign={p.legend?.verticalAlign ?? "bottom"} iconType="circle" iconSize={8}
                formatter={(v) => <span style={{ fontSize: 11, color: "#3f3f3f" }}>{v}</span>} />}
        </RadialBarChart>
    );
}

function RadarRenderer(p: ChartProps) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const opacity = p.areaOpacity ?? 0.2;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (
        <RadarChart data={p.data} cx="50%" cy="50%" outerRadius="80%" margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
            <PolarGrid stroke="#e2e2e2" />
            <PolarAngleAxis dataKey={catKey} tick={{ fontSize: 11, fill: "#999" }} />
            <PolarRadiusAxis tick={{ fontSize: 9, fill: "#ccc" }} axisLine={false} />
            {showTip && <ChartTooltip cursor={false} content={<ChartTooltipContent indicator={p.tooltip?.indicator ?? "dot"} />} />}
            {showLeg && <ChartLegend verticalAlign={p.legend?.verticalAlign ?? "bottom"} content={<ChartLegendContent />} />}
            {p.series.map((s, i) => (
                <Radar key={s.key} dataKey={s.key} stroke={resolveColor(s, i)} fill={resolveColor(s, i)} fillOpacity={opacity} strokeWidth={p.strokeWidth ?? 2} />
            ))}
        </RadarChart>
    );
}

function ScatterRenderer(p: ChartProps) {
    const showGrid = p.showGrid !== false;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (
        <ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e2" />}
            <XAxis dataKey="x" type="number" hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} name="X" />
            <YAxis dataKey="y" type="number" hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} name="Y" />
            {showTip && (
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const pt = payload[0].payload as Record<string, unknown>;
                    return (
                        <div className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 shadow-md text-xs">
                            <div className="flex gap-3"><span className="text-[#999]">x:</span><span className="font-medium tabular-nums text-[#3f3f3f]">{String(pt.x)}</span></div>
                            <div className="flex gap-3"><span className="text-[#999]">y:</span><span className="font-medium tabular-nums text-[#3f3f3f]">{String(pt.y)}</span></div>
                        </div>
                    );
                }} />
            )}
            {showLeg && <Legend verticalAlign={p.legend?.verticalAlign ?? "bottom"} iconType="circle" iconSize={8}
                formatter={(v) => <span style={{ fontSize: 11, color: "#3f3f3f" }}>{v}</span>} />}
            {p.series.map((s, i) => (
                <Scatter key={s.key} name={s.label} data={p.data as Record<string, unknown>[]} fill={resolveColor(s, i)} opacity={0.8} />
            ))}
        </ScatterChart>
    );
}

function renderChart(p: ChartProps): React.ReactElement | null {
    switch (p.type) {
        case "bar": case "bar-horizontal": case "bar-stacked": case "bar-grouped": return <BarRenderer {...p} />;
        case "line": case "line-smooth": return <LineRenderer {...p} />;
        case "area": case "area-stacked": return <AreaRenderer {...p} />;
        case "pie": case "donut": return <PieRenderer {...p} />;
        case "radial": return <RadialRenderer {...p} />;
        case "radar": return <RadarRenderer {...p} />;
        case "scatter": return <ScatterRenderer {...p} />;
        default: return null;
    }
}

export const Chart: React.FC<ChartProps> = (props) => {
    const { title, description, height = 300, className = "", footer, series } = props;

    const rawId = useId();
    const chartId = rawId.replace(/:/g, "");
    const chartConfig = useMemo(() => buildChartConfig(series), [series]);
    const initialWidth =
        typeof window === "undefined"
            ? 600
            : Math.max(320, Math.min(window.innerWidth - 48, 960));

    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [measured, setMeasured] = useState({ width: 0, height: 0 });
    useEffect(() => { setMounted(true); }, []);
    useEffect(() => {
        if (!containerRef.current) return;
        const update = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            setMeasured({ width: rect.width, height: rect.height });
        };
        update();
        if (typeof ResizeObserver === "undefined") return;
        const obs = new ResizeObserver(() => update());
        obs.observe(containerRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div className={`flex flex-col gap-2 rounded-2xl border border-[#e2e2e2] bg-white p-6 shadow-sm ${className}`}>
            {(title || description) && (
                <div className="mb-2">
                    {title && <h3 className="text-[16px] font-semibold text-[#3f3f3f] leading-snug">{title}</h3>}
                    {description && <p className="text-[14px] text-[#999] mt-0.5">{description}</p>}
                </div>
            )}

            {mounted ? (
                <ChartContextProvider config={chartConfig}>
                    <div
                        data-chart-id={chartId}
                        ref={containerRef}
                        style={{
                            display: "block",
                            width: "100%",
                            height: `${height}px`,
                        }}
                    >
                        <CssVars chartId={chartId} config={chartConfig} />
                        {(() => {
                            const rendered = renderChart(props) as React.ReactElement | null;
                            if (!rendered) {
                                return (
                                    <div className="h-full w-full flex items-center justify-center rounded-xl border border-dashed border-[#e2e2e2] text-xs text-[#999]">
                                        Chart type no reconocido: {String(props.type)}
                                    </div>
                                );
                            }
                            const width = measured.width || initialWidth;
                            const heightPx = measured.height || height;
                            return React.cloneElement(rendered, {
                                width,
                                height: heightPx,
                            });
                        })()}
                        {false && (
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                                minHeight={height}
                                minWidth={320}
                                initialDimension={{ width: initialWidth, height }}
                            >
                                {renderChart(props) as React.ReactElement}
                            </ResponsiveContainer>
                        )}
                    </div>
                </ChartContextProvider>
            ) : (
                <div
                    style={{ height }}
                    className="w-full animate-pulse bg-[#f6f6f6] rounded-xl"
                />
            )}

            {footer && (
                <div className="mt-2 text-[12px] text-[#999] border-t border-[#f0f0f0] pt-3">{footer}</div>
            )}
        </div>
    );
};

Chart.displayName = "Chart";
