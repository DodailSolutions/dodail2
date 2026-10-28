export type SitemapGroup = "pages" | "services" | "industries" | "work" | "blog";

/** One public page of the new information architecture (brief §4–§5). */
export interface RouteEntry {
  /** Canonical path with trailing slash, e.g. "/services/seo/local-seo/". */
  path: string;
  /** Short label for breadcrumbs, menus and the HTML sitemap. */
  name: string;
  /** <title>, ≤ 60 characters, used as-is (no automatic brand suffix). */
  title: string;
  /** Meta description, 140–155 characters. */
  description: string;
  /** The page's single H1. */
  h1: string;
  keywords?: { primary: string; secondary?: string[] };
  /** Parent path for breadcrumbs; omitted for top-level pages (parent = Home). */
  parent?: string;
  sitemap: SitemapGroup;
  /**
   * True once the page is built. Only built routes go into the XML sitemaps,
   * llms.txt and the HTML sitemap, so they never list a 404.
   */
  built: boolean;
  /** Set when the page itself waits on a [[CONFIRM]] (e.g. mobile app development). */
  confirm?: string;
}
