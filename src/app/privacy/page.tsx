import { LegalPage, legalMetadata } from "@/components/cms/LegalPage";
import { getContent } from "@/lib/cms/content/store";

export async function generateMetadata() {
  return legalMetadata("/privacy", await getContent("legal/privacy"));
}

export default async function PrivacyPage() {
  return <LegalPage content={await getContent("legal/privacy")} />;
}
