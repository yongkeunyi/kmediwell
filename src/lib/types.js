export const CATEGORIES = ["자연숲치유", "뷰티스파", "힐링명상", "한방", "스테이", "푸드"];
export const CATEGORY_LABEL = {
    자연숲치유: "자연·숲치유",
    뷰티스파: "뷰티·스파",
    힐링명상: "힐링·명상",
    한방: "한방",
    스테이: "스테이",
    푸드: "푸드",
};
const CATEGORY_LABEL_EN = {
    자연숲치유: "Forest Healing",
    뷰티스파: "Beauty Spa",
    힐링명상: "Meditation",
    한방: "Traditional Medicine",
    스테이: "Stay",
    푸드: "Food",
};
export function categoryLabel(category, locale) {
    const table = locale === "en" ? CATEGORY_LABEL_EN : CATEGORY_LABEL;
    return table[category] ?? category;
}
// FR-8.2 — 국가별 우선순위 (사업계획서: 베트남·중국 1순위 → 우즈베키스탄·몽골 2순위 → 네팔·일본·대만·영어권 3순위)
export const SELLER_COUNTRIES = [
    { code: "VN", ko: "베트남", en: "Vietnam", priority: 1 },
    { code: "CN", ko: "중국", en: "China", priority: 1 },
    { code: "UZ", ko: "우즈베키스탄", en: "Uzbekistan", priority: 2 },
    { code: "MN", ko: "몽골", en: "Mongolia", priority: 2 },
    { code: "NP", ko: "네팔", en: "Nepal", priority: 3 },
    { code: "JP", ko: "일본", en: "Japan", priority: 3 },
    { code: "TW", ko: "대만", en: "Taiwan", priority: 3 },
    { code: "OTHER", ko: "기타(영어권 등)", en: "Other (English-speaking, etc.)", priority: 3 },
];
