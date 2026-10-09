import { NextResponse } from "next/server";
import { createLeadFromSubmission } from "@/lib/crm/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Strict validation
    if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!body.email || !body.email.includes("@") || !body.email.includes(".")) {
      return NextResponse.json({ error: "A valid business email address is required" }, { status: 400 });
    }

    // Capture validated attribution server-side (do not trust unvalidated hidden payload blindly)
    const referer = req.headers.get("referer") || "";
    let landingPage = body.landing_page || "/contact";
    try {
      if (referer) {
        const parsedUrl = new URL(referer);
        landingPage = parsedUrl.pathname;
      }
    } catch (e) {}

    const attribution = {
      utm_source: body.utm_source || (referer.includes("google") ? "google" : referer ? "referral" : "direct"),
      utm_medium: body.utm_medium || (body.utm_source ? "campaign" : "organic"),
      utm_campaign: body.utm_campaign,
      landing_page: landingPage,
      referrer: referer,
    };

    const consent = {
      marketing_consent: Boolean(body.marketing_consent),
      terms_agreed: true,
    };

    const result = await createLeadFromSubmission({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company_name: body.company_name,
      message: body.message,
      attribution,
      consent,
    });

    return NextResponse.json({
      success: true,
      lead_id: result.lead.id,
      is_duplicate: result.isDuplicate,
      message: result.isDuplicate
        ? "Inquiry added to existing prospect record."
        : "Lead received and registered successfully.",
    }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Lead submission failed" }, { status: 500 });
  }
}
