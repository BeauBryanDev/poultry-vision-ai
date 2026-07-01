import { useEffect, useRef } from "react";
import { ACTIVITY_COLOR, ACTIVITY_LABEL } from "@/theme";
import type { ActivityState } from "@/types/common.types";
import type { DetectionBox } from "@/types/model.types";
import type { CameraStatus } from "@/store/liveStore";
import { Button } from "@/components/ui/Button";
import { CameraIcon } from "@/components/ui/Icon";

interface VideoCanvasProps {
  stream: MediaStream | null;
  status: CameraStatus;
  error: string | null;
  boxes: DetectionBox[];
  onEnable: () => void;
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  bottom?: React.ReactNode;
}

const LEGEND: ActivityState[] = ["active", "resting", "feeding", "anomaly"];

/**
 * Live stream surface. Plays the webcam MediaStream in a <video> and draws
 * normalized detection boxes as an overlay. When no camera is active it shows
 * a permission prompt / status message.
 */
export function VideoCanvas({
  stream,
  status,
  error,
  boxes,
  onEnable,
  topLeft,
  topRight,
  bottom,
}: VideoCanvasProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Bind the MediaStream to the <video> element.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.srcObject = stream;
    if (stream) video.play().catch(() => {});
  }, [stream]);

  const active = status === "active" && !!stream;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card border border-border bg-black">
      {/* Live video (rear camera on phones) */}
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Idle / permission overlay */}
      {!active && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#141007] via-[#0b0b0e] to-[#0b120f] text-center">
          <CameraIcon size={32} className="text-primary" />
          {status === "requesting" ? (
            <p className="text-sm text-text-muted">Requesting camera access…</p>
          ) : status === "denied" ? (
            <>
              <p className="text-sm text-status-anomaly">{error ?? "Camera permission denied."}</p>
              <p className="max-w-xs text-xs text-text-dim">
                Allow camera access in your browser's site settings, then try again.
              </p>
              <Button size="sm" onClick={onEnable}>
                <CameraIcon size={16} />
                Retry
              </Button>
            </>
          ) : status === "error" ? (
            <>
              <p className="text-sm text-status-anomaly">{error ?? "Camera unavailable."}</p>
              <Button size="sm" onClick={onEnable}>
                Try again
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-text-muted">Camera is off.</p>
              <Button size="sm" onClick={onEnable}>
                <CameraIcon size={16} />
                Enable Camera
              </Button>
            </>
          )}
        </div>
      )}

      {/* Detection boxes overlay */}
      {active && (
        <div className="absolute inset-0">
          {boxes.map((b) => (
            <div
              key={b.id}
              className="absolute rounded-sm border-2"
              style={{
                left: `${b.x * 100}%`,
                top: `${b.y * 100}%`,
                width: `${b.w * 100}%`,
                height: `${b.h * 100}%`,
                borderColor: ACTIVITY_COLOR[b.state],
                boxShadow: b.state === "anomaly" ? `0 0 8px ${ACTIVITY_COLOR.anomaly}` : undefined,
              }}
            />
          ))}
        </div>
      )}

      {topLeft && <div className="absolute left-3 top-3">{topLeft}</div>}
      {topRight && <div className="absolute right-3 top-3">{topRight}</div>}

      {active && (
        <div className="absolute right-3 top-12 flex flex-col gap-1 rounded border border-border bg-background/70 px-2 py-1.5 backdrop-blur">
          {LEGEND.map((s) => (
            <div key={s} className="flex items-center gap-2 text-xs text-text">
              <span className="h-2 w-2 rounded-full" style={{ background: ACTIVITY_COLOR[s] }} />
              {ACTIVITY_LABEL[s]}
            </div>
          ))}
        </div>
      )}

      {active && bottom && <div className="absolute inset-x-3 bottom-3">{bottom}</div>}
    </div>
  );
}
