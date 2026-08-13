export type AxTier = "gold" | "silver" | "bronze";

export interface Site {
  id: number;
  name: string;
  category: string;
  region: string;
  axTier: AxTier;
  axNote: string;
  description: string;
  programName: string;
  price: number;
  isTop20: string;
  createdAt: string;
}

export interface Ebook {
  id: number;
  title: string;
  category: string;
  author: string;
  priceUsd: number;
  description: string;
  relatedSiteId: number | null;
  createdAt: string;
}

export interface HealingRecord {
  id: number;
  userId: string;
  alpha: number;
  theta: number;
  beta: number;
  stressIndex: number;
  measuredAt: string;
}

export interface Recommendation {
  basedOn: HealingRecord;
  scores: { category: string; score: number }[];
}

export interface Article {
  id: number;
  locale: "ko" | "en";
  title: string;
  excerpt: string;
  body: string;
  authorName: string;
  authorCountry: string;
  relatedSiteId: number | null;
  relatedEbookId: number | null;
  publishedAt: string;
}

export interface SellerApplication {
  id: number;
  country: string;
  preferredLocale: string;
  message: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface Booking {
  id: number;
  programName: string;
  scheduledAt: string;
  amount: number;
  status: string;
  createdAt: string;
  siteId: number;
  siteName: string;
  siteRegion: string;
  axTier: AxTier;
}

export const CATEGORIES = ["자연숲치유", "뷰티스파", "힐링명상", "한방", "스테이", "푸드"] as const;

export const CATEGORY_LABEL: Record<string, string> = {
  자연숲치유: "자연·숲치유",
  뷰티스파: "뷰티·스파",
  힐링명상: "힐링·명상",
  한방: "한방",
  스테이: "스테이",
  푸드: "푸드",
};

const CATEGORY_LABEL_EN: Record<string, string> = {
  자연숲치유: "Forest Healing",
  뷰티스파: "Beauty Spa",
  힐링명상: "Meditation",
  한방: "Traditional Medicine",
  스테이: "Stay",
  푸드: "Food",
};

export function categoryLabel(category: string, locale: "ko" | "en"): string {
  const table = locale === "en" ? CATEGORY_LABEL_EN : CATEGORY_LABEL;
  return table[category] ?? category;
}

// FR-8.2 — 국가별 우선순위 (사업계획서: 베트남·중국 1순위 → 우즈베키스탄·몽골 2순위 → 네팔·일본·대만·영어권 3순위)
export const SELLER_COUNTRIES: { code: string; ko: string; en: string; priority: 1 | 2 | 3 }[] = [
  { code: "VN", ko: "베트남", en: "Vietnam", priority: 1 },
  { code: "CN", ko: "중국", en: "China", priority: 1 },
  { code: "UZ", ko: "우즈베키스탄", en: "Uzbekistan", priority: 2 },
  { code: "MN", ko: "몽골", en: "Mongolia", priority: 2 },
  { code: "NP", ko: "네팔", en: "Nepal", priority: 3 },
  { code: "JP", ko: "일본", en: "Japan", priority: 3 },
  { code: "TW", ko: "대만", en: "Taiwan", priority: 3 },
  { code: "OTHER", ko: "기타(영어권 등)", en: "Other (English-speaking, etc.)", priority: 3 },
];
