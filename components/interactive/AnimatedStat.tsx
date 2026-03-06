"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AnimatedStatProps {
  title: string;
  value: string;
  subtitle: string;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  color?: string;
}

export function AnimatedStat({ title, value, subtitle, change, changeLabel, icon, color = "#006C35" }: AnimatedStatProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Gradient accent top border */}
      <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
              isPositive ? "bg-emerald-50 text-emerald-700" :
              isNegative ? "bg-red-50 text-red-600" :
              "bg-muted text-muted-foreground"
            }`}
          >
            {isPositive ? <TrendingUp size={11} /> : isNegative ? <TrendingDown size={11} /> : <Minus size={11} />}
            {Math.abs(change).toFixed(1)}% {changeLabel}
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-3xl font-extrabold tracking-tight text-foreground transition-all duration-700"
           style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(8px)" }}>
          {value}
        </p>
        <p className="mt-0.5 text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground/70">{subtitle}</p>
      </div>
    </div>
  );
}
