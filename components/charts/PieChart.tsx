"use client";

import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";

const COLORS = [
  "#006C35", "#1B5E20", "#2E7D32", "#388E3C", "#43A047",
  "#4CAF50", "#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9",
  "#FFD700", "#FFC107", "#FF9800",
];

interface PieChartProps {
  title: string;
  subtitle?: string;
  source?: string;
  data: { name: string; value: number }[];
  className?: string;
}

export function PieChartComponent({
  title,
  subtitle,
  source,
  data,
  className,
}: PieChartProps) {
  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      source={source}
      data={data}
      className={className}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            label={false}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Legend />
        </RechartsPie>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
