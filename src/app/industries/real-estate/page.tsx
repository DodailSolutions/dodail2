import { LandingJsonLd, LandingPage, landingMetadata } from "@/components/cms/LandingPage";
import { getContent } from "@/lib/cms/content/store";

const KEY = "industries/real-estate";

export async function generateMetadata() {
  return landingMetadata(`/${KEY}`, await getContent(KEY));
}

export default async function RealEstateIndustryPage() {
  const content = await getContent(KEY);
  return (
    <>
      <LandingJsonLd path={`/${KEY}`} content={content} />
      <LandingPage content={content} />
    </>
  );
}
