import { LandingJsonLd, LandingPage, landingMetadata } from "@/components/cms/LandingPage";
import { getContent } from "@/lib/cms/content/store";

const KEY = "industries/ecommerce";
const PATH = "/industries/ecommerce-brands/";

export async function generateMetadata() {
  return landingMetadata(PATH, await getContent(KEY));
}

export default async function EcommerceBrandsPage() {
  const content = await getContent(KEY);
  return (
    <>
      <LandingJsonLd path={PATH} content={content} />
      <LandingPage content={content} />
    </>
  );
}
