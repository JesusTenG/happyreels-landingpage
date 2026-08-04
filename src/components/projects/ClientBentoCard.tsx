import Image from "next/image";
import Link from "next/link";

import type { ClientStory } from "@/data/client-stories";
import type { Locale } from "@/i18n/config";
import { getClientProjectPath } from "@/lib/route-config";

import styles from "./ClientCollaborationsSection.module.css";

type Props = Readonly<{
  locale: Locale;
  story: ClientStory;
}>;

export function ClientBentoCard({ locale, story }: Props) {
  const content = story.localized[locale];
  const imageSrc = story.cardImageSrc ?? story.heroImageSrc;
  const linkLabel = locale === "de" ? "Projekt ansehen" : "View project";

  return (
    <Link
      href={getClientProjectPath(locale, story.slug)}
      className={styles.card}
      aria-label={`${linkLabel}: ${story.name}`}
    >
      <span className={styles.media}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={content.imageAlt}
            fill
            sizes={
              story.bentoRole === "feature"
                ? "(max-width: 760px) 92vw, (max-width: 1040px) 88vw, 58vw"
                : "(max-width: 760px) 92vw, (max-width: 1040px) 44vw, 34vw"
            }
          />
        ) : null}
      </span>
      <span className={styles.overlay} aria-hidden="true" />
      <span className={styles.cardCopy}>
        <span className={styles.cardName}>{story.name}</span>
        <span className={styles.cardLabel}>{content.cardLabel}</span>
        <span className={styles.cardLink}>{linkLabel}<span aria-hidden="true">↗</span></span>
      </span>
    </Link>
  );
}
