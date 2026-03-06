"use client";

import { useRef, useCallback, useState, type ReactNode } from "react";
import { Download, Maximize2, X, BarChart2, LineChart as LineIcon, TrendingUp } from "lucide-react";

export type ChartType = "bar" | "line" | "area";

interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  source?: string;
  children: ReactNode;
  data?: Record<string, unknown>[];
  className?: string;
  allowedChartTypes?: ChartType[];
  activeChartType?: ChartType;
  onChartTypeChange?: (type: ChartType) => void;
}

const CHART_TYPE_ICONS: Record<ChartType, ReactNode> = {
  bar: <BarChart2 size={13} />,
  line: <LineIcon size={13} />,
  area: <TrendingUp size={13} />,
};

export function ChartWrapper({
  title,
  subtitle,
  source,
  children,
  data,
  className = "",
  allowedChartTypes,
  activeChartType,
  onChartTypeChange,
}: ChartWrapperProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const downloadCSV = useCallback(() => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((h) => row[h] ?? "").join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data, title]);

  const cardContent = (fullscreen: boolean) => (
    <div
      ref={fullscreen ? undefined : chartRef}
      className={`group rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${fullscreen ? "p-8" : "p-6"} ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-foreground leading-tight">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-xs font-medium text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {allowedChartTypes && allowedChartTypes.length > 1 && onChartTypeChange && (
            <div className="flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
              {allowedChartTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => onChartTypeChange(type)}
                  title={type.charAt(0).toUpperCase() + type.slice(1)}
                  className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium capitalize transition-all ${
                    activeChartType === type
                      ? "bg-white shadow-sm text-[#006C35]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {CHART_TYPE_ICONS[type]}
                </button>
              ))}
            </div>
          )}
          {data && data.length > 0 && (
            <button
              onClick={downloadCSV}
              className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 px-2 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-[#006C35] hover:text-white hover:border-[#006C35] active:scale-95"
              title="Download CSV"
            >
              <Download size={12} />
              CSV
            </button>
          )}
          <button
            onClick={() => setIsFullscreen(!fullscreen)}
            className="flex items-center justify-center rounded-lg border border-border bg-muted/30 p-1.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
            title={fullscreen ? "Close" : "Fullscreen"}
          >
            {fullscreen ? <X size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      <div className={`w-full ${fullscreen ? "h-[600px]" : "h-[320px]"}`}>
        {children}
      </div>

      {source && (
        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">SOURCE</span>
          <span className="text-xs text-muted-foreground">{source}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {cardContent(false)}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) setIsFullscreen(false); }}
        >
          <div className="w-full max-w-5xl max-h-[90vh] overflow-auto">
            {cardContent(true)}
          </div>
        </div>
      )}
    </>
  );
}
