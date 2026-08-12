import { useAuth, useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { AuthForm } from "./AuthForm";
import { useLocale } from "../lib/i18n";
import type { HealingRecord, Booking } from "../lib/types";
import { AxBadge } from "./AxBadge";

export function Journey({ onExplore }: { onExplore: () => void }) {
  const { isAuthenticated } = useAuth();
  const { locale, t } = useLocale();
  const { data: history } = useQuery(api.healing.history, isAuthenticated ? {} : "skip");
  const { data: bookingsData } = useQuery(api.bookings.list, isAuthenticated ? {} : "skip");

  if (!isAuthenticated) {
    return (
      <div className="screen-pad center-pad">
        <AuthForm />
      </div>
    );
  }

  const records = ((history as HealingRecord[] | undefined) ?? []).slice().reverse();
  const myBookings = (bookingsData as Booking[] | undefined) ?? [];
  const latest = records[records.length - 1];
  const first = records[0];
  const dateLocale = locale === "en" ? "en-US" : "ko-KR";

  return (
    <div className="screen-pad">
      <div className="eyebrow">{t("journey.eyebrow")}</div>
      <h1 className="page-title">{t("journey.title")}</h1>

      <div className="grid2">
        <div className="stat">
          <div className="stat-k">{t("journey.recentStress")}</div>
          <div className="stat-v">{latest ? latest.stressIndex : "—"}</div>
          {latest && first && records.length > 1 && (
            <div className={`stat-d${latest.stressIndex <= first.stressIndex ? " good" : ""}`}>
              {latest.stressIndex <= first.stressIndex ? "▼" : "▲"} {Math.abs(latest.stressIndex - first.stressIndex)}{" "}
              {t("journey.change")}
            </div>
          )}
        </div>
        <div className="stat">
          <div className="stat-k">{t("journey.totalBookings")}</div>
          <div className="stat-v">
            {myBookings.length}
            <span style={{ fontSize: ".9rem" }}>{t("journey.unitCount")}</span>
          </div>
        </div>
      </div>

      {records.length > 0 && (
        <>
          <h2 className="section-title">{t("journey.trendTitle")}</h2>
          <div className="card">
            <TrendChart values={records.map((r) => r.stressIndex)} label={t("journey.trendTitle")} />
            <div className="small muted">
              {locale === "en"
                ? `${records.length} measurement${records.length === 1 ? "" : "s"} · lower is more relaxed`
                : `측정 ${records.length}회 · 낮을수록 이완 상태`}
            </div>
          </div>
        </>
      )}

      <h2 className="section-title">{t("journey.bookingsTitle")}</h2>
      {myBookings.length === 0 && <p className="hint">{t("journey.noBookings")}</p>}
      <div className="stack">
        {myBookings.map((b) => (
          <div key={b.id} className="card">
            <div className="row">
              <span className="site-name" style={{ fontSize: ".95rem" }}>
                {b.siteName}
              </span>
              <AxBadge tier={b.axTier} />
            </div>
            <div className="small muted">
              {b.programName} · {new Date(b.scheduledAt).toLocaleDateString(dateLocale)}
            </div>
            <div className="row" style={{ marginTop: 6 }}>
              <span className="small muted">{t("journey.paidAmount")}</span>
              <span className="num">₩{b.amount.toLocaleString("ko-KR")}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-ghost btn-block" style={{ marginTop: 16 }} onClick={onExplore}>
        {t("journey.moreCta")}
      </button>
    </div>
  );
}

function TrendChart({ values, label }: { values: number[]; label: string }) {
  if (values.length === 0) return null;
  const w = 300,
    h = 90,
    pad = 14;
  const max = Math.max(...values, 100);
  const min = Math.min(...values, 0);
  const range = Math.max(1, max - min);
  const stepX = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
  const points = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });
  const first = points[0];
  const last = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 90 }} role="img" aria-label={label}>
      <polyline
        points={points.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="var(--eeg-theta)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={first[0]} cy={first[1]} r="3" fill="var(--text-3)" />
      <circle cx={last[0]} cy={last[1]} r="4.5" fill="var(--eeg-theta)" />
      <text x={first[0]} y={first[1] - 8} fontSize="9" fill="var(--text-3)" fontFamily="var(--mono)">
        {values[0]}
      </text>
      <text x={last[0] - 14} y={last[1] - 10} fontSize="9" fill="var(--eeg-theta)" fontFamily="var(--mono)" fontWeight="700">
        {values[values.length - 1]}
      </text>
    </svg>
  );
}
