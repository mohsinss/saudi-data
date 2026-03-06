import { type ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n/context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider defaultLocale="en">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </I18nProvider>
  );
}
