/**
 * gencow/schema.ts — K-MediWell 스키마
 *
 * 🔒 Secure by Default:
 *   - pgTable + ownerRls로 사용자별 데이터 자동 격리 (PostgreSQL RLS)
 *   - onDelete: "cascade"로 유저 삭제 시 관련 데이터 자동 정리
 *
 * 변경 후: gencow dev가 자동 반영
 */
import { ownerRls } from "@gencow/core";
import { defineRelations } from "drizzle-orm";
import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import { account, authRelationsConfig, session, user, verification } from "./schema-auth";

// 웰니스관광지 카탈로그 (88개소 중 시연용 시드 — 공개 열람)
export const sites = pgTable("sites", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 자연숲치유 | 뷰티스파 | 힐링명상 | 한방 | 스테이 | 푸드
  region: text("region").notNull(),
  axTier: text("ax_tier").notNull(), // gold | silver | bronze
  axNote: text("ax_note").notNull(),
  description: text("description").notNull(),
  programName: text("program_name").notNull(),
  price: integer("price").notNull(),
  isTop20: text("is_top20").notNull(), // "1" | "0" — 외래객 특화 20선 여부
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 전자북 카탈로그 (아마존 KDP 등 시연용 시드 — 공개 열람)
export const ebooks = pgTable("ebooks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  priceUsd: real("price_usd").notNull(),
  description: text("description").notNull(),
  relatedSiteId: integer("related_site_id").references(() => sites.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 전자북 구독 (사용자 소유) — 한류관광 관심 외국인·재외동포가 관심 등록한 전자북
export const ebookSubscriptions = pgTable(
  "ebook_subscriptions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    ebookId: integer("ebook_id")
      .notNull()
      .references(() => ebooks.id, { onDelete: "cascade" }),
    subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  },
  (t) => [...ownerRls(t.userId), uniqueIndex("ebook_subscriptions_user_ebook_idx").on(t.userId, t.ebookId)],
);

// 치유관광타임즈 — 유학생 기자단 다국어 기사 (공개 열람, 콘텐츠→전자북→예약 퍼널의 진입점)
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  locale: text("locale").notNull(), // "ko" | "en"
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  authorName: text("author_name").notNull(),
  authorCountry: text("author_country").notNull(),
  relatedSiteId: integer("related_site_id").references(() => sites.id),
  relatedEbookId: integer("related_ebook_id").references(() => ebooks.id),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});

// 뇌파(EEG) 측정 기록 — DX 데이터 (사용자 소유)
export const healingRecords = pgTable(
  "healing_records",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    alpha: integer("alpha").notNull(),
    theta: integer("theta").notNull(),
    beta: integer("beta").notNull(),
    stressIndex: integer("stress_index").notNull(),
    measuredAt: timestamp("measured_at").defaultNow().notNull(),
  },
  (t) => ownerRls(t.userId),
);

// 예약 (사용자 소유)
export const bookings = pgTable(
  "bookings",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    siteId: integer("site_id")
      .notNull()
      .references(() => sites.id),
    programName: text("program_name").notNull(),
    scheduledAt: timestamp("scheduled_at").notNull(),
    amount: integer("amount").notNull(),
    status: text("status").default("confirmed").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ownerRls(t.userId),
);

export const relations = defineRelations(
  { user, session, account, verification, sites, ebooks, ebookSubscriptions, articles, healingRecords, bookings },
  (r) => ({
    ...authRelationsConfig(r),
  }),
);
