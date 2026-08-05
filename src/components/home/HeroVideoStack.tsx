import styles from "./HeroVideoStack.module.css";

const HERO_VIDEOS = [
  {
    src: "/assets/videos/preview/random/mealplans leiser-web.mp4",
    poster: "/assets/videos/posters/random/mealplans leiser-poster.webp",
  },
  {
    src: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
    poster: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
  },
  {
    src: "/assets/videos/preview/savas/AYO X KOOLSAVAS-web.mp4",
    poster: "/assets/videos/posters/savas/AYO X KOOLSAVAS-poster.webp",
  },
] as const;

type Props = Readonly<{
  variant?: "original" | "large";
}>;

export function HeroVideoStack({ variant = "original" }: Props) {
  return (
    <div className={styles.stack} data-variant={variant} aria-hidden="true">
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
