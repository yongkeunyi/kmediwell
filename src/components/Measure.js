import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuth, useMutation, useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { AuthForm } from "./AuthForm";
import { useLocale } from "../lib/i18n";
import { categoryLabel } from "../lib/types";
export function Measure({ onViewCourse }) {
    const { isAuthenticated } = useAuth();
    const { locale, t } = useLocale();
    const { mutate: measure, isPending } = useMutation(api.healing.measure);
    const { data: recommendation } = useQuery(api.healing.recommend, isAuthenticated ? {} : "skip");
    if (!isAuthenticated) {
        return (_jsx("div", { className: "screen-pad center-pad", children: _jsx(AuthForm, {}) }));
    }
    const rec = recommendation;
    const dateLocale = locale === "en" ? "en-US" : "ko-KR";
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("div", { className: "eyebrow", children: t("measure.eyebrow") }), _jsx("h1", { className: "page-title", children: t("measure.title") }), _jsx("p", { className: "lead", children: t("measure.lead") }), _jsx("button", { className: "btn btn-primary", onClick: () => measure({}), disabled: isPending, children: isPending ? t("measure.measuring") : t("measure.startCta") }), rec && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card eeg-card", children: [_jsxs("div", { className: "row", children: [_jsx("span", { className: "small muted", children: t("measure.measuredAt") }), _jsx("span", { className: "small num", children: new Date(rec.basedOn.measuredAt).toLocaleString(dateLocale) })] }), _jsx(EegBars, { alpha: rec.basedOn.alpha, theta: rec.basedOn.theta, beta: rec.basedOn.beta }), _jsxs("div", { className: "legend", children: [_jsxs("span", { children: [_jsx("i", { className: "dot alpha" }), t("measure.alphaLabel")] }), _jsxs("span", { children: [_jsx("i", { className: "dot theta" }), t("measure.thetaLabel")] }), _jsxs("span", { children: [_jsx("i", { className: "dot beta" }), t("measure.betaLabel")] })] })] }), _jsx("h2", { className: "section-title", children: t("measure.recommendTitle") }), _jsx("div", { className: "stack", children: rec.scores.map((s, i) => (_jsxs("div", { className: "card row", children: [_jsx("span", { children: categoryLabel(s.category, locale) }), _jsxs("b", { className: `num${i === 0 ? " highlight" : ""}`, children: [s.score, "%"] })] }, s.category))) }), _jsx("button", { className: "btn btn-primary btn-block", style: { marginTop: 14 }, onClick: onViewCourse, children: t("measure.viewCoursesCta") })] })), !rec && !isPending && (_jsx("p", { className: "hint", style: { marginTop: 14 }, children: t("measure.empty") }))] }));
}
function EegBars({ alpha, theta, beta }) {
    const bands = [
        { label: "α", value: alpha, cls: "alpha" },
        { label: "θ", value: theta, cls: "theta" },
        { label: "β", value: beta, cls: "beta" },
    ];
    return (_jsx("div", { className: "eeg-bars", children: bands.map((b) => (_jsxs("div", { className: "eeg-bar-row", children: [_jsx("span", { className: "eeg-bar-label", children: b.label }), _jsx("div", { className: "eeg-bar-track", children: _jsx("div", { className: `eeg-bar-fill ${b.cls}`, style: { width: `${b.value}%` } }) }), _jsx("span", { className: "eeg-bar-value num", children: b.value })] }, b.label))) }));
}
