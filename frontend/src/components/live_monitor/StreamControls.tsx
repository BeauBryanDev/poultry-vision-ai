import { cx } from "@/utils/format";
import {
  CameraFlipIcon,
  CameraIcon,
  PauseIcon,
  PlayIcon,
  RecordIcon,
  VolumeIcon,
} from "@/components/ui/Icon";

interface StreamControlsProps {
  active: boolean;
  onTogglePlay: () => void;
  onSwitchCamera: () => void;
}

function CtrlButton({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cx(
        "rounded border border-border bg-background/70 p-2 backdrop-blur transition-colors hover:text-primary",
        active ? "text-primary" : "text-text",
      )}
    >
      {children}
    </button>
  );
}

/** Playback + capture controls overlaid on the bottom of the live stream. */
export function StreamControls({ active, onTogglePlay, onSwitchCamera }: StreamControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <CtrlButton onClick={onTogglePlay} active label={active ? "Stop camera" : "Start camera"}>
        {active ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
      </CtrlButton>
      <CtrlButton label="Snapshot">
        <CameraIcon size={18} />
      </CtrlButton>
      <CtrlButton label="Record">
        <RecordIcon size={18} />
      </CtrlButton>
      <CtrlButton label="Audio">
        <VolumeIcon size={18} />
      </CtrlButton>
      <CtrlButton onClick={onSwitchCamera} label="Switch camera">
        <CameraFlipIcon size={18} />
      </CtrlButton>
    </div>
  );
}
