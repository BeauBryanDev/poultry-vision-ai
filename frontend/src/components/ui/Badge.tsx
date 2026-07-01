import { cx } from "@/utils/format";

type BadgeTone = "primary" | "success" | "warning" | "danger" | "neutral" | "cyan";

const TONE: Record<BadgeTone, string> = {
  primary: "bg-primary/15 text-primary border-primary/30",
  success: "bg-status-active/15 text-status-active border-status-active/30",
  warning: "bg-status-feeding/15 text-status-feeding border-status-feeding/30",
  danger: "bg-status-anomaly/15 text-status-anomaly border-status-anomaly/30",
  cyan: "bg-secondary/15 text-secondary border-secondary/30",
  neutral: "bg-surface-muted text-text-muted border-border",
};

interface BadgeProps {
  tone?: BadgeTone;
  /** Show a leading status dot. */
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ tone = "neutral", dot, className, children }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        TONE[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
