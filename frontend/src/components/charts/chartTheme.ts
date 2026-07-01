import { COLORS } from "@/theme";

/** Shared Recharts <Tooltip> styling for the dark HUD look. */
export const chartTooltipStyle = {
  contentStyle: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    fontSize: 12,
    color: COLORS.text,
  },
  labelStyle: { color: COLORS.textMuted },
  itemStyle: { color: COLORS.text },
} as const;
