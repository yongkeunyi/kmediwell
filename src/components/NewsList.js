import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { useLocale } from "../lib/i18n";
export function NewsList({ onOpenArticle, onApplySeller, }) {
    const { locale, t } = useLocale();
    const { data, isLoading } = useQuery(api.articles.list, { filters: { locale } });
    const articles = data?.data ?? [];
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("div", { className: "eyebrow", children: t("news.eyebrow") }), _jsx("h1", { className: "page-title", children: t("news.title") }), _jsx("p", { className: "lead", children: t("news.lead") }), _jsxs("button", { className: "card seller-banner", onClick: onApplySeller, children: [_jsxs("div", { className: "stack", style: { gap: 2 }, children: [_jsx("span", { className: "small", style: { fontWeight: 700 }, children: t("news.sellerBannerTitle") }), _jsx("span", { className: "small muted", children: t("news.sellerBannerDesc") })] }), _jsx("span", { className: "small", style: { whiteSpace: "nowrap" }, children: t("news.sellerBannerCta") })] }), isLoading && _jsx("p", { className: "hint", children: t("common.loading") }), !isLoading && articles.length === 0 && _jsx("p", { className: "hint", children: t("news.empty") }), _jsx("div", { className: "site-list", style: { marginTop: 12 }, children: articles.map((a) => (_jsxs("button", { className: "site-card", onClick: () => onOpenArticle(a.id), children: [_jsx("div", { className: "site-thumb", "aria-hidden": "true", children: "\uD83D\uDCF0" }), _jsxs("div", { className: "site-info", children: [_jsx("span", { className: "site-name", children: a.title }), _jsxs("div", { className: "site-loc", children: [a.authorName, " \u00B7 ", a.authorCountry] }), _jsx("div", { className: "small muted", style: { marginTop: 4 }, children: a.excerpt })] })] }, a.id))) })] }));
}
