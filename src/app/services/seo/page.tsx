import { LandingJsonLd, LandingPage, landingMetadata } from "@/components/cms/LandingPage";
import { getContent } from "@/lib/cms/content/store";

const KEY = "services/digital-growth-seo";
const PATH = "/services/seo/";

export async function generateMetadata() {
  return landingMetadata(PATH, await getContent(KEY));
}

export default async function SeoServicesPage() {
  const content = await getContent(KEY);
  return (
    <>
      <LandingJsonLd path={PATH} content={content} />
      <LandingPage content={content} />
    </>
  );
}
