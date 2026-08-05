import type { Locale } from "@/i18n/config";
import type { ServiceKey } from "@/lib/route-config";

type ServiceProcessStep = Readonly<{
  title: string;
  text: string;
}>;

export type ServiceLandingContent = Readonly<{
  navTitle: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  overviewTitle: string;
  overviewBody: string;
  useCasesTitle: string;
  useCases: readonly string[];
  formatsTitle: string;
  formats: readonly string[];
  approachTitle: string;
  approachBody: string;
  processTitle: string;
  processIntro: string;
  processSteps: readonly ServiceProcessStep[];
  relatedTitle: string;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
  homeLabel: string;
}>;

type ServiceDefinition = Readonly<{
  key: ServiceKey;
  localized: Record<Locale, ServiceLandingContent>;
}>;

export const serviceKeys: readonly ServiceKey[] = [
  "videoProduction",
  "shortFormEditing",
  "youtubeEditing",
  "motionFinishing",
];

export const serviceDefinitions: Record<ServiceKey, ServiceDefinition> = {
  videoProduction: {
    key: "videoProduction",
    localized: {
      de: {
        navTitle: "Video-Produktion",
        seoTitle: "Videoproduktion für Social Media",
        metaDescription:
          "Social-first Videoproduktion von HappyReels: Konzept, Planung, Dreh und Postproduktion für Creator, Markencontent und Werbevideos.",
        eyebrow: "Konzept · Dreh · Postproduktion",
        h1: "Von der Idee zum Film, der für Social geboren ist.",
        lead:
          "HappyReels entwickelt und produziert Videos, die filmisch gedacht und von Beginn an für ihren digitalen Einsatz geplant sind.",
        overviewTitle: "Jede starke Produktion beginnt mit Richtung.",
        overviewBody:
          "Von der ersten Idee bis zum fertigen Master bleiben Konzept, Bildsprache, Plattform und Format miteinander verbunden. So entstehen Werbevideos, Creator Content und Markenfilme, die nicht nachträglich auf Social Media zugeschnitten werden müssen, sondern bereits beim Dreh dafür gedacht sind.",
        useCasesTitle: "Wo Produktion Wirkung entfaltet",
        useCases: [
          "Social-first Werbevideos",
          "Creator- und Personal-Brand-Content",
          "Produkteinführungen und digitale Kampagnen",
          "Markencontent für wiederkehrende Veröffentlichungen",
        ],
        formatsTitle: "Formate für jeden Touchpoint",
        formats: ["Instagram Reels", "TikTok", "YouTube Shorts", "Commercials", "Brand Films"],
        approachTitle: "Filmisch denken. Plattformgerecht produzieren.",
        approachBody:
          "Jede Produktion beginnt mit dem Zweck des Videos: Wer soll es sehen, wo wird es ausgespielt und welches Gefühl soll bleiben? Daraus entstehen Konzept, Shotlist, visuelle Richtung und ein Dreh, der der späteren Montage das richtige Material liefert.",
        processTitle: "Vom ersten Gedanken zum finalen Master.",
        processIntro: "Ein kompakter Ablauf hält kreative Entscheidungen und Produktion eng zusammen.",
        processSteps: [
          { title: "Richtung schärfen", text: "Ziel, Zielgruppe, Plattform und Tonalität werden gemeinsam geklärt." },
          { title: "Produktion planen", text: "Konzept, Ablauf, Motive und benötigte Assets werden vorbereitet." },
          { title: "Bilder drehen", text: "Kamera, Regie und Bildgestaltung folgen der geplanten Social-First-Idee." },
          { title: "Finish vollenden", text: "Schnitt, Farbe, Sound und Exporte werden für die vorgesehenen Formate fertiggestellt." },
        ],
        relatedTitle: "Mehr Möglichkeiten für deinen Content.",
        ctaTitle: "Lass uns den nächsten Film richtig beginnen.",
        ctaBody: "Beschreibe kurz das geplante Video und die Plattformen, auf denen es erscheinen soll.",
        ctaLabel: "Projekt anfragen",
        homeLabel: "Zur Startseite",
      },
      en: {
        navTitle: "Video production",
        seoTitle: "Social media video production",
        metaDescription:
          "Social-first video production by HappyReels: concept, planning, filming and postproduction for creators, brand content and commercials.",
        eyebrow: "Concept · shoot · postproduction",
        h1: "From first idea to a film built for social.",
        lead:
          "HappyReels develops and produces films that are cinematic in their thinking and planned for digital use from the start.",
        overviewTitle: "Every strong production starts with direction.",
        overviewBody:
          "From the first idea to the final master, the concept, visual language, platform and format stay connected. The result is commercial, creator and brand content designed for social delivery rather than adapted as an afterthought.",
        useCasesTitle: "Where production creates impact",
        useCases: [
          "Social-first commercials",
          "Creator and personal brand content",
          "Product launches and digital campaigns",
          "Brand content for recurring releases",
        ],
        formatsTitle: "Formats for every touchpoint",
        formats: ["Instagram Reels", "TikTok", "YouTube Shorts", "Commercials", "Brand films"],
        approachTitle: "Think cinematic. Produce platform-first.",
        approachBody:
          "Every production starts with the purpose of the film: who should see it, where will it live and what should it feel like? That direction shapes the concept, shot list, visual treatment and a shoot that gives the edit the right material.",
        processTitle: "From first thought to final master.",
        processIntro: "A focused workflow keeps creative decisions and production closely connected.",
        processSteps: [
          { title: "Define direction", text: "The audience, platform, goal and tone are defined together." },
          { title: "Plan production", text: "The concept, schedule, shots and required assets are prepared." },
          { title: "Capture the story", text: "Camera, direction and composition follow the social-first idea." },
          { title: "Complete the finish", text: "Editing, color, sound and exports are completed for the intended formats." },
        ],
        relatedTitle: "More ways to shape your content.",
        ctaTitle: "Let’s start your next film the right way.",
        ctaBody: "Tell us briefly what you want to film and where the content needs to live.",
        ctaLabel: "Start a project",
        homeLabel: "Back to home",
      },
    },
  },
  shortFormEditing: {
    key: "shortFormEditing",
    localized: {
      de: {
        navTitle: "Short-Form Editing",
        seoTitle: "Short-Form Editing für Reels, TikTok und Shorts",
        metaDescription:
          "Short-Form Editing für Instagram Reels, TikTok und YouTube Shorts – mit klarem Pacing, Sound Design, Untertiteln, Motion Graphics und Color Grading.",
        eyebrow: "Reels · TikTok · YouTube Shorts",
        h1: "Short-Form Editing, das Tempo in Wirkung verwandelt.",
        lead:
          "Aus vorhandenem oder neu produziertem Material entstehen kompakte Social Videos, die schnell verständlich sind und visuell zusammengehören.",
        overviewTitle: "Jeder Cut braucht einen Grund.",
        overviewBody:
          "Short-Form lebt nicht allein von Geschwindigkeit. Ein guter Edit setzt einen klaren Einstieg, führt Informationen verständlich und nutzt Bild, Sprache und Sound bewusst. HappyReels verbindet Story-Struktur mit plattformgerechtem Pacing und einem Finish, das wiedererkennbar bleibt.",
        useCasesTitle: "Wo Short-Form am stärksten wirkt",
        useCases: [
          "Creator Reels und Personal-Brand-Content",
          "Social Ads und Produktkommunikation",
          "Educational Content und Talking-Head-Formate",
          "Clips aus Podcasts und Long-Form-Inhalten",
        ],
        formatsTitle: "Alles für einen vollständigen Edit",
        formats: ["Story Edit", "Untertitel", "Sound Design", "Motion Graphics", "Color Grading"],
        approachTitle: "Schnell im Feed. Präzise im Schnitt.",
        approachBody:
          "Material, Aussage und Plattform bestimmen die Editing-Sprache. Hooks werden nicht isoliert behandelt, sondern als Teil einer verständlichen Dramaturgie. Typografie, Übergänge, Musik und Farbe unterstützen den Inhalt, ohne ihn zu überdecken.",
        processTitle: "Vom Rohmaterial zum Reel mit Sog.",
        processIntro: "Der Ablauf bleibt transparent und auf das jeweilige Format zugeschnitten.",
        processSteps: [
          { title: "Material verdichten", text: "Starke Aussagen, Bilder und mögliche Story-Linien werden ausgewählt." },
          { title: "Dramaturgie formen", text: "Einstieg, Informationsfluss und Schluss werden zu einem klaren Ablauf geformt." },
          { title: "Look verfeinern", text: "Untertitel, Motion Graphics, Sound Design und Color Grading ergänzen den Schnitt." },
          { title: "Formatgerecht ausspielen", text: "Die fertigen Dateien werden passend für die vereinbarten Plattformen exportiert." },
        ],
        relatedTitle: "Mehr Möglichkeiten für deinen Content.",
        ctaTitle: "Lass uns aus deinem Material Momentum bauen.",
        ctaBody: "Sende eine kurze Einordnung zu Material, Zielgruppe und gewünschten Plattformen.",
        ctaLabel: "Editing anfragen",
        homeLabel: "Zur Startseite",
      },
      en: {
        navTitle: "Short-form editing",
        seoTitle: "Short-form editing for Reels, TikTok and Shorts",
        metaDescription:
          "Short-form editing for Instagram Reels, TikTok and YouTube Shorts with clear pacing, sound design, captions, motion graphics and color grading.",
        eyebrow: "Reels · TikTok · YouTube Shorts",
        h1: "Short-form editing that turns pace into impact.",
        lead:
          "Existing or newly produced footage becomes concise social video that communicates quickly and feels visually connected.",
        overviewTitle: "Every cut needs a reason.",
        overviewBody:
          "Short-form is not only about speed. A considered edit establishes a clear opening, guides information and uses image, language and sound with purpose. HappyReels combines story structure with platform-native pacing and a finish that remains recognisable.",
        useCasesTitle: "Where short-form works hardest",
        useCases: [
          "Creator reels and personal brand content",
          "Social ads and product communication",
          "Educational and talking-head content",
          "Clips derived from podcasts and long-form content",
        ],
        formatsTitle: "Everything a complete edit needs",
        formats: ["Story edit", "Captions", "Sound design", "Motion graphics", "Color grading"],
        approachTitle: "Fast in the feed. Precise in the edit.",
        approachBody:
          "The footage, message and platform determine the editing language. Hooks are treated as part of a complete, understandable narrative. Typography, transitions, music and color support the idea without distracting from it.",
        processTitle: "From raw footage to a reel with pull.",
        processIntro: "The workflow stays transparent and is shaped around the intended format.",
        processSteps: [
          { title: "Distil the footage", text: "Strong statements, visuals and possible story lines are selected." },
          { title: "Shape the story", text: "The opening, information flow and ending are shaped into a clear sequence." },
          { title: "Refine the look", text: "Captions, motion graphics, sound design and color grading complete the edit." },
          { title: "Deliver every format", text: "Final files are exported for the agreed platforms and formats." },
        ],
        relatedTitle: "More ways to shape your content.",
        ctaTitle: "Let’s turn your footage into momentum.",
        ctaBody: "Share a short note about the footage, audience and platforms you have in mind.",
        ctaLabel: "Request an edit",
        homeLabel: "Back to home",
      },
    },
  },
  youtubeEditing: {
    key: "youtubeEditing",
    localized: {
      de: {
        navTitle: "YouTube Editing",
        seoTitle: "YouTube Editing für Long-Form, Podcasts und Education",
        metaDescription:
          "Strukturiertes YouTube Editing für Long-Form-Videos, Podcasts, Educational Content und Entertainment – inklusive daraus abgeleiteter Short-Form-Clips.",
        eyebrow: "Long-Form · Podcasts · Education",
        h1: "Long-Form Editing, das Länge in Spannung verwandelt.",
        lead:
          "HappyReels formt Gespräche, Wissen und Entertainment zu Long-Form-Videos mit verständlichem Aufbau, Tempo und visueller Kontinuität.",
        overviewTitle: "Struktur gibt starken Inhalten Raum.",
        overviewBody:
          "Längere Videos brauchen Orientierung, ohne ihren natürlichen Charakter zu verlieren. Der Schnitt ordnet Aussagen, verdichtet Wiederholungen und setzt visuelle sowie akustische Akzente dort, wo sie den Inhalt tragen. So entsteht ein flüssiges Ganzes statt einer bloßen Aneinanderreihung von Clips.",
        useCasesTitle: "Wo Long-Form seine Stärke zeigt",
        useCases: [
          "YouTube-Essays und Educational Content",
          "Video-Podcasts und Interviews",
          "Entertainment- und Creator-Formate",
          "Long-Form-Videos mit ergänzenden Social Clips",
        ],
        formatsTitle: "Deliverables mit echter Reichweite",
        formats: ["Long-Form Edit", "Video-Podcast", "YouTube Episode", "Trailer", "Short-Form Cutdowns"],
        approachTitle: "Inhalt zuerst. Tempo mit Gefühl.",
        approachBody:
          "Vor dem Feinschnitt wird die inhaltliche Linie sichtbar gemacht. Kapitel, Spannungsbogen und wichtige Aussagen erhalten eine klare Gewichtung. B-Roll, Grafiken, Musik und Sound werden gezielt eingesetzt, damit das Video lebendig bleibt, ohne unruhig zu werden.",
        processTitle: "Eine klare Linie durch jedes Kapitel.",
        processIntro: "Long-Form wird in nachvollziehbaren Schritten vom Rohschnitt bis zum Master entwickelt.",
        processSteps: [
          { title: "Inhalte ordnen", text: "Aussagen, Kapitel und der gewünschte Spannungsbogen werden herausgearbeitet." },
          { title: "Struktur aufbauen", text: "Das Material erhält eine tragfähige Struktur und ein passendes Grundtempo." },
          { title: "Details verfeinern", text: "B-Roll, Grafiken, Sound, Musik und Farbe werden präzise ergänzt." },
          { title: "Momente weiterdenken", text: "Bei Bedarf werden starke Momente als eigenständige Short-Form-Clips aufbereitet." },
        ],
        relatedTitle: "Mehr Möglichkeiten für deinen Content.",
        ctaTitle: "Lass uns aus langem Material eine Geschichte formen.",
        ctaBody: "Erzähl kurz, welches Format du planst und welches Ausgangsmaterial bereits vorhanden ist.",
        ctaLabel: "YouTube-Projekt anfragen",
        homeLabel: "Zur Startseite",
      },
      en: {
        navTitle: "YouTube editing",
        seoTitle: "YouTube editing for long-form, podcasts and education",
        metaDescription:
          "Structured YouTube editing for long-form video, podcasts, educational content and entertainment, including derived short-form clips.",
        eyebrow: "Long-form · podcasts · education",
        h1: "Long-form editing that turns length into tension.",
        lead:
          "HappyReels shapes conversations, knowledge and entertainment into long-form video with a clear flow, considered pacing and visual continuity.",
        overviewTitle: "Structure gives strong content room to work.",
        overviewBody:
          "Longer videos need orientation without losing their natural character. The edit organises ideas, removes repetition and places visual and sonic accents where they support the content. The result feels like one coherent piece rather than a sequence of disconnected clips.",
        useCasesTitle: "Where long-form shows its strength",
        useCases: [
          "YouTube essays and educational content",
          "Video podcasts and interviews",
          "Entertainment and creator formats",
          "Long-form video with supporting social clips",
        ],
        formatsTitle: "Deliverables built for real reach",
        formats: ["Long-form edit", "Video podcast", "YouTube episode", "Trailer", "Short-form cutdowns"],
        approachTitle: "Content first. Pace with feeling.",
        approachBody:
          "The editorial line is made visible before the fine cut begins. Chapters, narrative progression and key statements receive clear emphasis. B-roll, graphics, music and sound are used with intent so the video stays engaging without becoming restless.",
        processTitle: "A clear line through every chapter.",
        processIntro: "Long-form work moves through focused stages from assembly to final master.",
        processSteps: [
          { title: "Organise the content", text: "The key ideas, chapters and intended narrative progression are identified." },
          { title: "Build the structure", text: "The footage receives a strong structure and an appropriate base pace." },
          { title: "Refine every detail", text: "B-roll, graphics, sound, music and color are added with precision." },
          { title: "Extend key moments", text: "When needed, strong moments are developed into standalone short-form clips." },
        ],
        relatedTitle: "More ways to shape your content.",
        ctaTitle: "Let’s shape long material into a story.",
        ctaBody: "Tell us what format you are planning and what source material is already available.",
        ctaLabel: "Start a YouTube project",
        homeLabel: "Back to home",
      },
    },
  },
  motionFinishing: {
    key: "motionFinishing",
    localized: {
      de: {
        navTitle: "Motion & Finishing",
        seoTitle: "Motion Design und Video Finishing",
        metaDescription:
          "Motion Design, Typografieanimation, Compositing, Sound Design und Color Grading für ein konsistentes, hochwertiges Finish bestehender Videoproduktionen.",
        eyebrow: "Motion · Color · Sound",
        h1: "Motion & Finishing, das jedes Detail zusammenführt.",
        lead:
          "HappyReels verfeinert bestehende Produktionen mit Motion Design, Typografie, Compositing, Sound und Farbe zu einem stimmigen Gesamtbild.",
        overviewTitle: "Wenn jedes Detail dieselbe Sprache spricht.",
        overviewBody:
          "Finishing verbindet einzelne gestalterische Ebenen zu einem konsistenten Film. Bewegte Typografie, grafische Elemente, Übergänge, Farblook und Sound werden nicht als Effekte addiert, sondern auf Inhalt, Marke und Format abgestimmt.",
        useCasesTitle: "Wo Finishing den Unterschied macht",
        useCases: [
          "Finishing bereits geschnittener Videos",
          "Motion-Systeme für wiederkehrende Social Formate",
          "Titel, Bauchbinden und Typografieanimation",
          "Compositing und visuelle Bereinigung",
        ],
        formatsTitle: "Bausteine für ein starkes Finish",
        formats: ["Motion Design", "Typografieanimation", "Compositing", "Sound Design", "Color Grading"],
        approachTitle: "Weniger Effekt. Mehr Wirkung.",
        approachBody:
          "Das bestehende Material gibt die Richtung vor. Zuerst werden Look, technische Basis und gewünschte Konsistenz geprüft. Danach werden nur die gestalterischen Ebenen ergänzt, die Bildaussage, Lesbarkeit und Wiedererkennung tatsächlich unterstützen.",
        processTitle: "Vom bestehenden Edit zum stimmigen Master.",
        processIntro: "Ein gezielter Finishing-Prozess bringt Bild, Grafik und Ton auf denselben Stand.",
        processSteps: [
          { title: "Basis prüfen", text: "Edit, Assets, Markenrichtlinien und technische Anforderungen werden geprüft." },
          { title: "Motion gestalten", text: "Typografie, Grafiken und Bewegungsprinzipien werden aufeinander abgestimmt." },
          { title: "Ebenen verbinden", text: "Color Grading, Compositing und Sound Design verbinden die Ebenen." },
          { title: "Master vollenden", text: "Die finalen Dateien werden kontrolliert und für die benötigten Ausspielwege exportiert." },
        ],
        relatedTitle: "Mehr Möglichkeiten für deinen Content.",
        ctaTitle: "Gib deinem Edit das Finish, das noch fehlt.",
        ctaBody: "Beschreibe den aktuellen Stand des Materials und welche gestalterischen Ebenen noch fehlen.",
        ctaLabel: "Finishing anfragen",
        homeLabel: "Zur Startseite",
      },
      en: {
        navTitle: "Motion & finishing",
        seoTitle: "Motion design and video finishing",
        metaDescription:
          "Motion design, typography animation, compositing, sound design and color grading for a consistent premium finish across existing video productions.",
        eyebrow: "Motion · color · sound",
        h1: "Motion & finishing that brings every detail together.",
        lead:
          "HappyReels refines existing productions with motion design, typography, compositing, sound and color to create one coherent visual result.",
        overviewTitle: "When every detail speaks one language.",
        overviewBody:
          "Finishing connects individual creative layers into a consistent film. Animated typography, graphic elements, transitions, color and sound are not added as isolated effects; they are aligned with the content, brand and intended format.",
        useCasesTitle: "Where finishing makes the difference",
        useCases: [
          "Finishing for already edited video",
          "Motion systems for recurring social formats",
          "Titles, lower thirds and typography animation",
          "Compositing and visual clean-up",
        ],
        formatsTitle: "Building blocks for a stronger finish",
        formats: ["Motion design", "Typography animation", "Compositing", "Sound design", "Color grading"],
        approachTitle: "Less effect. More impact.",
        approachBody:
          "The existing material sets the direction. First, the look, technical base and required consistency are reviewed. Only the layers that genuinely support the image, legibility and recognition are then introduced.",
        processTitle: "From existing edit to cohesive master.",
        processIntro: "A focused finishing process brings image, graphics and sound to the same level.",
        processSteps: [
          { title: "Review the base", text: "The edit, assets, brand guidance and technical requirements are assessed." },
          { title: "Design the motion", text: "Typography, graphics and movement principles are aligned." },
          { title: "Connect the layers", text: "Color grading, compositing and sound design connect the layers." },
          { title: "Complete the master", text: "Final files are checked and exported for the required channels." },
        ],
        relatedTitle: "More ways to shape your content.",
        ctaTitle: "Give your edit the finish it is missing.",
        ctaBody: "Tell us where the material currently stands and which creative layers are still needed.",
        ctaLabel: "Request finishing",
        homeLabel: "Back to home",
      },
    },
  },
};

export function getServiceContent(
  key: ServiceKey,
  locale: Locale,
): ServiceLandingContent {
  return serviceDefinitions[key].localized[locale];
}
