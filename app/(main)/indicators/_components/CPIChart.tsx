"use client";

import { BarChartComponent } from "@/components/charts";
import { SEED_DATA } from "@/lib/data/seed-data";

export function CPIChart() {
  const cpiMonthly = SEED_DATA.filter(
    (d) => d.indicatorSlug === "cpi" && d.month && d.year >= 2025
  )
    .sort((a, b) => (a.year - b.year) * 100 + (a.month ?? 0) - (b.month ?? 0))
    .map((d) => ({
      period: `${d.year}-${String(d.month).padStart(2, "0")}`,
      "Inflation Rate": d.value,
    }));

  return (
    <BarChartComponent
      title="Consumer Price Index (CPI)"
      subtitle="Monthly Inflation Rate (%)"
      source="GASTAT"
      data={cpiMonthly}
      xKey="period"
      yKeys={[{ key: "Inflation Rate", color: "#006C35", name: "Inflation %" }]}
    />
  );
}
