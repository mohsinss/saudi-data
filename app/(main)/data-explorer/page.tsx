"use client";

import { useState, useMemo, useCallback } from "react";
import { Download, Search, Filter, FileSpreadsheet, FileJson } from "lucide-react";
import { INDICATOR_CATALOG, SUBCATEGORY_LABELS } from "@/lib/data/indicators";
import { SEED_DATA, type SeedPoint } from "@/lib/data/seed-data";

type ExportFormat = "csv" | "json" | "excel";

function formatPeriod(d: SeedPoint): string {
  if (d.month) return `${d.year}-${String(d.month).padStart(2, "0")}`;
  if (d.quarter) return `${d.year} Q${d.quarter}`;
  return d.year.toString();
}

function exportData(data: Record<string, unknown>[], format: ExportFormat, filename: string) {
  if (format === "json") {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
    return;
  }

  const headers = Object.keys(data[0] ?? {});
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h];
        return typeof val === "string" && val.includes(",") ? `"${val}"` : val;
      }).join(",")
    ),
  ].join("\n");

  const mimeType = format === "excel"
    ? "application/vnd.ms-excel"
    : "text/csv";
  const ext = format === "excel" ? "xls" : "csv";

  const blob = new Blob([csvContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${ext}`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DataExplorerPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState<string>("all");
  const [yearFrom, setYearFrom] = useState<number>(2016);
  const [yearTo, setYearTo] = useState<number>(2026);
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);

  const filteredIndicators = useMemo(() => {
    return INDICATOR_CATALOG.filter((ind) => {
      const matchSearch =
        search === "" ||
        ind.nameEn.toLowerCase().includes(search.toLowerCase()) ||
        ind.nameAr.includes(search);
      const matchCategory =
        categoryFilter === "all" || ind.category === categoryFilter;
      const matchSubcategory =
        subcategoryFilter === "all" || ind.subcategory === subcategoryFilter;
      return matchSearch && matchCategory && matchSubcategory;
    });
  }, [search, categoryFilter, subcategoryFilter]);

  const tableData = useMemo(() => {
    if (!selectedIndicator) return [];
    return SEED_DATA.filter(
      (d) =>
        d.indicatorSlug === selectedIndicator &&
        !d.region &&
        d.year >= yearFrom &&
        d.year <= yearTo
    )
      .sort((a, b) => {
        const dateA = a.year * 10000 + (a.month ?? 0) * 100 + (a.quarter ?? 0);
        const dateB = b.year * 10000 + (b.month ?? 0) * 100 + (b.quarter ?? 0);
        return dateA - dateB;
      })
      .map((d) => ({
        Period: formatPeriod(d),
        Year: d.year,
        Value: d.value,
        Indicator: selectedIndicator,
      }));
  }, [selectedIndicator, yearFrom, yearTo]);

  const selectedMeta = INDICATOR_CATALOG.find((i) => i.slug === selectedIndicator);

  const handleExport = useCallback(
    (format: ExportFormat) => {
      if (tableData.length === 0) return;
      exportData(tableData, format, selectedIndicator ?? "data");
    },
    [tableData, selectedIndicator]
  );

  const uniqueSubcategories = useMemo(() => {
    const cats =
      categoryFilter === "all"
        ? INDICATOR_CATALOG
        : INDICATOR_CATALOG.filter((i) => i.category === categoryFilter);
    return [...new Set(cats.map((i) => i.subcategory))];
  }, [categoryFilter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Data Explorer</h1>
        <p className="mt-2 text-muted-foreground">
          Search, filter, and download Saudi economic and social data in
          multiple formats.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-muted-foreground" />
          <span className="font-medium text-foreground">Filters</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Search
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search indicators..."
                className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setSubcategoryFilter("all");
              }}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Categories</option>
              <option value="economic">Economic</option>
              <option value="social">Social</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Subcategory
            </label>
            <select
              value={subcategoryFilter}
              onChange={(e) => setSubcategoryFilter(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Subcategories</option>
              {uniqueSubcategories.map((sc) => (
                <option key={sc} value={sc}>
                  {SUBCATEGORY_LABELS[sc]?.en ?? sc}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Year From
              </label>
              <input
                type="number"
                value={yearFrom}
                onChange={(e) => setYearFrom(parseInt(e.target.value, 10))}
                min={2000}
                max={2030}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Year To
              </label>
              <input
                type="number"
                value={yearTo}
                onChange={(e) => setYearTo(parseInt(e.target.value, 10))}
                min={2000}
                max={2030}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Indicator list */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:col-span-1">
          <h3 className="mb-3 font-semibold text-foreground">
            Indicators ({filteredIndicators.length})
          </h3>
          <div className="max-h-[600px] space-y-1 overflow-y-auto">
            {filteredIndicators.map((ind) => (
              <button
                key={ind.slug}
                onClick={() => setSelectedIndicator(ind.slug)}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  selectedIndicator === ind.slug
                    ? "bg-[#006C35] text-white"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <div className="font-medium">{ind.nameEn}</div>
                <div
                  className={`text-xs ${
                    selectedIndicator === ind.slug
                      ? "text-white/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {ind.source} | {ind.frequency} | {ind.unit}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Data table */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:col-span-2">
          {selectedIndicator && selectedMeta ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {selectedMeta.nameEn}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedMeta.source} | {selectedMeta.unit} |{" "}
                    {selectedMeta.frequency}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleExport("csv")}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Download size={14} />
                    CSV
                  </button>
                  <button
                    onClick={() => handleExport("json")}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <FileJson size={14} />
                    JSON
                  </button>
                  <button
                    onClick={() => handleExport("excel")}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <FileSpreadsheet size={14} />
                    Excel
                  </button>
                </div>
              </div>

              {tableData.length > 0 ? (
                <div className="max-h-[550px] overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-card">
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                          Period
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                          Year
                        </th>
                        <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, i) => (
                        <tr
                          key={i}
                          className="border-b border-border/50 hover:bg-accent/50"
                        >
                          <td className="px-4 py-2.5 text-foreground">
                            {row.Period}
                          </td>
                          <td className="px-4 py-2.5 text-foreground">
                            {row.Year}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono text-foreground">
                            {typeof row.Value === "number"
                              ? row.Value.toLocaleString()
                              : row.Value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-muted-foreground">
                  No data available for the selected filters.
                </div>
              )}
            </>
          ) : (
            <div className="flex h-64 items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Search size={48} className="mx-auto mb-3 opacity-30" />
                <p>Select an indicator from the list to view data</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
