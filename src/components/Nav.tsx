import { LogOut } from "lucide-react";
import { useAuth, useStatus } from "@gencow/react";
import { signOut } from "../lib/gencow";
import { useLocale, type Locale } from "../lib/i18n";
import type { View } from "../App";

type TabView = "home" | "explore" | "news" | "ebooks" | "journey";

const TAB_IDS: TabView[] = ["home", "explore", "news", "ebooks", "journey"];
const TAB_KEYS: Record<TabView, "nav.home" | "nav.explore" | "nav.news" | "nav.ebooks" | "nav.journey"> = {
  home: "nav.home",
  explore: "nav.explore",
  news: "nav.news",
  ebooks: "nav.ebooks",
  journey: "nav.journey",
};

export function Nav({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  const { user, isAuthenticated } = useAuth();
  const { isConnected } = useStatus();
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="brand" onClick={() => onNavigate("home")}>
          <span className="brand-word">K·MediWell</span>
          <span
            className={`status-dot${isConnected ? " on" : ""}`}
            title={isConnected ? t("status.connected") : t("status.disconnected")}
          />
        </button>
        <nav className="tabs">
          {TAB_IDS.map((id) => (
            <button
              key={id}
              className={`tab${view === id ? " active" : ""}`}
              aria-current={view === id ? "page" : undefined}
              onClick={() => onNavigate(id)}
            >
              {t(TAB_KEYS[id])}
            </button>
          ))}
        </nav>
        <select
          className="lang-select"
          aria-label="Language"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
        >
          <option value="ko">🇰🇷 한국어</option>
          <option value="en">🇺🇸 English</option>
        </select>
        {isAuthenticated ? (
          <div className="nav-user">
            <span className="nav-user-name">{user?.name || user?.email}</span>
            <button className="icon-btn" onClick={() => signOut()} aria-label={t("nav.logout")}>
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button className="btn btn-ghost" onClick={() => onNavigate("auth")}>
            {t("nav.login")}
          </button>
        )}
      </div>
    </header>
  );
}
