import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatLauncher } from "@/components/layout/AIChatLauncher";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { getGlobalSettings } from "@/lib/cms/api";
import { StructuredData } from "@/components/seo/StructuredData";

export const viewport: Viewport = {
  themeColor: "#0A1B2A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dodail.com"),
  title: {
    default: "Dodail Solutions | AI Automation & Business Growth Platform",
    template: "%s | Dodail Solutions",
  },
  description:
    "Dodail Solutions is an AI automation and business growth partner. We build autonomous workflows, AI lead management, custom web software, and digital growth systems for modern businesses.",
  keywords: [
    "AI Automation",
    "Business Growth",
    "Workflow Automation",
    "AI Lead Management",
    "AI Customer Support",
    "Custom Web Applications",
    "Next.js Development",
    "Dodail Solutions",
    "Hyderabad Digital Agency"
  ],
  authors: [{ name: "Dodail Solutions Private Limited" }],
  creator: "Dodail Solutions Private Limited",
  publisher: "Dodail Solutions Private Limited",
  icons: {
    icon: "/brand/dodail-emblem.png",
    apple: "/brand/dodail-emblem.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dodail.com",
    siteName: "Dodail Solutions",
    title: "Dodail Solutions | AI Automation & Business Growth Platform",
    description:
      "Transform your business operations with autonomous AI workflows, intelligent lead systems, and custom software engineering.",
    images: [
      {
        url: "/brand/dodail-full-logo.png",
        width: 1200,
        height: 630,
        alt: "Dodail Solutions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dodailpvtltd",
    creator: "@dodailpvtltd",
    title: "Dodail Solutions | AI Automation & Business Growth Platform",
    description:
      "Transform your business operations with autonomous AI workflows, intelligent lead systems, and custom software engineering.",
    images: ["/brand/dodail-full-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let announcement = { enabled: false, text: "", link: "" };
  try {
    const settings = await getGlobalSettings();
    announcement = settings?.navigation?.announcement || announcement;
  } catch (e) {}

  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen flex-col bg-[#0A1B2A] text-slate-100 antialiased selection:bg-[#FA5B0F] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#FA5B0F] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
        <Navbar announcement={announcement} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        <AIChatLauncher />
      </body>
    </html>
  );
}
