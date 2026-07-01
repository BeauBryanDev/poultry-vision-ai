import { cx } from "@/utils/format";
import { ChevronDownIcon } from "./Icon";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

/** Native-select-backed dropdown styled as a HUD control (accessible + simple). */
export function Dropdown({ value, options, onChange, label, icon, className }: DropdownProps) {
  return (
    <label
      className={cx(
        "group relative flex items-center gap-2 rounded-card border border-border bg-surface px-3 py-2 transition-colors hover:border-primary/40",
        className,
      )}
    >
      {icon && <span className="text-primary">{icon}</span>}
      <div className="min-w-0 flex-1">
        {label && <div className="hud-label text-[10px] leading-tight">{label}</div>}
        <div className="truncate text-sm font-medium text-text">
          {options.find((o) => o.value === value)?.label ?? value}
        </div>
      </div>
      <ChevronDownIcon size={16} className="text-text-muted" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
