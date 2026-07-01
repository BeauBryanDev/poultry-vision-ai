import { cx } from "@/utils/format";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-primary text-background hover:bg-primary-light shadow-glow border border-primary/40 font-semibold",
  ghost: "text-text-muted hover:text-text hover:bg-surface-raised border border-transparent",
  outline: "border border-border text-text hover:border-primary/50 hover:text-primary",
};

const SIZE: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-card uppercase tracking-wide transition-colors disabled:opacity-50 disabled:pointer-events-none",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
