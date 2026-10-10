import { NextResponse } from "next/server";
import crypto from "crypto";
import { processPaymentWebhook } from "@/lib/booking/api";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature =
      req.headers.get("x-razorpay-signature") || req.headers.get("stripe-signature");
    const secret = process.env.PAYMENT_WEBHOOK_SECRET || process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Webhook secret is not configured" }, { status: 503 });
    }

    // Enforce cryptographic HMAC verification
    if (signature && secret) {
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");
      const sigBuffer = Buffer.from(signature);
      const expectedBuffer = Buffer.from(expectedSignature);

      const isValid =
        sigBuffer.length === expectedBuffer.length &&
        crypto.timingSafeEqual(sigBuffer, expectedBuffer);

      if (!isValid && process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Invalid webhook cryptographic signature" },
          { status: 401 }
        );
      }
    } else if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Missing webhook signature" }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
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
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
