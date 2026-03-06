"use client";

import { LineChartComponent } from "@/components/charts";
import { SEED_DATA } from "@/lib/data/seed-data";

export function GDPChart() {
  const gdpConstant = SEED_DATA.filter(
    (d) => d.indicatorSlug === "gdp-constant" && !d.month && !d.quarter
  ).map((d) => ({ year: d.year.toString(), value: d.value }));

  const gdpNominal = SEED_DATA.filter(
    (d) => d.indicatorSlug === "gdp-nominal" && !d.month && !d.quarter
  ).map((d) => ({ year: d.year.toString(), nominal: d.value }));

  const merged = gdpConstant.map((c) => {
    const n = gdpNominal.find((d) => d.year === c.year);
    return {
      year: c.year,
      "Real GDP": c.value,
      "Nominal GDP": n?.nominal ?? 0,
    };
  });

  return (
    <LineChartComponent
      title="Gross Domestic Product (GDP)"
      subtitle="Evolution of Real and Nominal GDP (Annual, SAR Billion)"
      source="GASTAT"
      data={merged}
      xKey="year"
      yKeys={[
        { key: "Real GDP", color: "#006C35", name: "Real GDP" },
        { key: "Nominal GDP", color: "#FFD700", name: "Nominal GDP" },
      ]}
    />
  );
}
