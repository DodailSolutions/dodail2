import { redirect } from "next/navigation";

/**
 * Global navigation, announcement bar, footer and company details are now
 * edited as Site Content documents (the public header and footer read them).
 */
export default function GlobalSettingsPage() {
  redirect("/admin/cms/content/site/navigation");
}
