import { lazy, Suspense, useState } from "react";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Landing } from "./components/Landing";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useLocale } from "./lib/i18n";
import type { Site } from "./lib/types";

const Measure = lazy(() => import("./components/Measure").then((m) => ({ default: m.Measure })));
const Explore = lazy(() => import("./components/Explore").then((m) => ({ default: m.Explore })));
const SiteDetail = lazy(() => import("./components/SiteDetail").then((m) => ({ default: m.SiteDetail })));
const BookingCheckout = lazy(() => import("./components/BookingCheckout").then((m) => ({ default: m.BookingCheckout })));
const Journey = lazy(() => import("./components/Journey").then((m) => ({ default: m.Journey })));
const EbookStore = lazy(() => import("./components/EbookStore").then((m) => ({ default: m.EbookStore })));
const AuthForm = lazy(() => import("./components/AuthForm").then((m) => ({ default: m.AuthForm })));
const NewsList = lazy(() => import("./components/NewsList").then((m) => ({ default: m.NewsList })));
const ArticleDetail = lazy(() => import("./components/ArticleDetail").then((m) => ({ default: m.ArticleDetail })));
const SellerApply = lazy(() => import("./components/SellerApply").then((m) => ({ default: m.SellerApply })));

export type View =
  | "landing"
  | "home"
  | "auth"
  | "measure"
  | "explore"
  | "detail"
  | "booking"
  | "journey"
  | "ebooks"
  | "news"
  | "article"
  | "seller";

function ViewFallback() {
  const { t } = useLocale();
  return <p className="hint screen-pad">{t("common.loading")}</p>;
}

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [siteId, setSiteId] = useState<number | null>(null);
  const [bookingSite, setBookingSite] = useState<Site | null>(null);
  const [articleId, setArticleId] = useState<number | null>(null);
  const [highlightEbookId, setHighlightEbookId] = useState<number | null>(null);

  function openSite(id: number) {
    setSiteId(id);
    setView("detail");
  }

  function openArticle(id: number) {
    setArticleId(id);
    setView("article");
  }

  function openEbook(id: number) {
    setHighlightEbookId(id);
    setView("ebooks");
  }

  return (
    <div className="app-shell">
      {view !== "landing" && <Nav view={view} onNavigate={setView} />}
      <main className="app-main">
        <ErrorBoundary>
          <Suspense fallback={<ViewFallback />}>
            {view === "landing" && (
              <Landing
                onEnter={() => setView("home")}
                onBrowseEbooks={() => setView("ebooks")}
                onOpenNews={() => setView("news")}
                onExploreAll={() => setView("explore")}
              />
            )}
            {view === "home" && (
              <Home
                onOpenSite={openSite}
                onOpenArticle={openArticle}
                onOpenEbook={openEbook}
                onBrowseEbooks={() => setView("ebooks")}
                onMeasure={() => setView("measure")}
                onExploreAll={() => setView("explore")}
              />
            )}
            {view === "auth" && (
              <div className="screen-pad center-pad">
                <AuthForm />
              </div>
            )}
            {view === "measure" && <Measure onViewCourse={() => setView("explore")} />}
            {view === "explore" && <Explore onOpenSite={openSite} />}
            {view === "detail" &&
              (siteId !== null ? (
                <SiteDetail
                  siteId={siteId}
                  onBack={() => setView("explore")}
                  onBook={(site) => {
                    setBookingSite(site);
                    setView("booking");
                  }}
                />
              ) : (
                <NoSiteSelected onExplore={() => setView("explore")} />
              ))}
            {view === "booking" &&
              (bookingSite ? (
                <BookingCheckout site={bookingSite} onBack={() => setView("detail")} onConfirmed={() => setView("journey")} />
              ) : (
                <NoSiteSelected onExplore={() => setView("explore")} />
              ))}
            {view === "journey" && <Journey onExplore={() => setView("explore")} />}
            {view === "ebooks" && (
              <EbookStore
                onOpenSite={openSite}
                onOpenArticle={openArticle}
                onRequireAuth={() => setView("auth")}
                highlightEbookId={highlightEbookId}
              />
            )}
            {view === "news" && <NewsList onOpenArticle={openArticle} onApplySeller={() => setView("seller")} />}
            {view === "seller" && <SellerApply onBack={() => setView("news")} />}
            {view === "article" &&
              (articleId !== null ? (
                <ArticleDetail articleId={articleId} onBack={() => setView("news")} onOpenSite={openSite} onOpenEbook={openEbook} />
              ) : (
                <NoArticleSelected onBack={() => setView("news")} />
              ))}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

function NoSiteSelected({ onExplore }: { onExplore: () => void }) {
  const { t } = useLocale();
  return (
    <div className="screen-pad">
      <p className="hint">{t("app.noSiteSelected")}</p>
      <button className="btn btn-ghost btn-block" onClick={onExplore}>
        {t("app.goExplore")}
      </button>
    </div>
  );
}

function NoArticleSelected({ onBack }: { onBack: () => void }) {
  const { t } = useLocale();
  return (
    <div className="screen-pad">
      <p className="hint">{t("article.notFound")}</p>
      <button className="btn btn-ghost btn-block" onClick={onBack}>
        {t("article.back")}
      </button>
    </div>
  );
}
