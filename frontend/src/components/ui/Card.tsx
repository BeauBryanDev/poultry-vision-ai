import { cx } from "@/utils/format";

interface CardProps {
  /** Optional panel title rendered in the HUD header row. */
  title?: React.ReactNode;
  /** Optional leading icon next to the title. */
  icon?: React.ReactNode;
  /** Right-aligned header content (e.g. a badge, dropdown, or link). */
  action?: React.ReactNode;
  /** Emphasis glow: amber (primary) or cyan (secondary). */
  glow?: "primary" | "cyan";
  className?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
}

/** Base HUD panel used across the dashboard. */
export function Card({ title, icon, action, glow, className, bodyClassName, children }: CardProps) {
  return (
    <section
      className={cx(
        "panel flex flex-col",
        glow === "primary" && "shadow-glow",
        glow === "cyan" && "shadow-glow-cyan",
        className,
      )}
    >
      {(title || action) && (
        <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            {title && <h2 className="hud-label">{title}</h2>}
          </div>
          {action}
        </header>
      )}
      <div className={cx("p-4", bodyClassName)}>{children}</div>
    </section>
  );
}
