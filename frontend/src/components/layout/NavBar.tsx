import { NavLink } from "react-router-dom";
import { cx } from "@/utils/format";
import { NAV_ITEMS } from "@/utils/constants";
import { navIcon } from "./navIcons";
import { Badge } from "@/components/ui/Badge";

/** Desktop top navigation tabs. */
export function NavBar({ alertCount = 0 }: { alertCount?: number }) {
  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.key}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            cx(
              "flex items-center gap-2 rounded-card px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
              isActive
                ? "bg-primary/15 text-primary shadow-glow"
                : "text-text-muted hover:bg-surface-raised hover:text-text",
            )
          }
        >
          {navIcon(item.key)}
          <span>{item.label}</span>
          {item.key === "alerts" && alertCount > 0 && (
            <Badge tone="warning" className="ml-0.5 rounded-full px-1.5 py-0">
              {alertCount}
            </Badge>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
