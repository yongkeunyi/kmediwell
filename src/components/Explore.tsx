import { useState } from "react";
import { useQuery } from "@gencow/react";
import { api } from "../lib/gencow";
import type { Site } from "../lib/types";
import { CATEGORIES, categoryLabel } from "../lib/types";
import { useLocale } from "../lib/i18n";
import { AxBadge } from "./AxBadge";
import { categoryEmoji } from "./Home";

export function Explore({ onOpenSite }: { onOpenSite: (id: number) => void }) {
  const { locale, t } = useLocale();
  const { data, isLoading } = useQuery(api.sites.list, {});
  const [category, setCategory] = useState<string | null>(null);
  const sites = (data?.data as unknown as Site[] | undefined) ?? [];
  const filtered = category ? sites.filter((s) => s.category === category) : sites;

  return (
    <div className="screen-pad">
      <div className="eyebrow">{t("explore.eyebrow")}</div>
      <h1 className="page-title">{t("explore.title")}</h1>

      <div className="chipbar" role="group" aria-label={t("home.categoriesTitle")}>
        <button
          className={`chip chip-btn${category === null ? " on" : ""}`}
          aria-pressed={category === null}
          onClick={() => setCategory(null)}
        >
          {t("common.all")}
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`chip chip-btn${category === c ? " on" : ""}`}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {categoryLabel(c, locale)}
          </button>
        ))}
      </div>

      {isLoading && <p className="hint">{t("common.loading")}</p>}
      {!isLoading && filtered.length === 0 && <p className="hint">{t("explore.empty")}</p>}

      <div className="site-list" style={{ marginTop: 12 }}>
        {filtered.map((s) => (
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
    </div>
  );
}
