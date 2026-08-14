import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuth, useMutation, useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { useLocale } from "../lib/i18n";
export function EbookStore({ onOpenSite, onOpenArticle, onRequireAuth, highlightEbookId, }) {
    const { t } = useLocale();
    const { isAuthenticated } = useAuth();
    const { data, isLoading } = useQuery(api.ebooks.list, {});
    const ebooks = data?.data ?? [];
    const [selected, setSelected] = useState(null);
    const { data: subscriptionsData } = useQuery(api.ebooks.mySubscriptions, isAuthenticated ? {} : "skip");
    const subscribedIds = new Set(subscriptionsData ?? []);
    const { mutate: subscribe, isPending: isSubscribing } = useMutation(api.ebooks.subscribe);
    const { mutate: unsubscribe, isPending: isUnsubscribing } = useMutation(api.ebooks.unsubscribe);
    const { data: relatedArticlesData } = useQuery(api.articles.list, selected ? { filters: { relatedEbookId: selected.id } } : "skip");
    const relatedArticle = (relatedArticlesData?.data ?? [])[0];
    useEffect(() => {
        if (!highlightEbookId)
            return;
        const match = ebooks.find((e) => e.id === highlightEbookId);
        if (match)
            setSelected(match);
    }, [highlightEbookId, ebooks]);
    const isSubscribed = selected ? subscribedIds.has(selected.id) : false;
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("div", { className: "eyebrow", children: t("ebooks.eyebrow") }), _jsx("h1", { className: "page-title", children: t("ebooks.title") }), _jsx("p", { className: "lead", children: t("ebooks.lead") }), isLoading && _jsx("p", { className: "hint", children: t("common.loading") }), _jsxs("div", { className: "ebook-grid", children: [ebooks.map((e) => (_jsxs("button", { className: `ebook-cover${selected?.id === e.id ? " selected" : ""}`, onClick: () => setSelected(e), children: [_jsx("span", { className: "ebook-cat", children: e.category }), _jsx("span", { className: "ebook-title", children: e.title }), _jsxs("span", { className: "ebook-price", children: ["$", e.priceUsd.toFixed(2), subscribedIds.has(e.id) && _jsx("span", { className: "subscribed-dot", title: t("ebooks.subscribed") })] })] }, e.id))), _jsx("div", { className: "ebook-cover upcoming", children: _jsxs("span", { className: "small", children: [t("ebooks.moreComingLine1"), _jsx("br", {}), t("ebooks.moreComingLine2")] }) })] }), selected && (_jsxs("div", { className: "card ebook-detail-card", children: [_jsxs("div", { className: "row", children: [_jsx("h2", { className: "section-title", style: { margin: 0 }, children: selected.title }), _jsx("button", { className: "icon-btn", onClick: () => setSelected(null), "aria-label": "close", children: "\u2715" })] }), _jsxs("div", { className: "small muted", children: [selected.author, " \u00B7 ", selected.category] }), _jsx("p", { className: "lead", style: { fontSize: ".86rem" }, children: selected.description }), isAuthenticated ? (_jsx("button", { className: isSubscribed ? "btn btn-ghost" : "btn btn-primary", disabled: isSubscribing || isUnsubscribing, onClick: () => (isSubscribed ? unsubscribe({ ebookId: selected.id }) : subscribe({ ebookId: selected.id })), children: isSubscribed ? `✓ ${t("ebooks.subscribed")}` : t("ebooks.subscribe") })) : (_jsxs("div", { className: "stack", style: { gap: 8 }, children: [_jsx("p", { className: "small muted", style: { margin: 0 }, children: t("ebooks.subscribeSignInPrompt") }), _jsx("button", { className: "btn btn-primary", onClick: onRequireAuth, children: t("ebooks.subscribe") })] })), relatedArticle && (_jsx("button", { className: "btn btn-ghost btn-block", style: { marginTop: 10 }, onClick: () => onOpenArticle(relatedArticle.id), children: t("ebooks.relatedArticleCta") })), selected.relatedSiteId ? (_jsx("button", { className: "btn btn-ghost btn-block", style: { marginTop: 8 }, onClick: () => onOpenSite(selected.relatedSiteId), children: t("ebooks.relatedCta") })) : (!relatedArticle && (_jsx("p", { className: "small muted", style: { marginTop: 10 }, children: t("ebooks.noRelated") })))] }))] }));
}
