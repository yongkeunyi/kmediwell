import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { categoryLabel } from "../lib/types";
import { useLocale } from "../lib/i18n";
import { AxBadge } from "./AxBadge";
import { categoryEmoji } from "./Home";
export function SiteDetail({ siteId, onBack, onBook }) {
    const { locale, t } = useLocale();
    const { data: site, isLoading } = useQuery(api.sites.get, { id: siteId });
    if (isLoading)
        return _jsx("div", { className: "screen-pad", children: t("common.loading") });
    if (!site)
        return _jsx("div", { className: "screen-pad", children: t("siteDetail.notFound") });
    const s = site;
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("button", { className: "back-link", onClick: onBack, children: t("siteDetail.back") }), _jsx("div", { className: "site-thumb-lg", "aria-hidden": "true", children: categoryEmoji(s.category) }), _jsxs("div", { className: "row", style: { marginTop: 10 }, children: [_jsx("h1", { className: "page-title", style: { margin: 0 }, children: s.name }), _jsx(AxBadge, { tier: s.axTier })] }), _jsxs("div", { className: "small muted", children: [s.region, " \u00B7 ", categoryLabel(s.category, locale), s.isTop20 === "1" ? t("siteDetail.top20Suffix") : ""] }), _jsx("p", { className: "lead", style: { marginTop: 10 }, children: s.description }), _jsx("div", { className: "grid2", children: _jsxs("div", { className: "stat", children: [_jsx("div", { className: "stat-k", children: t("siteDetail.axBasis") }), _jsx("div", { className: "stat-v", style: { fontSize: "1rem" }, children: s.axNote })] }) }), _jsx("h2", { className: "section-title", children: t("siteDetail.program") }), _jsxs("div", { className: "card row", children: [_jsx("span", { children: s.programName }), _jsxs("span", { className: "num", children: ["\u20A9", s.price.toLocaleString("ko-KR")] })] }), _jsx("button", { className: "btn btn-primary btn-block", style: { marginTop: 16 }, onClick: () => onBook(s), children: t("siteDetail.bookCta") })] }));
}
