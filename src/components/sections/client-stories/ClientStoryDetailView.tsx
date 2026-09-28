import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { getAllClientStories, getClientStoryContent, getWorkItemsForClientStory, type ClientStory } from "@/data/client-stories";
import { getTestimonialForClientStory } from "@/content/testimonials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { SectionWave } from "@/components/layout/SectionWave";
import { SubpageCta } from "@/components/subpages/SubpageCta";
import { getProjectsPath, getClientProjectPath, getServicePath, type ServiceKey } from "@/lib/route-config";
import { getServiceContent } from "@/data/service-content";

import { ClientStoryDetailReels } from "./ClientStoryDetailReels.client";
import styles from "./ClientStoryDetailViewV2.module.css";

type Props = Readonly<{ locale: Locale; dict: Dictionary; story: ClientStory }>;

const RELATED_SERVICES: Record<string, readonly ServiceKey[]> = {
  "leon-haegele": ["videoProduction", "shortFormEditing"],
  "ramon-limacher": ["shortFormEditing", "motionFinishing"],
  "mario-scherthan": ["shortFormEditing", "youtubeEditing"],
};

export function ClientStoryDetailView({ locale, dict, story }: Props) {
  const content = getClientStoryContent(story, locale);
  const testimonial = getTestimonialForClientStory(story.slug, locale);
  const workItems = getWorkItemsForClientStory(story, dict, locale);
  const de = locale === "de";

  return (
    <main id="main-content" className={styles.main}>
      <header className={styles.hero} data-navbar-theme="brown">
        <div className={`container-base ${styles.heroInner}`}>
          <Link href={getProjectsPath(locale)} className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" />{de ? "Alle Projekte" : "All projects"}</Link>
          <h1 className={styles.title}>{story.name}</h1>
        </div>
      </header>
      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-base)" />

      <section id="projekt-videos" className={styles.work} aria-labelledby="project-work-title" data-navbar-theme="brown">
        <div className="container-base">
          <h2 id="project-work-title" className={styles.heading}>{de ? "Aus der Zusammenarbeit" : "From the collaboration"}</h2>
          <div className={styles.workLayout} data-testimonial={testimonial ? "true" : undefined}>
            <ClientStoryDetailReels items={workItems} gridClassName={styles.reelsGrid} />
            {testimonial ? <aside className={styles.testimonial} aria-label={dict.clientStoryDetail.testimonialAriaLabel}><TestimonialCard testimonial={testimonial} className={styles.testimonialCard} /></aside> : null}
          </div>
        </div>
      </section>

      <section className={styles.context} aria-labelledby="project-context-title" data-navbar-theme="brown">
        <div className="container-base">
          <div className={styles.contextGrid}>
            <article className={styles.contextCard} data-card="1">
              <h2 id="project-context-title">{de ? "Das Projekt" : "The project"}</h2>
              <p>{content.collaborationText}</p>
            </article>
            <article className={styles.formatsCard} data-card="2">
              <h2>{de ? "Formate" : "Formats"}</h2>
              <ul>{content.formats.map(format => <li key={format}>{format}</li>)}</ul>
            </article>
          </div>
          <nav className={styles.services} aria-label={de ? "Passende Leistungen" : "Related services"}>
            <span>{de ? "Passende Leistungen" : "Related services"}</span>
            {(RELATED_SERVICES[story.slug] ?? []).map(key => <Link key={key} href={getServicePath(locale, key)}>{getServiceContent(key, locale).navTitle}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}
          </nav>
        </div>
      </section>

      <nav className={styles.moreProjects} aria-label={de ? "Weitere Projekte" : "More projects"} data-navbar-theme="brown">
        <div className="container-base">
          <h2 className={styles.heading}>{de ? "Weitere Projekte" : "More projects"}</h2>
          <div className={styles.moreGrid}>
            {getAllClientStories().filter(item => item.slug !== story.slug).map((item, index) => (
              <Link className={styles.moreCard} data-card={index + 1} key={item.slug} href={getClientProjectPath(locale, item.slug)}>{item.name}<ArrowUpRight size={20} aria-hidden="true" /></Link>
            ))}
          </div>
        </div>
      </nav>

      <SubpageCta locale={locale} />
    </main>
  );
}
