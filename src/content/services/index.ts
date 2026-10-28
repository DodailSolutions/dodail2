import type { ServicePageContent } from "../types";

/**
 * Copy for the service pillars and sub-services, keyed by registry path (src/content/routes).
 * Phase 3 and 4 add one file per page and list it here.
 */
const entries: ServicePageContent[] = [];

export const serviceContent: ReadonlyMap<string, ServicePageContent> = new Map(entries.map((c) => [c.path, c]));
