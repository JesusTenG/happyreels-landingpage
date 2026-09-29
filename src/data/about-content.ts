import type { Locale } from "@/i18n/config";

export const aboutContent = {
  de: {
    title: "Über HappyReels",
    lead: "HappyReels verbindet filmisches Handwerk mit dem Tempo von Social Media.",
    founderTitle: "Simon Saad",
    founderBody: "Simon ist der Gründer von HappyReels und dein Ansprechpartner. Er begleitet unsere Projekte von der ersten Idee über den Dreh bis zur Postproduktion. So bleiben Bildsprache, Schnitt und Auslieferung in einem abgestimmten Ablauf.",
    instagramLabel: "Simon Saad auf Instagram (öffnet in einem neuen Tab)",
    philosophyTitle: "Inhalt gibt die Richtung vor",
    philosophyBody: "Jeder Cut, jede Farbe und jeder Sound braucht einen Grund. So entsteht Content mit Gefühl, Rhythmus und klarer Richtung.",
    storyTitle: "Content, der zu dir passt.",
    storyParagraphs: [
      "Seit 2026 produzieren wir bei HappyReels Content für Creator, Influencer, Streamer und Marken. Ob Social-Media-Clips, YouTube-Videos oder eine größere Produktion: Wir erzählen Geschichten, die zur Person oder Marke dahinter passen.",
      "Wir denken Idee, Dreh und Schnitt zusammen. Dabei hören wir zu, bringen eigene Ideen ein und entwickeln mit dir einen Look und ein Format, das sich nach dir anfühlt. Vom ersten Gespräch bis zum fertigen Video bleiben wir im Austausch.",
      "Mit HappyReels wollen wir weiter wachsen. Unsere Vision ist ein kreatives Team, das unterschiedliche Perspektiven zusammenbringt und gemeinsam mit dir neue Ideen umsetzt.",
    ],
    imageAlt: ["Filmaufnahme bei einer Fitness Produktion", "Videoschnitt in der Postproduktion"],
    ctaTitle: "Lernen wir uns kennen",
    cta: "Projekt starten",
  },
  en: {
    title: "About HappyReels",
    lead: "HappyReels connects cinematic craft with the pace of social media.",
    founderTitle: "Simon Saad",
    founderBody: "Simon is the founder of HappyReels and your point of contact. He guides our projects from the first idea and filming through postproduction. Visual direction, editing and delivery stay connected throughout the process.",
    instagramLabel: "Simon Saad on Instagram (opens in a new tab)",
    philosophyTitle: "Content sets the direction",
    philosophyBody: "Every cut, color and sound needs a reason. The result is content with feeling, rhythm and clear direction.",
    storyTitle: "Content that feels like you.",
    storyParagraphs: [
      "Founded in 2026, HappyReels creates content for creators, influencers, streamers and brands. From social clips and YouTube videos to larger productions, we tell stories that reflect the person or brand behind them.",
      "We approach concept, filming and editing as one process. We listen, share ideas and work with you to find a look and format that feel right for you. From the first conversation to the finished video, we stay in touch.",
      "We want HappyReels to keep growing. Our vision is to build a creative team that brings different perspectives together and develops new ideas with you.",
    ],
    imageAlt: ["Filming during a fitness production", "Video editing in postproduction"],
    ctaTitle: "Let's meet",
    cta: "Start a project",
  },
} as const satisfies Record<Locale, object>;
