import { useQuery, useAuth } from "@gencow/react";
import { api } from "../lib/gencow";
import type { Article, Ebook, Site } from "../lib/types";
import { CATEGORIES, categoryLabel } from "../lib/types";
import { useLocale } from "../lib/i18n";
import { AxBadge } from "./AxBadge";

export function Home({
  onOpenSite,
  onOpenArticle,
  onOpenEbook,
  onBrowseEbooks,
  onMeasure,
  onExploreAll,
}: {
  onOpenSite: (id: number) => void;
  onOpenArticle: (id: number) => void;
  onOpenEbook: (id: number) => void;
  onBrowseEbooks: () => void;
  onMeasure: () => void;
  onExploreAll: () => void;
}) {
  const { isAuthenticated } = useAuth();
  const { locale, t } = useLocale();
  const { data, isLoading } = useQuery(api.sites.list, { filters: { isTop20: "1" } });
  const sites = (data?.data as unknown as Site[] | undefined) ?? [];
  const { data: newsData } = useQuery(api.articles.list, { filters: { locale }, limit: 4 });
  const articles = (newsData?.data as unknown as Article[] | undefined) ?? [];
  const { data: ebooksData } = useQuery(api.ebooks.list, { limit: 3 });
  const ebooks = (ebooksData?.data as unknown as Ebook[] | undefined) ?? [];

  return (
    <div className="screen-pad">
      <div className="eyebrow">{t("home.eyebrow")}</div>
      <h1 className="page-title">{t("home.title")}</h1>
      <p className="lead">{t("home.lead")}</p>

      <div className="hero-card">
        <div className="hero-card-label">{t("home.heroLabel")}</div>
        <div className="hero-card-title">{t("home.heroTitle")}</div>
        <button className="btn btn-primary" onClick={onMeasure}>
          {isAuthenticated ? t("home.ctaAuthed") : t("home.ctaGuest")}
        </button>
      </div>

      {ebooks.length > 0 && (
        <div className="funnel-card">
          <div className="eyebrow">{t("home.ebooksEyebrow")}</div>
          <h2 className="section-title" style={{ marginTop: "0.2em" }}>
            {t("home.ebooksTitle")}
          </h2>
          <p className="lead" style={{ fontSize: ".88rem" }}>
            {t("home.ebooksLead")}
          </p>
          <div className="ebook-strip">
            {ebooks.map((e) => (
              <button key={e.id} className="ebook-strip-card" onClick={() => onOpenEbook(e.id)}>
                <span className="ebook-strip-title">{e.title}</span>
                <span className="ebook-strip-price">${e.priceUsd.toFixed(2)}</span>
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={onBrowseEbooks}>
            {t("home.ebooksCta")}
          </button>
        </div>
      )}

      {articles.length > 0 && (
        <>
          <h2 className="section-title">{t("home.newsTitle")}</h2>
          <div className="news-strip">
            {articles.map((a) => (
              <button key={a.id} className="news-strip-card" onClick={() => onOpenArticle(a.id)}>
                <span className="news-strip-title">{a.title}</span>
                <span className="news-strip-byline">
                  {a.authorName} · {a.authorCountry}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      <h2 className="section-title">{t("home.categoriesTitle")}</h2>
      <div className="chipbar">
        {CATEGORIES.map((c) => (
          <span key={c} className="chip">
            {categoryLabel(c, locale)}
          </span>
        ))}
      </div>

      <h2 className="section-title">{t("home.top20Title")}</h2>
      {isLoading && <p className="hint">{t("common.loading")}</p>}
      <div className="site-list">
        {sites.map((s) => (
          <button key={s.id} className="site-card" onClick={() => onOpenSite(s.id)}>
            <div className="site-thumb" aria-hidden="true">
              {categoryEmoji(s.category)}
            </div>
            <div className="site-info">
              <div className="site-row">
                <span className="site-name">{s.name}</span>
                <AxBadge tier={s.axTier} />
              </div>
              <div className="site-loc">
                {s.region} · {categoryLabel(s.category, locale)}
              </div>
            </div>
          </button>
        ))}
      </div>
      <button className="btn btn-ghost btn-block" onClick={onExploreAll}>
        {t("home.viewAll")}
      </button>
    </div>
  );
}

export function categoryEmoji(category: string) {
  switch (category) {
    case "자연숲치유":
      return "🌲";
    case "뷰티스파":
      return "💆";
    case "힐링명상":
      return "🧘";
    case "한방":
      return "♨️";
    case "스테이":
      return "🏨";
    case "푸드":
      return "🍚";
    default:
      return "✨";
  }
}
