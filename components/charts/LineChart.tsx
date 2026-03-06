"use client";

import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";

interface LineChartProps {
  title: string;
  subtitle?: string;
  source?: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: { key: string; color: string; name: string }[];
  className?: string;
}

export function LineChartComponent({
  title,
  subtitle,
  source,
  data,
  xKey,
  yKeys,
  className,
}: LineChartProps) {
  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      source={source}
      data={data}
      className={className}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLine data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
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
            <Line
              key={yKey.key}
              type="monotone"
              dataKey={yKey.key}
              stroke={yKey.color}
              name={yKey.name}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </RechartsLine>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
