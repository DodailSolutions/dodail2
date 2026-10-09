import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/crm/api";

export async function GET() {
  try {
    const leads = await getAllLeads();

    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Status",
      "Score",
      "Owner",
      "Deal Value",
      "UTM Source",
      "UTM Campaign",
      "Landing Page",
      "Created At",
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.phone || "",
      `"${(l.company_name || "").replace(/"/g, '""')}"`,
      l.status,
      l.score,
      l.owner_email,
      l.deal_value || 0,
      l.attribution?.utm_source || "",
      l.attribution?.utm_campaign || "",
      l.attribution?.landing_page || "",
      l.created_at,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="dodail_leads_${Date.now()}.csv"`,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
