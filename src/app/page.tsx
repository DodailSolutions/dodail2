import { Metadata } from "next";
import { HomePageClient } from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "Dodail Solutions — Turn Repetitive Operations Into Autonomous Growth",
  description:
    "Dodail helps growing businesses automate repetitive work, connect business systems, and build digital solutions that drive measurable progress. Hyderabad, India.",
  alternates: {
    canonical: "https://dodail.com",
  },
  openGraph: {
    title: "Dodail Solutions — Turn Repetitive Operations Into Autonomous Growth",
    description:
      "Dodail helps growing businesses automate repetitive work, connect business systems, and build digital solutions that drive measurable progress.",
    url: "https://dodail.com",
    siteName: "Dodail Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
