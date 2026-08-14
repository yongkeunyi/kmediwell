import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogOut } from "lucide-react";
import { useAuth, useStatus } from "@gencow/react";
import { signOut } from "../lib/gencow";
export function Header() {
    const { user, isAuthenticated } = useAuth();
    const { isConnected } = useStatus();
    return (_jsxs("header", { className: "app-header", children: [_jsxs("div", { className: "brand", children: [_jsx("span", { className: "brand-mark", children: "\uBAA8\uB450" }), _jsx("span", { className: `status-dot${isConnected ? " connected" : ""}`, title: isConnected ? "실시간 연결됨" : "연결 끊김" })] }), isAuthenticated && (_jsxs("div", { className: "user-info", children: [_jsx("span", { children: user?.name || user?.email }), _jsx("button", { type: "button", className: "icon-btn", onClick: () => signOut(), "aria-label": "\uB85C\uADF8\uC544\uC6C3", children: _jsx(LogOut, { size: 16 }) })] }))] }));
}
