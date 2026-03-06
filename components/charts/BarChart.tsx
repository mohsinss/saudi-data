"use client";

import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";

interface BarChartProps {
  title: string;
  subtitle?: string;
  source?: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: { key: string; color: string; name: string }[];
  stacked?: boolean;
  className?: string;
}

export function BarChartComponent({
  title,
  subtitle,
  source,
  data,
  xKey,
  yKeys,
  stacked = false,
  className,
}: BarChartProps) {
  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      source={source}
      data={data}
      className={className}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBar data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            width={70}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          {yKeys.length > 1 && <Legend />}
          {yKeys.map((yKey) => (
            <Bar
              key={yKey.key}
              dataKey={yKey.key}
              fill={yKey.color}
              name={yKey.name}
              stackId={stacked ? "stack" : undefined}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBar>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
