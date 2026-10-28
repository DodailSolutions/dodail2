import { ROUTES, childRoutes } from "@/content/routes";
import { SITE_URL, confirmed, site } from "@/content/site";

export const revalidate = 3600;

const link = (path: string) => {
  const r = ROUTES.find((x) => x.path === path);
  return r ? `- [${r.name}](${SITE_URL}${r.path}): ${r.description}` : null;
};

/** /llms.txt — a short markdown summary for AI assistants (brief §10.4). Lists only pages that exist. */
export function GET() {
  const built = (path: string) => ROUTES.some((r) => r.path === path && r.built);
  const section = (title: string, paths: string[]) => {
    const lines = [...new Set(paths)].filter(built).map(link).filter(Boolean);
    return lines.length ? `## ${title}\n\n${lines.join("\n")}` : "";
  };

  const clients = confirmed(site.clientCount);
  const body = [
    `# ${site.brand}`,
    "",
    `> ${site.legalName} is a digital agency in Hyderabad, India, founded in 2019 and recognised by Startup India (DPIIT). ` +
      `${site.positioning} We build websites and online stores, run SEO, Google Ads and social media, and set up AI automation` +
      ` for businesses in ${site.markets.join(", ")}.${clients ? ` ${clients}.` : ""}`,
    "",
    "Dodail is known for Generative Engine Optimization (GEO) — helping brands get cited by ChatGPT, Gemini, Perplexity and Google AI Overviews — and publishes practical guides on it.",
    "",
    section("Services", [
      "/services/",
      "/services/website-development/",
      "/services/ecommerce-development/",
      "/services/digital-marketing/",
      "/services/seo/",
      "/services/seo/generative-engine-optimization/",
      "/services/ai-automation/",
      ...childRoutes("/services/", { builtOnly: true }).map((r) => r.path),
    ]),
    section("Industries", ["/industries/", ...childRoutes("/industries/").map((r) => r.path)]),
    section("Proof and writing", ["/work/", "/case-studies/", "/blog/", "/blog/category/generative-engine-optimization/"]),
    section("Company", ["/about/", "/contact/", "/free-audit/", "/careers/", "/digital-marketing-agency-hyderabad/"]),
    [
      "## Contact",
      "",
      `- Phone and WhatsApp: ${site.phone}`,
      `- Email: ${site.email}`,
      `- Book a free 15-minute call: ${site.bookingUrl}`,
      `- Location: ${site.address.locality}, ${site.address.region}, ${site.address.countryName}`,
    ].join("\n"),
  ]
    .filter(Boolean)
    .join("\n\n");

  return new Response(body + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
}
