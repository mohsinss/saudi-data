import { ReactNode } from "react";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#006C35",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "DataSaudi - Kingdom of Saudi Arabia",
    template: "%s | DataSaudi",
  },
  description:
    "A unified platform to present and analyze the latest economic and social data for the Kingdom of Saudi Arabia and its regions.",
  keywords: [
    "Saudi Arabia",
    "economic data",
    "GDP",
    "population",
    "statistics",
    "GASTAT",
    "SAMA",
    "Vision 2030",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoArabic.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
