"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import type { ReelVideo } from "@/data/reel-videos";

import styles from "./ReelMarquee.module.css";

type Props = Readonly<{ items: ReelVideo[] }>;

export function ReelMarquee({ items }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const group = groupRef.current;
    if (!root || !group) return;

    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("video"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let revealed = reducedMotion.matches;
    let isActive = false;
    root.dataset.revealReady = "true";
    if (revealed) root.dataset.revealed = "true";

    const resizeObserver = new ResizeObserver(() => {
      const duration = Math.max(40, group.scrollWidth / 22);
      root.style.setProperty("--marquee-duration", `${duration}s`);
    });
    resizeObserver.observe(group);

    const playVideos = () => {
      videos.forEach((video) => {
        if (!video.src && video.dataset.src) {
          video.src = video.dataset.src;
          video.load();
        }
        video.muted = true;
        void video.play().catch(() => undefined);
      });
    };

    const sectionObserver = new IntersectionObserver(([entry]) => {
      isActive = entry.isIntersecting;
      root.dataset.active = isActive ? "true" : "false";
      if (isActive) {
        if (!revealed) {
          revealed = true;
          root.dataset.revealed = "true";
        }
        playVideos();
      } else {
        videos.forEach((video) => video.pause());
      }
    }, { rootMargin: "18% 0px" });

    const handleVisibilityChange = () => {
      if (!document.hidden && isActive) playVideos();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    sectionObserver.observe(root);

    return () => {
      resizeObserver.disconnect();
      sectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      videos.forEach((video) => video.pause());
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.viewport} aria-hidden="true">
      <div className={styles.track}>
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            ref={groupIndex === 0 ? groupRef : undefined}
            className={styles.group}
          >
            {items.map((item, itemIndex) => (
              <div
                key={`${groupIndex}-${item.id}`}
                className={styles.card}
                style={{ "--reel-reveal-index": itemIndex } as CSSProperties}
              >
                <video
                  data-src={item.previewSrc}
                  poster={item.posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  tabIndex={-1}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
