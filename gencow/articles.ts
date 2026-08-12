/**
 * gencow/articles.ts — 치유관광타임즈 기사 (공개 열람, 유학생 기자단 시연용 시드)
 */
import { createCrud } from "./runtime";
import { articles } from "./schema";

export const articlesCrud = createCrud(articles, {
  prefix: "articles",
  methods: ["list", "get"],
  allowAnonymous: true,
  allowedFilters: ["locale", "relatedEbookId", "relatedSiteId"],
  sortable: ["publishedAt"],
});
