/**
 * gencow/sellers.ts — 글로벌 셀러 · 치유관광 기자단 파일럿 신청 (FR-8)
 *
 * 🔒 Secure by Default: 인증 필수 + 소유자 필터링(userId), 1인 1건 신청(unique index)
 */
import { eq } from "drizzle-orm";
import { v } from "@gencow/core";
import { procedure } from "./runtime";
import { sellerApplications } from "./schema";
export const myApplication = procedure.query.name("sellers.myApplication").handler(async ({ context: ctx }) => {
    const user = ctx.auth.requireAuth(); // 🔒 인증 필수
    const rows = await ctx.db
        .select()
        .from(sellerApplications)
        .where(eq(sellerApplications.userId, user.id)) // 🔒 내 데이터만
        .limit(1);
    return rows[0] ?? null;
});
export const apply = procedure.mutation
    .name("sellers.apply")
    .input(v.object({
    country: v.string(),
    preferredLocale: v.string(),
    message: v.optional(v.string()),
}))
    .handler(async ({ context: ctx, input }) => {
    const user = ctx.auth.requireAuth(); // 🔒 인증 필수
    const result = await ctx.db
        .insert(sellerApplications)
        .values({
        userId: user.id, // 🔒 소유자 기록
        country: input.country,
        preferredLocale: input.preferredLocale,
        message: input.message,
    })
        .onConflictDoNothing()
        .returning();
    ctx.realtime.invalidate("sellers.myApplication");
    return result[0] ?? null;
});
