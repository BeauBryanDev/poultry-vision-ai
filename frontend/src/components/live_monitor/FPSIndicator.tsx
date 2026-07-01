/** Small FPS overlay shown top-left of the live stream. */
export function FPSIndicator({ fps }: { fps: number }) {
  return (
    <div className="rounded border border-border bg-background/70 px-2 py-1 font-mono text-xs text-secondary backdrop-blur">
      FPS: {fps.toFixed(1)}
    </div>
  );
}
