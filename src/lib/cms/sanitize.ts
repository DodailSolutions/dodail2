/**
 * Security & Sanitization Utilities for CMS & Dynamic Blocks
 */

// Allowlisted video embed domains
const ALLOWED_VIDEO_PATTERNS = [
  /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+(\?.*)?$/,
  /^https:\/\/(www\.)?youtube-nocookie\.com\/embed\/[a-zA-Z0-9_-]+(\?.*)?$/,
  /^https:\/\/player\.vimeo\.com\/video\/[0-9]+(\?.*)?$/,
];

export function validateVideoEmbed(url: string): { isValid: boolean; cleanUrl: string; provider: "youtube" | "vimeo" } {
  if (!url) return { isValid: false, cleanUrl: "", provider: "youtube" };

  const trimmed = url.trim();

  for (const pattern of ALLOWED_VIDEO_PATTERNS) {
    if (pattern.test(trimmed)) {
      const provider = trimmed.includes("vimeo") ? "vimeo" : "youtube";
      return { isValid: true, cleanUrl: trimmed, provider };
    }
  }

  // Handle standard youtube watch URLs conversion to embed
  const ytMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return {
      isValid: true,
      cleanUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`,
      provider: "youtube",
    };
  }

  return { isValid: false, cleanUrl: "", provider: "youtube" };
}

export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  // Strip script tags, event handlers, javascript: protocols
  let clean = rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .replace(/on\w+=[^\s>]+/gi, "")
    .replace(/javascript:[^"']*/gi, "#");

  return clean;
}

export function validateSlug(slug: string): { isValid: boolean; normalizedSlug: string } {
  if (!slug) return { isValid: false, normalizedSlug: "" };

  const normalized = slug
    .toLowerCase()
    .trim()
    .replace(/^\/+|\/+$/g, "") // trim slashes
    .replace(/[^a-z0-9\/-]+/g, "-") // replace non-alphanumeric
    .replace(/-+/g, "-"); // collapse hyphens

  const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(normalized);

  return { isValid, normalizedSlug: normalized };
}
