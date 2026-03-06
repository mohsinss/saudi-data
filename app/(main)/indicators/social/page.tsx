"use client";

import { useState, useMemo } from "react";
import { INDICATOR_CATALOG, SUBCATEGORY_LABELS } from "@/lib/data/indicators";
import { SEED_DATA } from "@/lib/data/seed-data";
import { ChartCard, SubcategoryNav, IndicatorSearch } from "@/components/interactive";
import type { ChartType } from "@/components/charts/ChartWrapper";

const SOCIAL_SUBCATEGORY_ICONS: Record<string, string> = {
  population: "👥",
  labor: "💼",
  housing: "🏠",
  health: "🏥",
  education: "🎓",
  disability: "♿",
};

function getChartData(slug: string): { period: string; Value: number; name?: string; value?: number }[] {
  const hasBreakdowns = SEED_DATA.some((d) => d.indicatorSlug === slug && d.breakdownValue);

  if (hasBreakdowns) {
    const latestYear = Math.max(...SEED_DATA.filter((d) => d.indicatorSlug === slug).map((d) => d.year));
    return SEED_DATA
      .filter((d) => d.indicatorSlug === slug && d.year === latestYear && d.breakdownValue)
      .map((d) => ({ period: d.breakdownValue as string, Value: d.value, name: d.breakdownValue as string, value: d.value }));
  }

  return SEED_DATA
    .filter((d) => d.indicatorSlug === slug && !d.region)
    .sort((a, b) => (a.year * 10000 + (a.month ?? 0) * 100 + (a.quarter ?? 0)) - (b.year * 10000 + (b.month ?? 0) * 100 + (b.quarter ?? 0)))
    .map((d) => {
      let period = d.year.toString();
      if (d.month) period = `${d.year}-${String(d.month).padStart(2, "0")}`;
      else if (d.quarter) period = `${d.year} Q${d.quarter}`;
      return { period, Value: d.value };
    });
}

function resolveDefaultType(chartType: string): ChartType {
  if (chartType === "line") return "line";
  if (chartType === "area" || chartType === "stacked-area") return "area";
  return "bar";
}

export default function SocialIndicatorsPage() {
  const [query, setQuery] = useState("");

  const socialIndicators = useMemo(
    () => INDICATOR_CATALOG.filter((i) => i.category === "social"),
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return socialIndicators;
    const q = query.toLowerCase();
    return socialIndicators.filter(
      (i) => i.nameEn.toLowerCase().includes(q) || i.subcategory.includes(q) || i.source.toLowerCase().includes(q)
    );
  }, [query, socialIndicators]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, ind) => {
      const key = ind.subcategory;
      if (!acc[key]) acc[key] = [];
      acc[key].push(ind);
      return acc;
    }, {} as Record<string, typeof filtered>);
  }, [filtered]);

  const subcategoryIds = useMemo(
    () =>
      Object.keys(
        socialIndicators.reduce((acc, i) => ({ ...acc, [i.subcategory]: 1 }), {} as Record<string, number>)
      ),
    [socialIndicators]
  );

  const navSections = subcategoryIds.map((id) => ({
    id,
    label: SUBCATEGORY_LABELS[id]?.en ?? id,
    icon: SOCIAL_SUBCATEGORY_ICONS[id],
  }));

  const totalVisible = Object.values(grouped).flat().length;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="rounded-lg bg-[#006C35]/10 p-2 text-[#006C35]">👥</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Social Indicators</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Comprehensive social data for the Kingdom of Saudi Arabia — population, labor, housing, health, education, and disability statistics.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-xl">
        <IndicatorSearch
          query={query}
          onChange={setQuery}
          placeholder="Search social indicators…"
          resultCount={query ? totalVisible : undefined}
        />
      </div>

      <div className="flex gap-8">
        {/* Sticky Sidebar */}
        <SubcategoryNav sections={navSections} />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {Object.keys(grouped).length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-5xl mb-4">🔍</span>
              <p className="text-lg font-semibold text-foreground">No indicators found</p>
              <p className="mt-1 text-muted-foreground">Try a different keyword</p>
            </div>
          )}

          {Object.entries(grouped).map(([subcategory, indicators]) => {
            const label = SUBCATEGORY_LABELS[subcategory];
            const icon = SOCIAL_SUBCATEGORY_ICONS[subcategory];
            return (
              <section
                key={subcategory}
                id={`section-${subcategory}`}
                className="mb-14 scroll-mt-28"
              >
                <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
                  <span className="text-2xl">{icon}</span>
                  <h2 className="text-xl font-bold text-foreground">{label?.en ?? subcategory}</h2>
                  <span className="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    {indicators.length} indicator{indicators.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {indicators.map((ind) => {
                    const data = getChartData(ind.slug);
                    if (data.length === 0) return null;
                    const isPie = ind.chartType === "pie";
                    return (
                      <ChartCard
                        key={ind.slug}
                        title={ind.nameEn}
                        subtitle={`${ind.unit} · ${ind.frequency}`}
                        source={ind.source}
                        data={data}
                        xKey="period"
                        valueKey="Value"
                        defaultType={resolveDefaultType(ind.chartType)}
                        isPie={isPie}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
