import { HERO_PRIMARY_VIDEO_SRC } from "./heroVideos";

/** Discoverable hero preview MP4 for video LCP (center panel). */
export function HeroVideoPreload() {
  return (
    <link rel="preload" as="video" href={HERO_PRIMARY_VIDEO_SRC} fetchPriority="high" />
  );
}
