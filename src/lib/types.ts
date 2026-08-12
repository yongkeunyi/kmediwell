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
