import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as ReRadarChart,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "@/theme";

interface RadarChartProps {
  data: { axis: string; value: number }[];
  height?: number;
  color?: string;
}

export function RadarChart({ data, height = 200, color = COLORS.primary }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReRadarChart data={data} outerRadius="70%">
        <PolarGrid stroke={COLORS.border} />
        <PolarAngleAxis dataKey="axis" tick={{ fill: COLORS.textMuted, fontSize: 10 }} />
        <PolarRadiusAxis domain={[0, 100]} tick={{ fill: COLORS.textDim, fontSize: 9 }} axisLine={false} />
        <Radar dataKey="value" stroke={color} fill={color} fillOpacity={0.25} isAnimationActive={false} />
      </ReRadarChart>
    </ResponsiveContainer>
  );
}
