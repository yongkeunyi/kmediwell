import { useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { useLocale } from "../lib/i18n";
import type { Article } from "../lib/types";

export function NewsList({ onOpenArticle }: { onOpenArticle: (id: number) => void }) {
  const { locale, t } = useLocale();
  const { data, isLoading } = useQuery(api.articles.list, { filters: { locale } });
  const articles = (data?.data as unknown as Article[] | undefined) ?? [];

  return (
    <div className="screen-pad">
      <div className="eyebrow">{t("news.eyebrow")}</div>
      <h1 className="page-title">{t("news.title")}</h1>
      <p className="lead">{t("news.lead")}</p>

      {isLoading && <p className="hint">{t("common.loading")}</p>}
      {!isLoading && articles.length === 0 && <p className="hint">{t("news.empty")}</p>}

      <div className="site-list" style={{ marginTop: 12 }}>
        {articles.map((a) => (
          <button key={a.id} className="site-card" onClick={() => onOpenArticle(a.id)}>
            <div className="site-thumb" aria-hidden="true">
              📰
            </div>
            <div className="site-info">
              <span className="site-name">{a.title}</span>
              <div className="site-loc">
                {a.authorName} · {a.authorCountry}
              </div>
              <div className="small muted" style={{ marginTop: 4 }}>
                {a.excerpt}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
