"use client";

import { useState } from "react";

import type { WorkVideoItem } from "@/i18n/dictionaries";

import { VideoLightbox, type VideoLightboxItem } from "./VideoLightbox.client";
import { WorkVideoCard } from "./WorkVideoCard";
import styles from "./WorkSection.module.css";

type Props = Readonly<{
  items: WorkVideoItem[];
  gridClassName?: string;
}>;

function toLightboxItem(item: WorkVideoItem): VideoLightboxItem {
  return {
    lightboxSrc: item.lightboxSrc,
    label: item.videoAriaLabel,
    poster: item.posterSrc,
  };
}

export function WorkVideoGallery({ items, gridClassName }: Props) {
  const [activeVideo, setActiveVideo] = useState<VideoLightboxItem | null>(null);
  const isLightboxOpen = activeVideo !== null;
  if (items.length === 0) return null;

  const gridClass = gridClassName ?? styles["work-section__grid"];

  return (
    <>
      <div className={gridClass}>
        {items.map((item) => (
          <div key={item.previewSrc} className={styles["work-section__card-wrap"]}>
            <WorkVideoCard
              title={item.title}
              description={item.description}
              posterSrc={item.posterSrc}
              previewSrc={item.previewSrc}
              alt={item.alt}
              videoAriaLabel={item.videoAriaLabel}
              projectHref={item.projectHref}
              detailLabel={item.detailLabel}
              isLightboxOpen={isLightboxOpen}
              onOpen={() => setActiveVideo(toLightboxItem(item))}
            />
          </div>
        ))}
      </div>

      {activeVideo ? (
        <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      ) : null}
    </>
  );
}
