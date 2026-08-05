import type { Locale } from "@/i18n/config";

export const aboutContent = {
  de: {
    title: "Wo Filmgefühl auf Feed-Dynamik trifft.",
    lead: "HappyReels verbindet filmisches Handwerk mit dem Tempo von Social Media.",
    founderTitle: "Aus einer Vision wurde HappyReels.",
    founderBody: "Simon hat HappyReels aufgebaut, um starke Bilder nicht nur schön, sondern im richtigen Format wirksam zu machen. Produktion und Postproduktion bleiben dabei nah beieinander.",
    philosophyTitle: "Jede Entscheidung braucht einen Grund.",
    philosophyBody: "Jeder Cut, jede Farbe und jeder Sound braucht einen Grund. So entsteht Content mit Gefühl, Rhythmus und klarer Richtung.",
    imageAlt: ["Filmaufnahme bei einer Fitness Produktion", "Videoschnitt in der Postproduktion"],
    ctaTitle: "Lass uns Bilder schaffen, die nachwirken.",
    cta: "Projekt starten",
  },
  en: {
    title: "Where cinematic feeling meets feed momentum.",
    lead: "HappyReels connects cinematic craft with the pace of social media.",
    founderTitle: "One vision became HappyReels.",
    founderBody: "Simon built HappyReels to make strong images work in the right format, not just look good. Production and postproduction stay closely connected.",
    philosophyTitle: "Every decision needs a reason.",
    philosophyBody: "Every cut, color and sound needs a reason. The result is content with feeling, rhythm and clear direction.",
    imageAlt: ["Filming during a fitness production", "Video editing in postproduction"],
    ctaTitle: "Let’s create images that keep resonating.",
    cta: "Start a project",
  },
} as const satisfies Record<Locale, object>;
