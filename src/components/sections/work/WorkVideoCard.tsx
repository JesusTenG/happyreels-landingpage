"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./WorkVideoCard.module.css";

/** Encodes spaces in public asset paths for reliable loading on all devices. */
function encodePublicAssetSrc(src: string): string {
  return src.replace(/ /g, "%20");
}

export type WorkVideoCardProps = Readonly<{
  posterSrc: string;
  previewSrc: string;
  alt: string;
  videoAriaLabel: string;
  isLightboxOpen: boolean;
  onOpen: () => void;
}>;

export function WorkVideoCard({
  posterSrc,
  previewSrc,
  alt,
  videoAriaLabel,
  isLightboxOpen,
  onOpen,
}: WorkVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPreviewReady, setIsPreviewReady] = useState(false);

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setCanHoverPreview(hoverMq.matches && !reducedMq.matches);
    };
    sync();
    hoverMq.addEventListener("change", sync);
    reducedMq.addEventListener("change", sync);
    return () => {
      hoverMq.removeEventListener("change", sync);
      reducedMq.removeEventListener("change", sync);
    };
  }, []);

  const shouldLoadPreview = canHoverPreview && isHovering && !isLightboxOpen;

  const markPreviewReady = useCallback(() => {
    setIsPreviewReady(true);
  }, []);

  const activatePreview = useCallback(() => {
    if (!canHoverPreview || isLightboxOpen) return;
    setIsHovering(true);
    setIsPreviewReady(false);
  }, [canHoverPreview, isLightboxOpen]);

  const deactivatePreview = useCallback(() => {
    setIsHovering(false);
    setIsPreviewReady(false);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  useEffect(() => {
    if (!shouldLoadPreview) return;
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  }, [shouldLoadPreview, previewSrc]);

  const posterClassName = [
    styles["work-video-card__poster-layer"],
    canHoverPreview && isPreviewReady && shouldLoadPreview
      ? styles["work-video-card__poster-layer--hidden"]
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const encodedPosterSrc = encodePublicAssetSrc(posterSrc);
  const encodedPreviewSrc = encodePublicAssetSrc(previewSrc);

  const videoClassName = [
    styles["work-video-card__video-preview"],
    isPreviewReady ? styles["work-video-card__video-preview--visible"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={styles["work-video-card"]}>
      <button
        type="button"
        className={styles["work-video-card__media-trigger"]}
        aria-label={videoAriaLabel}
        onClick={onOpen}
        onMouseEnter={canHoverPreview ? activatePreview : undefined}
        onMouseLeave={canHoverPreview ? deactivatePreview : undefined}
        onFocus={canHoverPreview ? activatePreview : undefined}
        onBlur={canHoverPreview ? deactivatePreview : undefined}
      >
        <div className={styles["work-video-card__media"]}>
          <Image
            className={posterClassName}
            src={encodedPosterSrc}
            alt={alt}
            fill
            sizes="(max-width: 480px) 17.5rem, (max-width: 820px) 48vw, 17.5rem"
            loading="lazy"
          />
          {shouldLoadPreview ? (
            <video
              ref={videoRef}
              key={encodedPreviewSrc}
              className={videoClassName}
              src={encodedPreviewSrc}
              muted
              loop
              autoPlay
              playsInline
              preload="none"
              aria-label={videoAriaLabel}
              onLoadedData={markPreviewReady}
              onCanPlay={markPreviewReady}
              onPlaying={markPreviewReady}
            />
          ) : null}
          <span className={styles["work-video-card__play-badge"]} aria-hidden="true">
            <Play className={styles["work-video-card__play-icon"]} fill="currentColor" />
          </span>
        </div>
      </button>
    </article>
  );
}
