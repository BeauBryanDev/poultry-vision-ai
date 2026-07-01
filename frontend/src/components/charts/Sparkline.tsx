import { Line, LineChart as ReLineChart, ResponsiveContainer } from "recharts";
import type { TimeSeriesPoint } from "@/types/common.types";

interface SparklineProps {
  data: TimeSeriesPoint[];
  color?: string;
  height?: number;
}

/** Tiny inline trend line (no axes) for metric cards. */
export function Sparkline({ data, color = "#f9a826", height = 40 }: SparklineProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 4, bottom: 4, left: 0, right: 0 }}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
