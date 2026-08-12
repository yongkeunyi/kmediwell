import { useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import type { Site } from "../lib/types";
import { categoryLabel } from "../lib/types";
import { useLocale } from "../lib/i18n";
import { AxBadge } from "./AxBadge";
import { categoryEmoji } from "./Home";

export function SiteDetail({ siteId, onBack, onBook }: { siteId: number; onBack: () => void; onBook: (site: Site) => void }) {
  const { locale, t } = useLocale();
  const { data: site, isLoading } = useQuery(api.sites.get, { id: siteId });

  if (isLoading) return <div className="screen-pad">{t("common.loading")}</div>;
  if (!site) return <div className="screen-pad">{t("siteDetail.notFound")}</div>;

  const s = site as unknown as Site;

  return (
    <div className="screen-pad">
      <button className="back-link" onClick={onBack}>
        {t("siteDetail.back")}
      </button>
      <div className="site-thumb-lg" aria-hidden="true">
        {categoryEmoji(s.category)}
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <h1 className="page-title" style={{ margin: 0 }}>
          {s.name}
        </h1>
        <AxBadge tier={s.axTier} />
      </div>
      <div className="small muted">
        {s.region} · {categoryLabel(s.category, locale)}
        {s.isTop20 === "1" ? t("siteDetail.top20Suffix") : ""}
      </div>
      <p className="lead" style={{ marginTop: 10 }}>
        {s.description}
      </p>

      <div className="grid2">
        <div className="stat">
          <div className="stat-k">{t("siteDetail.axBasis")}</div>
          <div className="stat-v" style={{ fontSize: "1rem" }}>
            {s.axNote}
          </div>
        </div>
      </div>

      <h2 className="section-title">{t("siteDetail.program")}</h2>
      <div className="card row">
        <span>{s.programName}</span>
        <span className="num">₩{s.price.toLocaleString("ko-KR")}</span>
      </div>

      <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={() => onBook(s)}>
        {t("siteDetail.bookCta")}
      </button>
    </div>
  );
}
