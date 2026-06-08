/** Match HeroVideoPanels.module.css — 3-column layout, outer panels hidden. */
export const HERO_MOBILE_LAYOUT_MAX_WIDTH_PX = 560;

/** Visible hero panels on mobile (nth-child 1, 3, 5 — panels 2 and 4 are display:none). */
export const HERO_MOBILE_VISIBLE_PANEL_INDICES: readonly number[] = [0, 2, 4];

export const HERO_PANEL_COUNT = 5;

/**
 * Content-first video gate: gradients + hero copy paint immediately (server HTML).
 * MP4 `src` is set after idle + in-view; opacity rises on `canplay` per panel.
 */
export const HERO_VIDEO_CONTENT_FIRST_IDLE_MS = 200;

/** Extra idle wait before the first panel receives `src`. */
export const HERO_VIDEO_IDLE_DELAY_MS = HERO_VIDEO_CONTENT_FIRST_IDLE_MS;

/** Slightly longer base defer on coarse-pointer devices. */
export const HERO_VIDEO_IDLE_DELAY_MOBILE_MS = 350;

/** After center panel `src`, defer loading MP4 on side panels (ms). */
export const HERO_VIDEO_SECONDARY_UNLOCK_DELAY_MS = 400;

/**
 * Stagger after the global gate opens (ms) — index follows `getHeroPanelVideoUnlockOrder`.
 */
export const HERO_PANEL_VIDEO_STAGGER_MS: readonly number[] = [
  0, 120, 240, 360, 480,
];

/** Unlock order: center panel first (likely LCP), then outward. */
export function getHeroPanelVideoUnlockOrder(mobileLayout: boolean): readonly number[] {
  const center = HERO_PANEL_CENTER_INDEX;
  if (mobileLayout) {
    return [center, 0, 4];
  }
  return [center, 1, 3, 0, 4];
}

export function isHeroPanelVideoActive(
  panelIndex: number,
  mobileLayout: boolean,
): boolean {
  if (!mobileLayout) return true;
  return HERO_MOBILE_VISIBLE_PANEL_INDICES.includes(panelIndex);
}

export function getHeroPanelVideoStaggerMs(orderIndex: number): number {
  return HERO_PANEL_VIDEO_STAGGER_MS[orderIndex] ?? orderIndex * 200;
}

export const HERO_PANEL_CENTER_INDEX = 2;

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

export function isCoarsePointerDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: none)").matches &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

/**
 * Skip hero MP4 decode when the user or connection signals low bandwidth.
 */
export function shouldDeferHeroVideoPlayback(): boolean {
  if (typeof navigator === "undefined") return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (!connection) return false;

  if (connection.saveData) return true;

  const effectiveType = connection.effectiveType ?? "";
  return effectiveType === "slow-2g" || effectiveType === "2g";
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scheduleAfterIdle(
  callback: () => void,
  fallbackDelayMs: number,
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const win = window;

  if (typeof win.requestIdleCallback === "function") {
    const id = win.requestIdleCallback(callback, { timeout: fallbackDelayMs + 800 });
    return () => win.cancelIdleCallback(id);
  }

  const id = win.setTimeout(callback, fallbackDelayMs);
  return () => win.clearTimeout(id);
}
