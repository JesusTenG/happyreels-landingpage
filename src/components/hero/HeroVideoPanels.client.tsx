"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";

type HeroPanelVideoProps = ComponentPropsWithoutRef<"video"> & {
  fetchPriority?: "high" | "low" | "auto";
};

import {
  getHeroPanelVideoStaggerMs,
  getHeroPanelVideoUnlockOrder,
  isCoarsePointerDevice,
  isHeroPanelVideoActive,
  prefersReducedMotion,
  scheduleAfterIdle,
  shouldDeferHeroVideoPlayback,
  HERO_MOBILE_LAYOUT_MAX_WIDTH_PX,
  HERO_PANEL_CENTER_INDEX,
  HERO_VIDEO_IDLE_DELAY_MOBILE_MS,
  HERO_VIDEO_IDLE_DELAY_MS,
  HERO_VIDEO_SECONDARY_UNLOCK_DELAY_MS,
} from "./heroPerformance";
import {
  assertNoAdjacentDuplicates,
  buildInitialPanelClipIds,
  getHeroClipById,
  HERO_VIDEO_CROSSFADE_MS,
  HERO_PANEL_PLAYBACK_OFFSET_S,
  HERO_VIDEO_PLAYBACK_RATE,
} from "./heroVideos";

import shellStyles from "./HeroPanelsShell.module.css";
import styles from "./HeroVideoPanels.module.css";

const HERO_IN_VIEW_RATIO = 0.12;

function encodePublicAssetSrc(src: string): string {
  return src.replace(/ /g, "%20");
}

function applyPlaybackRate(video: HTMLVideoElement): void {
  video.defaultPlaybackRate = HERO_VIDEO_PLAYBACK_RATE;
  video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
}

function applyPanelTimeOffset(video: HTMLVideoElement, panelIndex: number): void {
  const offset = HERO_PANEL_PLAYBACK_OFFSET_S[panelIndex] ?? 0;
  if (!Number.isFinite(video.duration) || video.duration <= 0) return;

  const target = offset % video.duration;
  if (Math.abs(video.currentTime - target) > 0.12) {
    try {
      video.currentTime = target;
    } catch {
      /* ignore seek errors before buffer ready */
    }
  }
}

type PanelSlotState = {
  clipId: string;
};

function createInitialPanelStates(): PanelSlotState[] {
  const initialIds = buildInitialPanelClipIds();
  assertNoAdjacentDuplicates(initialIds, "initial assignment");

  return initialIds.map((clipId) => ({ clipId }));
}

function setPanelGradientHidden(panelIndex: number, hidden: boolean) {
  const fill = document.querySelector<HTMLElement>(`[data-hero-gradient="${panelIndex}"]`);
  if (!fill) return;
  if (hidden) {
    fill.setAttribute("data-gradient-hidden", "true");
  } else {
    fill.removeAttribute("data-gradient-hidden");
  }
}

type HeroPanelProps = Readonly<{
  panelIndex: number;
  clipId: string;
  isVideoCapable: boolean;
  panelVideoSrcAllowed: boolean;
  allowPlayback: boolean;
  hasClip: boolean;
  onVideoError: (clipId: string) => void;
}>;

function HeroPanel({
  panelIndex,
  clipId,
  isVideoCapable,
  panelVideoSrcAllowed,
  allowPlayback,
  hasClip,
  onVideoError,
}: HeroPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const isPrimaryLcpPanel = panelIndex === HERO_PANEL_CENTER_INDEX;

  const primaryLcpVideoProps: Pick<HeroPanelVideoProps, "preload" | "fetchPriority"> =
    isPrimaryLcpPanel ? { preload: "auto", fetchPriority: "high" } : { preload: "none" };

  const applyVideo = useCallback(
    (video: HTMLVideoElement | null, shouldPlay: boolean) => {
      if (!video || !isVideoCapable || !panelVideoSrcAllowed || !clipId) {
        if (video) {
          video.pause();
          video.removeAttribute("src");
          video.removeAttribute("data-loaded-src");
        }
        return;
      }

      const clip = getHeroClipById(clipId);
      if (!clip) return;

      applyPlaybackRate(video);

      const encoded = encodePublicAssetSrc(clip.src);
      if (video.dataset.loadedSrc !== encoded) {
        video.dataset.loadedSrc = encoded;
        video.src = encoded;
        video.load();
      }

      if (shouldPlay && allowPlayback) {
        applyPanelTimeOffset(video, panelIndex);
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    },
    [allowPlayback, clipId, isVideoCapable, panelIndex, panelVideoSrcAllowed],
  );

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    applyPlaybackRate(video);
    applyPanelTimeOffset(video, panelIndex);
  }, [panelIndex]);

  const markVideoReady = useCallback(() => {
    setVideoReady(true);
    setPanelGradientHidden(panelIndex, true);
  }, [panelIndex]);

  useEffect(() => {
    if (!videoReady) {
      setPanelGradientHidden(panelIndex, false);
    }
  }, [panelIndex, videoReady]);

  useEffect(() => {
    if (!isVideoCapable || !hasClip || !panelVideoSrcAllowed) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.removeAttribute("data-loaded-src");
      }
      return;
    }

    applyVideo(videoRef.current, true);
  }, [applyVideo, clipId, hasClip, isVideoCapable, panelVideoSrcAllowed]);

  const showVideo = isVideoCapable && hasClip && panelVideoSrcAllowed;

  const handleCanPlay = () => {
    if (!isPrimaryLcpPanel) {
      markVideoReady();
    }
  };

  const handleLoadedData = () => {
    if (isPrimaryLcpPanel) {
      markVideoReady();
    }
  };

  return (
    <div
      className={shellStyles["hero-panel"]}
      style={
        {
          ["--hero-panel-ring" as string]: Math.abs(
            panelIndex - HERO_PANEL_CENTER_INDEX,
          ),
        } as CSSProperties
      }
    >
      <div className={shellStyles["hero-panel-media"]}>
        {showVideo ? (
          <video
            ref={videoRef}
            className={[
              styles["hero-panel-video"],
              videoReady ? styles["hero-panel-video--visible"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ transitionDuration: `${HERO_VIDEO_CROSSFADE_MS}ms` }}
            muted
            playsInline
            loop
            {...primaryLcpVideoProps}
            aria-hidden="true"
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={handleLoadedData}
            onCanPlay={handleCanPlay}
            onError={() => onVideoError(clipId)}
          />
        ) : null}
      </div>
    </div>
  );
}

function readAllowVideoEnhancement(): boolean {
  if (typeof window === "undefined") return true;

  const reduced = prefersReducedMotion();
  let saveData = false;
  try {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    saveData = Boolean(connection?.saveData);
  } catch {
    saveData = false;
  }

  return !reduced && !saveData;
}

export function HeroVideoPanels() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [allowVideoEnhancement] = useState(readAllowVideoEnhancement);
  const [slots, setSlots] = useState<PanelSlotState[]>(createInitialPanelStates);
  const [mobileLayout, setMobileLayout] = useState(false);
  const [idleVideoReady, setIdleVideoReady] = useState(false);
  const [unlockedPanels, setUnlockedPanels] = useState<ReadonlySet<number>>(() => new Set());
  const [isInView, setIsInView] = useState(false);
  const [allowPlayback, setAllowPlayback] = useState(false);
  const [failedClipIds, setFailedClipIds] = useState<ReadonlySet<string>>(() => new Set());

  useEffect(() => {
    const mqMobileLayout = window.matchMedia(
      `(max-width: ${HERO_MOBILE_LAYOUT_MAX_WIDTH_PX}px)`,
    );

    const sync = () => {
      setMobileLayout(mqMobileLayout.matches);
    };

    sync();
    mqMobileLayout.addEventListener("change", sync);
    return () => mqMobileLayout.removeEventListener("change", sync);
  }, []);

  const canScheduleVideo = allowVideoEnhancement;

  useEffect(() => {
    if (!canScheduleVideo) return;

    const delayMs = isCoarsePointerDevice()
      ? HERO_VIDEO_IDLE_DELAY_MOBILE_MS
      : HERO_VIDEO_IDLE_DELAY_MS;

    return scheduleAfterIdle(() => {
      if (!shouldDeferHeroVideoPlayback()) {
        setIdleVideoReady(true);
      }
    }, delayMs);
  }, [canScheduleVideo]);

  const globalVideoGateOpen =
    canScheduleVideo && idleVideoReady && !shouldDeferHeroVideoPlayback();

  useEffect(() => {
    if (!globalVideoGateOpen) return;

    let cancelled = false;
    const order = getHeroPanelVideoUnlockOrder(mobileLayout);
    const center = HERO_PANEL_CENTER_INDEX;
    const timeoutIds: number[] = [];

    timeoutIds.push(
      window.setTimeout(() => {
        if (cancelled) return;
        setUnlockedPanels((prev) => {
          const next = new Set(prev);
          next.add(center);
          return next;
        });
      }, 0),
    );

    const secondaryPanels = order.filter((index) => index !== center);
    for (const [orderIndex, panelIndex] of secondaryPanels.entries()) {
      timeoutIds.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setUnlockedPanels((prev) => {
            const next = new Set(prev);
            next.add(panelIndex);
            return next;
          });
        }, HERO_VIDEO_SECONDARY_UNLOCK_DELAY_MS + getHeroPanelVideoStaggerMs(orderIndex)),
      );
    }

    return () => {
      cancelled = true;
      for (const id of timeoutIds) window.clearTimeout(id);
    };
  }, [globalVideoGateOpen, mobileLayout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(
          Boolean(entry?.isIntersecting && entry.intersectionRatio >= HERO_IN_VIEW_RATIO),
        );
      },
      { threshold: [0, HERO_IN_VIEW_RATIO, 0.35, 0.6] },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncVisibility = () => {
      setAllowPlayback(
        globalVideoGateOpen && isInView && !document.hidden && allowVideoEnhancement,
      );
    };

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, [allowVideoEnhancement, globalVideoGateOpen, isInView]);

  const handleVideoError = useCallback((clipId: string) => {
    setFailedClipIds((prev) => {
      if (prev.has(clipId)) return prev;
      const next = new Set(prev);
      next.add(clipId);
      return next;
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${shellStyles["hero-panels"]} ${shellStyles["hero-panels--videos"]}`}
      aria-hidden="true"
    >
      {slots.map((slot, panelIndex) => {
        const hasClip = Boolean(
          slot.clipId && getHeroClipById(slot.clipId) && !failedClipIds.has(slot.clipId),
        );
        const isVideoCapable = isHeroPanelVideoActive(panelIndex, mobileLayout);
        const panelVideoSrcAllowed =
          globalVideoGateOpen && unlockedPanels.has(panelIndex);

        return (
          <HeroPanel
            key={`${panelIndex}-${panelVideoSrcAllowed ? "on" : "off"}`}
            panelIndex={panelIndex}
            clipId={slot.clipId}
            isVideoCapable={isVideoCapable}
            panelVideoSrcAllowed={panelVideoSrcAllowed}
            allowPlayback={allowPlayback}
            hasClip={hasClip}
            onVideoError={handleVideoError}
          />
        );
      })}
    </div>
  );
}
