import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogOut } from "lucide-react";
import { useAuth, useStatus } from "@gencow/react";
import { signOut } from "../lib/gencow";
import { useLocale } from "../lib/i18n";
const TAB_IDS = ["home", "explore", "news", "ebooks", "journey"];
const TAB_KEYS = {
    home: "nav.home",
    explore: "nav.explore",
    news: "nav.news",
    ebooks: "nav.ebooks",
    journey: "nav.journey",
};
export function Nav({ view, onNavigate }) {
    const { user, isAuthenticated } = useAuth();
    const { isConnected } = useStatus();
    const { locale, setLocale, t } = useLocale();
    return (_jsx("header", { className: "nav", children: _jsxs("div", { className: "nav-inner", children: [_jsxs("button", { className: "brand", onClick: () => onNavigate("home"), children: [_jsx("span", { className: "brand-word", children: "K\u00B7MediWell" }), _jsx("span", { className: `status-dot${isConnected ? " on" : ""}`, title: isConnected ? t("status.connected") : t("status.disconnected") })] }), _jsx("nav", { className: "tabs", children: TAB_IDS.map((id) => (_jsx("button", { className: `tab${view === id ? " active" : ""}`, "aria-current": view === id ? "page" : undefined, onClick: () => onNavigate(id), children: t(TAB_KEYS[id]) }, id))) }), _jsxs("select", { className: "lang-select", "aria-label": "Language", value: locale, onChange: (e) => setLocale(e.target.value), children: [_jsx("option", { value: "ko", children: "\uD83C\uDDF0\uD83C\uDDF7 \uD55C\uAD6D\uC5B4" }), _jsx("option", { value: "en", children: "\uD83C\uDDFA\uD83C\uDDF8 English" })] }), isAuthenticated ? (_jsxs("div", { className: "nav-user", children: [_jsx("span", { className: "nav-user-name", children: user?.name || user?.email }), _jsx("button", { className: "icon-btn", onClick: () => signOut(), "aria-label": t("nav.logout"), children: _jsx(LogOut, { size: 16 }) })] })) : (_jsx("button", { className: "btn btn-ghost", onClick: () => onNavigate("auth"), children: t("nav.login") }))] }) }));
}
