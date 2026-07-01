import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "@/theme";
import { chartTooltipStyle } from "./chartTheme";

export interface BarDatum {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarDatum[];
  height?: number;
  /** Uniform bar color when a datum has no explicit color. */
  color?: string;
}

export function BarChart({ data, height = 160, color = COLORS.primary }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid stroke={COLORS.border} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: COLORS.textMuted, fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: COLORS.textMuted, fontSize: 10 }} tickLine={false} axisLine={false} width={32} />
        <Tooltip {...chartTooltipStyle} cursor={{ fill: "rgba(249,168,38,0.06)" }} />
        <Bar dataKey="value" radius={[3, 3, 0, 0]} isAnimationActive={false}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color ?? color} />
          ))}
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  );
}
