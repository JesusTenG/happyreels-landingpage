import styles from "./HeroVideoStack.module.css";

const HERO_VIDEOS = [
  {
    src: "/assets/videos/preview/random/VERSION2-hero-preview.mp4",
    poster: "/assets/videos/posters/random/VERSION2-poster.webp",
  },
  {
    src: "/assets/videos/preview/podcast trailer/Podvast10.05-web.mp4",
    poster: "/assets/videos/posters/podcast trailer/Podvast10.05-poster.webp",
  },
  {
    src: "/assets/videos/preview/podcast trailer/trailer folge 14-web.mp4",
    poster: "/assets/videos/posters/podcast trailer/trailer folge 14-poster.webp",
  },
] as const;

export function HeroVideoStack() {
  return (
    <div className={styles.stack} aria-hidden="true">
      {HERO_VIDEOS.map((video, index) => (
        <figure key={video.src} className={styles.card} data-card={index + 1}>
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
      ))}
    </div>
  );
}
