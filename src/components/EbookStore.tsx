import { useEffect, useState } from "react";
import { useAuth, useMutation, useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import { useLocale } from "../lib/i18n";
import type { Article, Ebook } from "../lib/types";

export function EbookStore({
  onOpenSite,
  onOpenArticle,
  onRequireAuth,
  highlightEbookId,
}: {
  onOpenSite: (id: number) => void;
  onOpenArticle: (id: number) => void;
  onRequireAuth: () => void;
  highlightEbookId?: number | null;
}) {
  const { t } = useLocale();
  const { isAuthenticated } = useAuth();
  const { data, isLoading } = useQuery(api.ebooks.list, {});
  const ebooks = (data?.data as unknown as Ebook[] | undefined) ?? [];
  const [selected, setSelected] = useState<Ebook | null>(null);

  const { data: subscriptionsData } = useQuery(api.ebooks.mySubscriptions, isAuthenticated ? {} : "skip");
  const subscribedIds = new Set((subscriptionsData as unknown as number[] | undefined) ?? []);
  const { mutate: subscribe, isPending: isSubscribing } = useMutation(api.ebooks.subscribe);
  const { mutate: unsubscribe, isPending: isUnsubscribing } = useMutation(api.ebooks.unsubscribe);

  const { data: relatedArticlesData } = useQuery(
    api.articles.list,
    selected ? { filters: { relatedEbookId: selected.id } } : "skip",
  );
  const relatedArticle = ((relatedArticlesData?.data as unknown as Article[] | undefined) ?? [])[0];

  useEffect(() => {
    if (!highlightEbookId) return;
    const match = ebooks.find((e) => e.id === highlightEbookId);
    if (match) setSelected(match);
  }, [highlightEbookId, ebooks]);

  const isSubscribed = selected ? subscribedIds.has(selected.id) : false;

  return (
    <div className="screen-pad">
      <div className="eyebrow">{t("ebooks.eyebrow")}</div>
      <h1 className="page-title">{t("ebooks.title")}</h1>
      <p className="lead">{t("ebooks.lead")}</p>

      {isLoading && <p className="hint">{t("common.loading")}</p>}

      <div className="ebook-grid">
        {ebooks.map((e) => (
          <button key={e.id} className={`ebook-cover${selected?.id === e.id ? " selected" : ""}`} onClick={() => setSelected(e)}>
            <span className="ebook-cat">{e.category}</span>
            <span className="ebook-title">{e.title}</span>
            <span className="ebook-price">
              ${e.priceUsd.toFixed(2)}
              {subscribedIds.has(e.id) && <span className="subscribed-dot" title={t("ebooks.subscribed")} />}
            </span>
          </button>
        ))}
        <div className="ebook-cover upcoming">
          <span className="small">
            {t("ebooks.moreComingLine1")}
            <br />
            {t("ebooks.moreComingLine2")}
          </span>
        </div>
      </div>

      {selected && (
        <div className="card ebook-detail-card">
          <div className="row">
            <h2 className="section-title" style={{ margin: 0 }}>
              {selected.title}
            </h2>
            <button className="icon-btn" onClick={() => setSelected(null)} aria-label="close">
              ✕
            </button>
          </div>
          <div className="small muted">
            {selected.author} · {selected.category}
          </div>
          <p className="lead" style={{ fontSize: ".86rem" }}>
            {selected.description}
          </p>

          {isAuthenticated ? (
            <button
              className={isSubscribed ? "btn btn-ghost" : "btn btn-primary"}
              disabled={isSubscribing || isUnsubscribing}
              onClick={() => (isSubscribed ? unsubscribe({ ebookId: selected.id }) : subscribe({ ebookId: selected.id }))}
            >
              {isSubscribed ? `✓ ${t("ebooks.subscribed")}` : t("ebooks.subscribe")}
            </button>
          ) : (
            <div className="stack" style={{ gap: 8 }}>
              <p className="small muted" style={{ margin: 0 }}>
                {t("ebooks.subscribeSignInPrompt")}
              </p>
              <button className="btn btn-primary" onClick={onRequireAuth}>
                {t("ebooks.subscribe")}
              </button>
            </div>
          )}

          {relatedArticle && (
            <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={() => onOpenArticle(relatedArticle.id)}>
              {t("ebooks.relatedArticleCta")}
            </button>
          )}

          {selected.relatedSiteId ? (
            <button className="btn btn-ghost btn-block" style={{ marginTop: 8 }} onClick={() => onOpenSite(selected.relatedSiteId!)}>
              {t("ebooks.relatedCta")}
            </button>
          ) : (
            !relatedArticle && (
              <p className="small muted" style={{ marginTop: 10 }}>
                {t("ebooks.noRelated")}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
