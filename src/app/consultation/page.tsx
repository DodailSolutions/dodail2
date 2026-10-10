import { Badge } from "@/components/ui/Badge";
import { BookingForm } from "@/components/forms/BookingForm";
import { JsonLd } from "@/components/seo/StructuredData";
import { getContent } from "@/lib/cms/content/store";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, serviceSchema } from "@/lib/seo/schema";

export async function generateMetadata() {
  return pageMetadata("/consultation", (await getContent("consultation")).seo);
}

export default async function ConsultationPage() {
  const [content, company, seo] = await Promise.all([
    getContent("consultation"),
    getContent("site/company"),
    getContent("site/seo"),
  ]);
  const { hero } = content;

  return (
    <div className="flex flex-col gap-10 sm:gap-16 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <JsonLd
        data={graph(
          serviceSchema(seo, "/consultation", content.seo),
          breadcrumbSchema(seo, [{ name: hero.title, path: "/consultation" }])
        )}
      />
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="orange">{hero.badge}</Badge>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-5xl tracking-tight">{hero.title}</h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl mx-auto">{hero.subtitle}</p>
      </section>

      <section className="mx-auto max-w-4xl w-full">
        <BookingForm
          steps={content.steps}
          topics={content.topics.filter(Boolean)}
          slots={content.slots.filter((s) => s.label)}
          form={content.form}
          success={content.success}
          whatsapp={company.whatsapp}
        />
      </section>
    </div>
  );
}
