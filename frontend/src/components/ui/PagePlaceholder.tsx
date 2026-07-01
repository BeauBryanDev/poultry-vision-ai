import { Card } from "./Card";

/** Temporary stub for screens not yet built out beyond the Dashboard. */
export function PagePlaceholder({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <Card title={title} icon={icon} className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-lg font-semibold text-text">{title}</p>
        <p className="text-sm text-text-muted">
          This screen is scaffolded and will be built out next. The Dashboard is the reference
          implementation for the design system.
        </p>
      </div>
    </Card>
  );
}
