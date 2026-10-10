import { Metadata } from "next";
import { HomePageClient } from "@/components/home/HomePageClient";
import { JsonLd } from "@/components/seo/StructuredData";
import { getContent } from "@/lib/cms/content/store";
import { pageMetadata, siteUrl } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/", (await getContent("home")).seo);
}

export default async function HomePage() {
  const [content, company, seo] = await Promise.all([getContent("home"), getContent("site/company"), getContent("site/seo")]);
  const SITE = siteUrl(seo);

  /** Home-page structured data, built from the same CMS content the page renders. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        url: `${SITE}/`,
        name: content.seo.title,
        description: content.seo.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE}/#business`,
        name: company.name,
        url: `${SITE}/`,
        image: `${SITE}/brand/dodail-full-logo.png`,
        telephone: company.phone,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: company.city,
          addressRegion: company.region,
          postalCode: company.postalCode,
          addressCountry: "IN",
        },
        areaServed: "Worldwide",
        parentOrganization: { "@id": `${SITE}/#organization` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${company.shortName} services`,
          itemListElement: content.services.items.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.desc,
              url: `${SITE}${s.href}`,
              provider: { "@id": `${SITE}/#organization` },
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        mainEntity: content.faq.items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomePageClient content={content} company={company} />
    </>
  );
}
