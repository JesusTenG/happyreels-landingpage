import styles from "./ScrollHint.module.css";

type Props = Readonly<{
  href: `#${string}`;
  ariaLabel: string;
}>;

export function ScrollHint({ href, ariaLabel }: Props) {
  return (
    <a className={styles.root} href={href} aria-label={ariaLabel}>
      <span className={styles.float}>
        <span className={styles.surface}>
          <svg
            className={styles.icon}
            viewBox="0 0 72 76"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="6" cy="6" r="2.6" />
            <circle cx="66" cy="6" r="2.6" />
            <circle cx="6" cy="16" r="2.6" />
            <circle cx="16" cy="16" r="2.6" />
            <circle cx="56" cy="16" r="2.6" />
            <circle cx="66" cy="16" r="2.6" />
            <circle cx="6" cy="26" r="2.6" />
            <circle cx="16" cy="26" r="2.6" />
            <circle cx="26" cy="26" r="2.6" />
            <circle cx="46" cy="26" r="2.6" />
            <circle cx="56" cy="26" r="2.6" />
            <circle cx="66" cy="26" r="2.6" />
            <circle cx="6" cy="36" r="2.6" />
            <circle cx="16" cy="36" r="2.6" />
            <circle cx="26" cy="36" r="2.6" />
            <circle cx="36" cy="36" r="2.6" />
            <circle cx="46" cy="36" r="2.6" />
            <circle cx="56" cy="36" r="2.6" />
            <circle cx="66" cy="36" r="2.6" />
            <circle cx="16" cy="46" r="2.6" />
            <circle cx="26" cy="46" r="2.6" />
            <circle cx="36" cy="46" r="2.6" />
            <circle cx="46" cy="46" r="2.6" />
            <circle cx="56" cy="46" r="2.6" />
            <circle cx="26" cy="56" r="2.6" />
            <circle cx="36" cy="56" r="2.6" />
            <circle cx="46" cy="56" r="2.6" />
            <circle cx="36" cy="66" r="2.6" />
          </svg>
        </span>
      </span>
    </a>
  );
}
