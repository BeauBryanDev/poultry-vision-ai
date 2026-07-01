import { ACTIVITY_COLOR, ACTIVITY_LABEL } from "@/theme";
import { formatNumber, formatPercent } from "@/utils/format";
import type { ActivityBreakdown } from "@/types/model.types";

/** One activity breakdown line: colored dot + label + count + share. */
export function StatusRow({ item }: { item: ActivityBreakdown }) {
  const color = ACTIVITY_COLOR[item.state];
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />
        <span className="text-sm text-text">{ACTIVITY_LABEL[item.state]}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="hud-metric text-sm">{formatNumber(item.count)}</span>
        <span className="text-xs text-text-muted">({formatPercent(item.percent)})</span>
      </div>
    </div>
  );
}
