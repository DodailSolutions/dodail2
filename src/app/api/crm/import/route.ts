import { NextResponse } from "next/server";
import { createLeadFromSubmission } from "@/lib/crm/api";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "CSV file is required" }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split("\n").filter((l) => l.trim().length > 0);
    if (lines.length <= 1) {
      return NextResponse.json({ error: "CSV file is empty or contains only header" }, { status: 400 });
    }

    const header = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));
    const nameIdx = header.findIndex((h) => h.includes("name"));
    const emailIdx = header.findIndex((h) => h.includes("email"));
    const phoneIdx = header.findIndex((h) => h.includes("phone"));
    const companyIdx = header.findIndex((h) => h.includes("company"));

    if (emailIdx === -1) {
      return NextResponse.json({ error: "CSV must contain an 'email' column" }, { status: 400 });
    }

    let importedCount = 0;
    let duplicateCount = 0;
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
      const email = row[emailIdx];
      const name = nameIdx >= 0 ? row[nameIdx] : email.split("@")[0];
      const phone = phoneIdx >= 0 ? row[phoneIdx] : undefined;
      const company = companyIdx >= 0 ? row[companyIdx] : undefined;

      if (!email || !email.includes("@")) {
        errors.push(`Row ${i + 1}: Invalid email address.`);
        continue;
      }

      const res = await createLeadFromSubmission({
        name,
        email,
        phone,
        company_name: company,
        attribution: { utm_source: "csv_import" },
      });

      if (res.isDuplicate) {
        duplicateCount++;
      } else {
        importedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      importedCount,
      duplicateCount,
      errorCount: errors.length,
      errors: errors.slice(0, 5), // Preview first 5 errors
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
