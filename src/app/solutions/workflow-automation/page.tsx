import { LandingJsonLd, LandingPage, landingMetadata } from "@/components/cms/LandingPage";
import { getContent } from "@/lib/cms/content/store";

const KEY = "solutions/workflow-automation";

export async function generateMetadata() {
  return landingMetadata(`/${KEY}`, await getContent(KEY));
}

export default async function WorkflowAutomationPage() {
  const content = await getContent(KEY);
  return (
    <>
      <LandingJsonLd path={`/${KEY}`} content={content} />
      <LandingPage content={content} />
    </>
  );
}
