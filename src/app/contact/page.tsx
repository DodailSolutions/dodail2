import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/StructuredData";
import { getContent } from "@/lib/cms/content/store";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo/schema";
import { telHref, whatsappHref } from "@/lib/utils";

export async function generateMetadata() {
  return pageMetadata("/contact", (await getContent("contact")).seo);
}

export default async function ContactPage() {
  const [content, company, seo] = await Promise.all([getContent("contact"), getContent("site/company"), getContent("site/seo")]);
  const { hero, channels, office } = content;

  return (
    <div className="flex flex-col gap-12 sm:gap-16 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <JsonLd
        data={graph(
          { ...webPageSchema(seo, "/contact", content.seo), "@type": "ContactPage" },
          breadcrumbSchema(seo, [{ name: hero.title, path: "/contact" }])
        )}
      />
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="orange">{hero.badge}</Badge>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-5xl tracking-tight">{hero.title}</h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl mx-auto">{hero.subtitle}</p>
      </section>

      <section className="mx-auto max-w-5xl w-full grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-950 mb-4">{channels.title}</h2>
            <div className="space-y-1 text-sm text-slate-600">
              {company.whatsapp && (
                <a
                  href={whatsappHref(company.whatsapp, channels.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl p-2 -mx-2 hover:bg-slate-50 active:bg-slate-100"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MessageSquare className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-400 font-medium">{channels.whatsappLabel}</span>
                    <span className="font-semibold text-emerald-700">{company.whatsapp}</span>
                  </span>
                </a>
              )}
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 rounded-xl p-2 -mx-2 hover:bg-slate-50 active:bg-slate-100">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#FF6B2C]">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-slate-400 font-medium">{channels.emailLabel}</span>
                  <span className="font-semibold text-slate-800">{company.email}</span>
                </span>
              </a>
              <a href={telHref(company.phone)} className="flex items-center gap-3 rounded-xl p-2 -mx-2 hover:bg-slate-50 active:bg-slate-100">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#FF6B2C]">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-slate-400 font-medium">{channels.phoneLabel}</span>
                  <span className="font-semibold text-slate-800">{company.phone}</span>
                </span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold mb-2">
              <MapPin className="h-4 w-4 text-[#FF6B2C]" />
              <h2>{office.title}</h2>
            </div>
            <address className="not-italic text-sm text-slate-500 leading-relaxed">
              {company.name}
              <br />
              {company.city}, {company.region} {company.postalCode}
              <br />
              {company.country}
            </address>
            {company.hours && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {office.hoursLabel}: {company.hours}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 order-1 lg:order-2">
          <ContactForm form={content.form} success={content.success} />
        </div>
      </section>
    </div>
  );
}
