import { useState, type FormEvent } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { signIn, signUp } from "../lib/gencow";
import { useLocale } from "../lib/i18n";

export function AuthForm() {
  const { t } = useLocale();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      if (mode === "signIn") {
        await signIn(email, password);
      } else {
        await signUp(email, password, name || undefined);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("auth.genericError"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <h1>K·MediWell</h1>
      <p className="auth-subtitle">{t("auth.subtitle")}</p>

      <div className="auth-tabs">
        <button
          type="button"
          className={mode === "signIn" ? "active" : ""}
          onClick={() => setMode("signIn")}
        >
          {t("auth.signIn")}
        </button>
        <button
          type="button"
          className={mode === "signUp" ? "active" : ""}
          onClick={() => setMode("signUp")}
        >
          {t("auth.signUp")}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {mode === "signUp" && (
          <input
            type="text"
            placeholder={t("auth.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder={t("auth.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t("auth.passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {mode === "signIn" ? <LogIn size={16} /> : <UserPlus size={16} />}
          {isSubmitting ? t("common.processing") : mode === "signIn" ? t("auth.signIn") : t("auth.signUp")}
        </button>
      </form>
    </div>
  );
}
