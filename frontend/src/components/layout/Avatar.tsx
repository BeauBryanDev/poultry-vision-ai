import { cx } from "@/utils/format";
import { UserIcon } from "@/components/ui/Icon";

interface AvatarProps {
  name?: string;
  role?: string;
  className?: string;
}

/** User chip: icon + name/role, shown in the header. */
export function Avatar({ name = "Farm Admin", role = "Administrator", className }: AvatarProps) {
  return (
    <div className={cx("flex items-center gap-2", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-muted text-primary">
        <UserIcon size={18} />
      </span>
      <div className="hidden leading-tight sm:block">
        <div className="text-sm font-semibold text-text">{name}</div>
        <div className="text-[11px] text-text-muted">{role}</div>
      </div>
    </div>
  );
}
