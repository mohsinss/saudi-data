export const SAUDI_REGIONS = [
  { slug: "riyadh", nameEn: "Al-Riyadh", nameAr: "الرياض", capital: "Riyadh", area: 404240 },
  { slug: "makkah", nameEn: "Makkah Al-Mokarramah", nameAr: "مكة المكرمة", capital: "Jeddah", area: 153128 },
  { slug: "eastern", nameEn: "Eastern Region", nameAr: "المنطقة الشرقية", capital: "Dammam", area: 672522 },
  { slug: "madinah", nameEn: "Al-Madinah Al-Monawarah", nameAr: "المدينة المنورة", capital: "Madinah", area: 151990 },
  { slug: "aseer", nameEn: "Aseer", nameAr: "عسير", capital: "Abha", area: 76693 },
  { slug: "jazan", nameEn: "Jazan", nameAr: "جازان", capital: "Jazan", area: 11671 },
  { slug: "qasseem", nameEn: "Al-Qasseem", nameAr: "القصيم", capital: "Buraydah", area: 58046 },
  { slug: "tabouk", nameEn: "Tabouk", nameAr: "تبوك", capital: "Tabuk", area: 146072 },
  { slug: "baha", nameEn: "Al-Baha", nameAr: "الباحة", capital: "Al Baha", area: 9921 },
  { slug: "najran", nameEn: "Najran", nameAr: "نجران", capital: "Najran", area: 149511 },
  { slug: "hail", nameEn: "Hail", nameAr: "حائل", capital: "Hail", area: 103887 },
  { slug: "jouf", nameEn: "Al-Jouf", nameAr: "الجوف", capital: "Sakakah", area: 100212 },
  { slug: "northern-borders", nameEn: "Northern Borders", nameAr: "الحدود الشمالية", capital: "Arar", area: 111797 },
] as const;

export type RegionSlug = (typeof SAUDI_REGIONS)[number]["slug"];
