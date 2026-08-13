import { Activity, BookOpen, Brain, MapPin, Newspaper } from "lucide-react";
import { useLocale, type Locale } from "../lib/i18n";

export function Landing({
  onEnter,
  onBrowseEbooks,
  onOpenNews,
  onExploreAll,
}: {
  onEnter: () => void;
  onBrowseEbooks: () => void;
  onOpenNews: () => void;
  onExploreAll: () => void;
}) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="landing">
      <div className="landing-topbar">
        <span className="brand-word">K·MediWell</span>
        <select
          className="lang-select"
          aria-label="Language"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
        >
          <option value="ko">🇰🇷 한국어</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>

      <div className="screen-pad">
        <div className="eyebrow">{t("landing.eyebrow")}</div>
        <h1 className="page-title landing-hero-title">{t("landing.title")}</h1>
        <p className="lead">{t("landing.lead")}</p>
        <div className="landing-cta-row">
          <button className="btn btn-primary" onClick={onEnter}>
            {t("landing.ctaPrimary")}
          </button>
          <button className="btn btn-ghost" onClick={onOpenNews}>
            {t("landing.ctaSecondary")}
          </button>
        </div>

        <div className="eyebrow" style={{ marginTop: 40 }}>
          {t("landing.evolutionEyebrow")}
        </div>
        <h2 className="section-title" style={{ marginTop: "0.2em" }}>
          {t("landing.evolutionTitle")}
        </h2>
        <div className="stage-track">
          <div className="stage-card">
            <span className="stage-num">1</span>
            <span className="stage-label">{t("landing.stage1Label")}</span>
            <span className="small muted">{t("landing.stage1Desc")}</span>
          </div>
          <span className="stage-arrow" aria-hidden="true">
            →
          </span>
          <div className="stage-card">
            <span className="stage-num">2</span>
            <span className="stage-label">{t("landing.stage2Label")}</span>
            <span className="small muted">{t("landing.stage2Desc")}</span>
          </div>
          <span className="stage-arrow" aria-hidden="true">
            →
          </span>
          <div className="stage-card active">
            <span className="stage-num">3</span>
            <span className="stage-label">{t("landing.stage3Label")}</span>
            <span className="small">{t("landing.stage3Desc")}</span>
          </div>
        </div>

        <div className="eyebrow" style={{ marginTop: 40 }}>
          {t("landing.pillarsEyebrow")}
        </div>
        <h2 className="section-title" style={{ marginTop: "0.2em" }}>
          {t("landing.pillarsTitle")}
        </h2>
        <div className="pillar-grid">
          <button className="pillar-card" onClick={onBrowseEbooks}>
            <BookOpen size={20} />
            <span className="pillar-title">{t("landing.pillar1Title")}</span>
            <span className="small muted">{t("landing.pillar1Desc")}</span>
            <span className="pillar-cta">{t("landing.pillar1Cta")}</span>
          </button>
          <button className="pillar-card" onClick={onOpenNews}>
            <Newspaper size={20} />
            <span className="pillar-title">{t("landing.pillar2Title")}</span>
            <span className="small muted">{t("landing.pillar2Desc")}</span>
            <span className="pillar-cta">{t("landing.pillar2Cta")}</span>
          </button>
          <button className="pillar-card" onClick={onExploreAll}>
            <Activity size={20} />
            <span className="pillar-title">{t("landing.pillar3Title")}</span>
            <span className="small muted">{t("landing.pillar3Desc")}</span>
            <span className="pillar-cta">{t("landing.pillar3Cta")}</span>
          </button>
          <button className="pillar-card" onClick={onExploreAll}>
            <MapPin size={20} />
            <span className="pillar-title">{t("landing.pillar4Title")}</span>
            <span className="small muted">{t("landing.pillar4Desc")}</span>
            <span className="pillar-cta">{t("landing.pillar4Cta")}</span>
          </button>
        </div>

        <div className="card ax-card">
          <Brain size={22} color="var(--gold)" />
          <div className="eyebrow" style={{ marginTop: 10 }}>
            {t("landing.axEyebrow")}
          </div>
          <h2 className="section-title" style={{ margin: "0.2em 0 0.4em" }}>
            {t("landing.axTitle")}
          </h2>
          <p className="small muted" style={{ margin: 0 }}>
            {t("landing.axDesc")}
          </p>
        </div>

        <h2 className="section-title">{t("landing.statsEyebrow")}</h2>
        <div className="stats-grid">
          <div className="stat-tile">
            <span className="stat-value">{t("landing.stat1Value")}</span>
            <span className="small muted">{t("landing.stat1Label")}</span>
          </div>
          <div className="stat-tile">
            <span className="stat-value">{t("landing.stat2Value")}</span>
            <span className="small muted">{t("landing.stat2Label")}</span>
          </div>
          <div className="stat-tile">
            <span className="stat-value">{t("landing.stat3Value")}</span>
            <span className="small muted">{t("landing.stat3Label")}</span>
          </div>
          <div className="stat-tile">
            <span className="stat-value">{t("landing.stat4Value")}</span>
            <span className="small muted">{t("landing.stat4Label")}</span>
          </div>
        </div>

        <div className="final-cta">
          <h2 className="section-title" style={{ margin: "0 0 0.3em", color: "var(--bg)" }}>
            {t("landing.finalTitle")}
          </h2>
          <p className="small" style={{ margin: "0 0 14px", opacity: 0.85 }}>
            {t("landing.finalDesc")}
          </p>
          <button className="btn btn-primary" onClick={onEnter}>
            {t("landing.finalCta")}
          </button>
        </div>
      </div>
    </div>
  );
}
