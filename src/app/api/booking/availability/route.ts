import { NextResponse } from "next/server";
import { getAvailableSlots, getConsultationProducts } from "@/lib/booking/api";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("product_id") || "prod-arch-discovery";
    const date = searchParams.get("date") || new Date().toISOString().slice(0, 10);

    const products = await getConsultationProducts();
    const availableSlots = await getAvailableSlots(productId, date);

    return NextResponse.json({
      success: true,
      products,
      date,
      time_zone: "Asia/Kolkata",
      available_slots: availableSlots,
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
