import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#006C35] text-white font-bold text-sm">
                D
              </div>
              <span className="font-bold text-foreground">DataSaudi</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              A unified platform to present and analyze the latest economic and
              social data for the Kingdom of Saudi Arabia.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Economic</h4>
            <ul className="mt-3 space-y-2">
              {[
                "GDP",
                "Inflation (CPI)",
                "Trade Balance",
                "Public Finances",
                "Monetary",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/indicators/economic"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Social</h4>
            <ul className="mt-3 space-y-2">
              {[
                "Population",
                "Labor Market",
                "Housing",
                "Health",
                "Education",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/indicators/social"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Data Sources</h4>
            <ul className="mt-3 space-y-2">
              {[
                { name: "GASTAT", url: "https://stats.gov.sa" },
                { name: "SAMA", url: "https://www.sama.gov.sa" },
                { name: "MOF", url: "https://www.mof.gov.sa" },
                { name: "World Bank", url: "https://data.worldbank.org" },
                { name: "Saudi Open Data", url: "https://open.data.gov.sa" },
              ].map((src) => (
                <li key={src.name}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {src.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>Kingdom of Saudi Arabia</p>
          <p className="mt-1">
            For feedback and inquiries: datasaudi@mep.gov.sa
          </p>
          <p className="mt-1">
            Ministry of Economy &amp; Planning. All Rights Reserved &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
