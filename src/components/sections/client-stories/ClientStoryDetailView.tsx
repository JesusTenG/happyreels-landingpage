import Image from "next/image";
import Link from "next/link";

import {
  getClientStoryContent,
  getWorkItemsForClientStory,
} from "@/data/client-stories";
import { getTestimonialForClientStory } from "@/content/testimonials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { SectionWave } from "@/components/layout/SectionWave";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { stripTrailingHeadingPeriod } from "@/lib/heading-text";
import { getProjectsPath } from "@/lib/route-config";
import { getServiceContent } from "@/data/service-content";
import { getServicePath, type ServiceKey } from "@/lib/route-config";

import type { ClientStory } from "@/data/client-stories";
import { ClientStoryDetailReels } from "./ClientStoryDetailReels.client";
import styles from "./ClientStoryDetailViewV2.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  story: ClientStory;
}>;

const STORY_SERVICES: Record<string, readonly ServiceKey[]> = {
  "leon-haegele": ["videoProduction", "shortFormEditing", "youtubeEditing", "motionFinishing"],
  "ramon-limacher": ["shortFormEditing", "motionFinishing"],
  "mario-scherthan": ["shortFormEditing", "youtubeEditing", "motionFinishing"],
};

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
  const relatedServices = STORY_SERVICES[story.slug] ?? [];

  return (
    <main id="main-content" className={styles["collaboration-detail"]}>
      <section
        className={styles["collaboration-detail-hero"]}
        aria-labelledby="client-project-title"
        data-navbar-theme="brown"
        data-navbar-hero="collapsing"
      >
        <div className={`container-base ${styles["collaboration-detail-hero-shell"]}`}>
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

          <div className={styles["collaboration-detail-intro"]}>
            <div className={styles["collaboration-detail-copy"]}>
              <h1 id="client-project-title" className={styles["collaboration-detail-headline"]}>{pageTitle}</h1>
              <p className={styles["collaboration-detail-lead"]}>{content.intro}</p>
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
          </div>
        </div>
      </section>

      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-strong)" />

      <section
        className={styles["collaboration-detail-direction"]}
        aria-labelledby="client-project-direction-title"
        data-navbar-theme="brown"
      >
        <div className={`container-base ${styles["collaboration-detail-direction-grid"]}`}>
          <div className={styles["collaboration-detail-direction-copy"]}>
            <h2 id="client-project-direction-title">{content.directionTitle}</h2>
            <p>{content.collaborationText}</p>
            <p>{content.directionText}</p>
          </div>
          <div className={styles["collaboration-detail-formats"]}>
            <h3>{locale === "de" ? "Produzierte Formate" : "Produced formats"}</h3>
            <ul>
              {content.formats.map((format) => <li key={format}>{format}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <SectionWave from="var(--subpage-bg-strong)" to="var(--subpage-bg-base)" />

      {relatedServices.length > 0 ? (
        <section
          className={styles["collaboration-detail-services"]}
          aria-labelledby="client-project-services-title"
          data-navbar-theme="brown"
        >
          <div className={`container-base ${styles["collaboration-detail-services-grid"]}`}>
            <div>
              <h2 id="client-project-services-title">
                {stripTrailingHeadingPeriod(
                  locale === "de"
                    ? "Von diesem Projekt zu den passenden Leistungen."
                    : "From this project to the relevant services.",
                )}
              </h2>
            </div>
            <nav aria-label={locale === "de" ? "Leistungen dieses Projekts" : "Services used in this project"}>
              {relatedServices.map((key) => (
                <Link key={key} href={getServicePath(locale, key)}>
                  {getServiceContent(key, locale).navTitle}<span aria-hidden="true"> ↗</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      ) : null}

      {workItems.length > 0 || hasTestimonial ? (
        <section
          className={styles["collaboration-detail-content"]}
          aria-labelledby={workItems.length > 0 ? "client-story-edits-heading" : undefined}
          data-navbar-theme="brown"
        >
          <div className="container-base">
            {workItems.length > 0 ? (
              <h2
                id="client-story-edits-heading"
                className={styles["collaboration-detail-reels-heading"]}
              >
                {clientStoryDetail.publishedEditsHeading}
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
          </div>
        </section>
      ) : null}

      <SectionWave from="var(--subpage-bg-base)" to="var(--subpage-bg-cta)" flip />

      <section
        className={styles["collaboration-detail-cta"]}
        aria-labelledby="client-story-cta-heading"
        data-navbar-theme="brown"
      >
        <div className={`container-base ${styles["collaboration-detail-cta-grid"]}`}>
          <div>
            <h2 id="client-story-cta-heading" className={styles["collaboration-detail-cta-title"]}>
              {clientStoryDetail.ctaHeadline}
            </h2>
            <p className={styles["collaboration-detail-cta-text"]}>{clientStoryDetail.ctaBody}</p>
          </div>
          <div className={styles["collaboration-detail-cta-actions"]}>
            <HappyReelsButton href={contactHref} showIcon={false}>
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
        </div>
      </section>

      <SectionWave from="var(--subpage-bg-cta)" to="var(--subpage-bg-footer)" />
    </main>
  );
}
