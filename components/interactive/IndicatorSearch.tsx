"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface IndicatorSearchProps {
  query: string;
  onChange: (q: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export function IndicatorSearch({ query, onChange, placeholder = "Search indicators…", resultCount }: IndicatorSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <div
      className={`relative flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-all duration-200 ${
        focused
          ? "border-[#006C35] shadow-md shadow-[#006C35]/10"
          : "border-border shadow-sm"
      }`}
    >
      <Search size={17} className={`shrink-0 transition-colors ${focused ? "text-[#006C35]" : "text-muted-foreground"}`} />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      {query ? (
        <button
          onClick={() => { onChange(""); inputRef.current?.focus(); }}
          className="shrink-0 rounded-md p-0.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={15} />
        </button>
      ) : (
        <kbd className="hidden sm:flex items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {query && resultCount !== undefined && (
        <span className="shrink-0 rounded-full bg-[#006C35]/10 px-2 py-0.5 text-xs font-semibold text-[#006C35]">
          {resultCount}
        </span>
      )}
    </div>
  );
}
