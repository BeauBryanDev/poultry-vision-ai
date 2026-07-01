import {
  AlertIcon,
  CameraIcon,
  ChartIcon,
  ClockIcon,
  FileIcon,
  GridIcon,
  SettingsIcon,
} from "@/components/ui/Icon";

/** Maps a NAV_ITEMS key to its glyph. */
export function navIcon(key: string, size = 18) {
  switch (key) {
    case "dashboard":
      return <GridIcon size={size} />;
    case "monitor":
      return <CameraIcon size={size} />;
    case "analytics":
      return <ChartIcon size={size} />;
    case "reports":
      return <FileIcon size={size} />;
    case "alerts":
      return <AlertIcon size={size} />;
    case "history":
      return <ClockIcon size={size} />;
    case "settings":
      return <SettingsIcon size={size} />;
    default:
      return <GridIcon size={size} />;
  }
}
