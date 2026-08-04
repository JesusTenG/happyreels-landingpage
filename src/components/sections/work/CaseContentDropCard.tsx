"use client";

import Image from "next/image";
import { useState } from "react";
import { MixedHeadline } from "@/components/ui/MixedHeadline";

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
  const canPlay = Boolean(previewSrc);

  return (
    <article className={styles["case-drop-card"]}>
      <div className={styles["case-drop-card__media"]}>
        {isPlaying && previewSrc ? (
          <video
            className={styles["case-drop-card__video"]}
            src={previewSrc}
            poster={posterSrc}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <button
            className={styles["case-drop-card__poster-button"]}
            type="button"
            disabled={!canPlay}
            onClick={() => canPlay && setIsPlaying(true)}
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
