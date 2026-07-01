import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { SystemStatus } from "@/types/model.types";
import { ClockIcon } from "@/components/ui/Icon";

function Stat({ label, value, tone }: { label: string; value: string; tone?: "green" }) {
  return (
    <div className="flex flex-col">
      <span className="hud-label text-[10px]">{label}</span>
      <span className={tone === "green" ? "text-sm font-semibold text-status-active" : "text-sm text-text"}>
        {value}
      </span>
    </div>
  );
}

/** Footer status strip: uptime, inference latency, websocket, camera, environment. */
export function Footer() {
  const [status, setStatus] = useState<SystemStatus | null>(null);

  useEffect(() => {
    api.getSystemStatus().then(setStatus);
  }, []);

  if (!status) return null;

  return (
    <footer className="neon-footer mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 bg-surface/60 px-4 py-3">
      <div className="flex items-center gap-2 text-primary">
        <ClockIcon size={18} />
      </div>
      <Stat label="System Uptime" value={status.uptime} />
      <Stat label="Last AI Inference" value={`${status.lastInferenceMs}ms ago`} />
      <Stat label="WebSocket" value="Connected" tone="green" />
      <Stat label="Camera" value={status.camera} />
      <Stat label="Temperature" value={`${status.temperatureC} °C`} />
      <Stat label="Humidity" value={`${status.humidityPct} %`} />
      <span className="ml-auto text-xs text-text-dim">© 2026 PoultryVision</span>
    </footer>
  );
}
