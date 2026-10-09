import { NextResponse } from "next/server";
import { processPaymentWebhook } from "@/lib/booking/api";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-razorpay-signature") || req.headers.get("stripe-signature");
    const secret = process.env.PAYMENT_WEBHOOK_SECRET || "dodail-webhook-secret-2026";

    // Enforce signed webhooks
    if (process.env.NODE_ENV === "production" && !signature) {
      return NextResponse.json({ error: "Missing webhook signature" }, { status: 401 });
    }

    const body = await req.json();

    const { bookingId, eventId, status, amount } = body;

    if (!bookingId || !eventId || !status) {
      return NextResponse.json(
        { error: "bookingId, eventId, and status are required" },
        { status: 400 }
      );
    }

    // Process idempotently
    const result = await processPaymentWebhook({
      bookingId,
      gatewayEventId: eventId,
      status,
      amount: amount || 0,
    });

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
