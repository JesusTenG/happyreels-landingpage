"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import styles from "./HeroVideoStack.module.css";

const HERO_VIDEOS = [
  {
    src: "/assets/videos/preview/hero/mealplans-hero.mp4",
    poster: "/assets/videos/posters/random/mealplans leiser-poster.webp",
  },
  {
    src: "/assets/videos/preview/hero/pizza-hero.mp4",
    poster: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
  },
  {
    src: "/assets/videos/preview/hero/ayo-koolsavas-hero.mp4",
    poster: "/assets/videos/posters/savas/AYO X KOOLSAVAS-poster.webp",
  },
] as const;

const MOBILE_STACK_MEDIA = "(max-width: 760px)";
const DIRECTION_LOCK_DISTANCE = 8;

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  axis: "pending" | "horizontal" | "vertical";
};

type Props = Readonly<{
  variant?: "original" | "large";
}>;

export function HeroVideoStack({ variant = "original" }: Props) {
  const [activeCard, setActiveCard] = useState(HERO_VIDEOS.length - 1);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const isStackVisibleRef = useRef(false);
  const dragStateRef = useRef<DragState | null>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const updatePlayback = () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;

        if (isStackVisibleRef.current && !document.hidden) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isStackVisibleRef.current = Boolean(entry?.isIntersecting);
        updatePlayback();
      },
      { threshold: 0.08 },
    );
    const handleVisibilityChange = () => updatePlayback();

    observer.observe(stack);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      isStackVisibleRef.current = false;
    };
  }, []);

  const getClosestCardIndex = (container: HTMLDivElement, clientX: number) => {
    const cards = Array.from(container.querySelectorAll<HTMLElement>("figure[data-card]"));
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(clientX - (rect.left + rect.width / 2));
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia(MOBILE_STACK_MEDIA).matches) return;

    const targetCard =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>("figure[data-card]")
        : null;
    const targetCardIndex = Number(targetCard?.dataset.card) - 1;

    setActiveCard(
      Number.isInteger(targetCardIndex) && targetCardIndex >= 0
        ? targetCardIndex
        : getClosestCardIndex(event.currentTarget, event.clientX),
    );

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      axis: "pending",
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    if (dragState.axis === "pending") {
      const deltaX = event.clientX - dragState.startX;
      const deltaY = event.clientY - dragState.startY;
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < DIRECTION_LOCK_DISTANCE) return;

      dragState.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
    }

    if (dragState.axis !== "horizontal") return;

    setActiveCard(getClosestCardIndex(event.currentTarget, event.clientX));
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    dragStateRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={stackRef}
      className={styles.stack}
      data-active-card={activeCard + 1}
      data-variant={variant}
      aria-hidden="true"
      onPointerCancel={finishDrag}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
    >
      {HERO_VIDEOS.map((video, index) => (
        <figure
          key={video.src}
          className={styles.card}
          data-active={activeCard === index ? "true" : undefined}
          data-card={index + 1}
        >
          <video
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            poster={video.poster}
            tabIndex={-1}
            disablePictureInPicture
          >
            <source src={video.src} type="video/mp4" />
          </video>
        </figure>
      ))}
    </div>
  );
}

export function HeroFocusVideo() {
  const video = HERO_VIDEOS[0];

  return (
    <figure className={styles.focusFrame} aria-hidden="true">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        poster={video.poster}
        tabIndex={-1}
        disablePictureInPicture
      >
        <source src={video.src} type="video/mp4" />
      </video>
    </figure>
  );
}
