import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { signIn, signUp } from "../lib/gencow";
import { useLocale } from "../lib/i18n";
export function AuthForm() {
    const { t } = useLocale();
    const [mode, setMode] = useState("signIn");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            if (mode === "signIn") {
                await signIn(email, password);
            }
            else {
                await signUp(email, password, name || undefined);
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : t("auth.genericError"));
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsxs("div", { className: "auth-card", children: [_jsx("h1", { children: "K\u00B7MediWell" }), _jsx("p", { className: "auth-subtitle", children: t("auth.subtitle") }), _jsxs("div", { className: "auth-tabs", children: [_jsx("button", { type: "button", className: mode === "signIn" ? "active" : "", onClick: () => setMode("signIn"), children: t("auth.signIn") }), _jsx("button", { type: "button", className: mode === "signUp" ? "active" : "", onClick: () => setMode("signUp"), children: t("auth.signUp") })] }), _jsxs("form", { onSubmit: handleSubmit, className: "auth-form", children: [mode === "signUp" && (_jsx("input", { type: "text", placeholder: t("auth.namePlaceholder"), value: name, onChange: (e) => setName(e.target.value) })), _jsx("input", { type: "email", placeholder: t("auth.emailPlaceholder"), value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx("input", { type: "password", placeholder: t("auth.passwordPlaceholder"), value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 8 }), error && _jsx("p", { className: "form-error", children: error }), _jsxs("button", { type: "submit", className: "primary-btn", disabled: isSubmitting, children: [mode === "signIn" ? _jsx(LogIn, { size: 16 }) : _jsx(UserPlus, { size: 16 }), isSubmitting ? t("common.processing") : mode === "signIn" ? t("auth.signIn") : t("auth.signUp")] })] })] }));
}
