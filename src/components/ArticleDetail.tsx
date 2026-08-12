import { useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { useLocale } from "../lib/i18n";
import type { Article, Ebook, Site } from "../lib/types";

export function ArticleDetail({
  articleId,
  onBack,
  onOpenSite,
  onOpenEbook,
}: {
  articleId: number;
  onBack: () => void;
  onOpenSite: (id: number) => void;
  onOpenEbook: (id: number) => void;
}) {
  const { t } = useLocale();
  const { data: article, isLoading } = useQuery(api.articles.get, { id: articleId });
  const a = article as unknown as Article | null | undefined;

  const { data: site } = useQuery(api.sites.get, a?.relatedSiteId ? { id: a.relatedSiteId } : "skip");
  const { data: ebook } = useQuery(api.ebooks.get, a?.relatedEbookId ? { id: a.relatedEbookId } : "skip");
  const s = site as unknown as Site | null | undefined;
  const e = ebook as unknown as Ebook | null | undefined;

  if (isLoading) return <div className="screen-pad">{t("common.loading")}</div>;
  if (!a) return <div className="screen-pad">{t("article.notFound")}</div>;

  return (
    <div className="screen-pad">
      <button className="back-link" onClick={onBack}>
        {t("article.back")}
      </button>
      <div className="eyebrow">{t("news.eyebrow")}</div>
      <h1 className="page-title">{a.title}</h1>
      <div className="small muted">
        {a.authorName} · {a.authorCountry}
      </div>
      <p className="lead" style={{ marginTop: 10 }}>
        {a.body}
      </p>

      {(s || e) && (
        <>
          <h2 className="section-title">{t("article.continueJourney")}</h2>
          <div className="stack">
            {e && (
              <button className="card row" style={{ textAlign: "left", width: "100%" }} onClick={() => onOpenEbook(e.id)}>
                <div>
                  <div>📖 {e.title}</div>
                  <div className="small muted">${e.priceUsd.toFixed(2)}</div>
                </div>
                <span className="small">{t("article.readEbook")} →</span>
              </button>
            )}
            {s && (
              <button className="card row" style={{ textAlign: "left", width: "100%" }} onClick={() => onOpenSite(s.id)}>
                <div>
                  <div>🧘 {s.name}</div>
                  <div className="small muted">{s.programName}</div>
                </div>
                <span className="small">{t("article.bookSite")} →</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
