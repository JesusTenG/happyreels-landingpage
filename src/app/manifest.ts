import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HappyReels",
    short_name: "happyreels",
    description:
      "Social-first Videoproduktion für Creator und Marken.",
    start_url: "/de",
    display: "standalone",
    background_color: "#f8ebe7",
    theme_color: "#f4b23e",
    icons: [
      {
        src: "/assets/logo/happyreels-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
