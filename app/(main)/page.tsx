"use client";

import Link from "next/link";
import { useState } from "react";
import {
  TrendingUp, Users, Banknote, BarChart3,
  Briefcase, Building2, Droplets, GraduationCap,
  Heart, Home, ArrowUpRight, ChevronRight,
} from "lucide-react";
import { SaudiMap } from "@/components/charts";
import { AnimatedStat } from "@/components/interactive";
import { GDPChart } from "./indicators/_components/GDPChart";
import { CPIChart } from "./indicators/_components/CPIChart";
import { PopulationChart } from "./indicators/_components/PopulationChart";
import { SAUDI_REGIONS } from "@/lib/data/regions";
import { SEED_DATA } from "@/lib/data/seed-data";

const KEY_STATS = [
  { title: "Gross Domestic Product", value: "SAR 1.2T", subtitle: "Q3 2025 · Constant Prices", change: 4.4, changeLabel: "YoY", icon: <TrendingUp size={20} />, color: "#006C35" },
  { title: "Merchandise Exports", value: "SAR 97.2B", subtitle: "December 2025", change: -2.2, changeLabel: "MoM", icon: <Banknote size={20} />, color: "#0288D1" },
  { title: "Merchandise Imports", value: "SAR 84.2B", subtitle: "December 2025", change: 4.8, changeLabel: "MoM", icon: <Banknote size={20} />, color: "#7B1FA2" },
  { title: "Inflation (CPI)", value: "1.8%", subtitle: "January 2026", icon: <BarChart3 size={20} />, color: "#E65100" },
  { title: "Saudi Unemployment", value: "7.5%", subtitle: "Q3 2025", change: -0.1, changeLabel: "QoQ", icon: <Briefcase size={20} />, color: "#D32F2F" },
  { title: "Total Population", value: "35.3M", subtitle: "2024", change: 4.7, changeLabel: "YoY", icon: <Users size={20} />, color: "#006C35" },
];

const EXPLORE_SECTIONS = [
  { href: "/indicators/economic", icon: "📈", label: "Economic Indicators", desc: "GDP, CPI, Trade, Monetary & more", color: "#006C35" },
  { href: "/indicators/social", icon: "👥", label: "Social Indicators", desc: "Population, Labor, Housing & more", color: "#0288D1" },
  { href: "/regions", icon: "🗺", label: "Regional Data", desc: "All 13 administrative regions", color: "#7B1FA2" },
  { href: "/data-explorer", icon: "🔬", label: "Data Explorer", desc: "Search, filter & export all data", color: "#E65100" },
];

const CATEGORY_LINKS = [
  { href: "/indicators/economic", icon: <TrendingUp size={16} />, label: "Real Sector" },
  { href: "/indicators/economic", icon: <Banknote size={16} />, label: "Fiscal" },
  { href: "/indicators/economic", icon: <Building2 size={16} />, label: "Monetary" },
  { href: "/indicators/economic", icon: <BarChart3 size={16} />, label: "External Trade" },
  { href: "/indicators/economic", icon: <Droplets size={16} />, label: "Energy" },
  { href: "/indicators/social", icon: <Users size={16} />, label: "Population" },
  { href: "/indicators/social", icon: <Briefcase size={16} />, label: "Labor" },
  { href: "/indicators/social", icon: <Home size={16} />, label: "Housing" },
  { href: "/indicators/social", icon: <Heart size={16} />, label: "Health" },
  { href: "/indicators/social", icon: <GraduationCap size={16} />, label: "Education" },
];

type TabKey = "economic" | "social";

export default function KingdomOverviewPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("economic");
  const [mapMetric, setMapMetric] = useState<"population" | "area">("population");

  const regionMapData = SAUDI_REGIONS.map((r) => {
    const val = SEED_DATA.find(
      (d) => d.indicatorSlug === "total-population" && d.region === r.slug && d.year === 2024
    );
    return { slug: r.slug, value: val?.value ?? Math.random() * 5000000 };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      {/* ── Hero ── */}
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-3xl bg-[#006C35] p-10 text-white shadow-2xl md:p-16">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute top-6 right-6 opacity-10 text-[200px] leading-none select-none">🇸🇦</div>

          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Data · Updated Jan 2026
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight md:text-5xl lg:text-6xl">
              Kingdom of <br />Saudi Arabia
            </h1>
            <p className="mt-5 text-lg text-white/80 leading-relaxed">
              A unified platform to present and analyze the latest economic and social data for the Kingdom and its regions in visually interactive ways.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/indicators/economic" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#006C35] shadow-sm transition-all hover:scale-105 active:scale-95">
                Explore Economic Data <ArrowUpRight size={16} />
              </Link>
              <Link href="/indicators/social" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/50">
                Social Indicators <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Stats ── */}
      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Overview</h2>
          <span className="text-xs text-muted-foreground">Latest available figures</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KEY_STATS.map((stat) => (
            <AnimatedStat key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      {/* ── Explore Sections ── */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-foreground">Explore our reports</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXPLORE_SECTIONS.map((sec) => (
            <Link
              key={sec.label}
              href={sec.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(circle at 0% 0%, ${sec.color}10, transparent 60%)` }} />
              <div className="text-3xl mb-3">{sec.icon}</div>
              <h3 className="font-bold text-foreground text-sm group-hover:text-[#006C35] transition-colors">{sec.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{sec.desc}</p>
              <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:right-3" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Tabbed Charts ── */}
      <section className="mb-12">
        <div className="mb-5 flex items-center gap-1 border-b border-border">
          {(["economic", "social"] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`-mb-px px-5 py-3 text-sm font-semibold capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? "border-[#006C35] text-[#006C35]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab} Indicators
            </button>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {activeTab === "economic" ? (
            <>
              <GDPChart />
              <CPIChart />
            </>
          ) : (
            <>
              <PopulationChart />
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-base font-bold text-foreground mb-4">Quick Access</h3>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORY_LINKS.slice(5).map((link) => (
                    <Link key={link.label} href={link.href} className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-3 text-sm font-medium text-foreground transition-all hover:bg-[#006C35]/5 hover:border-[#006C35]/30 hover:text-[#006C35]">
                      <span className="text-[#006C35]">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Interactive Map ── */}
      <section className="mb-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-foreground">Regions</h2>
          <div className="flex items-center gap-2">
            {(["population", "area"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMapMetric(m)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  mapMetric === m
                    ? "bg-[#006C35] text-white"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "population" ? "👥 Population" : "📐 Land Area"}
              </button>
            ))}
            <Link href="/regions" className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-[#006C35] transition-colors">
              Explore all →
            </Link>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 min-h-[480px]">
            <SaudiMap data={regionMapData} valueLabel="Population" />
          </div>
          <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-1">
            {SAUDI_REGIONS.map((region, i) => {
              const pop = SEED_DATA.find(
                (d) => d.indicatorSlug === "total-population" && d.region === region.slug && d.year === 2024
              )?.value;
              return (
                <Link
                  key={region.slug}
                  href={`/regions/${region.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition-all hover:border-[#006C35]/30 hover:shadow-md hover:-translate-x-0.5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#006C35]/10 text-xs font-bold text-[#006C35]">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-[#006C35] transition-colors">
                      {region.nameEn}
                    </p>
                    <p className="text-xs text-muted-foreground">{region.capital}</p>
                  </div>
                  {pop && (
                    <p className="text-xs font-medium text-muted-foreground shrink-0">
                      {(pop / 1_000_000).toFixed(1)}M
                    </p>
                  )}
                  <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── All Categories ── */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-foreground">All Categories</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-[#006C35] hover:text-white hover:border-[#006C35] hover:shadow-sm"
            >
              <span className="text-[#006C35] group-hover:text-white">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
