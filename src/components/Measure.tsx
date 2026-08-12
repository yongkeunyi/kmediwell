import { useAuth, useMutation, useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { AuthForm } from "./AuthForm";
import { useLocale } from "../lib/i18n";
import { categoryLabel } from "../lib/types";
import type { Recommendation } from "../lib/types";

export function Measure({ onViewCourse }: { onViewCourse: () => void }) {
  const { isAuthenticated } = useAuth();
  const { locale, t } = useLocale();
  const { mutate: measure, isPending } = useMutation(api.healing.measure);
  const { data: recommendation } = useQuery(api.healing.recommend, isAuthenticated ? {} : "skip");

  if (!isAuthenticated) {
    return (
      <div className="screen-pad center-pad">
        <AuthForm />
      </div>
    );
  }

  const rec = recommendation as Recommendation | null | undefined;
  const dateLocale = locale === "en" ? "en-US" : "ko-KR";

  return (
    <div className="screen-pad">
      <div className="eyebrow">{t("measure.eyebrow")}</div>
      <h1 className="page-title">{t("measure.title")}</h1>
      <p className="lead">{t("measure.lead")}</p>

      <button className="btn btn-primary" onClick={() => measure({})} disabled={isPending}>
        {isPending ? t("measure.measuring") : t("measure.startCta")}
      </button>

      {rec && (
        <>
          <div className="card eeg-card">
            <div className="row">
              <span className="small muted">{t("measure.measuredAt")}</span>
              <span className="small num">{new Date(rec.basedOn.measuredAt).toLocaleString(dateLocale)}</span>
            </div>
            <EegBars alpha={rec.basedOn.alpha} theta={rec.basedOn.theta} beta={rec.basedOn.beta} />
            <div className="legend">
              <span>
                <i className="dot alpha" />
                {t("measure.alphaLabel")}
              </span>
              <span>
                <i className="dot theta" />
                {t("measure.thetaLabel")}
              </span>
              <span>
                <i className="dot beta" />
                {t("measure.betaLabel")}
              </span>
            </div>
          </div>

          <h2 className="section-title">{t("measure.recommendTitle")}</h2>
          <div className="stack">
            {rec.scores.map((s, i) => (
              <div key={s.category} className="card row">
                <span>{categoryLabel(s.category, locale)}</span>
                <b className={`num${i === 0 ? " highlight" : ""}`}>{s.score}%</b>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} onClick={onViewCourse}>
            {t("measure.viewCoursesCta")}
          </button>
        </>
      )}

      {!rec && !isPending && (
        <p className="hint" style={{ marginTop: 14 }}>
          {t("measure.empty")}
        </p>
      )}
    </div>
  );
}

function EegBars({ alpha, theta, beta }: { alpha: number; theta: number; beta: number }) {
  const bands = [
    { label: "α", value: alpha, cls: "alpha" },
    { label: "θ", value: theta, cls: "theta" },
    { label: "β", value: beta, cls: "beta" },
  ];
  return (
    <div className="eeg-bars">
      {bands.map((b) => (
        <div key={b.label} className="eeg-bar-row">
          <span className="eeg-bar-label">{b.label}</span>
          <div className="eeg-bar-track">
            <div className={`eeg-bar-fill ${b.cls}`} style={{ width: `${b.value}%` }} />
          </div>
          <span className="eeg-bar-value num">{b.value}</span>
        </div>
      ))}
    </div>
  );
}
