import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionWave } from "@/components/layout/SectionWave";
import { WorkVideoGallery } from "@/components/sections/work/WorkVideoGallery.client";
import { SubpageCta } from "@/components/subpages/SubpageCta";
import { getAllClientStories } from "@/data/client-stories";
import { getReelVideos } from "@/data/reel-videos";
import type { Locale } from "@/i18n/config";
import { getClientProjectPath } from "@/lib/route-config";

import styles from "./ProjectOverview.module.css";

export function ProjectOverview({ locale }: Readonly<{ locale: Locale }>) {
  const de = locale === "de";
  return (
    <main id="main-content" className={styles.main}>
      <header className={styles.hero} data-navbar-theme="brown">
        <div className={`container-base ${styles.heroInner}`}>
          <h1 className={styles.title}>{de ? "Unsere Projekte" : "Our projects"}</h1>
          <p className={styles.lead}>{de ? "Reels, Social Ads und Podcast-Edits. Eine Auswahl unserer Arbeit für Creator und Marken." : "Reels, social ads and podcast edits. Selected work for creators and brands."}</p>
        </div>
      </header>
      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-base)" />
      <section className={styles.collaborations} aria-labelledby="projects-collaborations-title" data-navbar-theme="brown">
        <div className="container-base">
          <h2 id="projects-collaborations-title" className={styles.heading}>{de ? "Zusammenarbeiten" : "Collaborations"}</h2>
          <div className={styles.projectGrid}>
            {getAllClientStories().map((story, index) => (
              <Link key={story.slug} href={getClientProjectPath(locale, story.slug)} className={styles.projectCard} data-card={index + 1}>
                <div className={styles.projectImage}>
                  <Image src={story.cardImageSrc ?? story.heroImageSrc!} alt="" fill sizes="(max-width: 700px) 92vw, 33vw" />
                </div>
                <div className={styles.projectCopy}>
                  <h3>{story.name}</h3>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.gridSection} aria-labelledby="project-videos-title" data-navbar-theme="brown">
        <div className="container-base">
          <h2 id="project-videos-title" className={styles.heading}>{de ? "Ausgewählte Videos" : "Selected videos"}</h2>
          <WorkVideoGallery items={getReelVideos(locale)} />
        </div>
      </section>
      <SubpageCta locale={locale} />
    </main>
  );
}
