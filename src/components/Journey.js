import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuth, useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { AuthForm } from "./AuthForm";
import { useLocale } from "../lib/i18n";
import { AxBadge } from "./AxBadge";
export function Journey({ onExplore }) {
    const { isAuthenticated } = useAuth();
    const { locale, t } = useLocale();
    const { data: history } = useQuery(api.healing.history, isAuthenticated ? {} : "skip");
    const { data: bookingsData } = useQuery(api.bookings.list, isAuthenticated ? {} : "skip");
    if (!isAuthenticated) {
        return (_jsx("div", { className: "screen-pad center-pad", children: _jsx(AuthForm, {}) }));
    }
    const records = (history ?? []).slice().reverse();
    const myBookings = bookingsData ?? [];
    const latest = records[records.length - 1];
    const first = records[0];
    const dateLocale = locale === "en" ? "en-US" : "ko-KR";
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("div", { className: "eyebrow", children: t("journey.eyebrow") }), _jsx("h1", { className: "page-title", children: t("journey.title") }), _jsxs("div", { className: "grid2", children: [_jsxs("div", { className: "stat", children: [_jsx("div", { className: "stat-k", children: t("journey.recentStress") }), _jsx("div", { className: "stat-v", children: latest ? latest.stressIndex : "—" }), latest && first && records.length > 1 && (_jsxs("div", { className: `stat-d${latest.stressIndex <= first.stressIndex ? " good" : ""}`, children: [latest.stressIndex <= first.stressIndex ? "▼" : "▲", " ", Math.abs(latest.stressIndex - first.stressIndex), " ", t("journey.change")] }))] }), _jsxs("div", { className: "stat", children: [_jsx("div", { className: "stat-k", children: t("journey.totalBookings") }), _jsxs("div", { className: "stat-v", children: [myBookings.length, _jsx("span", { style: { fontSize: ".9rem" }, children: t("journey.unitCount") })] })] })] }), records.length > 0 && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "section-title", children: t("journey.trendTitle") }), _jsxs("div", { className: "card", children: [_jsx(TrendChart, { values: records.map((r) => r.stressIndex), label: t("journey.trendTitle") }), _jsx("div", { className: "small muted", children: locale === "en"
                                    ? `${records.length} measurement${records.length === 1 ? "" : "s"} · lower is more relaxed`
                                    : `측정 ${records.length}회 · 낮을수록 이완 상태` })] })] })), _jsx("h2", { className: "section-title", children: t("journey.bookingsTitle") }), myBookings.length === 0 && _jsx("p", { className: "hint", children: t("journey.noBookings") }), _jsx("div", { className: "stack", children: myBookings.map((b) => (_jsxs("div", { className: "card", children: [_jsxs("div", { className: "row", children: [_jsx("span", { className: "site-name", style: { fontSize: ".95rem" }, children: b.siteName }), _jsx(AxBadge, { tier: b.axTier })] }), _jsxs("div", { className: "small muted", children: [b.programName, " \u00B7 ", new Date(b.scheduledAt).toLocaleDateString(dateLocale)] }), _jsxs("div", { className: "row", style: { marginTop: 6 }, children: [_jsx("span", { className: "small muted", children: t("journey.paidAmount") }), _jsxs("span", { className: "num", children: ["\u20A9", b.amount.toLocaleString("ko-KR")] })] })] }, b.id))) }), _jsx("button", { className: "btn btn-ghost btn-block", style: { marginTop: 16 }, onClick: onExplore, children: t("journey.moreCta") })] }));
}
function TrendChart({ values, label }) {
    if (values.length === 0)
        return null;
    const w = 300, h = 90, pad = 14;
    const max = Math.max(...values, 100);
    const min = Math.min(...values, 0);
    const range = Math.max(1, max - min);
    const stepX = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
    const points = values.map((v, i) => {
        const x = pad + i * stepX;
        const y = h - pad - ((v - min) / range) * (h - pad * 2);
        return [x, y];
    });
    const first = points[0];
    const last = points[points.length - 1];
    return (_jsxs("svg", { viewBox: `0 0 ${w} ${h}`, style: { width: "100%", height: 90 }, role: "img", "aria-label": label, children: [_jsx("polyline", { points: points.map((p) => p.join(",")).join(" "), fill: "none", stroke: "var(--eeg-theta)", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("circle", { cx: first[0], cy: first[1], r: "3", fill: "var(--text-3)" }), _jsx("circle", { cx: last[0], cy: last[1], r: "4.5", fill: "var(--eeg-theta)" }), _jsx("text", { x: first[0], y: first[1] - 8, fontSize: "9", fill: "var(--text-3)", fontFamily: "var(--mono)", children: values[0] }), _jsx("text", { x: last[0] - 14, y: last[1] - 10, fontSize: "9", fill: "var(--eeg-theta)", fontFamily: "var(--mono)", fontWeight: "700", children: values[values.length - 1] })] }));
}
