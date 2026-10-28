/**
 * schema.org JSON-LD builders. Every value comes from CMS content (Company details,
 * SEO settings and the page itself) so structured data always matches what renders.
 */
import type { CompanyContent, SeoContent } from "@/lib/cms/content/defaults/site";
import { breadcrumbTrail } from "@/content/routes";
import { confirmed, site } from "@/content/site";
import { absoluteUrl, siteUrl } from "./metadata";

type Json = Record<string, unknown>;

const orgId = (seo: SeoContent) => `${siteUrl(seo)}/#organization`;
const websiteId = (seo: SeoContent) => `${siteUrl(seo)}/#website`;

/**
 * Sitewide business entity (brief §10.2): one node that is both the Organization and its
 * LocalBusiness (ProfessionalService), shared by every page through its @id. Address lines,
 * hours and the DPIIT credential appear only once confirmed in src/content/site.ts.
 */
export function organizationSchema(company: CompanyContent, seo: SeoContent): Json {
  const a = site.address;
  const opens = confirmed(site.hours.opens);
  const closes = confirmed(site.hours.closes);
  const dpiit = confirmed(site.dpiitNumber);
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId(seo),
    name: company.shortName || site.brand,
    legalName: site.legalName,
    alternateName: [site.brand, site.logoText],
    slogan: site.tagline,
    description: seo.description,
    url: siteUrl(seo),
    logo: absoluteUrl(seo, "/brand/dodail-full-logo.png"),
    image: absoluteUrl(seo, "/brand/dodail-full-logo.png"),
    foundingDate: site.foundingDate,
    telephone: site.phoneE164,
    email: company.email || site.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      ...(confirmed(a.street) && { streetAddress: a.street }),
      addressLocality: a.locality,
      addressRegion: a.region,
      ...(confirmed(a.postalCode) && { postalCode: a.postalCode }),
      addressCountry: a.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.latitude},${site.geo.longitude}`,
    ...(opens &&
      closes && {
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens,
          closes,
        },
      }),
    areaServed: site.areaServed.map((c) => ({ "@type": "Country", name: c })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneE164,
      email: site.email,
      contactType: "customer service",
      areaServed: [...site.areaServed],
      availableLanguage: ["English", "Hindi", "Telugu"],
    },
    ...(dpiit && {
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: site.recognition,
        identifier: dpiit,
        recognizedBy: { "@type": "GovernmentOrganization", name: "Department for Promotion of Industry and Internal Trade (DPIIT)" },
      },
    }),
    sameAs: Object.values(site.social),
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

/** BreadcrumbList for a registry route, built from its parent chain. */
export function routeBreadcrumbSchema(seo: SeoContent, path: string): Json {
  return breadcrumbSchema(seo, breadcrumbTrail(path));
}

export interface SchemaOffer {
  name: string;
  /** Numeric price in INR; only pass confirmed prices (brief §5.4). */
  price: number;
  description?: string;
}

export function serviceSchema(
  seo: SeoContent,
  path: string,
  page: { title: string; description: string; serviceType?: string; offers?: SchemaOffer[] }
): Json {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(seo, path)}#service`,
    name: page.title,
    ...(page.serviceType && { serviceType: page.serviceType }),
    description: page.description,
    url: absoluteUrl(seo, path),
    provider: { "@id": orgId(seo) },
    areaServed: site.areaServed.map((c) => ({ "@type": "Country", name: c })),
    ...(page.offers?.length && {
      offers: page.offers.map((o) => ({
        "@type": "Offer",
        name: o.name,
        price: o.price,
        priceCurrency: "INR",
        ...(o.description && { description: o.description }),
      })),
    }),
  };
}

/** A portfolio project page (brief §6.4). `liveUrl` only when confirmed. */
export function creativeWorkSchema(
  seo: SeoContent,
  path: string,
  work: { name: string; description: string; image?: string; about?: string; liveUrl?: string; year?: number }
): Json {
  return {
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(seo, path)}#work`,
    name: work.name,
    description: work.description,
    url: absoluteUrl(seo, path),
    creator: { "@id": orgId(seo) },
    ...(work.about && { about: work.about }),
    ...(work.image && { image: absoluteUrl(seo, work.image) }),
    ...(work.liveUrl && { sameAs: work.liveUrl }),
    ...(work.year && { dateCreated: String(work.year) }),
  };
}

/** A case study (brief §7): an Article about a client, written and published by Dodail. */
export function caseStudySchema(
  seo: SeoContent,
  path: string,
  study: { title: string; description: string; client: string; image?: string; published?: string; modified?: string }
): Json {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(seo, path)}#article`,
    mainEntityOfPage: absoluteUrl(seo, path),
    headline: study.title,
    description: study.description,
    about: { "@type": "Organization", name: study.client },
    author: { "@id": orgId(seo) },
    publisher: { "@id": orgId(seo) },
    ...(study.image && { image: absoluteUrl(seo, study.image) }),
    ...(study.published && { datePublished: study.published }),
    ...(study.modified && { dateModified: study.modified }),
  };
}

/** AboutPage / ContactPage / CollectionPage wrappers for the matching templates. */
export function typedPageSchema(
  seo: SeoContent,
  type: "AboutPage" | "ContactPage" | "CollectionPage",
  path: string,
  page: { title: string; description: string }
): Json {
  return { ...webPageSchema(seo, path, page), "@type": type };
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
