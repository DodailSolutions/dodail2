/**
 * schema.org JSON-LD builders. Every value comes from CMS content (Company details,
 * SEO settings and the page itself) so structured data always matches what renders.
 */
import type { CompanyContent, SeoContent } from "@/lib/cms/content/defaults/site";
import { absoluteUrl, siteUrl } from "./metadata";

type Json = Record<string, unknown>;

const orgId = (seo: SeoContent) => `${siteUrl(seo)}/#organization`;
const websiteId = (seo: SeoContent) => `${siteUrl(seo)}/#website`;

export function organizationSchema(company: CompanyContent, seo: SeoContent): Json {
  return {
    "@type": "Organization",
    "@id": orgId(seo),
    name: company.name,
    legalName: company.name,
    alternateName: company.shortName,
    url: siteUrl(seo),
    logo: absoluteUrl(seo, "/brand/dodail-full-logo.png"),
    ...(company.founder && { founder: { "@type": "Person", name: company.founder } }),
    ...(company.founded && { foundingDate: company.founded }),
    address: {
      "@type": "PostalAddress",
      addressLocality: company.city,
      addressRegion: company.region,
      postalCode: company.postalCode,
      addressCountry: company.country === "India" ? "IN" : company.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone,
      email: company.email,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Telugu"],
    },
    sameAs: Object.values(company.social).filter(Boolean),
  };
}

export function websiteSchema(seo: SeoContent): Json {
  return {
    "@type": "WebSite",
    "@id": websiteId(seo),
    name: seo.siteName,
    url: siteUrl(seo),
    inLanguage: seo.locale.replace("_", "-"),
    publisher: { "@id": orgId(seo) },
  };
}

export function breadcrumbSchema(seo: SeoContent, items: Array<{ name: string; path: string }>): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(seo, item.path),
    })),
  };
}

export function webPageSchema(seo: SeoContent, path: string, page: { title: string; description: string }): Json {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(seo, path)}#webpage`,
    url: absoluteUrl(seo, path),
    name: page.title,
    description: page.description,
    isPartOf: { "@id": websiteId(seo) },
    about: { "@id": orgId(seo) },
  };
}

export function serviceSchema(seo: SeoContent, path: string, page: { title: string; description: string }): Json {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(seo, path)}#service`,
    name: page.title,
    description: page.description,
    url: absoluteUrl(seo, path),
    provider: { "@id": orgId(seo) },
    areaServed: ["IN", "US", "GB", "AE"].map((c) => ({ "@type": "Country", name: c })),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>): Json | null {
  if (items.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

export function articleSchema(
  seo: SeoContent,
  path: string,
  post: { title: string; description: string; image?: string; author?: string; published?: string; modified?: string }
): Json {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(seo, path)}#article`,
    mainEntityOfPage: absoluteUrl(seo, path),
    headline: post.title,
    description: post.description,
    image: absoluteUrl(seo, post.image || "/brand/dodail-full-logo.png"),
    author: post.author ? { "@type": "Person", name: post.author } : { "@id": orgId(seo) },
    publisher: { "@id": orgId(seo) },
    ...(post.published && { datePublished: post.published }),
    ...(post.modified && { dateModified: post.modified }),
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: Array<Json | null | undefined>): Json {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
