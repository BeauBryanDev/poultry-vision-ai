import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkline } from "@/components/charts/Sparkline";
import { StatusRow } from "./StatusRow";
import { formatDecimal, formatNumber } from "@/utils/format";
import { GridIcon } from "@/components/ui/Icon";
import type { PoultryReport as PoultryReportData } from "@/types/model.types";

/** Left-column headline panel: live count, density trend, activity breakdown. */
export function PoultryReport({ data }: { data: PoultryReportData }) {
  return (
    <Card title="Poultry Report" icon={<GridIcon size={16} />}>
      <div className="flex items-start justify-between">
        <div>
          <div className="hud-label text-[10px]">Live Count (Box Counting)</div>
          <div className="flex items-baseline gap-2">
            <span className="hud-metric text-4xl text-primary">{formatNumber(data.liveCount)}</span>
            <span className="text-xs text-text-muted">birds</span>
          </div>
        </div>
        <Badge tone="danger" dot>
          Live
        </Badge>
      </div>

      <div className="mt-4">
        <div className="hud-label text-[10px]">Density</div>
        <div className="flex items-baseline gap-1">
          <span className="hud-metric text-lg">{formatDecimal(data.density)}</span>
          <span className="text-xs text-text-muted">birds/m²</span>
        </div>
        <Sparkline data={data.densityTrend} />
      </div>

      <div className="mt-3 divide-y divide-border border-t border-border">
        {data.breakdown.map((b) => (
          <StatusRow key={b.state} item={b} />
        ))}
      </div>
    </Card>
  );
}
