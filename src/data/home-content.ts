import type { Locale } from "@/i18n/config";

type Service = Readonly<{
  title: string;
  text: string;
}>;

type Audience = Readonly<{
  title: string;
  statement: string;
  linkLabel: string;
}>;

type ProcessStep = Readonly<{
  title: string;
  description: string;
}>;

type Outcome = Readonly<{
  title: string;
  description: string;
}>;

type OutcomesContent = Readonly<{
  title: string;
  titleAccent: string;
  intro: string;
  items: readonly [Outcome, Outcome, Outcome, Outcome];
}>;

export type HomeContent = Readonly<{
  hero: { primaryCta: string };
  work: { title: string; titleAccent: string; cta: string };
  outcomes: OutcomesContent;
  services: {
    title: string;
    items: readonly [Service, Service, Service, Service];
  };
  audiences: readonly [Audience, Audience];
  process: {
    title: string;
    intro: string;
    steps: readonly ProcessStep[];
  };
  proof: { title: string };
  contact: { title: string };
}>;

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    hero: {
      primaryCta: "View projects",
    },
    work: {
      title: "Reels that stop the scroll and",
      titleAccent: "stay with you.",
      cta: "View all projects",
    },
    outcomes: {
      title: "Content that",
      titleAccent: "delivers results.",
      intro: "More views, more interaction and more traffic — with a visual direction that strengthens your brand.",
      items: [
        {
          title: "More views.",
          description: "Strong hooks and clear pacing keep people watching for longer.",
        },
        {
          title: "More likes, saves & shares.",
          description: "Relevant content gives your audience a reason to react.",
        },
        {
          title: "More traffic.",
          description: "Clear messages lead from the feed to your profile, offer or website.",
        },
        {
          title: "Stronger brand impact.",
          description: "A recognizable look builds trust beyond individual posts.",
        },
      ],
    },
    services: {
      title: "From first frame to final feeling.",
      items: [
        {
          title: "Video Production",
          text: "Concept, camera and direction for social-first shoots.",
        },
        {
          title: "Short-Form Editing",
          text: "Fast, focused edits for Reels, Shorts and TikTok.",
        },
        {
          title: "YouTube Editing",
          text: "Structured long-form edits that keep the story moving.",
        },
        {
          title: "Motion & Finishing",
          text: "Motion design, color and sound that make every frame feel complete.",
        },
      ],
    },
    audiences: [
      {
        title: "For creators",
        statement: "Your footage, shaped into content people keep watching.",
        linkLabel: "Create with us",
      },
      {
        title: "For brands",
        statement: "Professional social content that still feels human.",
        linkLabel: "Start a project",
      },
    ],
    process: {
      title: "From idea to finished content.",
      intro: "A clear process, direct communication and no unnecessary feedback loops.",
      steps: [
        {
          title: "Direction",
          description: "Goals, platforms and the visual direction are defined together.",
        },
        {
          title: "Production",
          description: "Story, editing, motion, sound and color are precisely combined.",
        },
        {
          title: "Delivery",
          description: "After focused feedback, the final masters are delivered in all relevant formats.",
        },
      ],
    },
    proof: {
      title: "Trust grows with every project.",
    },
    contact: {
      title: "Got footage? Let’s give it feeling.",
    },
  },
  de: {
    hero: {
      primaryCta: "Projekte ansehen",
    },
    work: {
      title: "Reels, die den Scroll stoppen und",
      titleAccent: "im Kopf bleiben.",
      cta: "Alle Projekte ansehen",
    },
    outcomes: {
      title: "Content, der",
      titleAccent: "Ergebnisse bringt.",
      intro: "Mehr Views, mehr Interaktion und mehr Traffic – mit einer visuellen Linie, die deine Marke stärkt.",
      items: [
        {
          title: "Mehr Views.",
          description: "Starke Hooks und klares Pacing halten Menschen länger im Video.",
        },
        {
          title: "Mehr Likes, Saves & Shares.",
          description: "Relevanter Content gibt deiner Community einen Grund zu reagieren.",
        },
        {
          title: "Mehr Traffic.",
          description: "Klare Botschaften führen vom Feed zu Profil, Angebot oder Website.",
        },
        {
          title: "Mehr Markenwirkung.",
          description: "Ein wiedererkennbarer Look baut über einzelne Posts hinaus Vertrauen auf.",
        },
      ],
    },
    services: {
      title: "Vom ersten Frame bis zum finalen Gefühl.",
      items: [
        {
          title: "Video Production",
          text: "Konzept, Kamera und Regie für Social-First-Produktionen.",
        },
        {
          title: "Short-Form Editing",
          text: "Schnelle, fokussierte Edits für Reels, Shorts und TikTok.",
        },
        {
          title: "YouTube Editing",
          text: "Strukturierte Long-Form-Edits, die die Geschichte in Bewegung halten.",
        },
        {
          title: "Motion & Finishing",
          text: "Motion Design, Color und Sound für ein vollständiges visuelles und akustisches Finish.",
        },
      ],
    },
    audiences: [
      {
        title: "Für Creator",
        statement: "Dein Footage wird zu Content, den Menschen weitersehen.",
        linkLabel: "Gemeinsam produzieren",
      },
      {
        title: "Für Marken",
        statement: "Professioneller Social Content, der menschlich bleibt.",
        linkLabel: "Projekt starten",
      },
    ],
    process: {
      title: "Von der Idee zum fertigen Content.",
      intro: "Ein klarer Ablauf, direkte Abstimmung und keine unnötigen Schleifen.",
      steps: [
        {
          title: "Richtung",
          description: "Ziele, Plattformen und visuelle Richtung werden gemeinsam definiert.",
        },
        {
          title: "Produktion",
          description: "Story, Editing, Motion, Sound und Color werden präzise zusammengesetzt.",
        },
        {
          title: "Auslieferung",
          description: "Nach fokussiertem Feedback entstehen finale Masters für alle relevanten Formate.",
        },
      ],
    },
    proof: {
      title: "Vertrauen wächst mit jedem Projekt.",
    },
    contact: {
      title: "Got footage? Let’s give it feeling.",
    },
  },
};
