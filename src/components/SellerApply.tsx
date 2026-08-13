import { useState } from "react";
import { useAuth, useMutation, useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { AuthForm } from "./AuthForm";
import { useLocale } from "../lib/i18n";
import { SELLER_COUNTRIES } from "../lib/types";
import type { SellerApplication } from "../lib/types";

export function SellerApply({ onBack }: { onBack: () => void }) {
  const { locale, t } = useLocale();
  const { isAuthenticated } = useAuth();
  const [country, setCountry] = useState(SELLER_COUNTRIES[0].code);
  const [preferredLocale, setPreferredLocale] = useState(locale);
  const [message, setMessage] = useState("");

  const { data: existing, isLoading } = useQuery(api.sellers.myApplication, isAuthenticated ? {} : "skip");
  const application = (existing as unknown as SellerApplication | null | undefined) ?? null;
  const { mutate: apply, isPending, error } = useMutation(api.sellers.apply);

  if (!isAuthenticated) {
    return (
      <div className="screen-pad center-pad">
        <AuthForm />
      </div>
    );
  }

  async function handleSubmit() {
    await apply({ country, preferredLocale, message: message.trim() || undefined });
  }

  return (
    <div className="screen-pad">
      <button className="back-link" onClick={onBack}>
        {t("seller.back")}
      </button>
      <div className="eyebrow">{t("seller.eyebrow")}</div>
      <h1 className="page-title">{t("seller.title")}</h1>
      <p className="lead">{t("seller.lead")}</p>

      {isLoading && <p className="hint">{t("common.loading")}</p>}

      {!isLoading && application ? (
        <div className="card stack">
          <div className="row">
            <span className="small muted">{t("seller.countryLabel")}</span>
            <span className="small">{SELLER_COUNTRIES.find((c) => c.code === application.country)?.[locale] ?? application.country}</span>
          </div>
          <div className="row">
            <span className="small muted">{t("seller.appliedOn")}</span>
            <span className="small num">{new Date(application.createdAt).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US")}</span>
          </div>
          <hr className="rule" />
          <p className="small" style={{ margin: 0 }}>
            {application.status === "approved"
              ? t("seller.statusApproved")
              : application.status === "rejected"
                ? t("seller.statusRejected")
                : t("seller.statusPending")}
          </p>
        </div>
      ) : (
        !isLoading && (
          <div className="card stack">
            <div className="stack" style={{ gap: 4 }}>
              <label className="small muted" htmlFor="seller-country">
                {t("seller.countryLabel")}
              </label>
              <select id="seller-country" className="date-input" value={country} onChange={(e) => setCountry(e.target.value)}>
                {SELLER_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c[locale]}
                    {c.priority === 1 ? ` · ${t("seller.priorityBadge")}` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="stack" style={{ gap: 4 }}>
              <label className="small muted" htmlFor="seller-locale">
                {t("seller.localeLabel")}
              </label>
              <select
                id="seller-locale"
                className="date-input"
                value={preferredLocale}
                onChange={(e) => setPreferredLocale(e.target.value as "ko" | "en")}
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="stack" style={{ gap: 4 }}>
              <label className="small muted" htmlFor="seller-message">
                {t("seller.messageLabel")}
              </label>
              <textarea
                id="seller-message"
                className="date-input"
                style={{ minHeight: 72, resize: "vertical", fontFamily: "inherit" }}
                placeholder={t("seller.messagePlaceholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {error && <p className="form-error">{error.message}</p>}
            <button className="btn btn-primary btn-block" onClick={handleSubmit} disabled={isPending}>
              {isPending ? t("common.processing") : t("seller.submitCta")}
            </button>
          </div>
        )
      )}
    </div>
  );
}
