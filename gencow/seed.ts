/**
 * gencow/seed.ts — K-MediWell 시연용 시드 데이터
 * `gencow db:seed`로 실행. 웰니스관광지 5곳, 아마존 KDP 실제 출간작 4종,
 * 치유관광타임즈 기사 5건을 등록한다. 이미 존재하면 건너뛰어 재실행해도 안전하다.
 */
import { sites, ebooks, articles } from "./schema";

export default async function seed(ctx: { db: any }) {
  const existingSites = await ctx.db.select().from(sites);
  const insertedSites =
    existingSites.length > 0
      ? existingSites
      : await ctx.db
          .insert(sites)
          .values([
            {
              name: "사유원",
              category: "힐링명상",
              region: "대구",
              axTier: "gold",
              axNote: "θ파 이완도 +34% 개선 (방문 전후 비교)",
              description: "전통 정원에서 진행하는 명상·다도 프로그램. 방문 전후 뇌파 이완도 개선이 확인되어 AX Gold 인증을 받았습니다.",
              programName: "명상 정원 워크",
              price: 68000,
              isTop20: "1",
            },
            {
              name: "여용국한방스파",
              category: "한방",
              region: "서울",
              axTier: "gold",
              axNote: "α파 안정도 +29% 개선 (방문 전후 비교)",
              description: "체질 진단 기반 한방 스파 프로그램으로 전통 오정법 철학을 접목했습니다.",
              programName: "체질 진단 + 한방 스파",
              price: 92000,
              isTop20: "1",
            },
            {
              name: "하이원리조트",
              category: "자연숲치유",
              region: "강원",
              axTier: "silver",
              axNote: "스트레스 지수 -22% 개선 (방문 전후 비교)",
              description: "고원 산림 지형을 활용한 숲치유 트레킹 프로그램을 운영합니다.",
              programName: "산림치유 트레킹",
              price: 55000,
              isTop20: "1",
            },
            {
              name: "스파1978",
              category: "뷰티스파",
              region: "서울",
              axTier: "silver",
              axNote: "이완도 +18% 개선 (방문 전후 비교)",
              description: "전통 약재를 활용한 스파 테라피로 심신 이완을 돕습니다.",
              programName: "스파 테라피",
              price: 78000,
              isTop20: "1",
            },
            {
              name: "WE호텔",
              category: "스테이",
              region: "제주",
              axTier: "bronze",
              axNote: "수면 안정도 +12% 개선 (방문 전후 비교)",
              description: "제주 자연을 배경으로 한 힐링 스테이 패키지를 제공합니다.",
              programName: "힐링 스테이 패키지",
              price: 145000,
              isTop20: "1",
            },
          ])
          .returning();

  const sayuwonSite = insertedSites.find((s: { name: string }) => s.name === "사유원");
  const yeoyongkukSite = insertedSites.find((s: { name: string }) => s.name === "여용국한방스파");
  const highOneSite = insertedSites.find((s: { name: string }) => s.name === "하이원리조트");

  const existingEbooks = await ctx.db.select().from(ebooks);
  const insertedEbooks =
    existingEbooks.length > 0
      ? existingEbooks
      : await ctx.db
          .insert(ebooks)
          .values([
            {
              title: "The Great Secret of the Korean Language",
              category: "한글",
              author: "이용근 교수팀",
              priceUsd: 6.99,
              description: "한글 창제의 철학과 한국 전통 치유문화를 소개하는 전자북.",
            },
            {
              title: "The Great Secret of Huntr/x and Arirang",
              category: "국악·풍류",
              author: "이용근 교수팀",
              priceUsd: 9.99,
              description: "K-팝을 입구 삼아 아리랑 500년의 소리를 세계에 소개하는 전자북.",
              relatedSiteId: sayuwonSite ? sayuwonSite.id : undefined,
            },
            {
              title: "Real Wonderland, Korea",
              category: "관광과 여행",
              author: "이용근 교수팀",
              priceUsd: 4.99,
              description: "한국 전통문화와 자아를 발견하는 여행을 다루는 전자북.",
            },
            {
              title: "The Sweet Journey of Farewell",
              category: "힐링여행",
              author: "이용근 교수팀",
              priceUsd: 3.99,
              description: "이별과 치유를 주제로 한 감성 여행 에세이.",
            },
          ])
          .returning();

  const arirangEbook = insertedEbooks.find((e: { title: string }) => e.title.includes("Huntr/x"));
  const koreanLangEbook = insertedEbooks.find((e: { title: string }) => e.title.includes("Korean Language"));

  const existingArticles = await ctx.db.select().from(articles);
  if (existingArticles.length === 0) {
    await ctx.db.insert(articles).values([
      {
        locale: "en",
        title: "Why Sayuwon's Garden Calms K-pop Fans' Minds",
        excerpt: "A meditation garden in Daegu, and the EEG data behind why it works.",
        body: "When I first walked through Sayuwon's stone paths, I understood why Korean meditation gardens are different — the θ-wave relaxation isn't a metaphor, it's measured. Visitors who complete the Meditation Garden Walk show a 34% improvement in theta-wave relaxation before and after, which is why the site carries an AX Gold certification. For fans who came to Korea through K-pop and stayed for something deeper, this is where that search leads.",
        authorName: "Nguyễn Thị Lan",
        authorCountry: "Vietnam",
        relatedSiteId: sayuwonSite ? sayuwonSite.id : undefined,
        relatedEbookId: arirangEbook ? arirangEbook.id : undefined,
      },
      {
        locale: "en",
        title: "A Spa Ritual From the Joseon Court, Still Practiced in Seoul",
        excerpt: "Yeoyongkuk's constitution-based spa program traces back to Korea's five-element healing philosophy.",
        body: "Before it was a wellness trend, this was medicine. Yeoyongkuk Traditional Spa builds each program around a constitution diagnosis rooted in Korea's traditional 오정법 (five-element) philosophy — visitors report a 29% improvement in alpha-wave stability afterward, backed by the site's own before-and-after EEG readings. It's the kind of proof point that turns a spa visit into something closer to certified care.",
        authorName: "Trần Mai",
        authorCountry: "Vietnam",
        relatedSiteId: yeoyongkukSite ? yeoyongkukSite.id : undefined,
      },
      {
        locale: "en",
        title: "Inside the Forest-Bathing Trail Locals Keep to Themselves",
        excerpt: "High1 Resort's forest therapy trekking course, and a 22% drop in measured stress.",
        body: "Gangwon's high-altitude forest isn't just scenery — High1 Resort's forest therapy trekking program is built specifically around it, and the site's own data shows a 22% reduction in stress index for participants. Most guides here are trained in the same 전일의학 (holistic medicine) framework K-MediWell certifies against, not just trail safety.",
        authorName: "Kenji Sato",
        authorCountry: "Japan",
        relatedSiteId: highOneSite ? highOneSite.id : undefined,
      },
      {
        locale: "ko",
        title: "한글 창제에 담긴 치유 철학",
        excerpt: "훈민정음은 왜 '소리'가 아니라 '몸'에서 출발했을까 — 한글과 전일의학의 접점을 짚어본다.",
        body: "세종이 훈민정음을 창제하며 참고한 것은 단순한 발음 체계가 아니라, 사람의 발성기관과 기(氣)의 흐름을 함께 살피는 전통 의학적 관점이었습니다. 이 글은 한글 창제의 철학과 한국 전통 치유문화가 어떻게 같은 뿌리에서 나왔는지를, 전자북 「The Great Secret of the Korean Language」의 핵심 내용을 바탕으로 소개합니다.",
        authorName: "이용근",
        authorCountry: "멘토 기고 · 국립공주대학교",
        relatedEbookId: koreanLangEbook ? koreanLangEbook.id : undefined,
      },
      {
        locale: "en",
        title: "500 Years of Arirang, Explained for Newcomers",
        excerpt: "K-pop is the door. Arirang is what's on the other side of it.",
        body: "Most fans who search 'Arirang' after watching a K-pop stage find a folk song. Few find out it's actually hundreds of regional variants sung for five centuries, each carrying its own history of separation and endurance. Huntr/x and Arirang was written to close that gap — using K-pop as the entry point to explain the 500-year sound underneath it, and where in Korea you can still hear it performed the traditional way.",
        authorName: "Li Wei",
        authorCountry: "China",
        relatedEbookId: arirangEbook ? arirangEbook.id : undefined,
      },
    ]);
  }
}
