import { cx } from "@/utils/format";
import { APP_NAME, APP_TAGLINE } from "@/utils/constants";
import roosterIcon from "@/assets/rooster_icon.svg";

interface LogoProps {
  /** Hide the wordmark/tagline (e.g. compact mobile header). */
  compact?: boolean;
  className?: string;
}

/** PoultryVision brand mark: rooster glyph in a glowing amber ring + wordmark. */
export function Logo({ compact, className }: LogoProps) {
  return (
    <div className={cx("flex items-center gap-3", className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-surface shadow-glow">
        <img src={roosterIcon} alt="" className="h-6 w-6" />
      </span>
      {!compact && (
        <div className="leading-tight">
          <div className="text-lg font-bold text-text">{APP_NAME}</div>
          <div className="text-[11px] text-secondary">{APP_TAGLINE}</div>
        </div>
      )}
    </div>
  );
}
