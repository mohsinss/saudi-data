"use client";

import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { SAUDI_REGIONS } from "@/lib/data/regions";
import { SEED_DATA } from "@/lib/data/seed-data";
import { BarChartComponent, SaudiMap } from "@/components/charts";

function getRegionPopulation(slug: string): number {
  const dp = SEED_DATA.find(
    (d) =>
      d.indicatorSlug === "total-population" &&
      d.region === slug &&
      d.year === 2024
  );
  return dp?.value ?? 0;
}

export default function RegionsPage() {
  const regionsWithPop = SAUDI_REGIONS.map((r) => ({
    ...r,
    population: getRegionPopulation(r.slug),
  })).sort((a, b) => b.population - a.population);

  const barData = regionsWithPop.map((r) => ({
    name: r.nameEn.length > 12 ? r.nameEn.substring(0, 12) + "..." : r.nameEn,
    Population: Math.round(r.population / 1000),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Regions</h1>
        <p className="mt-2 text-muted-foreground">
          Explore economic and social data for all 13 administrative regions of
          Saudi Arabia.
        </p>
      </div>

      <div className="mb-10 grid gap-6 lg:grid-cols-2">
        <div className="h-[400px]">
          <SaudiMap 
            data={regionsWithPop.map(r => ({ slug: r.slug, value: r.population }))}
            valueLabel="Population"
          />
        </div>
        <BarChartComponent
          title="Population by Region"
          subtitle="2024 Estimates (Thousands)"
          source="GASTAT"
          data={barData}
          xKey="name"
          yKeys={[{ key: "Population", color: "#006C35", name: "Population (K)" }]}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regionsWithPop.map((region) => (
          <Link
            key={region.slug}
            href={`/regions/${region.slug}`}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-[#006C35]/30 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-[#006C35]">
                  {region.nameEn}
                </h3>
                <p className="text-sm text-muted-foreground">{region.nameAr}</p>
              </div>
              <MapPin size={20} className="text-[#006C35] opacity-60" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Capital:</span>
                {region.capital}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Area:</span>
                {region.area.toLocaleString()} km²
              </div>
              {region.population > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Users size={14} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {(region.population / 1_000_000).toFixed(1)}M
                  </span>
                  <span className="text-muted-foreground">(2024)</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
