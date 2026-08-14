/**
 * gencow/ebooks.ts — 전자북 카탈로그 (공개 열람, 아마존 KDP 출간작 시드)
 *   + 구독(관심 등록) — 한류관광 관심 외국인·재외동포가 로그인 후 관심 전자북을 등록
 *
 * 🔒 구독 관련 procedure는 인증 필수 + 소유자 필터링(userId)
 */
import { and, eq } from "drizzle-orm";
import { v } from "@gencow/core";
import { createCrud, procedure } from "./runtime";
import { ebooks, ebookSubscriptions } from "./schema";
export const ebooksCrud = createCrud(ebooks, {
    prefix: "ebooks",
    methods: ["list", "get"],
    allowAnonymous: true,
});
export const mySubscriptions = procedure.query.name("ebooks.mySubscriptions").handler(async ({ context: ctx }) => {
    const user = ctx.auth.requireAuth(); // 🔒 인증 필수
    const rows = await ctx.db
        .select({ ebookId: ebookSubscriptions.ebookId })
        .from(ebookSubscriptions)
        .where(eq(ebookSubscriptions.userId, user.id)); // 🔒 내 데이터만
    return rows.map((r) => r.ebookId);
});
export const subscribe = procedure.mutation
    .name("ebooks.subscribe")
    .input(v.object({ ebookId: v.number() }))
    .handler(async ({ context: ctx, input }) => {
    const user = ctx.auth.requireAuth(); // 🔒 인증 필수
    await ctx.db
        .insert(ebookSubscriptions)
        .values({ userId: user.id, ebookId: input.ebookId }) // 🔒 소유자 기록
        .onConflictDoNothing();
    ctx.realtime.invalidate("ebooks.mySubscriptions");
    return { subscribed: true };
});
export const unsubscribe = procedure.mutation
    .name("ebooks.unsubscribe")
    .input(v.object({ ebookId: v.number() }))
    .handler(async ({ context: ctx, input }) => {
    const user = ctx.auth.requireAuth(); // 🔒 인증 필수
    await ctx.db
        .delete(ebookSubscriptions)
        .where(and(eq(ebookSubscriptions.userId, user.id), eq(ebookSubscriptions.ebookId, input.ebookId))); // 🔒 내 데이터만
    ctx.realtime.invalidate("ebooks.mySubscriptions");
    return { subscribed: false };
});
