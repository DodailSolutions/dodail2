import { LandingJsonLd, LandingPage, landingMetadata } from "@/components/cms/LandingPage";
import { getContent } from "@/lib/cms/content/store";

const KEY = "services/web-development";
const PATH = "/services/website-development/";

export async function generateMetadata() {
  return landingMetadata(PATH, await getContent(KEY));
}

export default async function WebsiteDevelopmentPage() {
  const content = await getContent(KEY);
  return (
    <>
      <LandingJsonLd path={PATH} content={content} />
      <LandingPage content={content} />
    </>
  );
}
