import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
import { useLocale } from "../lib/i18n";
class ErrorBoundaryImpl extends Component {
    state = { error: null };
    static getDerivedStateFromError(error) {
        return { error };
    }
    componentDidCatch(error, info) {
        console.error("Unhandled UI error:", error, info.componentStack);
    }
    render() {
        if (this.state.error) {
            return (_jsxs("div", { className: "screen-pad", children: [_jsx("p", { className: "form-error", children: this.props.t("error.boundaryMessage") }), _jsx("button", { className: "btn btn-ghost", onClick: () => this.setState({ error: null }), children: this.props.t("error.retry") })] }));
        }
        return this.props.children;
    }
}
export function ErrorBoundary({ children }) {
    const { locale, t } = useLocale();
    return (_jsx(ErrorBoundaryImpl, { locale: locale, t: t, children: children }));
}
