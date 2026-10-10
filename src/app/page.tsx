import { Metadata } from "next";
import { HomePageClient } from "@/components/home/HomePageClient";
import { company, faqs, services } from "@/components/home/homeData";

const SITE = company.url;
const TITLE = "AI Automation & Software Development in Hyderabad | Dodail";
const DESCRIPTION =
  "Dodail connects your business tools and automates repetitive work: AI automation, custom software, websites, e-commerce, SEO and branding. Hyderabad, India.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: company.shortName,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/** Home-page structured data, built from the same data the page renders. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: TITLE,
      description: DESCRIPTION,
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
        postalCode: "500081",
        addressCountry: "IN",
      },
      areaServed: "Worldwide",
      parentOrganization: { "@id": `${SITE}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dodail Solutions services",
        itemListElement: services.map((s) => ({
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
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so content can never close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HomePageClient />
    </>
  );
}
