import type { CSSProperties } from "react";

import styles from "./SectionWave.module.css";

type Props = Readonly<{
  from: string;
  to: string;
  accent?: string;
  flip?: boolean;
}>;

export function SectionWave({
  from,
  to,
  accent,
  flip = false,
}: Props) {
  const style = {
    "--wave-from": from,
    "--wave-to": to,
    "--wave-accent": accent,
  } as CSSProperties;

  return (
    <div
      className={styles.wave}
      style={style}
      aria-hidden="true"
      data-section-wave
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        focusable="false"
        className={flip ? styles.flipped : undefined}
      >
        <path d="M0 28C208 70 381 8 642 25C884 41 1075 72 1440 18V72H0Z" />
        {accent ? (
          <path
            className={styles.accent}
            d="M0 28C208 70 381 8 642 25C884 41 1075 72 1440 18"
          />
        ) : null}
      </svg>
    </div>
  );
}
