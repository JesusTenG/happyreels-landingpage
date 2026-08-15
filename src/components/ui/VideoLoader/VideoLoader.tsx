import styles from "./VideoLoader.module.css";

type Props = Readonly<{
  active: boolean;
  className?: string;
}>;

export function VideoLoader({ active, className }: Props) {
  if (!active) return null;

  return (
    <span
      className={[styles.loader, className].filter(Boolean).join(" ")}
      aria-hidden="true"
      data-video-loader
    >
      <svg className={styles.icon} viewBox="0 0 240 240" focusable="false">
        <circle
          className={`${styles.ring} ${styles.ringA}`}
          cx="120"
          cy="120"
          r="105"
          fill="none"
          strokeWidth="20"
          strokeDasharray="0 660"
          strokeDashoffset="-330"
          strokeLinecap="round"
        />
        <circle
          className={`${styles.ring} ${styles.ringB}`}
          cx="120"
          cy="120"
          r="35"
          fill="none"
          strokeWidth="20"
          strokeDasharray="0 220"
          strokeDashoffset="-110"
          strokeLinecap="round"
        />
        <circle
          className={`${styles.ring} ${styles.ringC}`}
          cx="85"
          cy="120"
          r="70"
          fill="none"
          strokeWidth="20"
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
        <circle
          className={`${styles.ring} ${styles.ringD}`}
          cx="155"
          cy="120"
          r="70"
          fill="none"
          strokeWidth="20"
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
