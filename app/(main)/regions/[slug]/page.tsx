"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Ruler, Users } from "lucide-react";
import { SAUDI_REGIONS } from "@/lib/data/regions";
import { SEED_DATA } from "@/lib/data/seed-data";
import { StatCard } from "@/components/charts";
import { BarChartComponent } from "@/components/charts";
import { notFound } from "next/navigation";

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export default function RegionDetailPage({ params }: RegionPageProps) {
  const { slug } = use(params);
  const region = SAUDI_REGIONS.find((r) => r.slug === slug);

  if (!region) notFound();

  const populationData = SEED_DATA.filter(
    (d) =>
      d.indicatorSlug === "total-population" &&
      d.region === slug
  ).sort((a, b) => a.year - b.year);

  const latestPop = populationData[populationData.length - 1];
  const density = latestPop ? Math.round(latestPop.value / region.area) : 0;

  const allRegionsPop = SAUDI_REGIONS.map((r) => {
    const dp = SEED_DATA.find(
      (d) =>
        d.indicatorSlug === "total-population" &&
        d.region === r.slug &&
        d.year === 2024
    );
    return {
      region: r.nameEn.length > 10 ? r.nameEn.substring(0, 10) + "..." : r.nameEn,
      Population: dp ? Math.round(dp.value / 1000) : 0,
      isCurrent: r.slug === slug,
    };
  }).sort((a, b) => b.Population - a.Population);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/regions"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        All Regions
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#006C35]/10 text-[#006C35]">
            <MapPin size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {region.nameEn}
            </h1>
            <p className="text-lg text-muted-foreground">{region.nameAr}</p>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Population"
          value={
            latestPop
              ? `${(latestPop.value / 1_000_000).toFixed(1)}M`
              : "N/A"
          }
          subtitle={latestPop ? `${latestPop.year}` : ""}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Capital"
          value={region.capital}
          subtitle="Administrative Center"
          icon={<MapPin size={20} />}
        />
        <StatCard
          title="Area"
          value={`${region.area.toLocaleString()} km²`}
          subtitle="Total Area"
          icon={<Ruler size={20} />}
        />
        <StatCard
          title="Population Density"
          value={`${density} /km²`}
          subtitle="Persons per square kilometer"
          icon={<Users size={20} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BarChartComponent
          title="Population Comparison"
          subtitle="All Regions (2024, Thousands)"
          source="GASTAT"
          data={allRegionsPop}
          xKey="region"
          yKeys={[
            { key: "Population", color: "#006C35", name: "Population (K)" },
          ]}
        />
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground">
            Region Profile
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                About {region.nameEn}
              </p>
              <p className="mt-1 text-sm text-foreground">
                {region.nameEn} is one of the 13 administrative regions of Saudi
                Arabia. Its capital city is {region.capital}. The region covers
                an area of {region.area.toLocaleString()} square kilometers.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Data Sources
              </p>
              <p className="mt-1 text-sm text-foreground">
                Regional data is sourced from GASTAT (General Authority for
                Statistics) and SAMA (Saudi Central Bank).
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">
                More regional indicators will be available as data is imported
                from official sources. Visit{" "}
                <a
                  href="https://stats.gov.sa"
                  className="text-[#006C35] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  stats.gov.sa
                </a>{" "}
                for the latest releases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
