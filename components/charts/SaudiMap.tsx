"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";

const geoUrl = "/geo/saudi-regions.topo.json";

// Map Highcharts TopoJSON names to our region slugs
const REGION_MAP: Record<string, string> = {
  "Tabuk": "tabouk",
  "Jizan": "jazan",
  "Najran": "najran",
  "Ar Riyad": "riyadh",
  "Al Madinah": "madinah",
  "Ha'il": "hail",
  "Al Quassim": "qasseem",
  "Al Hudud ash Shamaliyah": "northern-borders",
  "Al Jawf": "jouf",
  "Ash Sharqiyah": "eastern",
  "Al Bahah": "baha",
  "`Asir": "aseer",
  "Makkah": "makkah",
};

interface SaudiMapProps {
  data?: { slug: string; value: number }[];
  valueLabel?: string;
  onRegionClick?: (slug: string) => void;
}

export function SaudiMap({ data = [], valueLabel = "Value", onRegionClick }: SaudiMapProps) {
  const router = useRouter();
  const [tooltipContent, setTooltipContent] = useState("");

  const maxValue = useMemo(() => {
    return Math.max(...data.map((d) => d.value), 1);
  }, [data]);

  const getRegionColor = (slug: string) => {
    const regionData = data.find((d) => d.slug === slug);
    if (!regionData) return "#E2E8F0"; // muted/gray

    // Calculate opacity based on value relative to max (min 20% opacity)
    const intensity = 0.2 + (regionData.value / maxValue) * 0.8;
    // DataSaudi green is #006C35 (rgb: 0, 108, 53)
    return `rgba(0, 108, 53, ${intensity})`;
  };

  const handleRegionClick = (slug: string) => {
    if (onRegionClick) {
      onRegionClick(slug);
    } else {
      router.push(`/regions/${slug}`);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1800,
          center: [45, 24], // Center of Saudi Arabia
        }}
        width={800}
        height={600}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup center={[45, 24]} zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const topoName = geo.properties.name;
                const slug = REGION_MAP[topoName];
                const regionData = data.find((d) => d.slug === slug);
                const valueText = regionData
                  ? `${regionData.value.toLocaleString()}`
                  : "N/A";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getRegionColor(slug)}
                    stroke="#ffffff"
                    strokeWidth={1}
                    style={{
                      default: {
                        outline: "none",
                        transition: "all 250ms",
                      },
                      hover: {
                        fill: "#004D25", // Darker green on hover
                        outline: "none",
                        cursor: "pointer",
                        transition: "all 250ms",
                      },
                      pressed: {
                        fill: "#00331A",
                        outline: "none",
                      },
                    }}
                    onMouseEnter={() => {
                      setTooltipContent(`${topoName}<br/>${valueLabel}: ${valueText}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => slug && handleRegionClick(slug)}
                    data-tooltip-id="saudi-map-tooltip"
                    data-tooltip-html={tooltipContent}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip
        id="saudi-map-tooltip"
        style={{
          backgroundColor: "hsl(var(--card))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          fontSize: "13px",
          zIndex: 100,
        }}
      />
    </div>
  );
}
