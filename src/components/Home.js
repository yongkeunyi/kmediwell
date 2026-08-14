import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery, useAuth } from "@gencow/react";
import { api } from "../lib/gencow";
import { CATEGORIES, categoryLabel } from "../lib/types";
import { useLocale } from "../lib/i18n";
import { AxBadge } from "./AxBadge";
export function Home({ onOpenSite, onOpenArticle, onOpenEbook, onBrowseEbooks, onMeasure, onExploreAll, }) {
    const { isAuthenticated } = useAuth();
    const { locale, t } = useLocale();
    const { data, isLoading } = useQuery(api.sites.list, { filters: { isTop20: "1" } });
    const sites = data?.data ?? [];
    const { data: newsData } = useQuery(api.articles.list, { filters: { locale }, limit: 4 });
    const articles = newsData?.data ?? [];
    const { data: ebooksData } = useQuery(api.ebooks.list, { limit: 3 });
    const ebooks = ebooksData?.data ?? [];
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("div", { className: "eyebrow", children: t("home.eyebrow") }), _jsx("h1", { className: "page-title", children: t("home.title") }), _jsx("p", { className: "lead", children: t("home.lead") }), _jsxs("div", { className: "hero-card", children: [_jsx("div", { className: "hero-card-label", children: t("home.heroLabel") }), _jsx("div", { className: "hero-card-title", children: t("home.heroTitle") }), _jsx("button", { className: "btn btn-primary", onClick: onMeasure, children: isAuthenticated ? t("home.ctaAuthed") : t("home.ctaGuest") })] }), ebooks.length > 0 && (_jsxs("div", { className: "funnel-card", children: [_jsx("div", { className: "eyebrow", children: t("home.ebooksEyebrow") }), _jsx("h2", { className: "section-title", style: { marginTop: "0.2em" }, children: t("home.ebooksTitle") }), _jsx("p", { className: "lead", style: { fontSize: ".88rem" }, children: t("home.ebooksLead") }), _jsx("div", { className: "ebook-strip", children: ebooks.map((e) => (_jsxs("button", { className: "ebook-strip-card", onClick: () => onOpenEbook(e.id), children: [_jsx("span", { className: "ebook-strip-title", children: e.title }), _jsxs("span", { className: "ebook-strip-price", children: ["$", e.priceUsd.toFixed(2)] })] }, e.id))) }), _jsx("button", { className: "btn btn-primary", onClick: onBrowseEbooks, children: t("home.ebooksCta") })] })), articles.length > 0 && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "section-title", children: t("home.newsTitle") }), _jsx("div", { className: "news-strip", children: articles.map((a) => (_jsxs("button", { className: "news-strip-card", onClick: () => onOpenArticle(a.id), children: [_jsx("span", { className: "news-strip-title", children: a.title }), _jsxs("span", { className: "news-strip-byline", children: [a.authorName, " \u00B7 ", a.authorCountry] })] }, a.id))) })] })), _jsx("h2", { className: "section-title", children: t("home.categoriesTitle") }), _jsx("div", { className: "chipbar", children: CATEGORIES.map((c) => (_jsx("span", { className: "chip", children: categoryLabel(c, locale) }, c))) }), _jsx("h2", { className: "section-title", children: t("home.top20Title") }), isLoading && _jsx("p", { className: "hint", children: t("common.loading") }), _jsx("div", { className: "site-list", children: sites.map((s) => (_jsxs("button", { className: "site-card", onClick: () => onOpenSite(s.id), children: [_jsx("div", { className: "site-thumb", "aria-hidden": "true", children: categoryEmoji(s.category) }), _jsxs("div", { className: "site-info", children: [_jsxs("div", { className: "site-row", children: [_jsx("span", { className: "site-name", children: s.name }), _jsx(AxBadge, { tier: s.axTier })] }), _jsxs("div", { className: "site-loc", children: [s.region, " \u00B7 ", categoryLabel(s.category, locale)] })] })] }, s.id))) }), _jsx("button", { className: "btn btn-ghost btn-block", onClick: onExploreAll, children: t("home.viewAll") })] }));
}
export function categoryEmoji(category) {
    switch (category) {
        case "자연숲치유":
            return "🌲";
        case "뷰티스파":
            return "💆";
        case "힐링명상":
            return "🧘";
        case "한방":
            return "♨️";
        case "스테이":
            return "🏨";
        case "푸드":
            return "🍚";
        default:
            return "✨";
    }
}
