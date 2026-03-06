"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Globe, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const NAV_ITEMS = [
  { href: "/", labelKey: "overview" as const },
  { href: "/indicators/economic", labelKey: "economic" as const },
  { href: "/indicators/social", labelKey: "social" as const },
  { href: "/regions", labelKey: "regions" as const },
  { href: "/data-explorer", labelKey: "dataExplorer" as const },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#006C35] text-white font-bold text-lg">
            D
          </div>
          <div>
            <span className="text-lg font-bold text-[#006C35]">{t.site.name}</span>
            <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">
              {t.site.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#006C35]/10 text-[#006C35]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {t.nav[item.labelKey]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Search size={18} />
          </button>
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Globe size={16} />
            <span>{locale === "en" ? "AR" : "EN"}</span>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-foreground lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-white px-4 py-3 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {t.nav[item.labelKey]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
