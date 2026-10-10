import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatLauncher } from "@/components/layout/AIChatLauncher";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { PublicOnly } from "@/components/layout/PublicOnly";
import { JsonLd } from "@/components/seo/StructuredData";
import { getContent } from "@/lib/cms/content/store";
import { absoluteUrl, siteUrl } from "@/lib/seo/metadata";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";

export async function generateViewport(): Promise<Viewport> {
  const seo = await getContent("site/seo");
  return {
    themeColor: seo.app.themeColor,
    width: "device-width",
    initialScale: 1,
    // Lets the layout extend under the notch / home indicator; safe-area insets pad the chrome.
    viewportFit: "cover",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const [seo, company] = await Promise.all([getContent("site/seo"), getContent("site/company")]);
  const verificationOther: Record<string, string> = {};
  if (seo.verification.bing) verificationOther["msvalidate.01"] = seo.verification.bing;

  return {
    metadataBase: new URL(siteUrl(seo)),
    title: { default: seo.defaultTitle, template: `%s | ${seo.titleSuffix}` },
    description: seo.description,
    keywords: seo.keywords.filter(Boolean),
    applicationName: seo.app.name,
    authors: [{ name: company.name }],
    creator: company.name,
    publisher: company.name,
    formatDetection: { telephone: true, email: true, address: false },
    appleWebApp: { capable: true, title: seo.app.shortName, statusBarStyle: "black-translucent" },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: siteUrl(seo),
      siteName: seo.siteName,
      title: seo.defaultTitle,
      description: seo.description,
      ...(seo.shareImage && { images: [{ url: absoluteUrl(seo, seo.shareImage), width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      site: seo.twitterHandle || undefined,
      creator: seo.twitterHandle || undefined,
      title: seo.defaultTitle,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    verification: {
      google: seo.verification.google || undefined,
      yandex: seo.verification.yandex || undefined,
      other: verificationOther,
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [navigation, footer, company, seo] = await Promise.all([
    getContent("site/navigation"),
    getContent("site/footer"),
    getContent("site/company"),
    getContent("site/seo"),
  ]);

  return (
    // suppressHydrationWarning: browser extensions (e.g. WOT adds `wotdisconnected`) inject
    // attributes into <html>/<body> before hydration. Applies to these two elements only.
    <html lang={seo.locale.split("_")[0] || "en"} className="h-full" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[#071A28] text-[#F5F8FC] antialiased selection:bg-[#FF6B2C] selection:text-[#071A28]"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-none focus:bg-[#FF6B2C] focus:px-4 focus:py-2 focus:text-[#071A28] focus:font-bold focus:shadow-lg focus:outline-none font-mono text-xs uppercase tracking-wider"
        >
          Skip to main content
        </a>
        <JsonLd data={graph(organizationSchema(company, seo), websiteSchema(seo))} />
        <PublicOnly>
          <Navbar nav={navigation} />
        </PublicOnly>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <PublicOnly>
          <Footer footer={footer} company={company} />
          <MobileTabBar nav={navigation} />
          <AIChatLauncher />
        </PublicOnly>
      </body>
    </html>
  );
}
