import Image from "next/image";
import Link from "next/link";

import type { WorkCase, WorkCaseLocaleContent } from "@/data/work-cases";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { MixedHeadline } from "@/components/ui/MixedHeadline";

import { CaseContentDropCard } from "./CaseContentDropCard";
import styles from "./WorkCaseDetailView.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  workCase: WorkCase;
  content: WorkCaseLocaleContent;
}>;

function MetaList({
  title,
  items,
}: Readonly<{ title: string; items: string[] }>) {
  if (items.length === 0) return null;

  return (
    <div className={styles["work-case-detail__meta-block"]}>
      <h3 className={styles["work-case-detail__meta-title"]}><MixedHeadline text={title} /></h3>
      <ul className={styles["work-case-detail__meta-list"]}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function WorkCaseDetailView({ locale, dict, workCase, content }: Props) {
  const homeWorkHash = `/${locale}/projekte`;
  const contactHref = `/${locale}${dict.caseDetail.ctaHref}`;
  const servicesHref = `/${locale}${dict.caseDetail.servicesHref}`;

  return (
    <article className={styles["work-case-detail"]} data-navbar-theme="brown">
      <p className={styles["work-case-detail__back-wrap"]}>
        <Link href={homeWorkHash} className={styles["work-case-detail__back"]}>
          {dict.caseDetail.back}
        </Link>
      </p>

      <header className={styles["work-case-detail__header"]}>
        <p className={styles["work-case-detail__label"]}>{content.label}</p>
        <h1 className={styles["work-case-detail__title"]}><MixedHeadline text={content.title} /></h1>
        <p className={styles["work-case-detail__description"]}>{content.description}</p>
      </header>

      <div className={styles["work-case-detail__hero-media"]}>
        <Image
          src={workCase.posterSrc}
          alt={content.alt}
          fill
          className={styles["work-case-detail__hero-image"]}
          sizes="(max-width: 980px) 96vw, 72rem"
          priority
        />
      </div>

      <section
        className={styles["work-case-detail__overview"]}
        aria-labelledby="case-overview-heading"
      >
        <h2 id="case-overview-heading" className={styles["work-case-detail__section-title"]}>
          <MixedHeadline text={dict.caseDetail.overviewTitle} />
        </h2>
        <p className={styles["work-case-detail__overview-text"]}>{content.overview}</p>
        <div className={styles["work-case-detail__meta-grid"]}>
          <MetaList title={dict.caseDetail.roleTitle} items={content.role} />
          <MetaList title={dict.caseDetail.platformsTitle} items={content.platforms} />
          <MetaList title={dict.caseDetail.formatsTitle} items={content.formats} />
          <MetaList title={dict.caseDetail.scopeTitle} items={content.scope} />
        </div>
      </section>

      <section className={styles["work-case-detail__drops"]} aria-labelledby="case-drops-heading">
        <h2 id="case-drops-heading" className={styles["work-case-detail__section-title"]}>
          <MixedHeadline text={dict.caseDetail.contentGridTitle} />
        </h2>
        <div className={styles["work-case-detail__drops-grid"]}>
          {content.contentDrops.map((drop) => (
            <CaseContentDropCard
              key={drop.title}
              title={drop.title}
              type={drop.type}
              posterSrc={drop.posterSrc}
              previewSrc={drop.previewSrc}
              alt={drop.alt}
            />
          ))}
        </div>
      </section>

      <div className={styles["work-case-detail__cta"]}>
        <HappyReelsButton href={contactHref}>{dict.caseDetail.cta}</HappyReelsButton>
        <Link href={servicesHref} className={styles["work-case-detail__secondary-link"]}>
          {dict.caseDetail.servicesLink}
        </Link>
      </div>
    </article>
  );
}
