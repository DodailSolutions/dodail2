import { LandingJsonLd, LandingPage, landingMetadata } from "@/components/cms/LandingPage";
import { getContent } from "@/lib/cms/content/store";

const KEY = "industries/ecommerce";

export async function generateMetadata() {
  return landingMetadata(`/${KEY}`, await getContent(KEY));
}

export default async function EcommerceIndustryPage() {
  const content = await getContent(KEY);
  return (
    <>
      <LandingJsonLd path={`/${KEY}`} content={content} />
      <LandingPage content={content} />
    </>
  );
}
