import type { IndustryPageContent } from "../types";

/** Copy for the industry pages, keyed by registry path. Filled in Phase 4. */
const entries: IndustryPageContent[] = [];

export const industryContent: ReadonlyMap<string, IndustryPageContent> = new Map(entries.map((c) => [c.path, c]));
