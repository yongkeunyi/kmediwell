import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy, Suspense, useState } from "react";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Landing } from "./components/Landing";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useLocale } from "./lib/i18n";
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
function ViewFallback() {
    const { t } = useLocale();
    return _jsx("p", { className: "hint screen-pad", children: t("common.loading") });
}
export default function App() {
    const [view, setView] = useState("landing");
    const [siteId, setSiteId] = useState(null);
    const [bookingSite, setBookingSite] = useState(null);
    const [articleId, setArticleId] = useState(null);
    const [highlightEbookId, setHighlightEbookId] = useState(null);
    function openSite(id) {
        setSiteId(id);
        setView("detail");
    }
    function openArticle(id) {
        setArticleId(id);
        setView("article");
    }
    function openEbook(id) {
        setHighlightEbookId(id);
        setView("ebooks");
    }
    return (_jsxs("div", { className: "app-shell", children: [view !== "landing" && _jsx(Nav, { view: view, onNavigate: setView }), _jsx("main", { className: "app-main", children: _jsx(ErrorBoundary, { children: _jsxs(Suspense, { fallback: _jsx(ViewFallback, {}), children: [view === "landing" && (_jsx(Landing, { onEnter: () => setView("home"), onBrowseEbooks: () => setView("ebooks"), onOpenNews: () => setView("news"), onExploreAll: () => setView("explore") })), view === "home" && (_jsx(Home, { onOpenSite: openSite, onOpenArticle: openArticle, onOpenEbook: openEbook, onBrowseEbooks: () => setView("ebooks"), onMeasure: () => setView("measure"), onExploreAll: () => setView("explore") })), view === "auth" && (_jsx("div", { className: "screen-pad center-pad", children: _jsx(AuthForm, {}) })), view === "measure" && _jsx(Measure, { onViewCourse: () => setView("explore") }), view === "explore" && _jsx(Explore, { onOpenSite: openSite }), view === "detail" &&
                                (siteId !== null ? (_jsx(SiteDetail, { siteId: siteId, onBack: () => setView("explore"), onBook: (site) => {
                                        setBookingSite(site);
                                        setView("booking");
                                    } })) : (_jsx(NoSiteSelected, { onExplore: () => setView("explore") }))), view === "booking" &&
                                (bookingSite ? (_jsx(BookingCheckout, { site: bookingSite, onBack: () => setView("detail"), onConfirmed: () => setView("journey") })) : (_jsx(NoSiteSelected, { onExplore: () => setView("explore") }))), view === "journey" && _jsx(Journey, { onExplore: () => setView("explore") }), view === "ebooks" && (_jsx(EbookStore, { onOpenSite: openSite, onOpenArticle: openArticle, onRequireAuth: () => setView("auth"), highlightEbookId: highlightEbookId })), view === "news" && _jsx(NewsList, { onOpenArticle: openArticle, onApplySeller: () => setView("seller") }), view === "seller" && _jsx(SellerApply, { onBack: () => setView("news") }), view === "article" &&
                                (articleId !== null ? (_jsx(ArticleDetail, { articleId: articleId, onBack: () => setView("news"), onOpenSite: openSite, onOpenEbook: openEbook })) : (_jsx(NoArticleSelected, { onBack: () => setView("news") })))] }) }) })] }));
}
function NoSiteSelected({ onExplore }) {
    const { t } = useLocale();
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("p", { className: "hint", children: t("app.noSiteSelected") }), _jsx("button", { className: "btn btn-ghost btn-block", onClick: onExplore, children: t("app.goExplore") })] }));
}
function NoArticleSelected({ onBack }) {
    const { t } = useLocale();
    return (_jsxs("div", { className: "screen-pad", children: [_jsx("p", { className: "hint", children: t("article.notFound") }), _jsx("button", { className: "btn btn-ghost btn-block", onClick: onBack, children: t("article.back") })] }));
}
