"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { VideoLoader } from "@/components/ui/VideoLoader";

import styles from "./CaseContentDropCard.module.css";

export type CaseContentDropCardProps = Readonly<{
  title: string;
  type: string;
  posterSrc: string;
  previewSrc?: string;
  alt: string;
}>;

export function CaseContentDropCard({
  title,
  type,
  posterSrc,
  previewSrc,
  alt,
}: CaseContentDropCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canPlay = Boolean(previewSrc);

  useEffect(() => {
    const video = videoRef.current;
    if (!isPlaying || !video) return;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) setIsPlaying(false);
      },
      { threshold: 0.08 },
    );
    const handleVisibilityChange = () => {
      if (document.hidden) setIsPlaying(false);
    };

    visibilityObserver.observe(video);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.pause();
    };
  }, [isPlaying]);

  return (
    <article className={styles["case-drop-card"]}>
      <div className={styles["case-drop-card__media"]}>
        {isPlaying && previewSrc ? (
          <>
            <video
              ref={videoRef}
              className={styles["case-drop-card__video"]}
              src={previewSrc}
              poster={posterSrc}
              controls
              playsInline
              preload="metadata"
              onLoadStart={() => setIsVideoReady(false)}
              onLoadedData={() => setIsVideoReady(true)}
              onCanPlay={() => setIsVideoReady(true)}
              onPlaying={() => setIsVideoReady(true)}
              onWaiting={() => setIsVideoReady(false)}
              onStalled={() => setIsVideoReady(false)}
              onError={() => setIsVideoReady(true)}
            />
            <VideoLoader active={!isVideoReady} />
          </>
        ) : (
          <button
            className={styles["case-drop-card__poster-button"]}
            type="button"
            disabled={!canPlay}
            onClick={() => {
              if (!canPlay) return;
              setIsVideoReady(false);
              setIsPlaying(true);
            }}
            aria-label={canPlay ? `Play video: ${title}` : `Preview: ${title}`}
          >
            <Image
              className={styles["case-drop-card__poster"]}
              src={posterSrc}
              alt={alt}
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 980px) 45vw, 33vw"
            />
          </button>
        )}
      </div>
      <div className={styles["case-drop-card__meta"]}>
        <p className={styles["case-drop-card__type"]}>{type}</p>
        <h3 className={styles["case-drop-card__title"]}><MixedHeadline text={title} /></h3>
      </div>
    </article>
  );
}
