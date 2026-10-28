/**
 * Route registry: every public page of the new dodail.com with its H1, title, meta
 * description and breadcrumb parent. Metadata, breadcrumbs, XML sitemaps, llms.txt and
 * the HTML sitemap all read from here, so a page is described in exactly one place.
 */
import { coreRoutes } from "./core";
import { industryRoutes } from "./industries";
import { serviceRoutes } from "./services";
import type { RouteEntry, SitemapGroup } from "./types";

export type { RouteEntry, SitemapGroup } from "./types";

export const ROUTES: RouteEntry[] = [...coreRoutes, ...serviceRoutes, ...industryRoutes];

const byPath = new Map(ROUTES.map((r) => [r.path, r]));

/** "/about" → "/about/"; leaves "/", files ("/llms.txt") and absolute URLs alone. */
export function normalizePath(path: string): string {
  if (/^[a-z]+:/i.test(path)) return path;
  const [pathname, rest = ""] = path.split(/(?=[?#])/);
  if (pathname === "/" || pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname)) return pathname + rest;
  return `${pathname}/${rest}`;
}

export function getRoute(path: string): RouteEntry | undefined {
  return byPath.get(normalizePath(path));
}

/** Like getRoute, but throws at build time if a page asks for a path the registry doesn't know. */
export function requireRoute(path: string): RouteEntry {
  const route = getRoute(path);
  if (!route) throw new Error(`Route ${path} is missing from src/content/routes`);
  return route;
}

/** Default `seo` block for CMS documents, so the CMS starts from the registry's title and description. */
export function routeSeo(path: string): { title: string; description: string } {
  const { title, description } = requireRoute(path);
  return { title, description };
}

/** Breadcrumb trail from the first level down to the page itself (Home is added by the renderer). */
export function breadcrumbTrail(path: string): Array<{ name: string; path: string }> {
  const trail: Array<{ name: string; path: string }> = [];
  let route = getRoute(path);
  while (route && route.path !== "/") {
    trail.unshift({ name: route.name, path: route.path });
    route = route.parent ? getRoute(route.parent) : undefined;
  }
  return trail;
}

export function childRoutes(path: string, { builtOnly = true } = {}): RouteEntry[] {
  const parent = normalizePath(path);
  return ROUTES.filter((r) => r.parent === parent && (!builtOnly || r.built));
}

export function routesInSitemap(group: SitemapGroup): RouteEntry[] {
  return ROUTES.filter((r) => r.sitemap === group && r.built);
}
