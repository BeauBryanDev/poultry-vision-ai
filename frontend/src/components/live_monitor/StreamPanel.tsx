import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Dropdown } from "@/components/ui/Dropdown";
import { Slider } from "@/components/ui/Slider";
import { FullscreenIcon } from "@/components/ui/Icon";
import { VideoCanvas } from "./VideoCanvas";
import { FPSIndicator } from "./FPSIndicator";
import { StreamControls } from "./StreamControls";
import { useLiveStore } from "@/store/liveStore";
import { useAppStore } from "@/store/appStore";

/** Center column: live webcam stream + inference/stream controls below it. */
export function StreamPanel() {
  const {
    stream,
    cameraStatus,
    cameraError,
    fps,
    boxes,
    settings,
    startCamera,
    stopCamera,
    switchCamera,
    tick,
    updateSettings,
  } = useLiveStore();
  const houseName = useAppStore((s) => s.houses.find((h) => h.id === s.activeHouseId)?.name ?? "");

  const active = cameraStatus === "active";

  // Release the camera when the panel unmounts.
  useEffect(() => stopCamera, [stopCamera]);

  // Mock detection loop: refresh boxes + FPS while the camera is live.
  useEffect(() => {
    if (!active) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [active, tick]);

  return (
    <Card
      glow="cyan"
      title={`Live Stream — ${houseName}`}
      action={
        <div className="flex items-center gap-3">
          <Badge tone={active ? "success" : "neutral"} dot>
            {active ? "Live" : "Offline"}
          </Badge>
          <span className="text-xs text-text-muted">WebSocket: io</span>
          <FullscreenIcon size={16} className="text-text-muted" />
        </div>
      }
    >
      <VideoCanvas
        stream={stream}
        status={cameraStatus}
        error={cameraError}
        boxes={boxes}
        onEnable={startCamera}
        topLeft={active ? <FPSIndicator fps={fps} /> : undefined}
        bottom={
          <StreamControls
            active={active}
            onTogglePlay={active ? stopCamera : startCamera}
            onSwitchCamera={switchCamera}
          />
        }
      />

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Dropdown
          label="Model"
          value={settings.model}
          onChange={(v) => updateSettings({ model: v })}
          options={[{ value: settings.model, label: settings.model }]}
        />
        <Slider
          label="Confidence Threshold"
          value={settings.confidenceThreshold}
          onChange={(v) => updateSettings({ confidenceThreshold: v })}
        />
        <Slider
          label="IoU Threshold"
          value={settings.iouThreshold}
          onChange={(v) => updateSettings({ iouThreshold: v })}
        />
        <Dropdown
          label="Stream Quality"
          value={settings.quality}
          onChange={(v) => updateSettings({ quality: v as typeof settings.quality })}
          options={[
            { value: "SD", label: "SD" },
            { value: "HD", label: "HD" },
            { value: "FHD", label: "FHD" },
          ]}
        />
      </div>
    </Card>
  );
}
