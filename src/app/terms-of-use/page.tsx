import { LegalPage, legalMetadata } from "@/components/cms/LegalPage";
import { getContent } from "@/lib/cms/content/store";

export async function generateMetadata() {
  return legalMetadata("/terms-of-use/", await getContent("legal/terms"));
}

export default async function TermsOfUsePage() {
  return <LegalPage content={await getContent("legal/terms")} />;
}
