import {
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "@/theme";
import type { TimeSeriesPoint } from "@/types/common.types";
import { chartTooltipStyle } from "./chartTheme";

interface LineChartProps {
  data: TimeSeriesPoint[];
  color?: string;
  height?: number;
  showAxes?: boolean;
}

export function LineChart({ data, color = COLORS.primary, height = 120, showAxes = true }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        {showAxes && <CartesianGrid stroke={COLORS.border} strokeDasharray="3 3" vertical={false} />}
        {showAxes && <XAxis dataKey="t" tick={{ fill: COLORS.textMuted, fontSize: 10 }} tickLine={false} axisLine={false} />}
        {showAxes && <YAxis tick={{ fill: COLORS.textMuted, fontSize: 10 }} tickLine={false} axisLine={false} width={36} />}
        <Tooltip {...chartTooltipStyle} />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
