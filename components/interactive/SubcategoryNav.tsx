"use client";

import { useEffect, useState, useCallback } from "react";

interface SubcategoryNavProps {
  sections: { id: string; label: string; icon?: string }[];
}

export function SubcategoryNav({ sections }: SubcategoryNavProps) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  const onScroll = useCallback(() => {
    let current = sections[0]?.id ?? "";
    for (const sec of sections) {
      const el = document.getElementById(`section-${sec.id}`);
      if (el) {
        const { top } = el.getBoundingClientRect();
        if (top <= 130) current = sec.id;
      }
    }
    setActive(current);
  }, [sections]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-[72px] h-fit w-56 shrink-0 hidden xl:block">
      <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
        <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Sections
        </p>
        <ul className="space-y-0.5">
          {sections.map((sec) => (
            <li key={sec.id}>
              <button
                onClick={() => scrollTo(sec.id)}
                className={`w-full text-left flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                  active === sec.id
                    ? "bg-[#006C35]/10 text-[#006C35] font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {sec.icon && <span className="text-base leading-none">{sec.icon}</span>}
                <span className="truncate leading-snug">{sec.label}</span>
                {active === sec.id && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#006C35]" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
