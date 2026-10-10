import type { Metadata } from "next";
import { getContent } from "@/lib/cms/content/store";
import type { SeoContent } from "@/lib/cms/content/defaults/site";

export interface PageSeo {
  title: string;
  description: string;
  /** Added to every CMS page's seo block by the content registry. */
  image?: string;
  noIndex?: boolean;
}

interface PageMetadataOptions {
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

export function siteUrl(seo: Pick<SeoContent, "siteUrl">): string {
  return seo.siteUrl.replace(/\/+$/, "") || "https://www.dodail.com";
}

/** Absolute URL for a site path. */
export function absoluteUrl(seo: Pick<SeoContent, "siteUrl">, path: string): string {
  return path.startsWith("http") ? path : `${siteUrl(seo)}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Brand suffix is added only when the CMS title doesn't already name the brand. */
export function fullTitle(title: string, seo: Pick<SeoContent, "titleSuffix">): string {
  const brand = seo.titleSuffix.trim();
  if (!brand) return title;
  const firstWord = brand.split(/\s+/)[0].toLowerCase();
  return title.toLowerCase().includes(firstWord) ? title : `${title} | ${brand}`;
}

/**
 * Complete per-page metadata: absolute title, description, canonical URL and
 * page-specific Open Graph / Twitter cards (so shared links never show the homepage card).
 */
export async function pageMetadata(path: string, page: PageSeo, options: PageMetadataOptions = {}): Promise<Metadata> {
  const seo = await getContent("site/seo");
  const title = fullTitle(page.title || seo.defaultTitle, seo);
  const description = page.description || seo.description;
  const url = absoluteUrl(seo, path);
  const image = options.image || page.image || seo.shareImage;
  const images = image ? [{ url: absoluteUrl(seo, image), width: 1200, height: 630, alt: title }] : undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: options.type ?? "website",
      url,
      title,
      description,
      siteName: seo.siteName,
      locale: seo.locale,
      ...(images && { images }),
      ...(options.publishedTime && { publishedTime: options.publishedTime }),
      ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
    ...((options.noIndex || page.noIndex) && { robots: { index: false, follow: true } }),
  };
}
