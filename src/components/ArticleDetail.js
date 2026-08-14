import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { useLocale } from "../lib/i18n";
export function ArticleDetail({ articleId, onBack, onOpenSite, onOpenEbook, }) {
    const { t } = useLocale();
    const { data: article, isLoading } = useQuery(api.articles.get, { id: articleId });
    const a = article;
    const { data: site } = useQuery(api.sites.get, a?.relatedSiteId ? { id: a.relatedSiteId } : "skip");
    const { data: ebook } = useQuery(api.ebooks.get, a?.relatedEbookId ? { id: a.relatedEbookId } : "skip");
    const s = site;
    const e = ebook;
    if (isLoading)
        return _jsx("div", { className: "screen-pad", children: t("common.loading") });
    if (!a)
        return _jsx("div", { className: "screen-pad", children: t("article.notFound") });
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("button", { className: "back-link", onClick: onBack, children: t("article.back") }), _jsx("div", { className: "eyebrow", children: t("news.eyebrow") }), _jsx("h1", { className: "page-title", children: a.title }), _jsxs("div", { className: "small muted", children: [a.authorName, " \u00B7 ", a.authorCountry] }), _jsx("p", { className: "lead", style: { marginTop: 10 }, children: a.body }), (s || e) && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "section-title", children: t("article.continueJourney") }), _jsxs("div", { className: "stack", children: [e && (_jsxs("button", { className: "card row", style: { textAlign: "left", width: "100%" }, onClick: () => onOpenEbook(e.id), children: [_jsxs("div", { children: [_jsxs("div", { children: ["\uD83D\uDCD6 ", e.title] }), _jsxs("div", { className: "small muted", children: ["$", e.priceUsd.toFixed(2)] })] }), _jsxs("span", { className: "small", children: [t("article.readEbook"), " \u2192"] })] })), s && (_jsxs("button", { className: "card row", style: { textAlign: "left", width: "100%" }, onClick: () => onOpenSite(s.id), children: [_jsxs("div", { children: [_jsxs("div", { children: ["\uD83E\uDDD8 ", s.name] }), _jsx("div", { className: "small muted", children: s.programName })] }), _jsxs("span", { className: "small", children: [t("article.bookSite"), " \u2192"] })] }))] })] }))] }));
}
