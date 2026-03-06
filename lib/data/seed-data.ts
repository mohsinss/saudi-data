export interface SeedPoint {
  indicatorSlug: string;
  year: number;
  quarter?: number;
  month?: number;
  value: number;
  region?: string;
  breakdown?: string;
  breakdownValue?: string;
}

export const SEED_DATA: SeedPoint[] = [
  // GDP at Constant Prices (SAR Billion) - Annual
  { indicatorSlug: "gdp-constant", year: 2016, value: 2596.0 },
  { indicatorSlug: "gdp-constant", year: 2017, value: 2564.7 },
  { indicatorSlug: "gdp-constant", year: 2018, value: 2633.8 },
  { indicatorSlug: "gdp-constant", year: 2019, value: 2642.5 },
  { indicatorSlug: "gdp-constant", year: 2020, value: 2529.2 },
  { indicatorSlug: "gdp-constant", year: 2021, value: 2618.9 },
  { indicatorSlug: "gdp-constant", year: 2022, value: 2838.5 },
  { indicatorSlug: "gdp-constant", year: 2023, value: 2812.3 },
  { indicatorSlug: "gdp-constant", year: 2024, value: 2860.0 },

  // GDP Nominal (SAR Billion) - Annual
  { indicatorSlug: "gdp-nominal", year: 2016, value: 2418.5 },
  { indicatorSlug: "gdp-nominal", year: 2017, value: 2582.3 },
  { indicatorSlug: "gdp-nominal", year: 2018, value: 2949.5 },
  { indicatorSlug: "gdp-nominal", year: 2019, value: 2899.3 },
  { indicatorSlug: "gdp-nominal", year: 2020, value: 2625.4 },
  { indicatorSlug: "gdp-nominal", year: 2021, value: 3125.6 },
  { indicatorSlug: "gdp-nominal", year: 2022, value: 3979.8 },
  { indicatorSlug: "gdp-nominal", year: 2023, value: 3758.8 },
  { indicatorSlug: "gdp-nominal", year: 2024, value: 3850.0 },

  // Quarterly GDP (SAR Billion)
  { indicatorSlug: "gdp-quarterly", year: 2024, quarter: 1, value: 1050.2 },
  { indicatorSlug: "gdp-quarterly", year: 2024, quarter: 2, value: 1089.5 },
  { indicatorSlug: "gdp-quarterly", year: 2024, quarter: 3, value: 1120.8 },
  { indicatorSlug: "gdp-quarterly", year: 2024, quarter: 4, value: 1142.0 },
  { indicatorSlug: "gdp-quarterly", year: 2025, quarter: 1, value: 1085.3 },
  { indicatorSlug: "gdp-quarterly", year: 2025, quarter: 2, value: 1140.1 },
  { indicatorSlug: "gdp-quarterly", year: 2025, quarter: 3, value: 1200.0 },

  // CPI Inflation Rate (%) - Monthly 2025
  { indicatorSlug: "cpi", year: 2025, month: 1, value: 1.6 },
  { indicatorSlug: "cpi", year: 2025, month: 2, value: 1.7 },
  { indicatorSlug: "cpi", year: 2025, month: 3, value: 1.7 },
  { indicatorSlug: "cpi", year: 2025, month: 4, value: 1.6 },
  { indicatorSlug: "cpi", year: 2025, month: 5, value: 1.5 },
  { indicatorSlug: "cpi", year: 2025, month: 6, value: 1.6 },
  { indicatorSlug: "cpi", year: 2025, month: 7, value: 1.7 },
  { indicatorSlug: "cpi", year: 2025, month: 8, value: 1.6 },
  { indicatorSlug: "cpi", year: 2025, month: 9, value: 1.7 },
  { indicatorSlug: "cpi", year: 2025, month: 10, value: 1.8 },
  { indicatorSlug: "cpi", year: 2025, month: 11, value: 1.8 },
  { indicatorSlug: "cpi", year: 2025, month: 12, value: 1.9 },
  { indicatorSlug: "cpi", year: 2026, month: 1, value: 1.8 },

  // CPI Annual
  { indicatorSlug: "cpi", year: 2016, value: 2.1 },
  { indicatorSlug: "cpi", year: 2017, value: -0.8 },
  { indicatorSlug: "cpi", year: 2018, value: 2.5 },
  { indicatorSlug: "cpi", year: 2019, value: -2.1 },
  { indicatorSlug: "cpi", year: 2020, value: 3.4 },
  { indicatorSlug: "cpi", year: 2021, value: 3.1 },
  { indicatorSlug: "cpi", year: 2022, value: 2.5 },
  { indicatorSlug: "cpi", year: 2023, value: 2.3 },
  { indicatorSlug: "cpi", year: 2024, value: 1.7 },

  // PMI (Index) - Monthly 2025
  { indicatorSlug: "pmi", year: 2025, month: 1, value: 56.3 },
  { indicatorSlug: "pmi", year: 2025, month: 2, value: 55.8 },
  { indicatorSlug: "pmi", year: 2025, month: 3, value: 56.1 },
  { indicatorSlug: "pmi", year: 2025, month: 4, value: 55.2 },
  { indicatorSlug: "pmi", year: 2025, month: 5, value: 56.4 },
  { indicatorSlug: "pmi", year: 2025, month: 6, value: 57.0 },
  { indicatorSlug: "pmi", year: 2025, month: 7, value: 56.8 },
  { indicatorSlug: "pmi", year: 2025, month: 8, value: 57.1 },
  { indicatorSlug: "pmi", year: 2025, month: 9, value: 56.5 },
  { indicatorSlug: "pmi", year: 2025, month: 10, value: 57.2 },
  { indicatorSlug: "pmi", year: 2025, month: 11, value: 57.4 },
  { indicatorSlug: "pmi", year: 2025, month: 12, value: 56.3 },

  // Government Revenue (SAR Billion) - Annual
  { indicatorSlug: "gov-revenue", year: 2016, value: 528.0 },
  { indicatorSlug: "gov-revenue", year: 2017, value: 692.0 },
  { indicatorSlug: "gov-revenue", year: 2018, value: 906.0 },
  { indicatorSlug: "gov-revenue", year: 2019, value: 927.0 },
  { indicatorSlug: "gov-revenue", year: 2020, value: 782.0 },
  { indicatorSlug: "gov-revenue", year: 2021, value: 965.0 },
  { indicatorSlug: "gov-revenue", year: 2022, value: 1268.0 },
  { indicatorSlug: "gov-revenue", year: 2023, value: 1212.0 },
  { indicatorSlug: "gov-revenue", year: 2024, value: 1184.0 },
  { indicatorSlug: "gov-revenue", year: 2025, value: 1112.0 },

  // Government Expenditure (SAR Billion) - Annual
  { indicatorSlug: "gov-expenditure", year: 2016, value: 830.0 },
  { indicatorSlug: "gov-expenditure", year: 2017, value: 930.0 },
  { indicatorSlug: "gov-expenditure", year: 2018, value: 1079.0 },
  { indicatorSlug: "gov-expenditure", year: 2019, value: 1059.0 },
  { indicatorSlug: "gov-expenditure", year: 2020, value: 1068.0 },
  { indicatorSlug: "gov-expenditure", year: 2021, value: 1015.0 },
  { indicatorSlug: "gov-expenditure", year: 2022, value: 1132.0 },
  { indicatorSlug: "gov-expenditure", year: 2023, value: 1293.0 },
  { indicatorSlug: "gov-expenditure", year: 2024, value: 1374.0 },
  { indicatorSlug: "gov-expenditure", year: 2025, value: 1388.0 },

  // Fiscal Balance (SAR Billion)
  { indicatorSlug: "fiscal-balance", year: 2016, value: -302.0 },
  { indicatorSlug: "fiscal-balance", year: 2017, value: -238.0 },
  { indicatorSlug: "fiscal-balance", year: 2018, value: -173.0 },
  { indicatorSlug: "fiscal-balance", year: 2019, value: -132.0 },
  { indicatorSlug: "fiscal-balance", year: 2020, value: -286.0 },
  { indicatorSlug: "fiscal-balance", year: 2021, value: -50.0 },
  { indicatorSlug: "fiscal-balance", year: 2022, value: 136.0 },
  { indicatorSlug: "fiscal-balance", year: 2023, value: -81.0 },
  { indicatorSlug: "fiscal-balance", year: 2024, value: -190.0 },
  { indicatorSlug: "fiscal-balance", year: 2025, value: -276.6 },

  // Money Supply M3 (SAR Billion)
  { indicatorSlug: "money-supply-m3", year: 2016, value: 1797.2 },
  { indicatorSlug: "money-supply-m3", year: 2017, value: 1808.9 },
  { indicatorSlug: "money-supply-m3", year: 2018, value: 1867.5 },
  { indicatorSlug: "money-supply-m3", year: 2019, value: 1938.3 },
  { indicatorSlug: "money-supply-m3", year: 2020, value: 2059.2 },
  { indicatorSlug: "money-supply-m3", year: 2021, value: 2261.4 },
  { indicatorSlug: "money-supply-m3", year: 2022, value: 2604.8 },
  { indicatorSlug: "money-supply-m3", year: 2023, value: 2784.1 },
  { indicatorSlug: "money-supply-m3", year: 2024, value: 2953.6 },
  { indicatorSlug: "money-supply-m3", year: 2025, value: 3200.0 },

  // Repo Rate (%)
  { indicatorSlug: "repo-rate", year: 2016, value: 2.0 },
  { indicatorSlug: "repo-rate", year: 2017, value: 2.0 },
  { indicatorSlug: "repo-rate", year: 2018, value: 3.0 },
  { indicatorSlug: "repo-rate", year: 2019, value: 2.25 },
  { indicatorSlug: "repo-rate", year: 2020, value: 1.0 },
  { indicatorSlug: "repo-rate", year: 2021, value: 1.0 },
  { indicatorSlug: "repo-rate", year: 2022, value: 5.0 },
  { indicatorSlug: "repo-rate", year: 2023, value: 6.0 },
  { indicatorSlug: "repo-rate", year: 2024, value: 5.5 },
  { indicatorSlug: "repo-rate", year: 2025, value: 4.3 },

  // Trade Balance monthly (SAR Billion) - 2025
  { indicatorSlug: "trade-balance", year: 2025, month: 1, value: 19.2 },
  { indicatorSlug: "trade-balance", year: 2025, month: 2, value: 22.1 },
  { indicatorSlug: "trade-balance", year: 2025, month: 3, value: 18.5 },
  { indicatorSlug: "trade-balance", year: 2025, month: 4, value: 15.8 },
  { indicatorSlug: "trade-balance", year: 2025, month: 5, value: 20.3 },
  { indicatorSlug: "trade-balance", year: 2025, month: 6, value: 17.9 },
  { indicatorSlug: "trade-balance", year: 2025, month: 7, value: 16.2 },
  { indicatorSlug: "trade-balance", year: 2025, month: 8, value: 18.7 },
  { indicatorSlug: "trade-balance", year: 2025, month: 9, value: 14.5 },
  { indicatorSlug: "trade-balance", year: 2025, month: 10, value: 15.1 },
  { indicatorSlug: "trade-balance", year: 2025, month: 11, value: 16.8 },
  { indicatorSlug: "trade-balance", year: 2025, month: 12, value: 13.0 },

  // Merchandise Exports monthly (SAR Billion) - 2025
  { indicatorSlug: "merchandise-exports", year: 2025, month: 10, value: 98.5 },
  { indicatorSlug: "merchandise-exports", year: 2025, month: 11, value: 99.4 },
  { indicatorSlug: "merchandise-exports", year: 2025, month: 12, value: 97.2 },

  // Merchandise Imports monthly (SAR Billion) - 2025
  { indicatorSlug: "merchandise-imports", year: 2025, month: 10, value: 83.4 },
  { indicatorSlug: "merchandise-imports", year: 2025, month: 11, value: 80.3 },
  { indicatorSlug: "merchandise-imports", year: 2025, month: 12, value: 84.2 },

  // Workers' Remittances (SAR Billion)
  { indicatorSlug: "workers-remittances", year: 2018, value: 125.1 },
  { indicatorSlug: "workers-remittances", year: 2019, value: 126.2 },
  { indicatorSlug: "workers-remittances", year: 2020, value: 131.5 },
  { indicatorSlug: "workers-remittances", year: 2021, value: 134.8 },
  { indicatorSlug: "workers-remittances", year: 2022, value: 141.2 },
  { indicatorSlug: "workers-remittances", year: 2023, value: 142.8 },
  { indicatorSlug: "workers-remittances", year: 2024, value: 171.3 },

  // Oil Price (USD/Barrel)
  { indicatorSlug: "oil-price", year: 2016, value: 40.1 },
  { indicatorSlug: "oil-price", year: 2017, value: 53.1 },
  { indicatorSlug: "oil-price", year: 2018, value: 71.0 },
  { indicatorSlug: "oil-price", year: 2019, value: 63.0 },
  { indicatorSlug: "oil-price", year: 2020, value: 41.5 },
  { indicatorSlug: "oil-price", year: 2021, value: 69.4 },
  { indicatorSlug: "oil-price", year: 2022, value: 89.7 },
  { indicatorSlug: "oil-price", year: 2023, value: 82.5 },
  { indicatorSlug: "oil-price", year: 2024, value: 80.2 },

  // Total Population
  { indicatorSlug: "total-population", year: 2016, value: 31742308 },
  { indicatorSlug: "total-population", year: 2017, value: 32552336 },
  { indicatorSlug: "total-population", year: 2018, value: 33413660 },
  { indicatorSlug: "total-population", year: 2019, value: 34218169 },
  { indicatorSlug: "total-population", year: 2020, value: 34110821 },
  { indicatorSlug: "total-population", year: 2021, value: 32175224 },
  { indicatorSlug: "total-population", year: 2022, value: 32175224 },
  { indicatorSlug: "total-population", year: 2023, value: 33702731 },
  { indicatorSlug: "total-population", year: 2024, value: 35300280 },

  // Unemployment Rate (%) - Quarterly
  { indicatorSlug: "unemployment-rate", year: 2024, quarter: 1, value: 3.5 },
  { indicatorSlug: "unemployment-rate", year: 2024, quarter: 2, value: 3.5 },
  { indicatorSlug: "unemployment-rate", year: 2024, quarter: 3, value: 3.6 },
  { indicatorSlug: "unemployment-rate", year: 2024, quarter: 4, value: 3.5 },
  { indicatorSlug: "unemployment-rate", year: 2025, quarter: 1, value: 3.5 },
  { indicatorSlug: "unemployment-rate", year: 2025, quarter: 2, value: 3.4 },
  { indicatorSlug: "unemployment-rate", year: 2025, quarter: 3, value: 3.4 },

  // Saudi Unemployment Rate (%) - Quarterly
  { indicatorSlug: "saudi-unemployment", year: 2024, quarter: 1, value: 7.6 },
  { indicatorSlug: "saudi-unemployment", year: 2024, quarter: 2, value: 7.6 },
  { indicatorSlug: "saudi-unemployment", year: 2024, quarter: 3, value: 7.8 },
  { indicatorSlug: "saudi-unemployment", year: 2024, quarter: 4, value: 7.7 },
  { indicatorSlug: "saudi-unemployment", year: 2025, quarter: 1, value: 7.6 },
  { indicatorSlug: "saudi-unemployment", year: 2025, quarter: 2, value: 7.5 },
  { indicatorSlug: "saudi-unemployment", year: 2025, quarter: 3, value: 7.5 },

  // Life Expectancy (Years)
  { indicatorSlug: "life-expectancy", year: 2016, value: 74.8 },
  { indicatorSlug: "life-expectancy", year: 2017, value: 75.0 },
  { indicatorSlug: "life-expectancy", year: 2018, value: 75.4 },
  { indicatorSlug: "life-expectancy", year: 2019, value: 75.8 },
  { indicatorSlug: "life-expectancy", year: 2020, value: 74.2 },
  { indicatorSlug: "life-expectancy", year: 2021, value: 76.0 },
  { indicatorSlug: "life-expectancy", year: 2022, value: 77.9 },

  // POS Transactions (SAR Billion)
  { indicatorSlug: "pos-transactions", year: 2018, value: 321.5 },
  { indicatorSlug: "pos-transactions", year: 2019, value: 390.0 },
  { indicatorSlug: "pos-transactions", year: 2020, value: 436.2 },
  { indicatorSlug: "pos-transactions", year: 2021, value: 514.8 },
  { indicatorSlug: "pos-transactions", year: 2022, value: 590.3 },
  { indicatorSlug: "pos-transactions", year: 2023, value: 640.1 },
  { indicatorSlug: "pos-transactions", year: 2024, value: 668.5 },
  { indicatorSlug: "pos-transactions", year: 2025, value: 707.2 },

  // Population by Region (2024)
  { indicatorSlug: "total-population", year: 2024, region: "riyadh", value: 8800000 },
  { indicatorSlug: "total-population", year: 2024, region: "makkah", value: 8500000 },
  { indicatorSlug: "total-population", year: 2024, region: "eastern", value: 5400000 },
  { indicatorSlug: "total-population", year: 2024, region: "madinah", value: 2300000 },
  { indicatorSlug: "total-population", year: 2024, region: "aseer", value: 2300000 },
  { indicatorSlug: "total-population", year: 2024, region: "jazan", value: 1700000 },
  { indicatorSlug: "total-population", year: 2024, region: "qasseem", value: 1500000 },
  { indicatorSlug: "total-population", year: 2024, region: "tabouk", value: 1000000 },
  { indicatorSlug: "total-population", year: 2024, region: "baha", value: 500000 },
  { indicatorSlug: "total-population", year: 2024, region: "najran", value: 650000 },
  { indicatorSlug: "total-population", year: 2024, region: "hail", value: 750000 },
  { indicatorSlug: "total-population", year: 2024, region: "jouf", value: 550000 },
  { indicatorSlug: "total-population", year: 2024, region: "northern-borders", value: 400000 },

  // FDI Inflows (SAR Billion) - Quarterly 2025
  { indicatorSlug: "fdi-inflows", year: 2025, quarter: 1, value: 22.5 },
  { indicatorSlug: "fdi-inflows", year: 2025, quarter: 2, value: 23.6 },
  { indicatorSlug: "fdi-inflows", year: 2025, quarter: 3, value: 24.9 },

  // Crude Oil Production (Million Barrels)
  { indicatorSlug: "crude-oil-production", year: 2016, value: 3754.0 },
  { indicatorSlug: "crude-oil-production", year: 2017, value: 3635.0 },
  { indicatorSlug: "crude-oil-production", year: 2018, value: 3764.0 },
  { indicatorSlug: "crude-oil-production", year: 2019, value: 3476.0 },
  { indicatorSlug: "crude-oil-production", year: 2020, value: 3296.0 },
  { indicatorSlug: "crude-oil-production", year: 2021, value: 3327.0 },
  { indicatorSlug: "crude-oil-production", year: 2022, value: 3866.0 },

  // Electricity Consumption (Megawatts/h) - 2022
  { indicatorSlug: "electricity-consumption", year: 2022, breakdown: "Type", breakdownValue: "Residential", value: 142449919 },
  { indicatorSlug: "electricity-consumption", year: 2022, breakdown: "Type", breakdownValue: "Industrial", value: 52860205 },
  { indicatorSlug: "electricity-consumption", year: 2022, breakdown: "Type", breakdownValue: "Commercial", value: 50983824 },
  { indicatorSlug: "electricity-consumption", year: 2022, breakdown: "Type", breakdownValue: "Government", value: 35123412 },
  { indicatorSlug: "electricity-consumption", year: 2022, breakdown: "Type", breakdownValue: "Agricultural", value: 17284232 },

  // Water Consumption by Region (Cubic Meters) - 2022
  { indicatorSlug: "water-consumption", year: 2022, region: "riyadh", value: 1130000000 },
  { indicatorSlug: "water-consumption", year: 2022, region: "makkah", value: 832000000 },
  { indicatorSlug: "water-consumption", year: 2022, region: "eastern", value: 657000000 },
  { indicatorSlug: "water-consumption", year: 2022, region: "qasseem", value: 245000000 },
  { indicatorSlug: "water-consumption", year: 2022, region: "madinah", value: 210000000 },

  // Structural Business - Revenues & Expenses (SAR Billion) - 2024
  { indicatorSlug: "revenues-expenses", year: 2024, breakdown: "Activity", breakdownValue: "Manufacturing (Revenue)", value: 1700.0 },
  { indicatorSlug: "revenues-expenses", year: 2024, breakdown: "Activity", breakdownValue: "Manufacturing (Expense)", value: 983.9 },
  { indicatorSlug: "revenues-expenses", year: 2024, breakdown: "Activity", breakdownValue: "Wholesale & Retail (Revenue)", value: 1200.5 },
  { indicatorSlug: "revenues-expenses", year: 2024, breakdown: "Activity", breakdownValue: "Wholesale & Retail (Expense)", value: 850.2 },
  { indicatorSlug: "revenues-expenses", year: 2024, breakdown: "Activity", breakdownValue: "Construction (Revenue)", value: 850.3 },
  { indicatorSlug: "revenues-expenses", year: 2024, breakdown: "Activity", breakdownValue: "Construction (Expense)", value: 620.1 },

  // Employees by Economic Activity - 2022
  { indicatorSlug: "employees-by-economic-activity", year: 2022, breakdown: "Activity", breakdownValue: "Construction", value: 2460230 },
  { indicatorSlug: "employees-by-economic-activity", year: 2022, breakdown: "Activity", breakdownValue: "Wholesale & Retail", value: 1626050 },
  { indicatorSlug: "employees-by-economic-activity", year: 2022, breakdown: "Activity", breakdownValue: "Manufacturing", value: 985420 },
  { indicatorSlug: "employees-by-economic-activity", year: 2022, breakdown: "Activity", breakdownValue: "Accommodation & Food", value: 654320 },
  { indicatorSlug: "employees-by-economic-activity", year: 2022, breakdown: "Activity", breakdownValue: "Administrative", value: 543210 },

  // Gross Fixed Capital Formation (SAR Billion) - 2024
  { indicatorSlug: "gross-fixed-capital-formation", year: 2024, breakdown: "Activity", breakdownValue: "Extraction of crude petroleum", value: 178.8 },
  { indicatorSlug: "gross-fixed-capital-formation", year: 2024, breakdown: "Activity", breakdownValue: "Retail trade", value: 79.8 },
  { indicatorSlug: "gross-fixed-capital-formation", year: 2024, breakdown: "Activity", breakdownValue: "Wholesale trade", value: 76.3 },
  { indicatorSlug: "gross-fixed-capital-formation", year: 2024, breakdown: "Activity", breakdownValue: "Real estate activities", value: 65.4 },

  // Individual Proprietorships by Region - 2022
  { indicatorSlug: "individual-proprietorships", year: 2022, region: "riyadh", value: 79397 },
  { indicatorSlug: "individual-proprietorships", year: 2022, region: "makkah", value: 64844 },
  { indicatorSlug: "individual-proprietorships", year: 2022, region: "eastern", value: 38424 },
  { indicatorSlug: "individual-proprietorships", year: 2022, region: "qasseem", value: 18542 },
  { indicatorSlug: "individual-proprietorships", year: 2022, region: "madinah", value: 16234 },

  // Digital Economy
  { indicatorSlug: "digital-economy-gdp", year: 2020, value: 14.1 },
  { indicatorSlug: "digital-economy-gdp", year: 2021, value: 14.5 },
  { indicatorSlug: "digital-economy-gdp", year: 2022, value: 15.0 },
  { indicatorSlug: "digital-economy-gdp", year: 2023, value: 15.4 },
  { indicatorSlug: "digital-economy-gdp", year: 2024, value: 16.0 },

  { indicatorSlug: "digital-economy-activities", year: 2022, breakdown: "Activity", breakdownValue: "Education", value: 44.5 },
  { indicatorSlug: "digital-economy-activities", year: 2022, breakdown: "Activity", breakdownValue: "Accommodation & Food", value: 39.9 },
  { indicatorSlug: "digital-economy-activities", year: 2022, breakdown: "Activity", breakdownValue: "Arts & Entertainment", value: 31.9 },
  { indicatorSlug: "digital-economy-activities", year: 2022, breakdown: "Activity", breakdownValue: "Information & Communication", value: 28.5 },

  // Humanitarian Donations (USD Million)
  { indicatorSlug: "funding-to-countries", year: 2024, breakdown: "Country", breakdownValue: "Yemen", value: 4520 },
  { indicatorSlug: "funding-to-countries", year: 2024, breakdown: "Country", breakdownValue: "Palestine", value: 513 },
  { indicatorSlug: "funding-to-countries", year: 2024, breakdown: "Country", breakdownValue: "Syria", value: 456 },
  { indicatorSlug: "funding-to-countries", year: 2024, breakdown: "Country", breakdownValue: "Somalia", value: 234 },
  { indicatorSlug: "funding-to-countries", year: 2024, breakdown: "Country", breakdownValue: "Pakistan", value: 185 },

  { indicatorSlug: "funding-by-sector", year: 2024, breakdown: "Sector", breakdownValue: "Food Security", value: 2170 },
  { indicatorSlug: "funding-by-sector", year: 2024, breakdown: "Sector", breakdownValue: "Health", value: 1500 },
  { indicatorSlug: "funding-by-sector", year: 2024, breakdown: "Sector", breakdownValue: "Humanitarian Ops", value: 980 },
  { indicatorSlug: "funding-by-sector", year: 2024, breakdown: "Sector", breakdownValue: "Education", value: 450 },

  { indicatorSlug: "aid-by-ksrelief", year: 2019, value: 3.2 },
  { indicatorSlug: "aid-by-ksrelief", year: 2020, value: 4.5 },
  { indicatorSlug: "aid-by-ksrelief", year: 2021, value: 5.1 },
  { indicatorSlug: "aid-by-ksrelief", year: 2022, value: 5.8 },
  { indicatorSlug: "aid-by-ksrelief", year: 2023, value: 6.4 },
  { indicatorSlug: "aid-by-ksrelief", year: 2024, value: 7.32 },

  // Social: Population Details
  { indicatorSlug: "population-density", year: 2022, region: "jazan", value: 105.0 },
  { indicatorSlug: "population-density", year: 2022, region: "makkah", value: 57.5 },
  { indicatorSlug: "population-density", year: 2022, region: "baha", value: 30.2 },
  { indicatorSlug: "population-density", year: 2022, region: "riyadh", value: 21.8 },
  { indicatorSlug: "population-density", year: 2022, region: "eastern", value: 7.6 },

  { indicatorSlug: "non-saudi-population", year: 2022, breakdown: "Nationality", breakdownValue: "Bangladesh", value: 2116192 },
  { indicatorSlug: "non-saudi-population", year: 2022, breakdown: "Nationality", breakdownValue: "India", value: 1884476 },
  { indicatorSlug: "non-saudi-population", year: 2022, breakdown: "Nationality", breakdownValue: "Pakistan", value: 1814678 },
  { indicatorSlug: "non-saudi-population", year: 2022, breakdown: "Nationality", breakdownValue: "Yemen", value: 1543210 },
  { indicatorSlug: "non-saudi-population", year: 2022, breakdown: "Nationality", breakdownValue: "Egypt", value: 1234567 },

  { indicatorSlug: "marital-status", year: 2022, breakdown: "Status", breakdownValue: "Married", value: 55.0 },
  { indicatorSlug: "marital-status", year: 2022, breakdown: "Status", breakdownValue: "Never Married", value: 40.4 },
  { indicatorSlug: "marital-status", year: 2022, breakdown: "Status", breakdownValue: "Divorced", value: 2.4 },
  { indicatorSlug: "marital-status", year: 2022, breakdown: "Status", breakdownValue: "Widowed", value: 2.2 },

  // Social: Labor Details
  { indicatorSlug: "employees-gosi-civil", year: 2025, quarter: 3, breakdown: "Gender", breakdownValue: "Male", value: 14887111 },
  { indicatorSlug: "employees-gosi-civil", year: 2025, quarter: 3, breakdown: "Gender", breakdownValue: "Female", value: 3657154 },

  { indicatorSlug: "employees-by-occupation", year: 2025, quarter: 3, breakdown: "Occupation", breakdownValue: "Elementary occupations", value: 5564531 },
  { indicatorSlug: "employees-by-occupation", year: 2025, quarter: 3, breakdown: "Occupation", breakdownValue: "Professionals", value: 1828571 },
  { indicatorSlug: "employees-by-occupation", year: 2025, quarter: 3, breakdown: "Occupation", breakdownValue: "Plant & machine operators", value: 1333897 },
  { indicatorSlug: "employees-by-occupation", year: 2025, quarter: 3, breakdown: "Occupation", breakdownValue: "Service & sales workers", value: 1154320 },

  { indicatorSlug: "social-employees-by-economic-activity", year: 2025, quarter: 3, breakdown: "Activity", breakdownValue: "Construction", value: 3412388 },
  { indicatorSlug: "social-employees-by-economic-activity", year: 2025, quarter: 3, breakdown: "Activity", breakdownValue: "Wholesale & retail trade", value: 1827205 },
  { indicatorSlug: "social-employees-by-economic-activity", year: 2025, quarter: 3, breakdown: "Activity", breakdownValue: "Manufacturing", value: 1482452 },

  { indicatorSlug: "job-seekers", year: 2022, region: "riyadh", value: 80005 },
  { indicatorSlug: "job-seekers", year: 2022, region: "makkah", value: 73633 },
  { indicatorSlug: "job-seekers", year: 2022, region: "eastern", value: 43927 },
  { indicatorSlug: "job-seekers", year: 2022, region: "aseer", value: 28432 },
  { indicatorSlug: "job-seekers", year: 2022, region: "madinah", value: 21543 },

  // Social: Disability
  { indicatorSlug: "severe-disability-by-region", year: 2023, region: "riyadh", value: 14.8 },
  { indicatorSlug: "severe-disability-by-region", year: 2023, region: "makkah", value: 14.7 },
  { indicatorSlug: "severe-disability-by-region", year: 2023, region: "eastern", value: 14.5 },
  { indicatorSlug: "severe-disability-by-region", year: 2023, region: "qasseem", value: 12.4 },

  { indicatorSlug: "disability-by-cause", year: 2023, breakdown: "Cause", breakdownValue: "Illness", value: 39.2 },
  { indicatorSlug: "disability-by-cause", year: 2023, breakdown: "Cause", breakdownValue: "Congenital factors", value: 26.9 },
  { indicatorSlug: "disability-by-cause", year: 2023, breakdown: "Cause", breakdownValue: "Aging", value: 16.1 },
  { indicatorSlug: "disability-by-cause", year: 2023, breakdown: "Cause", breakdownValue: "Accidents", value: 17.8 },

  { indicatorSlug: "disability-work-status", year: 2023, breakdown: "Status", breakdownValue: "Unable to work", value: 27.6 },
  { indicatorSlug: "disability-work-status", year: 2023, breakdown: "Status", breakdownValue: "Retired", value: 19.6 },
  { indicatorSlug: "disability-work-status", year: 2023, breakdown: "Status", breakdownValue: "Free for housework", value: 15.8 },
  { indicatorSlug: "disability-work-status", year: 2023, breakdown: "Status", breakdownValue: "Employed", value: 37.0 },
];
