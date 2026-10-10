import { LandingJsonLd, LandingPage, landingMetadata } from "@/components/cms/LandingPage";
import { getContent } from "@/lib/cms/content/store";

const KEY = "services/digital-growth-seo";

export async function generateMetadata() {
  return landingMetadata(`/${KEY}`, await getContent(KEY));
}

export default async function DigitalGrowthSeoPage() {
  const content = await getContent(KEY);
  return (
    <>
      <LandingJsonLd path={`/${KEY}`} content={content} />
      <LandingPage content={content} />
    </>
  );
}
