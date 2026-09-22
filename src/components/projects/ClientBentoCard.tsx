import Image from "next/image";
import Link from "next/link";

import type { ClientStory } from "@/data/client-stories";
import type { Locale } from "@/i18n/config";
import { getClientProjectPath } from "@/lib/route-config";

import styles from "./ClientCollaborationsSection.module.css";

type Props = Readonly<{
  locale: Locale;
  story: ClientStory;
  showAction?: boolean;
}>;

export function ClientBentoCard({ locale, story, showAction = true }: Props) {
  const content = story.localized[locale];
  const imageSrc = story.cardImageSrc ?? story.heroImageSrc;
  const linkLabel = locale === "de" ? "Mehr erfahren" : "Learn more";
  const accessibleLabel = showAction
    ? `${linkLabel}: ${story.name}`
    : locale === "de"
      ? `Projekt mit ${story.name} ansehen`
      : `View project with ${story.name}`;

  return (
    <Link
      href={getClientProjectPath(locale, story.slug)}
      className={styles.card}
      aria-label={accessibleLabel}
      data-collaboration-card
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
        {showAction ? (
          <span className={styles.cardLink}>
            <span className={styles.cardLinkLabel}>{linkLabel}</span>
            <span className={styles.cardLinkIcon} aria-hidden="true">
              <span />
            </span>
          </span>
        ) : null}
      </span>
    </Link>
  );
}
