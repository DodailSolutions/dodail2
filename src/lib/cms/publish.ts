import { revalidatePath } from "next/cache";

/** URL-safe slug: lowercase letters, digits and single hyphens ("My Post!" -> "my-post"). */
export function normalizeSlug(input: unknown): string {
  return String(input ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

/** Refreshes the public blog after an article changes. */
export function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
}

/** Refreshes a custom page after it changes. */
export function revalidateCustomPage(slug?: string) {
  if (slug) revalidatePath(`/${slug}`);
  revalidatePath("/sitemap.xml");
}
