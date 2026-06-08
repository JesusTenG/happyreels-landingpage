/**
 * Hero background clip pool.
 *
 * Panels share the optimized hero preview encode; each panel uses playback
 * offsets for variety. Sources load progressively after the performance gate.
 */
export type HeroVideoClip = {
  id: string;
  src: string;
};

/** Web-optimized hero loop — see `VERSION2-hero-preview.mp4` (ffmpeg). */
export const HERO_PRIMARY_VIDEO_SRC =
  "/assets/videos/preview/random/VERSION2-hero-preview.mp4";

export const HERO_VIDEO_CLIPS: readonly HeroVideoClip[] = [
  { id: "clip-01", src: HERO_PRIMARY_VIDEO_SRC },
  { id: "clip-02", src: HERO_PRIMARY_VIDEO_SRC },
  { id: "clip-03", src: HERO_PRIMARY_VIDEO_SRC },
  { id: "clip-04", src: HERO_PRIMARY_VIDEO_SRC },
  { id: "clip-05", src: HERO_PRIMARY_VIDEO_SRC },
  { id: "clip-06", src: HERO_PRIMARY_VIDEO_SRC },
] as const;

export const HERO_PANEL_COUNT = 5;

/** Opacity fade-in when a panel video becomes ready. */
export const HERO_VIDEO_CROSSFADE_MS = 720;

/** Hero loop speed — values below 1 = slow motion (Zeitlupe). */
export const HERO_VIDEO_PLAYBACK_RATE = 0.75;

/** Start offset per panel (seconds) — loops run zeitversetzt, not in sync. */
export const HERO_PANEL_PLAYBACK_OFFSET_S: readonly number[] = [
  0, 2.4, 5.1, 1.6, 3.8,
];

export const HERO_PANEL_CENTER_INDEX = (HERO_PANEL_COUNT - 1) / 2;

export function getHeroClipById(id: string): HeroVideoClip | undefined {
  return HERO_VIDEO_CLIPS.find((clip) => clip.id === id);
}

/** Valid next clips for a panel — never matches current, left, or right neighbor. */
export function getAllowedVideosForPanel(
  panelIndex: number,
  currentPanelVideos: readonly HeroVideoClip[],
  allVideos: readonly HeroVideoClip[] = HERO_VIDEO_CLIPS,
): HeroVideoClip[] {
  const currentId = currentPanelVideos[panelIndex]?.id;
  const leftId = currentPanelVideos[panelIndex - 1]?.id;
  const rightId = currentPanelVideos[panelIndex + 1]?.id;

  return allVideos.filter((video) => {
    return video.id !== currentId && video.id !== leftId && video.id !== rightId;
  });
}

export function hasAdjacentDuplicates(panelVideos: readonly HeroVideoClip[]): boolean {
  return panelVideos.some((video, index) => {
    if (index === 0) return false;
    return video.id === panelVideos[index - 1]?.id;
  });
}

/** Deterministic initial assignment — no adjacent duplicates, prefer unique clips when possible. */
export function buildInitialPanelClipIds(): string[] {
  const all = [...HERO_VIDEO_CLIPS];

  if (all.length === 0) {
    return Array.from({ length: HERO_PANEL_COUNT }, () => "");
  }

  if (all.length === 1) {
    return Array.from({ length: HERO_PANEL_COUNT }, () => all[0]!.id);
  }

  const assigned: HeroVideoClip[] = [];

  for (let panelIndex = 0; panelIndex < HERO_PANEL_COUNT; panelIndex += 1) {
    const allowed = getAllowedVideosForPanel(panelIndex, assigned, all);

    if (allowed.length === 0) {
      const leftId = assigned[panelIndex - 1]?.id;
      const fallback = all.find((clip) => clip.id !== leftId);
      if (fallback) {
        assigned.push(fallback);
      }
      continue;
    }

    const used = new Set(assigned.map((clip) => clip.id));
    const unused = allowed.filter((clip) => !used.has(clip.id));
    const pick = unused[0] ?? allowed[panelIndex % allowed.length]!;
    assigned.push(pick);
  }

  return assigned.map((clip) => clip.id);
}

function panelVideosFromIds(ids: readonly string[]): HeroVideoClip[] {
  return ids
    .map((id) => getHeroClipById(id))
    .filter((clip): clip is HeroVideoClip => clip !== undefined);
}

export function assertNoAdjacentDuplicates(
  clipIds: readonly string[],
  context: string,
): void {
  if (process.env.NODE_ENV === "production") return;

  const panelVideos = panelVideosFromIds(clipIds);
  if (panelVideos.length !== clipIds.length) return;

  if (hasAdjacentDuplicates(panelVideos)) {
    console.warn(`[HeroVideoPanels] ${context}: adjacent duplicate clips`, clipIds);
  }
}
