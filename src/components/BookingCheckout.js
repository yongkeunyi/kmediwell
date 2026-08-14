import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAuth, useMutation } from "@gencow/react";
import { api } from "../lib/gencow";
import { AuthForm } from "./AuthForm";
import { useLocale } from "../lib/i18n";
const FEE_RATE = 0.08;
function defaultDate() {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
}
export function BookingCheckout({ site, onBack, onConfirmed }) {
    const { isAuthenticated } = useAuth();
    const { t } = useLocale();
    const { mutate: createBooking, isPending, error } = useMutation(api.bookings.create);
    const [date, setDate] = useState(defaultDate());
    if (!isAuthenticated) {
        return (_jsx("div", { className: "screen-pad center-pad", children: _jsx(AuthForm, {}) }));
    }
    const fee = Math.round(site.price * FEE_RATE);
    const total = site.price + fee;
    async function handleConfirm() {
        await createBooking({
            siteId: site.id,
            programName: site.programName,
            scheduledAt: new Date(`${date}T14:00:00`).toISOString(),
            amount: total,
        });
        onConfirmed();
    }
    return (_jsxs("div", { className: "screen-pad", children: [_jsxs("button", { className: "back-link", onClick: onBack, children: ["\u2190 ", site.name] }), _jsx("div", { className: "eyebrow", children: t("booking.eyebrow") }), _jsx("h1", { className: "page-title", children: t("booking.title") }), _jsxs("div", { className: "card stack", children: [_jsxs("div", { className: "row", children: [_jsx("span", { className: "small muted", children: t("booking.siteProgram") }), _jsxs("span", { className: "small", children: [site.name, " \u00B7 ", site.programName] })] }), _jsxs("div", { className: "row", children: [_jsx("span", { className: "small muted", children: t("booking.date") }), _jsx("input", { className: "date-input", type: "date", value: date, onChange: (e) => setDate(e.target.value), min: new Date().toISOString().slice(0, 10) })] }), _jsx("hr", { className: "rule" }), _jsxs("div", { className: "row", children: [_jsx("span", { className: "small muted", children: t("booking.amount") }), _jsxs("span", { className: "small num", children: ["\u20A9", site.price.toLocaleString("ko-KR")] })] }), _jsxs("div", { className: "row", children: [_jsx("span", { className: "small muted", children: t("booking.fee") }), _jsxs("span", { className: "small num", children: ["\u20A9", fee.toLocaleString("ko-KR")] })] }), _jsxs("div", { className: "row", children: [_jsx("b", { children: t("booking.total") }), _jsxs("b", { className: "num", children: ["\u20A9", total.toLocaleString("ko-KR")] })] })] }), error && _jsx("p", { className: "form-error", children: error.message }), _jsx("button", { className: "btn btn-primary btn-block", style: { marginTop: 16 }, onClick: handleConfirm, disabled: isPending, children: isPending ? t("common.processing") : t("booking.confirmCta") })] }));
}
