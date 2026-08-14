import { jsx as _jsx } from "react/jsx-runtime";
const LABEL = { gold: "AX GOLD", silver: "AX SILVER", bronze: "AX BRONZE" };
export function AxBadge({ tier }) {
    return _jsx("span", { className: `badge-ax ${tier}`, children: LABEL[tier] });
}
