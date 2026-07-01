import { Card } from "@/components/ui/Card";

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  unit?: string;
  valueColor?: string;
  chart?: React.ReactNode;
  action?: React.ReactNode;
}

/** Compact metric panel: title + big value + optional trend chart. */
export function MetricCard({ title, value, unit, valueColor, chart, action }: MetricCardProps) {
  return (
    <Card title={title} action={action} bodyClassName="pt-2">
      <div className="flex items-baseline gap-1">
        <span className="hud-metric text-3xl" style={valueColor ? { color: valueColor } : undefined}>
          {value}
        </span>
        {unit && <span className="text-xs text-text-muted">{unit}</span>}
      </div>
      {chart && <div className="mt-2">{chart}</div>}
    </Card>
  );
}
