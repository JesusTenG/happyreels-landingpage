import type { Locale } from "@/i18n/config";

export const aboutContent = {
  de: {
    title: "Über HappyReels",
    lead: "HappyReels verbindet filmisches Handwerk mit dem Tempo von Social Media.",
    founderTitle: "Simon Saad",
    founderBody: "Simon führt HappyReels und begleitet Projekte von der Konzeption über den Dreh bis zur Postproduktion. So bleiben Bildsprache, Schnitt und Auslieferung in einem abgestimmten Ablauf.",
    philosophyTitle: "Inhalt gibt die Richtung vor",
    philosophyBody: "Jeder Cut, jede Farbe und jeder Sound braucht einen Grund. So entsteht Content mit Gefühl, Rhythmus und klarer Richtung.",
    imageAlt: ["Filmaufnahme bei einer Fitness Produktion", "Videoschnitt in der Postproduktion"],
    ctaTitle: "Lernen wir uns kennen",
    cta: "Projekt starten",
  },
  en: {
    title: "About HappyReels",
    lead: "HappyReels connects cinematic craft with the pace of social media.",
    founderTitle: "Simon Saad",
    founderBody: "Simon runs HappyReels and guides projects from concept and filming through postproduction. Visual direction, editing and delivery stay connected throughout the process.",
    philosophyTitle: "Content sets the direction",
    philosophyBody: "Every cut, color and sound needs a reason. The result is content with feeling, rhythm and clear direction.",
    imageAlt: ["Filming during a fitness production", "Video editing in postproduction"],
    ctaTitle: "Let's meet",
    cta: "Start a project",
  },
} as const satisfies Record<Locale, object>;
