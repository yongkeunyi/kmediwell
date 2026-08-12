import type { AxTier } from "../lib/types";

const LABEL: Record<AxTier, string> = { gold: "AX GOLD", silver: "AX SILVER", bronze: "AX BRONZE" };

export function AxBadge({ tier }: { tier: AxTier }) {
  return <span className={`badge-ax ${tier}`}>{LABEL[tier]}</span>;
}
