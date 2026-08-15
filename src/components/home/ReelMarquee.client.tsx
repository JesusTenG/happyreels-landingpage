"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { VideoLoader } from "@/components/ui/VideoLoader";
import type { ReelVideo } from "@/data/reel-videos";

import styles from "./ReelMarquee.module.css";

type Props = Readonly<{ items: ReelVideo[] }>;

const MOBILE_PLAYBACK_LIMIT = 2;
const DESKTOP_PLAYBACK_LIMIT = 5;

export function ReelMarquee({ items }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [loadingVideoIndexes, setLoadingVideoIndexes] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  const setVideoLoading = useCallback((index: number, isLoading: boolean) => {
    setLoadingVideoIndexes((current) => {
      if (current.has(index) === isLoading) return current;

      const next = new Set(current);
      if (isLoading) next.add(index);
      else next.delete(index);
      return next;
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const group = groupRef.current;
    if (!root || !group) return;

    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("video"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visibleRatios = new Map<HTMLVideoElement, number>();
    let revealed = reducedMotion.matches;
    let isActive = false;
    root.dataset.revealReady = "true";
    if (revealed) root.dataset.revealed = "true";

    const resizeObserver = new ResizeObserver(() => {
      const duration = Math.max(40, group.scrollWidth / 22);
      root.style.setProperty("--marquee-duration", `${duration}s`);
    });
    resizeObserver.observe(group);

    const unloadVideo = (
      video: HTMLVideoElement,
      index: number,
      updateLoadingState = true,
    ) => {
      video.pause();
      if (updateLoadingState) setVideoLoading(index, false);
      if (!video.hasAttribute("src")) return;

      video.removeAttribute("src");
      video.load();
    };

    const syncVideos = () => {
      if (!isActive || document.hidden || reducedMotion.matches) {
        videos.forEach((video, index) => unloadVideo(video, index));
        return;
      }

      const viewportCenter = window.innerWidth / 2;
      const playbackLimit =
        window.innerWidth <= 760 ? MOBILE_PLAYBACK_LIMIT : DESKTOP_PLAYBACK_LIMIT;
      const selectedVideos = new Set(
        videos
          .filter((video) => (visibleRatios.get(video) ?? 0) >= 0.35)
          .sort((a, b) => {
            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();
            const aDistance = Math.abs(aRect.left + aRect.width / 2 - viewportCenter);
            const bDistance = Math.abs(bRect.left + bRect.width / 2 - viewportCenter);
            return aDistance - bDistance;
          })
          .slice(0, playbackLimit),
      );

      videos.forEach((video, index) => {
        if (!selectedVideos.has(video)) {
          unloadVideo(video, index);
          return;
        }

        if (!video.hasAttribute("src") && video.dataset.src) {
          setVideoLoading(index, true);
          video.src = video.dataset.src;
          video.load();
        }
        video.muted = true;
        if (video.paused) void video.play().catch(() => undefined);
      });
    };

    const syncMotionState = () => {
      root.dataset.active =
        isActive && !document.hidden && !reducedMotion.matches ? "true" : "false";
    };

    const sectionObserver = new IntersectionObserver(([entry]) => {
      isActive = entry.isIntersecting;
      syncMotionState();
      if (isActive) {
        if (!revealed) {
          revealed = true;
          root.dataset.revealed = "true";
        }
      }
      syncVideos();
    }, { rootMargin: "18% 0px" });

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visibleRatios.set(entry.target as HTMLVideoElement, entry.intersectionRatio);
      });
      syncVideos();
    }, { threshold: [0, 0.35, 0.7] });

    const handleActivityChange = () => {
      if (reducedMotion.matches) {
        revealed = true;
        root.dataset.revealed = "true";
      }
      syncMotionState();
      syncVideos();
    };
    const handleResize = () => syncVideos();

    document.addEventListener("visibilitychange", handleActivityChange);
    reducedMotion.addEventListener("change", handleActivityChange);
    window.addEventListener("resize", handleResize);
    sectionObserver.observe(root);
    videos.forEach((video) => videoObserver.observe(video));

    return () => {
      resizeObserver.disconnect();
      sectionObserver.disconnect();
      videoObserver.disconnect();
      document.removeEventListener("visibilitychange", handleActivityChange);
      reducedMotion.removeEventListener("change", handleActivityChange);
      window.removeEventListener("resize", handleResize);
      root.dataset.active = "false";
      videos.forEach((video, index) => unloadVideo(video, index, false));
    };
  }, [setVideoLoading]);

  return (
    <div ref={rootRef} className={styles.viewport} aria-hidden="true">
      <div className={styles.track}>
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            ref={groupIndex === 0 ? groupRef : undefined}
            className={styles.group}
          >
            {items.map((item, itemIndex) => {
              const videoIndex = groupIndex * items.length + itemIndex;

              return (
                <div
                  key={`${groupIndex}-${item.id}`}
                  className={styles.card}
                  style={{ "--reel-reveal-index": itemIndex } as CSSProperties}
                >
                  <video
                    data-src={item.previewSrc}
                    poster={item.posterSrc}
                    muted
                    loop
                    playsInline
                    preload="none"
                    tabIndex={-1}
                    onLoadStart={() => setVideoLoading(videoIndex, true)}
                    onCanPlay={() => setVideoLoading(videoIndex, false)}
                    onPlaying={() => setVideoLoading(videoIndex, false)}
                    onWaiting={(event) => {
                      if (event.currentTarget.hasAttribute("src")) {
                        setVideoLoading(videoIndex, true);
                      }
                    }}
                    onStalled={(event) => {
                      if (event.currentTarget.hasAttribute("src")) {
                        setVideoLoading(videoIndex, true);
                      }
                    }}
                    onError={() => setVideoLoading(videoIndex, false)}
                  />
                  <VideoLoader active={loadingVideoIndexes.has(videoIndex)} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
