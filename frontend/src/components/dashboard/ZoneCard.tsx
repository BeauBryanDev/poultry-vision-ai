import { formatNumber } from "@/utils/format";
import { SettingsIcon } from "@/components/ui/Icon";
import type { Zone } from "@/types/model.types";

/** Single zone tile in the Zone Distribution grid. */
export function ZoneCard({ zone }: { zone: Zone }) {
  return (
    <div className="rounded-card border border-border bg-surface-muted p-3">
      <div className="flex items-center justify-between">
        <span className="hud-label text-[10px]">{zone.name}</span>
        <SettingsIcon size={14} className="text-text-dim" />
      </div>
      <div className="mt-1 hud-metric text-2xl text-text">{formatNumber(zone.count)}</div>
      <div className="text-xs text-text-muted">birds</div>
    </div>
  );
}
