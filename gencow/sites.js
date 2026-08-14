/**
 * gencow/sites.ts — 웰니스관광지 카탈로그 (공개 열람, 88개소 중 시연용 시드)
 */
import { createCrud } from "./runtime";
import { sites } from "./schema";
export const sitesCrud = createCrud(sites, {
    prefix: "sites",
    methods: ["list", "get"],
    allowAnonymous: true,
    allowedFilters: ["category", "isTop20"],
    sortable: ["price", "name"],
});
