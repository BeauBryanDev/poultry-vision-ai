import { NavLink } from "react-router-dom";
import { cx } from "@/utils/format";
import { NAV_ITEMS } from "@/utils/constants";
import { navIcon } from "./navIcons";

/** Mobile bottom tab bar — shows only the primary (mobile) nav items. */
export function BottomNav({ alertCount = 0 }: { alertCount?: number }) {
  const items = NAV_ITEMS.filter((i) => i.mobile);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur lg:hidden">
      <div className="flex items-stretch justify-around">
        {items.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cx(
                "relative flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors",
                isActive ? "text-primary" : "text-text-muted",
              )
            }
          >
            <span className="relative">
              {navIcon(item.key, 20)}
              {item.key === "alerts" && alertCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-status-feeding px-1 text-[10px] font-bold text-background">
                  {alertCount}
                </span>
              )}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
