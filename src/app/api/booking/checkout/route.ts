import { NextResponse } from "next/server";
import { createBooking, createTemporarySlotHold } from "@/lib/booking/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.slotIso) {
      return NextResponse.json(
        { error: "Name, email, and slot time are required." },
        { status: 400 }
      );
    }

    // Step 1: Concurrency Hold / Lock
    const holdRes = await createTemporarySlotHold(body.productId || "prod-arch-discovery", body.slotIso);
    if (!holdRes.success) {
      return NextResponse.json({ error: holdRes.error }, { status: 409 }); // 409 Conflict (Double booking prevention)
    }

    // Step 2: Create Booking Record
    const result = await createBooking({
      productId: body.productId || "prod-arch-discovery",
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      notes: body.notes,
      slotIso: body.slotIso,
      timeZone: body.timeZone || "Asia/Kolkata",
    });

    return NextResponse.json({
      success: true,
      booking: result.booking,
      checkoutRequired: result.checkoutRequired,
      checkoutSessionUrl: result.checkoutSessionUrl,
      message: result.checkoutRequired
        ? "Session held. Please complete checkout to confirm."
        : "Discovery consultation confirmed! Google Meet link has been dispatched.",
    }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Booking failed" }, { status: 400 });
  }
}
