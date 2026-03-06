"use client";

import { AreaChartComponent } from "@/components/charts";
import { SEED_DATA } from "@/lib/data/seed-data";

export function PopulationChart() {
  const pop = SEED_DATA.filter(
    (d) => d.indicatorSlug === "total-population" && !d.region && !d.month && !d.quarter
  )
    .sort((a, b) => a.year - b.year)
    .map((d) => ({
      year: d.year.toString(),
      Population: Math.round(d.value / 1_000_000 * 10) / 10,
    }));

  return (
    <AreaChartComponent
      title="Total Population"
      subtitle="Evolution of Population (Millions)"
      source="GASTAT"
      data={pop}
      xKey="year"
      yKeys={[{ key: "Population", color: "#006C35", name: "Population (M)" }]}
    />
  );
}
