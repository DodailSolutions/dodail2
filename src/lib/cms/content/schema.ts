/**
 * Schema helpers shared by the server (validation, merging stored content over
 * defaults) and the admin editor (field rendering). Pure: no I/O.
 *
 * The defaults object *is* the schema: stored content is accepted only where its
 * shape and primitive types match the defaults, unknown keys are dropped and
 * missing keys fall back to the default, so pages never crash on partial data.
 */
import type { ContentSchema, FieldHint } from "./types";
import { ICON_NAMES } from "./icons";
import { TONES } from "./defaults/landing";
import { isSafeUrl } from "@/lib/utils";

export type PathSegment = string | number;

const MAX_STRING = 10_000;
const MAX_ITEMS = 200;

const TEXTAREA_KEYS = new Set([
  "description", "desc", "subtitle", "body", "answer", "problem", "architecture", "outcome", "fix", "details",
  "lead", "about", "quote", "audience", "paragraphs", "lines",
]);
const URL_KEY = /^(href|link|url|src)$|(Href|Link|Url)$/;

/** Hints that apply to any field with this name, wherever it appears. */
const GLOBAL_HINTS: Record<string, FieldHint> = {
  icon: { kind: "select", options: ICON_NAMES },
  tone: { kind: "select", options: [...TONES, "slate"] },
  badgeTone: { kind: "select", options: ["orange", "teal", "navy", "success", "muted"], label: "Badge colour" },
  highlight: { help: "Part of the title shown in the accent colour. Must match the title text exactly; leave empty for none." },
  seo: { label: "SEO", help: "Search engine title and description for this page." },
};

export function normalizePath(path: PathSegment[]): string {
  return path.map((p) => (typeof p === "number" ? "*" : p)).join(".");
}

function lastKey(path: PathSegment[]): string | undefined {
  for (let i = path.length - 1; i >= 0; i--) if (typeof path[i] === "string") return path[i] as string;
  return undefined;
}



function looksLikeUrlField(path: PathSegment[], defaultValue: unknown): boolean {
  const key = lastKey(path) ?? "";
  if (URL_KEY.test(key)) return true;
  return typeof defaultValue === "string" && /^(https?:\/\/|\/(?!\/))/.test(defaultValue) && !/\s/.test(defaultValue);
}

export function resolveHint(schema: Pick<ContentSchema, "hints">, path: PathSegment[], defaultValue?: unknown): FieldHint {
  const key = lastKey(path) ?? "";
  const specific = schema.hints?.[normalizePath(path)] ?? {};
  const hint: FieldHint = { ...GLOBAL_HINTS[key], ...specific };
  if (!hint.kind && typeof defaultValue === "string") {
    if (looksLikeUrlField(path, defaultValue)) hint.kind = "url";
    else if (TEXTAREA_KEYS.has(key) || defaultValue.length > 90 || defaultValue.includes("\n")) hint.kind = "textarea";
    else hint.kind = "text";
  }
  return hint;
}

export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** A blank copy of a template (empty strings, zero, false, empty arrays). */
export function blankFrom<T>(template: T): T {
  if (typeof template === "string") return "" as T;
  if (typeof template === "number") return 0 as T;
  if (typeof template === "boolean") return false as T;
  if (Array.isArray(template)) return [] as unknown as T;
  if (isPlainObject(template)) {
    return Object.fromEntries(Object.entries(template).map(([k, v]) => [k, blankFrom(v)])) as T;
  }
  return template;
}

/** Template for new items in the array at `path` (defaults' first item, or a registered template). */
export function arrayTemplate(schema: Pick<ContentSchema, "templates">, path: PathSegment[], defaults: unknown[]): unknown {
  const registered = schema.templates?.[normalizePath(path)];
  if (registered !== undefined) return registered;
  return defaults.length > 0 ? defaults[0] : undefined;
}

type SchemaLike = Pick<ContentSchema, "hints" | "templates">;

/**
 * Returns `input` reshaped to match `defaults`: same keys, same primitive types,
 * safe URLs. Anything invalid or missing falls back to the default value.
 */
export function sanitizeContent<T>(defaults: T, input: unknown, schema: SchemaLike = {}, path: PathSegment[] = []): T {
  const hint = path.length ? resolveHint(schema, path, defaults) : {};
  if (hint.hidden) return structuredClone(defaults);

  if (typeof defaults === "string") {
    if (typeof input !== "string") return defaults;
    const value = input.slice(0, MAX_STRING);
    if ((hint.kind === "url" || hint.kind === "image") && !isSafeUrl(value)) return defaults;
    if (hint.kind === "select" && hint.options && !hint.options.includes(value)) return defaults;
    return value as T;
  }
  if (typeof defaults === "number") return (typeof input === "number" && Number.isFinite(input) ? input : defaults) as T;
  if (typeof defaults === "boolean") return (typeof input === "boolean" ? input : defaults) as T;

  if (Array.isArray(defaults)) {
    if (hint.fixedLength) {
      const arr = Array.isArray(input) ? input : [];
      return defaults.map((d, i) => sanitizeContent(d, arr[i], schema, [...path, i])) as T;
    }
    if (!Array.isArray(input)) return structuredClone(defaults);
    const template = arrayTemplate(schema, path, defaults);
    if (template === undefined) return structuredClone(defaults);
    return input
      .slice(0, MAX_ITEMS)
      .map((item, i) => sanitizeContent(i < defaults.length ? defaults[i] : blankFrom(template), item, schema, [...path, i])) as T;
  }

  if (isPlainObject(defaults)) {
    const source = isPlainObject(input) ? input : {};
    const out: Record<string, unknown> = {};
    for (const [key, def] of Object.entries(defaults)) {
      out[key] = sanitizeContent(def, source[key], schema, [...path, key]);
    }
    return out as T;
  }

  return defaults;
}

/** Human label for a field key: "primaryCta" -> "Primary CTA". */
export function humanize(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return spaced
    .split(" ")
    .map((w) => (/^(cta|seo|url|faq|id)$/i.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/** Short title for an array item card, taken from its most descriptive string field. */
export function itemTitle(item: unknown, index: number): string {
  if (typeof item === "string") return item || `Item ${index + 1}`;
  if (isPlainObject(item)) {
    for (const k of ["title", "label", "name", "question", "heading", "value", "headline"]) {
      const v = item[k];
      if (typeof v === "string" && v.trim()) return v;
    }
  }
  return `Item ${index + 1}`;
}

export { fill, isSafeUrl } from "@/lib/utils";
