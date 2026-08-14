/**
 * gencow/healing.ts — 뇌파(EEG) 측정 시뮬레이션 · DX 데이터 · Agent AI 추천(AX)
 *
 * 실제 EEG 장비 연동 전 단계의 시연용 구현: 측정값은 서버에서 그럴듯한 범위로
 * 무작위 생성하되, 추천 로직은 저장된 값을 기반으로 결정적으로 계산한다.
 *
 * 🔒 Secure by Default: 모든 procedure는 인증 필수 + 소유자 필터링(userId)
 */
import { eq, desc } from "drizzle-orm";
import { procedure } from "./runtime";
import { healingRecords } from "./schema";
function band(base, spread) {
    return Math.max(5, Math.min(95, Math.round(base + (Math.random() - 0.5) * spread)));
}
export const measure = procedure.mutation.name("healing.measure").handler(async ({ context: ctx }) => {
    const user = ctx.auth.requireAuth(); // 🔒 인증 필수
    const alpha = band(62, 40);
    const theta = band(55, 40);
    const beta = band(42, 40);
    const stressIndex = Math.max(5, Math.min(95, Math.round(100 - (alpha * 0.5 + theta * 0.3 + (100 - beta) * 0.2))));
    const result = await ctx.db
        .insert(healingRecords)
        .values({ userId: user.id, alpha, theta, beta, stressIndex }) // 🔒 소유자 기록
        .returning();
    ctx.realtime.invalidate(["healing.history", "healing.recommend"]);
    return result[0];
});
export const history = procedure.query.name("healing.history").handler(async ({ context: ctx }) => {
    const user = ctx.auth.requireAuth(); // 🔒 인증 필수
    return ctx.db
        .select()
        .from(healingRecords)
        .where(eq(healingRecords.userId, user.id)) // 🔒 내 데이터만
        .orderBy(desc(healingRecords.measuredAt))
        .limit(10);
});
export const recommend = procedure.query.name("healing.recommend").handler(async ({ context: ctx }) => {
    const user = ctx.auth.requireAuth(); // 🔒 인증 필수
    const rows = await ctx.db
        .select()
        .from(healingRecords)
        .where(eq(healingRecords.userId, user.id)) // 🔒 내 데이터만
        .orderBy(desc(healingRecords.measuredAt))
        .limit(1);
    const latest = rows[0];
    if (!latest)
        return null;
    const { alpha, theta, beta } = latest;
    const calm = 100 - beta;
    const scores = [
        { category: "산림치유", score: Math.round(alpha * 0.5 + theta * 0.3 + calm * 0.2) },
        { category: "명상", score: Math.round(theta * 0.5 + alpha * 0.3 + calm * 0.2) },
        { category: "한방", score: Math.round(alpha * 0.4 + calm * 0.4 + theta * 0.2) },
        { category: "해양", score: Math.round(alpha * 0.3 + theta * 0.3 + calm * 0.4) },
    ].sort((a, b) => b.score - a.score);
    return { basedOn: latest, scores };
});
