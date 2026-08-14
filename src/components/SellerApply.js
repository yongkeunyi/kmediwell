import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAuth, useMutation, useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { AuthForm } from "./AuthForm";
import { useLocale } from "../lib/i18n";
import { SELLER_COUNTRIES } from "../lib/types";
export function SellerApply({ onBack }) {
    const { locale, t } = useLocale();
    const { isAuthenticated } = useAuth();
    const [country, setCountry] = useState(SELLER_COUNTRIES[0].code);
    const [preferredLocale, setPreferredLocale] = useState(locale);
    const [message, setMessage] = useState("");
    const { data: existing, isLoading } = useQuery(api.sellers.myApplication, isAuthenticated ? {} : "skip");
    const application = existing ?? null;
    const { mutate: apply, isPending, error } = useMutation(api.sellers.apply);
    if (!isAuthenticated) {
        return (_jsx("div", { className: "screen-pad center-pad", children: _jsx(AuthForm, {}) }));
    }
    async function handleSubmit() {
        await apply({ country, preferredLocale, message: message.trim() || undefined });
    }
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("button", { className: "back-link", onClick: onBack, children: t("seller.back") }), _jsx("div", { className: "eyebrow", children: t("seller.eyebrow") }), _jsx("h1", { className: "page-title", children: t("seller.title") }), _jsx("p", { className: "lead", children: t("seller.lead") }), isLoading && _jsx("p", { className: "hint", children: t("common.loading") }), !isLoading && application ? (_jsxs("div", { className: "card stack", children: [_jsxs("div", { className: "row", children: [_jsx("span", { className: "small muted", children: t("seller.countryLabel") }), _jsx("span", { className: "small", children: SELLER_COUNTRIES.find((c) => c.code === application.country)?.[locale] ?? application.country })] }), _jsxs("div", { className: "row", children: [_jsx("span", { className: "small muted", children: t("seller.appliedOn") }), _jsx("span", { className: "small num", children: new Date(application.createdAt).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US") })] }), _jsx("hr", { className: "rule" }), _jsx("p", { className: "small", style: { margin: 0 }, children: application.status === "approved"
                            ? t("seller.statusApproved")
                            : application.status === "rejected"
                                ? t("seller.statusRejected")
                                : t("seller.statusPending") })] })) : (!isLoading && (_jsxs("div", { className: "card stack", children: [_jsxs("div", { className: "stack", style: { gap: 4 }, children: [_jsx("label", { className: "small muted", htmlFor: "seller-country", children: t("seller.countryLabel") }), _jsx("select", { id: "seller-country", className: "date-input", value: country, onChange: (e) => setCountry(e.target.value), children: SELLER_COUNTRIES.map((c) => (_jsxs("option", { value: c.code, children: [c[locale], c.priority === 1 ? ` · ${t("seller.priorityBadge")}` : ""] }, c.code))) })] }), _jsxs("div", { className: "stack", style: { gap: 4 }, children: [_jsx("label", { className: "small muted", htmlFor: "seller-locale", children: t("seller.localeLabel") }), _jsxs("select", { id: "seller-locale", className: "date-input", value: preferredLocale, onChange: (e) => setPreferredLocale(e.target.value), children: [_jsx("option", { value: "ko", children: "\uD55C\uAD6D\uC5B4" }), _jsx("option", { value: "en", children: "English" })] })] }), _jsxs("div", { className: "stack", style: { gap: 4 }, children: [_jsx("label", { className: "small muted", htmlFor: "seller-message", children: t("seller.messageLabel") }), _jsx("textarea", { id: "seller-message", className: "date-input", style: { minHeight: 72, resize: "vertical", fontFamily: "inherit" }, placeholder: t("seller.messagePlaceholder"), value: message, onChange: (e) => setMessage(e.target.value) })] }), error && _jsx("p", { className: "form-error", children: error.message }), _jsx("button", { className: "btn btn-primary btn-block", onClick: handleSubmit, disabled: isPending, children: isPending ? t("common.processing") : t("seller.submitCta") })] })))] }));
}
