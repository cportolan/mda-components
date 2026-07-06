"use client";
import "./Chart.css";
import React, { useMemo, useState, useEffect, useId, useRef } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadialBarChart, RadialBar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer, } from "recharts";
const PALETTE = ["#83c442", "#3f7fbf", "#f0a500", "#e05252", "#9b59b6", "#1abc9c", "#e67e22", "#34495e"];
const ChartContext = React.createContext({ config: {} });
function ChartContextProvider({ config, children }) {
    return <ChartContext.Provider value={{ config }}>{children}</ChartContext.Provider>;
}
function useChart() {
    return React.useContext(ChartContext);
}
const ChartTooltip = Tooltip;
const ChartLegend = Legend;
function resolvePayloadKey(item, fallback) {
    return `${item?.dataKey || item?.name || fallback || "value"}`;
}
function ChartTooltipContent({ active, payload, indicator = "dot" }) {
    const { config } = useChart();
    if (!active || !payload?.length)
        return null;
    return (<div className="mda-chart__tooltip">
            <div className="mda-chart__tooltip-list">
                {payload.filter((item) => item.type !== "none").map((item, index) => {
            const key = resolvePayloadKey(item, index);
            const itemConfig = config[key] ?? {};
            const indicatorColor = item.color || item.payload?.fill || item.stroke || "#83c442";
            return (<div key={`${key}-${index}`} className="mda-chart__tooltip-item">
                            <div className="mda-chart__tooltip-label-wrap">
                                {indicator !== "none" && (<span className="inline-block rounded-full" style={{
                        width: indicator === "line" ? 12 : 8,
                        height: indicator === "line" ? 2 : 8,
                        backgroundColor: indicator === "line" ? "transparent" : indicatorColor,
                        border: indicator === "line" ? `2px solid ${indicatorColor}` : "none",
                    }}/>)}
                                <span className="mda-chart__tooltip-label">
                                    {itemConfig.label ?? item.name ?? item.dataKey}
                                </span>
                            </div>
                            <span className="mda-chart__tooltip-value">
                                {typeof item.value === "number"
                    ? item.value.toLocaleString()
                    : String(item.value ?? "")}
                            </span>
                        </div>);
        })}
            </div>
        </div>);
}
function ChartLegendContent({ payload }) {
    const { config } = useChart();
    if (!payload?.length)
        return null;
    return (<div className="mda-chart__legend">
            {payload.map((item, index) => {
            const key = resolvePayloadKey(item, index);
            const itemConfig = config[key] ?? {};
            const color = item.color || item.payload?.fill || "#83c442";
            return (<div key={`${key}-${index}`} className="mda-chart__legend-item">
                        <span className="mda-chart__legend-dot" style={{ backgroundColor: color }}/>
                        <span>{itemConfig.label ?? item.value ?? key}</span>
                    </div>);
        })}
        </div>);
}
function resolveColor(s, i) {
    return s.color ?? PALETTE[i % PALETTE.length];
}
function buildChartConfig(series) {
    return series.reduce((acc, s, i) => {
        acc[s.key] = { label: s.label, color: resolveColor(s, i) };
        return acc;
    }, {});
}
function resolveCategoryKey(explicit, data) {
    if (explicit)
        return explicit;
    if (!data.length)
        return "name";
    const first = data[0];
    return Object.keys(first).find((k) => typeof first[k] === "string") ?? "name";
}
function CssVars({ chartId, config }) {
    const vars = Object.entries(config)
        .filter(([, v]) => v.color)
        .map(([k, v]) => `  --color-${k}: ${v.color};`)
        .join("\n");
    if (!vars)
        return null;
    return (<style dangerouslySetInnerHTML={{ __html: `[data-chart-id="${chartId}"] {\n${vars}\n}` }}/>);
}
function BarRenderer(p) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const isH = p.type === "bar-horizontal";
    const isS = p.type === "bar-stacked";
    const r = p.barRadius ?? 4;
    const showGrid = p.showGrid !== false;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (<BarChart data={p.data} layout={isH ? "vertical" : "horizontal"} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e2" vertical={isH} horizontal={!isH}/>}
            {isH ? (<>
                    <XAxis type="number" hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false}/>
                    <YAxis dataKey={catKey} type="category" hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} width={80}/>
                </>) : (<>
                    <XAxis dataKey={catKey} hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false}/>
                    <YAxis hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false}/>
                </>)}
            {showTip && <ChartTooltip cursor={{ fill: "#f6f6f6" }} content={<ChartTooltipContent indicator={p.tooltip?.indicator ?? "dot"}/>}/>}
            {showLeg && <ChartLegend verticalAlign={p.legend?.verticalAlign ?? "bottom"} content={<ChartLegendContent />}/>}
            {p.series.map((s, i) => (<Bar key={s.key} dataKey={s.key} fill={`var(--color-${s.key})`} stackId={isS ? "stack" : undefined} radius={isS ? (i === p.series.length - 1 ? [r, r, 0, 0] : [0, 0, 0, 0]) : [r, r, 0, 0]} maxBarSize={p.maxBarSize ?? 48}>
                    {p.showLabels && <LabelList position={isH ? "right" : "top"} style={{ fontSize: 10, fill: "#3f3f3f" }}/>}
                </Bar>))}
        </BarChart>);
}
function LineRenderer(p) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const showGrid = p.showGrid !== false;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (<LineChart data={p.data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e2"/>}
            <XAxis dataKey={catKey} hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false}/>
            <YAxis hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false}/>
            {showTip && <ChartTooltip cursor={false} content={<ChartTooltipContent indicator={p.tooltip?.indicator ?? "line"}/>}/>}
            {showLeg && <ChartLegend verticalAlign={p.legend?.verticalAlign ?? "bottom"} content={<ChartLegendContent />}/>}
            {p.series.map((s) => (<Line key={s.key} dataKey={s.key} stroke={`var(--color-${s.key})`} strokeWidth={p.strokeWidth ?? 2} type={p.type === "line-smooth" ? "monotone" : "linear"} dot={{ r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }}/>))}
        </LineChart>);
}
function AreaRenderer(p) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const opacity = p.areaOpacity ?? 0.15;
    const showGrid = p.showGrid !== false;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (<AreaChart data={p.data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            <defs>
                {p.series.map((s, i) => (<linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={resolveColor(s, i)} stopOpacity={opacity * 4}/>
                        <stop offset="95%" stopColor={resolveColor(s, i)} stopOpacity={0}/>
                    </linearGradient>))}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e2"/>}
            <XAxis dataKey={catKey} hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false}/>
            <YAxis hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false}/>
            {showTip && <ChartTooltip cursor={false} content={<ChartTooltipContent indicator={p.tooltip?.indicator ?? "line"}/>}/>}
            {showLeg && <ChartLegend verticalAlign={p.legend?.verticalAlign ?? "bottom"} content={<ChartLegendContent />}/>}
            {p.series.map((s) => (<Area key={s.key} dataKey={s.key} stroke={`var(--color-${s.key})`} strokeWidth={p.strokeWidth ?? 2} type="monotone" fill={`url(#grad-${s.key})`} stackId={p.type === "area-stacked" ? "stack" : undefined}/>))}
        </AreaChart>);
}
function PieRenderer(p) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const isDonut = p.type === "donut";
    const valueKey = p.series[0]?.key ?? "value";
    const colorAt = (i) => p.series[i] ? resolveColor(p.series[i], i) : PALETTE[i % PALETTE.length];
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (<PieChart margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
            {showTip && (<Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length)
                    return null;
                const item = payload[0];
                return (<div className="mda-chart__tooltip">
                            <div className="mda-chart__tooltip-row mda-chart__tooltip-row--stacked">
                                <span className="mda-chart__legend-dot" style={{ backgroundColor: item.payload.fill }}/>
                                <span className="mda-chart__tooltip-label">{item.name}</span>
                            </div>
                            <span className="mda-chart__tooltip-value">
                                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                            </span>
                        </div>);
            }}/>)}
            {showLeg && <Legend verticalAlign={p.legend?.verticalAlign ?? "bottom"} iconType="circle" iconSize={8} formatter={(v) => <span className="mda-chart__legend-label">{v}</span>}/>}
            <Pie data={p.data} dataKey={valueKey} nameKey={catKey} cx="50%" cy="50%" innerRadius={isDonut ? `${p.innerRadius ?? 55}%` : 0} outerRadius={`${p.outerRadius ?? 80}%`} paddingAngle={isDonut ? 2 : 0} strokeWidth={2} stroke="#fff">
                {p.data.map((_, i) => <Cell key={i} fill={colorAt(i)}/>)}
                {p.showLabels && <LabelList dataKey={catKey} style={{ fontSize: 10, fill: "#fff" }}/>}
            </Pie>
        </PieChart>);
}
function RadialRenderer(p) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const valueKey = p.series[0]?.key ?? "value";
    const coloredData = p.data.map((row, i) => ({
        ...row,
        fill: p.series[i] ? resolveColor(p.series[i], i) : PALETTE[i % PALETTE.length],
    }));
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (<RadialBarChart data={coloredData} innerRadius="20%" outerRadius="90%" startAngle={180} endAngle={0} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
            <PolarGrid gridType="circle" radialLines={false} stroke="#e2e2e2"/>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false}/>
            <RadialBar dataKey={valueKey} background={{ fill: "#f6f6f6" }} cornerRadius={6} label={{ position: "insideStart", fill: "#fff", fontSize: 10, formatter: (v) => `${v}` }}/>
            {showTip && (<Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length)
                    return null;
                const item = payload[0];
                return (<div className="mda-chart__tooltip">
                            <div className="mda-chart__tooltip-title">{String(item.payload[catKey] ?? "")}</div>
                            <span className="mda-chart__tooltip-value">
                                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                            </span>
                        </div>);
            }}/>)}
            {showLeg && <Legend verticalAlign={p.legend?.verticalAlign ?? "bottom"} iconType="circle" iconSize={8} formatter={(v) => <span className="mda-chart__legend-label">{v}</span>}/>}
        </RadialBarChart>);
}
function RadarRenderer(p) {
    const catKey = resolveCategoryKey(p.categoryKey, p.data);
    const opacity = p.areaOpacity ?? 0.2;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (<RadarChart data={p.data} cx="50%" cy="50%" outerRadius="80%" margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
            <PolarGrid stroke="#e2e2e2"/>
            <PolarAngleAxis dataKey={catKey} tick={{ fontSize: 11, fill: "#999" }}/>
            <PolarRadiusAxis tick={{ fontSize: 9, fill: "#ccc" }} axisLine={false}/>
            {showTip && <ChartTooltip cursor={false} content={<ChartTooltipContent indicator={p.tooltip?.indicator ?? "dot"}/>}/>}
            {showLeg && <ChartLegend verticalAlign={p.legend?.verticalAlign ?? "bottom"} content={<ChartLegendContent />}/>}
            {p.series.map((s, i) => (<Radar key={s.key} dataKey={s.key} stroke={resolveColor(s, i)} fill={resolveColor(s, i)} fillOpacity={opacity} strokeWidth={p.strokeWidth ?? 2}/>))}
        </RadarChart>);
}
function ScatterRenderer(p) {
    const showGrid = p.showGrid !== false;
    const showTip = p.tooltip?.show !== false;
    const showLeg = p.legend?.show !== false;
    return (<ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e2"/>}
            <XAxis dataKey="x" type="number" hide={p.xAxis?.hide} tickFormatter={p.xAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} name="X"/>
            <YAxis dataKey="y" type="number" hide={p.yAxis?.hide} tickFormatter={p.yAxis?.tickFormatter} tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} name="Y"/>
            {showTip && (<Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ active, payload }) => {
                if (!active || !payload?.length)
                    return null;
                const pt = payload[0].payload;
                return (<div className="mda-chart__tooltip">
                            <div className="mda-chart__tooltip-row"><span className="mda-chart__tooltip-key">x:</span><span className="mda-chart__tooltip-strong">{String(pt.x)}</span></div>
                            <div className="mda-chart__tooltip-row"><span className="mda-chart__tooltip-key">y:</span><span className="mda-chart__tooltip-strong">{String(pt.y)}</span></div>
                        </div>);
            }}/>)}
            {showLeg && <Legend verticalAlign={p.legend?.verticalAlign ?? "bottom"} iconType="circle" iconSize={8} formatter={(v) => <span className="mda-chart__legend-label">{v}</span>}/>}
            {p.series.map((s, i) => (<Scatter key={s.key} name={s.label} data={p.data} fill={resolveColor(s, i)} opacity={0.8}/>))}
        </ScatterChart>);
}
function renderChart(p) {
    switch (p.type) {
        case "bar":
        case "bar-horizontal":
        case "bar-stacked":
        case "bar-grouped": return <BarRenderer {...p}/>;
        case "line":
        case "line-smooth": return <LineRenderer {...p}/>;
        case "area":
        case "area-stacked": return <AreaRenderer {...p}/>;
        case "pie":
        case "donut": return <PieRenderer {...p}/>;
        case "radial": return <RadialRenderer {...p}/>;
        case "radar": return <RadarRenderer {...p}/>;
        case "scatter": return <ScatterRenderer {...p}/>;
        default: return null;
    }
}
export const Chart = (props) => {
    const { title, description, height = 300, className = "", footer, series } = props;
    const rawId = useId();
    const chartId = rawId.replace(/:/g, "");
    const chartConfig = useMemo(() => buildChartConfig(series), [series]);
    const initialWidth = typeof window === "undefined"
        ? 600
        : Math.max(320, Math.min(window.innerWidth - 48, 960));
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);
    const [measured, setMeasured] = useState({ width: 0, height: 0 });
    useEffect(() => { setMounted(true); }, []);
    useEffect(() => {
        if (!containerRef.current)
            return;
        const update = () => {
            if (!containerRef.current)
                return;
            const rect = containerRef.current.getBoundingClientRect();
            if (!rect.width || !rect.height)
                return;
            setMeasured({ width: rect.width, height: rect.height });
        };
        update();
        if (typeof ResizeObserver === "undefined")
            return;
        const obs = new ResizeObserver(() => update());
        obs.observe(containerRef.current);
        return () => obs.disconnect();
    }, []);
    return (<div className={["mda-chart", className].filter(Boolean).join(" ")}>
            {(title || description) && (<div className="mda-chart__header">
                    {title && <h3 className="mda-chart__title">{title}</h3>}
                    {description && <p className="mda-chart__description">{description}</p>}
                </div>)}

            {mounted ? (<ChartContextProvider config={chartConfig}>
                    <div data-chart-id={chartId} ref={containerRef} style={{
                display: "block",
                width: "100%",
                height: `${height}px`,
            }}>
                        <CssVars chartId={chartId} config={chartConfig}/>
                        {(() => {
                const rendered = renderChart(props);
                if (!rendered) {
                    return (<div className="mda-chart__empty">
                                        Chart type no reconocido: {String(props.type)}
                                    </div>);
                }
                const width = measured.width || initialWidth;
                const heightPx = measured.height || height;
                return React.cloneElement(rendered, {
                    width,
                    height: heightPx,
                });
            })()}
                        {false && (<ResponsiveContainer width="100%" height="100%" minHeight={height} minWidth={320} initialDimension={{ width: initialWidth, height }}>
                                {renderChart(props)}
                            </ResponsiveContainer>)}
                    </div>
                </ChartContextProvider>) : (<div style={{ height }} className="mda-chart__loading"/>)}

            {footer && (<div className="mda-chart__footer">{footer}</div>)}
        </div>);
};
Chart.displayName = "Chart";
