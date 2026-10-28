/**
 * 301 map from every old dodail.com URL (and the renamed pre-launch routes of this build)
 * to its new home (brief §4 and §9.1). One hop only: every target is a final URL.
 * Used by next.config.ts. Paths are written without the trailing slash; with
 * `trailingSlash: true` Next.js matches both forms of the source.
 */
import { LEGACY_BLOG_POSTS } from "./blog-posts";

export interface LegacyRedirect {
  from: string;
  to: string;
}

const PAGES: Array<[string, string]> = [
  // Core
  ["/about-dodail-leading-digital-agency-in-india", "/about/"],
  ["/dodail-mission-vision-designing-growth-driven-brands", "/about/"],
  ["/contact-us", "/contact/"],
  ["/our-works", "/work/"],
  ["/blogs", "/blog/"],
  ["/top-website-design-digital-marketing-company-dodail", "/"],

  // Website development
  ["/custom-website-development-services-wordpress-web-apps", "/services/website-development/"],
  ["/wordpress-website-design-development-company", "/services/website-development/wordpress/"],
  ["/custom-web-application-development-services", "/services/website-development/custom-web-apps/"],
  ["/website-design-for-startups-fast-affordable-scalable", "/services/website-development/startup-websites/"],
  ["/business-website-development-corporate-web-design", "/services/website-development/business-websites/"],
  ["/real-estate-website-development-company", "/services/website-development/real-estate-websites/"],

  // E-commerce
  ["/e-commerce-website-development-company-shopify-more", "/services/ecommerce-development/"],
  ["/shopify-store-development-setup-experts", "/services/ecommerce-development/shopify/"],
  ["/woocommerce-development-services-wordpress-e-commerce", "/services/ecommerce-development/woocommerce/"],
  ["/magento-website-development-services-scalable-stores", "/services/ecommerce-development/magento/"],
  ["/custom-e-commerce-website-solutions", "/services/ecommerce-development/custom-ecommerce/"],

  // Digital marketing
  ["/digital-marketing-services-to-grow-your-business", "/services/digital-marketing/"],
  ["/google-ads-management-services-ppc-experts-india", "/services/digital-marketing/google-ads/"],
  ["/social-media-marketing-services-for-business-growth", "/services/digital-marketing/social-media-marketing/"],
  ["/email-whatsapp-marketing-campaign-services", "/services/digital-marketing/email-whatsapp-marketing/"],
  ["/instagram-reels-short-video-marketing-services", "/services/digital-marketing/reels-video-marketing/"],
  ["/google-my-business-optimization-services-local-seo-experts-dodail", "/services/digital-marketing/google-business-profile/"],

  // SEO
  ["/seo-services-for-google-ranking-wordpress-shopify-local", "/services/seo/"],
  ["/local-seo-services-for-small-local-businesses", "/services/seo/local-seo/"],
  ["/technical-seo-audit-optimization-services", "/services/seo/technical-seo/"],
  ["/on-page-seo-optimization-for-better-google-rankings", "/services/seo/on-page-seo/"],
  ["/off-page-seo-services-quality-link-building-experts", "/services/seo/link-building/"],
  ["/multilingual-seo-services-in-indian-global-languages", "/services/seo/multilingual-seo/"],
  ["/wordpress-seo-services-for-blogs-business-sites", "/services/seo/wordpress-seo/"],
  ["/seo-for-shopify-woocommerce-stores", "/services/seo/ecommerce-seo/"],

  // Leadership & growth
  ["/chief-marketing-officer-cmo", "/services/fractional-cmo/"],
  ["/geographic-expansion-officer-geo", "/services/market-expansion/"],

  // Industries
  ["/digital-marketing-for-dental-clinics-website-seo", "/industries/dental-clinics/"],
  ["/hospital-website-seo-solutions-dodail", "/industries/hospitals/"],
  ["/restaurant-digital-marketing-website-seo-reels", "/industries/restaurants/"],
  ["/real-estate-digital-marketing-website-solutions", "/industries/real-estate/"],
  ["/school-website-digital-marketing-services", "/industries/schools-institutes/"],
  ["/startup-growth-solutions-design-development-marketing", "/industries/startups/"],
  ["/e-commerce-digital-growth-services-shopify-seo", "/industries/ecommerce-brands/"],

  // Stub and duplicate pages
  ["/website-design-portfolio-dodail-projects", "/work/"],
  ["/social-media-campaign-portfolio-reels-posts", "/work/social-media/"],
  ["/graphic-design-portfolio-logos-packaging-banners", "/work/graphic-design/"],
  ["/digital-growth-case-studies-dodail-client-results", "/case-studies/"],
  ["/digital-marketing-insights-case-studies-dodail-blog", "/case-studies/"],
  ["/seo-tips-to-rank-your-business-website-dodail-blog", "/blog/category/seo/"],
  ["/latest-website-design-ux-trends-blog-by-dodail", "/blog/"],
  ["/how-to-grow-your-business-online-dodail-guides", "/blog/"],
  ["/get-a-free-website-marketing-audit-dodail", "/free-audit/"],
  ["/talk-to-us-instantly-on-whatsapp", "/contact/"],
  ["/awareness-blogs", "/blog/"],
  ["/educational-blogs", "/blog/"],
  ["/how-to-do-it-blogs", "/blog/"],
  ["/local-blogs", "/blog/"],
  ["/problem-solving-blogs", "/blog/"],
  ["/seo-update-blogs", "/blog/category/seo/"],

  // WordPress taxonomies and job posts (category-, post_tag- and position-sitemap.xml)
  ["/category/blog", "/blog/"],
  ["/category/awareness", "/blog/"],
  ["/category/educational", "/blog/"],
  ["/category/news", "/blog/"],
  ["/category/post", "/blog/"],
  ["/category/uncategorized", "/blog/"],
  ["/category/seo-update", "/blog/category/seo/"],
  ["/category/generative-engine-optimization", "/blog/category/generative-engine-optimization/"],
  ["/tag/:tag", "/blog/category/generative-engine-optimization/"],
  ["/position/:slug", "/careers/"],
  ["/feed", "/blog/rss.xml"],

  // Pre-launch routes of this build that were renamed to the brief's information architecture
  ["/solutions/ai-automation", "/services/ai-automation/"],
  ["/solutions/ai-lead-management", "/services/ai-automation/"],
  ["/solutions/ai-customer-support", "/services/ai-automation/"],
  ["/solutions/workflow-automation", "/services/ai-automation/"],
  ["/services/web-development", "/services/website-development/"],
  ["/services/digital-growth-seo", "/services/seo/"],
  ["/industries/dental", "/industries/dental-clinics/"],
  ["/industries/ecommerce", "/industries/ecommerce-brands/"],
  ["/privacy", "/privacy-policy/"],
  ["/terms", "/terms-of-use/"],
];

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  ...PAGES.map(([from, to]) => ({ from, to })),
  ...LEGACY_BLOG_POSTS.map(({ slug }) => ({ from: `/${slug}`, to: `/blog/${slug}/` })),
];
