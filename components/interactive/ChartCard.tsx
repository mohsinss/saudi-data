"use client";

import { useState, useEffect, useRef } from "react";
import { ChartWrapper, type ChartType } from "@/components/charts/ChartWrapper";
import {
  BarChart as RechartsBar, Bar,
  LineChart as RechartsLine, Line,
  AreaChart as RechartsArea, Area,
  PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const PALETTE = [
  "#006C35", "#1B5E20", "#388E3C", "#66BB6A",
  "#FFD700", "#FFC107", "#FF9800", "#E65100",
  "#0288D1", "#7B1FA2",
];

interface ChartCardProps {
  title: string;
  subtitle?: string;
  source?: string;
  data: Record<string, unknown>[];
  xKey?: string;
  valueKey?: string;
  defaultType?: ChartType;
  isPie?: boolean;
  className?: string;
}

function shortenLabel(label: unknown): string {
  const s = String(label ?? "");
  return s.length > 14 ? s.slice(0, 13) + "…" : s;
}

export function ChartCard({
  title, subtitle, source, data,
  xKey = "period", valueKey = "Value",
  defaultType = "bar", isPie = false, className,
}: ChartCardProps) {
  const [chartType, setChartType] = useState<ChartType>(defaultType);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const allowed: ChartType[] = isPie ? [] : ["bar", "line", "area"];
  const pieData = data.map((d, i) => ({
    name: String(d.name ?? d[xKey] ?? d.period ?? i),
    value: Number(d.value ?? d[valueKey] ?? 0),
  }));

  const renderChart = () => {
    if (isPie) {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPie>
            <Pie
              data={pieData} cx="50%" cy="50%"
              outerRadius="75%" dataKey="value"
              label={({ name, percent }) => `${shortenLabel(name)} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
              animationBegin={visible ? 0 : 9999}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
          </RechartsPie>
        </ResponsiveContainer>
      );
    }

    const commonProps = {
      data,
      margin: { top: 5, right: 16, bottom: 5, left: 10 },
    };
    const axisStyle = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };
    const gridStyle = { strokeDasharray: "3 3", stroke: "hsl(var(--border))" };
    const tooltipStyle = {
      contentStyle: {
        backgroundColor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "10px",
        fontSize: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      },
    };

    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLine {...commonProps}>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey={xKey} tick={axisStyle} tickFormatter={shortenLabel} interval="preserveStartEnd" />
            <YAxis tick={axisStyle} width={65} />
            <Tooltip {...tooltipStyle} />
            <Line dataKey={valueKey} stroke={PALETTE[0]} strokeWidth={2.5} dot={{ r: 3, fill: PALETTE[0] }} activeDot={{ r: 6 }} isAnimationActive={visible} name={valueKey} />
          </RechartsLine>
        </ResponsiveContainer>
      );
    }
    if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RechartsArea {...commonProps}>
            <defs>
              <linearGradient id={`grad-${title.slice(0, 8)}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PALETTE[0]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={PALETTE[0]} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey={xKey} tick={axisStyle} tickFormatter={shortenLabel} interval="preserveStartEnd" />
            <YAxis tick={axisStyle} width={65} />
            <Tooltip {...tooltipStyle} />
            <Area dataKey={valueKey} stroke={PALETTE[0]} strokeWidth={2.5} fill={`url(#grad-${title.slice(0, 8)})`} isAnimationActive={visible} name={valueKey} />
          </RechartsArea>
        </ResponsiveContainer>
      );
    }
    // default: bar
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBar {...commonProps}>
          <CartesianGrid {...gridStyle} />
          <XAxis dataKey={xKey} tick={axisStyle} tickFormatter={shortenLabel} interval={0} />
          <YAxis tick={axisStyle} width={65} />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey={valueKey} fill={PALETTE[0]} radius={[4, 4, 0, 0]} isAnimationActive={visible} name={valueKey}>
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Bar>
        </RechartsBar>
      </ResponsiveContainer>
    );
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className ?? ""}`}
    >
      <ChartWrapper
        title={title}
        subtitle={subtitle}
        source={source}
        data={data}
        allowedChartTypes={isPie ? [] : allowed}
        activeChartType={chartType}
        onChartTypeChange={setChartType}
      >
        {renderChart()}
      </ChartWrapper>
    </div>
  );
}
