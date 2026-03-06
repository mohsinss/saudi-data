export const translations = {
  en: {
    site: {
      name: "DataSaudi",
      tagline: "Kingdom of Saudi Arabia",
      description:
        "A unified platform to present and analyze the latest economic and social data for the Kingdom and its regions.",
    },
    nav: {
      overview: "Overview",
      economic: "Economic Indicators",
      social: "Social Indicators",
      regions: "Regions",
      dataExplorer: "Data Explorer",
      countries: "Countries",
    },
    common: {
      source: "Source",
      download: "Download",
      exportCsv: "CSV",
      exportJson: "JSON",
      exportExcel: "Excel",
      search: "Search",
      filters: "Filters",
      allCategories: "All Categories",
      allSubcategories: "All Subcategories",
      yearFrom: "Year From",
      yearTo: "Year To",
      period: "Period",
      year: "Year",
      value: "Value",
      indicator: "Indicator",
      noData: "No data available",
      selectIndicator: "Select an indicator from the list to view data",
      exploreMore: "Explore more",
      capital: "Capital",
      area: "Area",
      population: "Population",
      populationDensity: "Population Density",
      allRegions: "All Regions",
      learnMore: "Learn More",
    },
    overview: {
      title: "Kingdom of Saudi Arabia",
      heroText:
        "A unified platform to present and analyze the latest economic and social data for the Kingdom and its regions in visually interactive ways.",
      economicIndicators: "Economic Indicators",
      socialIndicators: "Social Indicators",
      quickNavigation: "Quick Navigation",
    },
    economic: {
      title: "Economic Indicators",
      description:
        "Comprehensive economic data for the Kingdom of Saudi Arabia including GDP, inflation, trade, monetary, fiscal, and energy indicators.",
    },
    social: {
      title: "Social Indicators",
      description:
        "Comprehensive social data for the Kingdom of Saudi Arabia including population, labor market, housing, health, and education statistics.",
    },
    regions: {
      title: "Regions",
      description:
        "Explore economic and social data for all 13 administrative regions of Saudi Arabia.",
      populationByRegion: "Population by Region",
      regionProfile: "Region Profile",
      populationComparison: "Population Comparison",
    },
    explorer: {
      title: "Data Explorer",
      description:
        "Search, filter, and download Saudi economic and social data in multiple formats.",
      indicators: "Indicators",
    },
    footer: {
      feedback: "For feedback and inquiries",
      copyright: "Ministry of Economy & Planning. All Rights Reserved",
      dataSources: "Data Sources",
    },
  },
  ar: {
    site: {
      name: "بيانات السعودية",
      tagline: "المملكة العربية السعودية",
      description:
        "منصة موحدة لعرض وتحليل أحدث البيانات الاقتصادية والاجتماعية للمملكة ومناطقها.",
    },
    nav: {
      overview: "نظرة عامة",
      economic: "المؤشرات الاقتصادية",
      social: "المؤشرات الاجتماعية",
      regions: "المناطق",
      dataExplorer: "مستكشف البيانات",
      countries: "الدول",
    },
    common: {
      source: "المصدر",
      download: "تحميل",
      exportCsv: "CSV",
      exportJson: "JSON",
      exportExcel: "Excel",
      search: "بحث",
      filters: "التصفية",
      allCategories: "جميع الفئات",
      allSubcategories: "جميع الفئات الفرعية",
      yearFrom: "من سنة",
      yearTo: "إلى سنة",
      period: "الفترة",
      year: "السنة",
      value: "القيمة",
      indicator: "المؤشر",
      noData: "لا توجد بيانات متاحة",
      selectIndicator: "اختر مؤشراً من القائمة لعرض البيانات",
      exploreMore: "استكشف المزيد",
      capital: "العاصمة",
      area: "المساحة",
      population: "السكان",
      populationDensity: "الكثافة السكانية",
      allRegions: "جميع المناطق",
      learnMore: "اعرف المزيد",
    },
    overview: {
      title: "المملكة العربية السعودية",
      heroText:
        "منصة موحدة لعرض وتحليل أحدث البيانات الاقتصادية والاجتماعية للمملكة ومناطقها بأساليب تفاعلية مرئية.",
      economicIndicators: "المؤشرات الاقتصادية",
      socialIndicators: "المؤشرات الاجتماعية",
      quickNavigation: "التنقل السريع",
    },
    economic: {
      title: "المؤشرات الاقتصادية",
      description:
        "بيانات اقتصادية شاملة للمملكة العربية السعودية تشمل الناتج المحلي الإجمالي والتضخم والتجارة والمؤشرات النقدية والمالية والطاقة.",
    },
    social: {
      title: "المؤشرات الاجتماعية",
      description:
        "بيانات اجتماعية شاملة للمملكة العربية السعودية تشمل السكان وسوق العمل والإسكان والصحة والتعليم.",
    },
    regions: {
      title: "المناطق",
      description:
        "استكشف البيانات الاقتصادية والاجتماعية لجميع المناطق الإدارية الـ 13 في المملكة العربية السعودية.",
      populationByRegion: "السكان حسب المنطقة",
      regionProfile: "ملف المنطقة",
      populationComparison: "مقارنة السكان",
    },
    explorer: {
      title: "مستكشف البيانات",
      description:
        "ابحث وصفِّ وحمّل البيانات الاقتصادية والاجتماعية السعودية بتنسيقات متعددة.",
      indicators: "المؤشرات",
    },
    footer: {
      feedback: "للملاحظات والاستفسارات",
      copyright: "وزارة الاقتصاد والتخطيط. جميع الحقوق محفوظة",
      dataSources: "مصادر البيانات",
    },
  },
} as const;

export type TranslationKey = typeof translations.en & typeof translations.ar;
export type Locale = "en" | "ar";
