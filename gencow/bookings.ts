/**
 * gencow/bookings.ts — 예약
 *
 * 🔒 Secure by Default: 인증 필수 + 소유자 필터링(userId)
 */
import { eq, desc } from "drizzle-orm";
import { v } from "@gencow/core";
import { procedure } from "./runtime";
import { bookings, sites } from "./schema";

export const list = procedure.query.name("bookings.list").handler(async ({ context: ctx }) => {
  const user = ctx.auth.requireAuth(); // 🔒 인증 필수
  return ctx.db
    .select({
      id: bookings.id,
      programName: bookings.programName,
      scheduledAt: bookings.scheduledAt,
      amount: bookings.amount,
      status: bookings.status,
      createdAt: bookings.createdAt,
      siteId: bookings.siteId,
      siteName: sites.name,
      siteRegion: sites.region,
      axTier: sites.axTier,
    })
    .from(bookings)
    .innerJoin(sites, eq(bookings.siteId, sites.id))
    .where(eq(bookings.userId, user.id)) // 🔒 내 데이터만
    .orderBy(desc(bookings.createdAt));
});

export const create = procedure.mutation
  .name("bookings.create")
  .input(
    v.object({
      siteId: v.number(),
      programName: v.string(),
      scheduledAt: v.string(),
      amount: v.number(),
    }),
  )
  .handler(async ({ context: ctx, input }) => {
    const user = ctx.auth.requireAuth(); // 🔒 인증 필수
    const result = await ctx.db
      .insert(bookings)
      .values({
        userId: user.id, // 🔒 소유자 기록
        siteId: input.siteId,
        programName: input.programName,
        scheduledAt: new Date(input.scheduledAt),
        amount: input.amount,
      })
      .returning();

    ctx.realtime.invalidate("bookings.list");
    return result[0];
  });
