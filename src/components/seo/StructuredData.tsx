import React from "react";

interface StructuredDataProps {
  type: "Organization" | "WebSite" | "Service" | "Article" | "BreadcrumbList" | "FAQPage";
  data?: Record<string, any>;
}

export function StructuredData({ type, data = {} }: StructuredDataProps) {
  let schema: Record<string, any> = {
    "@context": "https://schema.org",
  };

  switch (type) {
    case "Organization":
      schema = {
        ...schema,
        "@type": "Organization",
        name: "Dodail Solutions Private Limited",
        legalName: "Dodail Solutions Private Limited",
        url: "https://www.dodail.com",
        logo: "https://www.dodail.com/brand/dodail-full-logo.png",
        founder: "Raviteja Mathurthi",
        foundingDate: "2019",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500081",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91 99664 00235",
          contactType: "customer service",
          email: "info@dodail.com",
        },
        sameAs: [
          "https://www.linkedin.com/company/dodail/",
          "https://x.com/dodailpvtltd",
          "https://www.facebook.com/DodailSolutionPvtLtd/",
          "https://www.instagram.com/dodail/",
        ],
        ...data,
      };
      break;

    case "WebSite":
      schema = {
        ...schema,
        "@type": "WebSite",
        name: "Dodail Solutions",
        url: "https://www.dodail.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.dodail.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
        ...data,
      };
      break;

    case "Service":
      schema = {
        ...schema,
        "@type": "Service",
        serviceType: data.serviceType || "AI Automation & Software Engineering",
        provider: {
          "@type": "Organization",
          name: "Dodail Solutions Private Limited",
          url: "https://www.dodail.com",
        },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
        ],
        ...data,
      };
      break;

    case "BreadcrumbList":
      schema = {
        ...schema,
        "@type": "BreadcrumbList",
        itemListElement: data.items || [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dodail.com" },
        ],
      };
      break;

    case "FAQPage":
      schema = {
        ...schema,
        "@type": "FAQPage",
        mainEntity: data.faqs?.map((f: any) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })) || [],
      };
      break;

    case "Article":
      schema = {
        ...schema,
        "@type": "Article",
        headline: data.title,
        description: data.excerpt,
        image: data.image || "https://www.dodail.com/brand/dodail-full-logo.png",
        author: {
          "@type": "Organization",
          name: data.author || "Dodail Solutions",
        },
        publisher: {
          "@type": "Organization",
          name: "Dodail Solutions Private Limited",
          logo: {
            "@type": "ImageObject",
            url: "https://www.dodail.com/brand/dodail-emblem.png",
          },
        },
        datePublished: data.publish_date || new Date().toISOString(),
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
