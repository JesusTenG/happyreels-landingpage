import Image from "next/image";

import {
  getClientStoryContent,
  getWorkItemsForClientStory,
} from "@/data/client-stories";
import { getTestimonialForClientStory } from "@/content/testimonials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { getProjectsPath } from "@/lib/route-config";

import type { ClientStory } from "@/data/client-stories";
import { ClientStoryDetailReels } from "./ClientStoryDetailReels.client";
import styles from "./ClientStoryDetailView.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  story: ClientStory;
}>;

export function ClientStoryDetailView({ locale, dict, story }: Props) {
  const content = getClientStoryContent(story, locale);
  const { clientStoryDetail } = dict;
  const backHref = getProjectsPath(locale);
  const contactHref = `/${locale}#contact`;
  const workHref = getProjectsPath(locale);
  const pageTitle = content.pageTitle;
  const testimonial = getTestimonialForClientStory(story.slug, locale);
  const workItems = getWorkItemsForClientStory(story, dict, locale);
  const hasTestimonial = testimonial !== undefined;

  return (
    <article className={styles["collaboration-detail"]} data-navbar-theme="brown">
      <div className={styles["collaboration-detail__shell"]}>
        <div className={styles["collaboration-detail-back"]}>
          <HappyReelsButton
            href={backHref}
            variant="secondary"
            showIcon={false}
            enableMovingBorder={false}
          >
            {clientStoryDetail.back}
          </HappyReelsButton>
        </div>

        <section className={styles["collaboration-detail-intro"]} aria-labelledby="client-project-title">
          <div className={styles["collaboration-detail-copy"]}>
            <p className={styles["collaboration-detail-eyebrow"]}>
              {locale === "de" ? "Langfristiges Projekt" : "Long-term project"}
            </p>
            <h1 id="client-project-title" className={styles["collaboration-detail-headline"]}>
              <MixedHeadline text={pageTitle} />
            </h1>
            <p className={styles["collaboration-detail-lead"]}>{content.intro}</p>
            <p className={styles["collaboration-detail-description"]}>
              {content.collaborationText}
            </p>
          </div>
          {story.heroImageSrc ? (
            <div className={styles["collaboration-detail-hero-media"]}>
              <Image
                src={story.heroImageSrc}
                alt={content.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 92vw, (max-width: 1100px) 44vw, 34rem"
              />
            </div>
          ) : null}
        </section>

        <section
          className={styles["collaboration-detail-direction"]}
          aria-labelledby="client-project-direction-title"
        >
          <div>
            <p className={styles["collaboration-detail-section-label"]}>
              {locale === "de" ? "Visuelle Ausrichtung" : "Visual direction"}
            </p>
            <h2 id="client-project-direction-title"><MixedHeadline text={content.directionTitle} /></h2>
            <p>{content.directionText}</p>
          </div>
          <div className={styles["collaboration-detail-formats"]}>
            <h3><MixedHeadline text={locale === "de" ? "Produzierte Formate" : "Produced formats"} tone="gold" /></h3>
            <ul>
              {content.formats.map((format) => <li key={format}>{format}</li>)}
            </ul>
          </div>
        </section>

        {workItems.length > 0 || hasTestimonial ? (
          <section
            className={styles["collaboration-detail-content"]}
            aria-labelledby={workItems.length > 0 ? "client-story-edits-heading" : undefined}
          >
            {workItems.length > 0 ? (
              <h2
                id="client-story-edits-heading"
                className={`${styles["collaboration-detail-headline"]} ${styles["collaboration-detail-reels-heading"]}`}
              >
                <MixedHeadline text={clientStoryDetail.publishedEditsHeading} />
              </h2>
            ) : null}

            <div
              className={styles["collaboration-detail-content-body"]}
              data-has-testimonial={hasTestimonial ? "true" : "false"}
            >
              {workItems.length > 0 ? (
                <div className={styles["collaboration-detail-reels"]}>
                  <ClientStoryDetailReels
                    items={workItems}
                    gridClassName={styles["collaboration-detail-reels-grid"]}
                  />
                </div>
              ) : null}

              {hasTestimonial ? (
                <aside
                  className={styles["collaboration-detail-testimonial"]}
                  aria-label={clientStoryDetail.testimonialAriaLabel}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    className={styles["collaboration-detail-testimonial-card"]}
                  />
                </aside>
              ) : null}
            </div>
          </section>
        ) : null}

        <section
          className={styles["collaboration-detail-cta"]}
          aria-labelledby="client-story-cta-heading"
        >
          <h2 id="client-story-cta-heading" className={styles["collaboration-detail-cta-title"]}>
            <MixedHeadline text={clientStoryDetail.ctaHeadline} />
          </h2>
          <p className={styles["collaboration-detail-cta-text"]}>{clientStoryDetail.ctaBody}</p>
          <div className={styles["collaboration-detail-cta-actions"]}>
            <HappyReelsButton
              href={contactHref}
              showIcon={false}
            >
              {clientStoryDetail.ctaPrimary}
            </HappyReelsButton>
            <HappyReelsButton
              href={workHref}
              variant="secondary"
              showIcon={false}
              enableMovingBorder={false}
            >
              {clientStoryDetail.ctaSecondary}
            </HappyReelsButton>
          </div>
        </section>
      </div>
    </article>
  );
}
