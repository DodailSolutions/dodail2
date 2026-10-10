import type { MetadataRoute } from "next";
import { getContent } from "@/lib/cms/content/store";

/** Web app manifest: lets phones and tablets install the site as a standalone app. Edited under "SEO & app settings". */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const [seo, navigation] = await Promise.all([getContent("site/seo"), getContent("site/navigation")]);
  return {
    id: "/",
    name: seo.app.name,
    short_name: seo.app.shortName,
    description: seo.description,
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    orientation: "portrait-primary",
    background_color: seo.app.backgroundColor,
    theme_color: seo.app.themeColor,
    categories: ["business", "productivity"],
    lang: seo.locale.replace("_", "-"),
    icons: [
      { src: "/brand/dodail-logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: navigation.cta.label, url: navigation.cta.href },
      ...navigation.mobileBar.tabs
        .filter((t) => t.label && t.href !== "/")
        .map((t) => ({ name: t.label, url: t.href })),
    ],
  };
}
