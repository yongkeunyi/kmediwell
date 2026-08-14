import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { CATEGORIES, categoryLabel } from "../lib/types";
import { useLocale } from "../lib/i18n";
import { AxBadge } from "./AxBadge";
import { categoryEmoji } from "./Home";
export function Explore({ onOpenSite }) {
    const { locale, t } = useLocale();
    const { data, isLoading } = useQuery(api.sites.list, {});
    const [category, setCategory] = useState(null);
    const sites = data?.data ?? [];
    const filtered = category ? sites.filter((s) => s.category === category) : sites;
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("div", { className: "eyebrow", children: t("explore.eyebrow") }), _jsx("h1", { className: "page-title", children: t("explore.title") }), _jsxs("div", { className: "chipbar", role: "group", "aria-label": t("home.categoriesTitle"), children: [_jsx("button", { className: `chip chip-btn${category === null ? " on" : ""}`, "aria-pressed": category === null, onClick: () => setCategory(null), children: t("common.all") }), CATEGORIES.map((c) => (_jsx("button", { className: `chip chip-btn${category === c ? " on" : ""}`, "aria-pressed": category === c, onClick: () => setCategory(c), children: categoryLabel(c, locale) }, c)))] }), isLoading && _jsx("p", { className: "hint", children: t("common.loading") }), !isLoading && filtered.length === 0 && _jsx("p", { className: "hint", children: t("explore.empty") }), _jsx("div", { className: "site-list", style: { marginTop: 12 }, children: filtered.map((s) => (_jsxs("button", { className: "site-card", onClick: () => onOpenSite(s.id), children: [_jsx("div", { className: "site-thumb", "aria-hidden": "true", children: categoryEmoji(s.category) }), _jsxs("div", { className: "site-info", children: [_jsxs("div", { className: "site-row", children: [_jsx("span", { className: "site-name", children: s.name }), _jsx(AxBadge, { tier: s.axTier })] }), _jsxs("div", { className: "site-loc", children: [s.region, " \u00B7 ", categoryLabel(s.category, locale)] })] })] }, s.id))) })] }));
}
