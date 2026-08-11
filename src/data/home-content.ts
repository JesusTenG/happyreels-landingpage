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
  titleEnd: string;
  items: readonly [Outcome, Outcome, Outcome, Outcome];
}>;

export type HomeContent = Readonly<{
  hero: { primaryCta: string };
  work: {
    titleLineOne: string;
    titleLineTwoLead: string;
    titleAccent: string;
    titleLineTwoEnd: string;
    cta: string;
  };
  outcomes: OutcomesContent;
  services: {
    title: {
      lineOne: string;
      lineTwoLead: string;
      lineTwoAccent: string;
      lineThreeLead: string;
      lineThreeAccent: string;
      lineThreeEnd: string;
    };
    items: readonly [Service, Service, Service, Service];
  };
  audiences: readonly [Audience, Audience];
  process: {
    title: string;
    highlight: string;
    steps: readonly ProcessStep[];
  };
  proof: { title: string; highlight: string };
  contact: {
    titleLineOne: string;
    titleLineTwo: string;
    titleAccent: string;
  };
}>;

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    hero: {
      primaryCta: "View projects",
    },
    work: {
      titleLineOne: "Content that turns seconds",
      titleLineTwoLead: "into real",
      titleAccent: "attention",
      titleLineTwoEnd: ".",
      cta: "View all projects",
    },
    outcomes: {
      title: "Visibility that delivers",
      titleAccent: "results",
      titleEnd: ".",
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
      title: {
        lineOne: "Production, editing and finish.",
        lineTwoLead: "Everything that turns ",
        lineTwoAccent: "footage",
        lineThreeLead: "into real ",
        lineThreeAccent: "impact",
        lineThreeEnd: ".",
      },
      items: [
        {
          title: "Video Production",
          text: "Professional shoots with concept, camera and direction—for social-first videos, campaigns and strong brand identities.",
        },
        {
          title: "Short-Form Editing",
          text: "Precise edits with strong hooks, clear rhythm and the right pace for Reels, Shorts and TikTok.",
        },
        {
          title: "YouTube & Long-Form",
          text: "Clearly structured edits for YouTube, podcasts and longer storytelling formats.",
        },
        {
          title: "Motion & Finishing",
          text: "Motion design, color grading and sound design for a coherent, high-quality overall result.",
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
      title: "From the first idea through production and finishing to the final upload.",
      highlight: "production and finishing",
      steps: [
        {
          title: "Briefing & Direction",
          description: "We define the goal, audience, platforms and visual language so the concept and format are clearly aligned from the start.",
        },
        {
          title: "Production & Post",
          description: "Footage, story, editing, motion design, sound and color grading are combined into one consistent, platform-ready result.",
        },
        {
          title: "Feedback & Upload",
          description: "After focused feedback, every final file is exported, optimized for the agreed formats and delivered ready to upload.",
        },
      ],
    },
    proof: {
      title: "Faces and voices that share stories from projects we created together.",
      highlight: "stories from projects",
    },
    contact: {
      titleLineOne: "Got an idea?",
      titleLineTwo: "Let’s turn it into a",
      titleAccent: "plan together.",
    },
  },
  de: {
    hero: {
      primaryCta: "Projekte ansehen",
    },
    work: {
      titleLineOne: "Content, der aus Sekunden",
      titleLineTwoLead: "echte",
      titleAccent: "Aufmerksamkeit",
      titleLineTwoEnd: " macht.",
      cta: "Alle Projekte ansehen",
    },
    outcomes: {
      title: "Sichtbarkeit, die",
      titleAccent: "Ergebnisse",
      titleEnd: " bringt.",
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
          title: "Mehr Identität.",
          description: "Ein wiedererkennbarer Look baut über einzelne Posts hinaus Vertrauen auf.",
        },
      ],
    },
    services: {
      title: {
        lineOne: "Dreh, Schnitt und Finish.",
        lineTwoLead: "Alles, was aus ",
        lineTwoAccent: "Footage",
        lineThreeLead: "echte ",
        lineThreeAccent: "Wirkung",
        lineThreeEnd: " macht.",
      },
      items: [
        {
          title: "Video Production",
          text: "Professionelle Drehs mit Konzept, Kamera und Regie – für Social-first Videos, Kampagnen und starke Markenauftritte.",
        },
        {
          title: "Short-Form Editing",
          text: "Präzise Edits mit starken Hooks, klarem Rhythmus und dem richtigen Tempo für Reels, Shorts und TikTok.",
        },
        {
          title: "YouTube & Long-Form",
          text: "Klar strukturierte Edits für YouTube, Podcasts und längere Storytelling-Formate.",
        },
        {
          title: "Motion & Finishing",
          text: "Motion Design, Color Grading und Sound Design für ein stimmiges, hochwertiges Gesamtbild.",
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
      title: "Von der ersten Idee über Produktion und Feinschliff bis zum fertigen Upload.",
      highlight: "Produktion und Feinschliff",
      steps: [
        {
          title: "Briefing & Richtung",
          description: "Wir klären Ziel, Zielgruppe, Plattformen und visuelle Sprache, damit Konzept und Format von Anfang an klar ausgerichtet sind.",
        },
        {
          title: "Produktion & Post",
          description: "Footage, Story, Schnitt, Motion Design, Sound und Color Grading werden zu einem konsistenten, plattformgerechten Gesamtbild verbunden.",
        },
        {
          title: "Feedback & Upload",
          description: "Nach fokussiertem Feedback werden alle finalen Dateien exportiert, für die vereinbarten Formate optimiert und uploadbereit übergeben.",
        },
      ],
    },
    proof: {
      title: "Gesichter und Stimmen, die von gemeinsamen Projekten erzählen.",
      highlight: "gemeinsamen Projekten",
    },
    contact: {
      titleLineOne: "Du hast eine Idee?",
      titleLineTwo: "Lass uns daraus einen",
      titleAccent: "Plan machen.",
    },
  },
};
