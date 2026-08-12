import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "ko" | "en";

const STORAGE_KEY = "kmediwell.locale";

const dict = {
  ko: {
    "nav.home": "홈",
    "nav.explore": "탐색",
    "nav.ebooks": "전자북",
    "nav.news": "치유관광타임즈",
    "nav.journey": "여정",
    "nav.login": "로그인",
    "nav.logout": "로그아웃",
    "status.connected": "실시간 연결됨",
    "status.disconnected": "연결 끊김",
    "common.loading": "불러오는 중...",
    "common.processing": "처리 중...",
    "common.all": "전체",

    "home.eyebrow": "외국인 의료·웰니스 관광객",
    "home.title": "더 치유의 시대",
    "home.lead": "뇌파 측정으로 나에게 맞는 치유 유형을 찾고, 88개소 웰니스관광지 중 최적의 코스를 예약하세요.",
    "home.heroLabel": "오늘의 치유지수",
    "home.heroTitle": "3분이면 나의 치유 유형을 알 수 있어요",
    "home.ctaAuthed": "뇌파 측정 시작하기 →",
    "home.ctaGuest": "로그인하고 측정 시작하기 →",
    "home.categoriesTitle": "카테고리",
    "home.top20Title": "외래객 특화 20선",
    "home.viewAll": "20선 전체 보기",

    "home.ebooksEyebrow": "한류관광 팬 · 재외동포를 위한 첫 걸음",
    "home.ebooksTitle": "영어판 전자북, 지금 구독하세요",
    "home.ebooksLead": "한국 전통 치유문화를 담은 영어판 전자북을 구독하면, 치유관광타임즈 기사로 이야기가 이어지고 실제 방문 예약까지 연결됩니다.",
    "home.ebooksCta": "전자북 보러 가기 →",

    "explore.eyebrow": "88개소 공식 DB",
    "explore.title": "웰니스관광지 탐색",
    "explore.empty": "해당 카테고리의 시설이 아직 없습니다.",

    "home.newsTitle": "치유관광타임즈",
    "news.eyebrow": "유학생 기자단 다국어 리포트",
    "news.title": "치유관광타임즈",
    "news.lead": "국내 체류 유학생 기자단이 자국어로 전하는 한국 전통 치유문화 현장 리포트.",
    "news.empty": "아직 등록된 기사가 없습니다.",
    "news.readTime": "읽기",
    "article.notFound": "기사를 찾을 수 없습니다.",
    "article.back": "← 목록으로",
    "article.continueJourney": "이어서 둘러보기",
    "article.readEbook": "전자북 읽기",
    "article.bookSite": "이 시설 예약하기",

    "siteDetail.notFound": "시설 정보를 찾을 수 없습니다.",
    "siteDetail.back": "← 목록으로",
    "siteDetail.top20Suffix": " · 외래객 특화 20선",
    "siteDetail.axBasis": "AX 인증 근거",
    "siteDetail.program": "프로그램",
    "siteDetail.bookCta": "예약하기 →",

    "booking.eyebrow": "예약 확인",
    "booking.title": "예약 내용을 확인해 주세요",
    "booking.siteProgram": "시설 · 프로그램",
    "booking.date": "일시",
    "booking.amount": "이용 금액",
    "booking.fee": "플랫폼 수수료(8%)",
    "booking.total": "총 결제 금액",
    "booking.confirmCta": "결제하고 예약 확정 →",

    "journey.eyebrow": "예약 확정 · 치유 여정",
    "journey.title": "나의 치유 여정",
    "journey.recentStress": "최근 스트레스 지수",
    "journey.change": "변화",
    "journey.totalBookings": "누적 예약",
    "journey.unitCount": "건",
    "journey.trendTitle": "스트레스 지수 변화 추이",
    "journey.bookingsTitle": "예약 내역",
    "journey.noBookings": "아직 예약 내역이 없습니다.",
    "journey.paidAmount": "결제 금액",
    "journey.moreCta": "추천 시설 더 보기",

    "measure.eyebrow": "EEG 측정 · DX",
    "measure.title": "뇌파 측정",
    "measure.lead": "버튼을 누르면 뉴로피드백 장비 측정을 시뮬레이션합니다. (실기기 연동 전 시연용 데이터)",
    "measure.startCta": "뇌파 측정 시작",
    "measure.measuring": "측정 중...",
    "measure.measuredAt": "측정 시각",
    "measure.alphaLabel": "α파(이완)",
    "measure.thetaLabel": "θ파(깊은휴식)",
    "measure.betaLabel": "β파(각성/스트레스)",
    "measure.recommendTitle": "Agent AI 추천 치유 유형",
    "measure.viewCoursesCta": "맞춤 시설 보기 →",
    "measure.empty": "아직 측정 기록이 없습니다. 위 버튼을 눌러 첫 측정을 시작하세요.",

    "ebooks.eyebrow": "전자북 넷플릭스 · 1차 타겟",
    "ebooks.title": "한국 전통문화 & 치유관광 전자북",
    "ebooks.lead": "아마존 킨들(KDP) 등 글로벌 서점에서 만나는 K-MediWell 전자북. 저자 30% · 플랫폼 70% 수익 배분.",
    "ebooks.moreComingLine1": "더 많은 전자북",
    "ebooks.moreComingLine2": "출간 준비중",
    "ebooks.noRelated": "이 전자북과 연결된 체험 상품은 준비 중입니다.",
    "ebooks.relatedCta": "관련 체험 예약 페이지 보기 →",
    "ebooks.subscribe": "구독하기",
    "ebooks.subscribed": "구독중",
    "ebooks.unsubscribe": "구독 취소",
    "ebooks.subscribeSignInPrompt": "로그인하고 구독하면 관련 소식을 받아볼 수 있어요.",
    "ebooks.relatedArticleCta": "치유관광타임즈 관련 기사 보기 →",

    "auth.subtitle": "로그인하고 뇌파 기반 맞춤 치유 여정을 시작하세요.",
    "auth.signIn": "로그인",
    "auth.signUp": "회원가입",
    "auth.namePlaceholder": "이름",
    "auth.emailPlaceholder": "이메일",
    "auth.passwordPlaceholder": "비밀번호",
    "auth.genericError": "인증에 실패했습니다.",

    "error.boundaryMessage": "문제가 발생했습니다. 새로고침 후 다시 시도해 주세요.",
    "error.retry": "다시 시도",

    "app.noSiteSelected": "선택된 시설이 없습니다.",
    "app.goExplore": "탐색으로 이동",
  },
  en: {
    "nav.home": "Home",
    "nav.explore": "Explore",
    "nav.ebooks": "eBooks",
    "nav.news": "HealingTour Times",
    "nav.journey": "Journey",
    "nav.login": "Sign in",
    "nav.logout": "Sign out",
    "status.connected": "Live",
    "status.disconnected": "Disconnected",
    "common.loading": "Loading...",
    "common.processing": "Processing...",
    "common.all": "All",

    "home.eyebrow": "For Global Wellness Travelers",
    "home.title": "The Age of Healing",
    "home.lead": "Find your healing type with an EEG check, then book the best course among 88 certified wellness sites across Korea.",
    "home.heroLabel": "Today's Healing Index",
    "home.heroTitle": "3 minutes to discover your healing type",
    "home.ctaAuthed": "Start EEG check →",
    "home.ctaGuest": "Sign in to start EEG check →",
    "home.categoriesTitle": "Categories",
    "home.top20Title": "Top 20 for International Visitors",
    "home.viewAll": "View all 20 →",

    "home.ebooksEyebrow": "Your First Step — For Hallyu Fans & Overseas Koreans",
    "home.ebooksTitle": "Subscribe to Our English eBooks",
    "home.ebooksLead": "Subscribe to English eBooks on Korean traditional healing culture — then follow the story into HealingTour Times articles and book your actual visit.",
    "home.ebooksCta": "Browse eBooks →",

    "explore.eyebrow": "88 Officially Certified Sites",
    "explore.title": "Explore Wellness Sites",
    "explore.empty": "No sites in this category yet.",

    "home.newsTitle": "HealingTour Times",
    "news.eyebrow": "Reported by International Student Fellows",
    "news.title": "HealingTour Times",
    "news.lead": "Dispatches on Korean traditional healing culture, written by Korea-resident international students in their own language.",
    "news.empty": "No articles yet.",
    "news.readTime": "read",
    "article.notFound": "This article could not be found.",
    "article.back": "← Back to articles",
    "article.continueJourney": "Continue the Journey",
    "article.readEbook": "Read the eBook",
    "article.bookSite": "Book this site",

    "siteDetail.notFound": "This site could not be found.",
    "siteDetail.back": "← Back to list",
    "siteDetail.top20Suffix": " · Top 20 for International Visitors",
    "siteDetail.axBasis": "AX Certification Basis",
    "siteDetail.program": "Program",
    "siteDetail.bookCta": "Book now →",

    "booking.eyebrow": "Confirm Booking",
    "booking.title": "Please review your booking",
    "booking.siteProgram": "Site · Program",
    "booking.date": "Date",
    "booking.amount": "Program fee",
    "booking.fee": "Platform fee (8%)",
    "booking.total": "Total",
    "booking.confirmCta": "Pay & confirm booking →",

    "journey.eyebrow": "Confirmed · Your Healing Journey",
    "journey.title": "My Healing Journey",
    "journey.recentStress": "Latest stress index",
    "journey.change": "change",
    "journey.totalBookings": "Total bookings",
    "journey.unitCount": "",
    "journey.trendTitle": "Stress index trend",
    "journey.bookingsTitle": "Booking history",
    "journey.noBookings": "No bookings yet.",
    "journey.paidAmount": "Amount paid",
    "journey.moreCta": "See more recommended sites",

    "measure.eyebrow": "EEG Check · DX",
    "measure.title": "Brainwave Check",
    "measure.lead": "Tap the button to simulate a neurofeedback device reading. (Demo data — real device integration pending)",
    "measure.startCta": "Start EEG check",
    "measure.measuring": "Measuring...",
    "measure.measuredAt": "Measured at",
    "measure.alphaLabel": "α — relaxation",
    "measure.thetaLabel": "θ — deep rest",
    "measure.betaLabel": "β — alertness/stress",
    "measure.recommendTitle": "Agent AI Recommended Healing Type",
    "measure.viewCoursesCta": "View matching sites →",
    "measure.empty": "No measurements yet. Tap the button above to take your first check.",

    "ebooks.eyebrow": "eBook Store · Phase 1 Target",
    "ebooks.title": "Korean Traditional Culture & Healing Tourism eBooks",
    "ebooks.lead": "K-MediWell eBooks, available on Amazon Kindle and other global stores. Authors keep 30% · platform 70%.",
    "ebooks.moreComingLine1": "More eBooks",
    "ebooks.moreComingLine2": "coming soon",
    "ebooks.noRelated": "No linked experience yet for this eBook.",
    "ebooks.relatedCta": "View related booking page →",
    "ebooks.subscribe": "Subscribe",
    "ebooks.subscribed": "Subscribed",
    "ebooks.unsubscribe": "Unsubscribe",
    "ebooks.subscribeSignInPrompt": "Sign in to subscribe and get related updates.",
    "ebooks.relatedArticleCta": "Read the related HealingTour Times article →",

    "auth.subtitle": "Sign in to start your EEG-based healing journey.",
    "auth.signIn": "Sign in",
    "auth.signUp": "Sign up",
    "auth.namePlaceholder": "Name",
    "auth.emailPlaceholder": "Email",
    "auth.passwordPlaceholder": "Password",
    "auth.genericError": "Authentication failed.",

    "error.boundaryMessage": "Something went wrong. Please refresh and try again.",
    "error.retry": "Retry",

    "app.noSiteSelected": "No site selected.",
    "app.goExplore": "Go to Explore",
  },
} as const;

export type TKey = keyof (typeof dict)["ko"];

function detectLocale(): Locale {
  if (typeof window === "undefined") return "ko";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "ko" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key: TKey) => dict[locale][key] ?? dict.ko[key] ?? key,
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
