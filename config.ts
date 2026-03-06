const config = {
  appName: "DataSaudi",
  appDescription:
    "A unified platform to present and analyze the latest economic and social data for the Kingdom of Saudi Arabia.",
  domainName: "datasaudi.sa",
  crisp: { id: "", onlyShowOnRoutes: ["/"] },
  stripe: { plans: [] as { isFeatured?: boolean; priceId: string; name: string; description?: string; price: number; priceAnchor?: number; features: { name: string }[] }[] },
  aws: { bucket: "", bucketUrl: "", cdn: "" },
  mailgun: {
    subdomain: "",
    fromNoReply: "DataSaudi <noreply@datasaudi.sa>",
    fromAdmin: "DataSaudi <admin@datasaudi.sa>",
    supportEmail: "datasaudi@mep.gov.sa",
    forwardRepliesTo: "datasaudi@mep.gov.sa",
  },
  colors: { theme: "light", main: "#006C35" },
  auth: { loginUrl: "/api/auth/signin", callbackUrl: "/" },
};
export default config;

export const siteConfig = {
  appName: "DataSaudi",
  appNameAr: "بيانات السعودية",
  appDescription:
    "A unified platform to present and analyze the latest economic and social data for the Kingdom of Saudi Arabia.",
  appDescriptionAr:
    "منصة موحدة لعرض وتحليل أحدث البيانات الاقتصادية والاجتماعية للمملكة العربية السعودية.",
  domainName: "datasaudi.sa",
  locale: {
    default: "en" as const,
    supported: ["en", "ar"] as const,
  },
  colors: {
    primary: "#006C35",
    secondary: "#1B5E20",
    accent: "#FFD700",
    background: "#FAFAFA",
  },
  dataSources: {
    gastat: { name: "GASTAT", url: "https://stats.gov.sa" },
    sama: { name: "SAMA", url: "https://www.sama.gov.sa" },
    mof: { name: "MOF", url: "https://www.mof.gov.sa" },
    worldBank: { name: "World Bank", url: "https://data.worldbank.org" },
    openData: { name: "Saudi Open Data", url: "https://open.data.gov.sa" },
  },
} as const;

export type Locale = (typeof siteConfig.locale.supported)[number];
