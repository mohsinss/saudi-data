"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  icon,
  className = "",
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === undefined || change === 0;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#006C35]/10 text-[#006C35]">
            {icon}
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="mt-4 flex items-center gap-1.5 bg-muted/50 w-fit px-2.5 py-1 rounded-full">
          {isPositive && <TrendingUp size={14} className="text-emerald-600" />}
          {isNegative && <TrendingDown size={14} className="text-rose-600" />}
          {isNeutral && <Minus size={14} className="text-muted-foreground" />}
          <span
            className={`text-sm font-semibold ${
              isPositive
                ? "text-emerald-600"
                : isNegative
                  ? "text-rose-600"
                  : "text-muted-foreground"
            }`}
          >
            {isPositive && "+"}
            {change?.toFixed(1)}%
          </span>
          {changeLabel && (
            <span className="text-xs font-medium text-muted-foreground ml-1">
              {changeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
