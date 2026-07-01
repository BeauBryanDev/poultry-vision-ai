import { useAppStore } from "@/store/appStore";
import { Logo } from "./Logo";
import { Avatar } from "./Avatar";
import { Dropdown } from "@/components/ui/Dropdown";
import { Badge } from "@/components/ui/Badge";
import { BellIcon, HomeIcon } from "@/components/ui/Icon";
import { CameraIcon } from "@/components/ui/Icon";

/** Top header: brand, farm/house selectors, system status, AI model, alerts, user. */
export function Header({ alertCount = 0 }: { alertCount?: number }) {
  const { farms, houses, model, activeFarmId, activeHouseId, setActiveFarm, setActiveHouse } =
    useAppStore();

  return (
    <header className="neon-header flex flex-wrap items-center gap-3 bg-surface/80 px-4 py-3 backdrop-blur">
      <Logo className="mr-auto lg:mr-0" />

      <div className="hidden items-center gap-3 md:flex lg:mx-auto">
        <Dropdown
          label="Farm"
          icon={<HomeIcon size={18} />}
          value={activeFarmId}
          onChange={setActiveFarm}
          options={farms.map((f) => ({ value: f.id, label: f.name }))}
        />
        <Dropdown
          label="House"
          icon={<CameraIcon size={18} />}
          value={activeHouseId}
          onChange={setActiveHouse}
          options={houses.map((h) => ({ value: h.id, label: h.name }))}
        />
        <div className="rounded-card border border-border bg-surface px-3 py-2">
          <div className="hud-label text-[10px] leading-tight">System Status</div>
          <Badge tone="success" dot>
            Online
          </Badge>
        </div>
        <div className="rounded-card border border-border bg-surface px-3 py-2">
          <div className="hud-label text-[10px] leading-tight">AI Model</div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text">{model.name}</span>
            {model.active && <Badge tone="primary">Active</Badge>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative rounded-card border border-border bg-surface p-2 text-text-muted hover:text-primary"
          aria-label="Notifications"
        >
          <BellIcon size={20} />
          {alertCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-status-feeding px-1 text-[10px] font-bold text-background">
              {alertCount}
            </span>
          )}
        </button>
        <Avatar />
      </div>
    </header>
  );
}
