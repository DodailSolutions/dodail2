import { LandingJsonLd, LandingPage, landingMetadata } from "@/components/cms/LandingPage";
import { getContent } from "@/lib/cms/content/store";

const KEY = "solutions/ai-automation";
const PATH = "/services/ai-automation/";

export async function generateMetadata() {
  return landingMetadata(PATH, await getContent(KEY));
}

export default async function AIAutomationPage() {
  const content = await getContent(KEY);
  return (
    <>
      <LandingJsonLd path={PATH} content={content} />
      <LandingPage content={content} />
    </>
  );
}
