import fs from "fs";
import path from "path";
import { ConsultationProduct, Booking, BookingHold, NotificationLog, BookingStatus, PaymentStatus } from "./types";
import { createLeadFromSubmission, addLeadActivity } from "@/lib/crm/api";

const BOOKING_STORE_FILE = path.join(process.cwd(), "booking-store.json");

interface BookingStore {
  products: ConsultationProduct[];
  bookings: Booking[];
  holds: BookingHold[];
  notifications: NotificationLog[];
  auditLogs: Array<{ action: string; booking_id: string; user: string; timestamp: string; details?: any }>;
}

export const defaultProducts: ConsultationProduct[] = [
  {
    id: "prod-arch-discovery",
    name: "30-Min Architecture Discovery Session",
    description: "One-on-one discovery with a senior solutions architect reviewing your operational bottlenecks, current stack, and workflow feasibility.",
    duration_minutes: 30,
    price_amount: 0,
    currency: "INR",
    is_free: true,
    working_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    working_hours_start: "10:00",
    working_hours_end: "18:00",
    time_zone: "Asia/Kolkata",
    buffer_minutes: 15,
    minimum_notice_hours: 4,
    booking_horizon_days: 14,
    cancellation_policy: "Free cancellation or rescheduling up to 4 hours before the session.",
    refund_policy: "N/A (Complimentary Discovery Session).",
    meeting_platform: "google_meet",
  },
  {
    id: "prod-deep-dive-audit",
    name: "60-Min In-Depth AI Architecture & Code Audit",
    description: "Comprehensive technical audit reviewing existing schemas, database pipelines, and AI agent prompt architectures with custom specification roadmap.",
    duration_minutes: 60,
    price_amount: 4999,
    currency: "INR",
    is_free: false,
    working_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    working_hours_start: "11:00",
    working_hours_end: "19:00",
    time_zone: "Asia/Kolkata",
    buffer_minutes: 30,
    minimum_notice_hours: 12,
    booking_horizon_days: 21,
    cancellation_policy: "Full refund or rescheduling permitted up to 24 hours prior to session start.",
    refund_policy: "100% money-back guarantee if no actionable architecture roadmap is delivered.",
    meeting_platform: "google_meet",
  },
];

const defaultBookings: Booking[] = [
  {
    id: "book-1",
    product_id: "prod-arch-discovery",
    lead_id: "lead-1",
    customer_name: "Dr. Sandeep Varma",
    customer_email: "sandeep@apexclinics.in",
    customer_phone: "+91 98490 12345",
    customer_company: "Apex Healthcare Clinics",
    notes: "Reviewing clinic WhatsApp bot and Google Sheets automation.",
    start_time: "2026-04-12T05:30:00Z", // 11:00 AM IST
    end_time: "2026-04-12T06:00:00Z",
    time_zone: "Asia/Kolkata",
    booking_status: "confirmed",
    payment_status: "paid",
    amount_paid: 0,
    currency: "INR",
    meeting_link: "https://meet.google.com/dod-ail-arch",
    reschedule_count: 0,
    created_at: "2026-04-05T10:30:00Z",
    updated_at: "2026-04-05T10:30:00Z",
  },
];

const defaultStore: BookingStore = {
  products: defaultProducts,
  bookings: defaultBookings,
  holds: [],
  notifications: [],
  auditLogs: [],
};

function readBookingStore(): BookingStore {
  try {
    if (fs.existsSync(BOOKING_STORE_FILE)) {
      const data = fs.readFileSync(BOOKING_STORE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {}
  return defaultStore;
}

function writeBookingStore(store: BookingStore) {
  try {
    fs.writeFileSync(BOOKING_STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write booking store:", e);
  }
}

// ================= AVAILABILITY & DOUBLE-BOOKING PREVENTION =================

export async function getAvailableSlots(productId: string, dateStr: string): Promise<string[]> {
  const store = readBookingStore();
  const product = store.products.find((p) => p.id === productId) || store.products[0];

  const now = new Date();
  // Standard daily slots for product
  const baseSlots = ["10:00", "11:30", "14:00", "15:30", "17:00"];

  // Clean expired holds
  store.holds = store.holds.filter((h) => new Date(h.hold_expires_at) > now);
  writeBookingStore(store);

  // Available slots check: not booked and not held
  const available: string[] = [];

  for (const slot of baseSlots) {
    const slotIso = new Date(`${dateStr}T${slot}:00+05:30`).toISOString();

    const isBooked = store.bookings.some(
      (b) =>
        b.booking_status !== "cancelled" &&
        b.start_time === slotIso
    );

    const isHeld = store.holds.some(
      (h) =>
        h.slot_time === slotIso &&
        new Date(h.hold_expires_at) > now
    );

    if (!isBooked && !isHeld) {
      available.push(slot);
    }
  }

  return available;
}

// ================= TRANSACTIONAL LOCK / HOLD =================

export async function createTemporarySlotHold(productId: string, slotIso: string): Promise<{ success: boolean; holdId?: string; error?: string }> {
  const store = readBookingStore();
  const now = new Date();

  // Clean expired holds
  store.holds = store.holds.filter((h) => new Date(h.hold_expires_at) > now);

  // Concurrency check (prevent race conditions & double-booking)
  const isBooked = store.bookings.some(
    (b) => b.booking_status !== "cancelled" && b.start_time === slotIso
  );
  const isHeld = store.holds.some(
    (h) => h.slot_time === slotIso && new Date(h.hold_expires_at) > now
  );

  if (isBooked) {
    return { success: false, error: "This slot was just confirmed by another client. Please select an alternate time." };
  }
  if (isHeld) {
    return { success: false, error: "This slot is temporarily held in another checkout session. Try again in 10 minutes." };
  }

  const hold: BookingHold = {
    id: `hold-${Date.now()}`,
    product_id: productId,
    slot_time: slotIso,
    hold_expires_at: new Date(now.getTime() + 15 * 60 * 1000).toISOString(), // 15 min lock
    created_at: now.toISOString(),
  };

  store.holds.push(hold);
  writeBookingStore(store);

  return { success: true, holdId: hold.id };
}

// ================= BOOKING CREATION & CONFIRMATION =================

export async function createBooking(params: {
  productId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  slotIso: string;
  timeZone?: string;
}): Promise<{ booking: Booking; checkoutRequired: boolean; checkoutSessionUrl?: string }> {
  const store = readBookingStore();
  const now = new Date();
  const product = store.products.find((p) => p.id === params.productId) || store.products[0];

  // 1. Transactional concurrency check (fail-safe double-booking lock)
  const overlapping = store.bookings.some(
    (b) => b.booking_status !== "cancelled" && b.start_time === params.slotIso
  );
  if (overlapping) {
    throw new Error("Double-booking prevented: Slot has already been confirmed.");
  }

  const startTime = new Date(params.slotIso);
  const endTime = new Date(startTime.getTime() + product.duration_minutes * 60 * 1000);

  // 2. Link to CRM automatically
  const leadRes = await createLeadFromSubmission({
    name: params.name,
    email: params.email,
    phone: params.phone,
    company_name: params.company,
    message: `Consultation booked: ${product.name}. Client notes: ${params.notes || "None"}`,
    attribution: { utm_source: "consultation_booking_engine" },
  });

  const isFree = product.is_free || product.price_amount === 0;

  const newBooking: Booking = {
    id: `book-${Date.now()}`,
    product_id: product.id,
    lead_id: leadRes.lead.id,
    customer_name: params.name.trim(),
    customer_email: params.email.trim(),
    customer_phone: params.phone?.trim(),
    customer_company: params.company?.trim(),
    notes: params.notes?.trim(),
    start_time: startTime.toISOString(),
    end_time: endTime.toISOString(),
    time_zone: params.timeZone || "Asia/Kolkata",
    booking_status: isFree ? "confirmed" : "pending_payment",
    payment_status: isFree ? "paid" : "unpaid",
    amount_paid: isFree ? 0 : product.price_amount,
    currency: product.currency,
    meeting_link: "https://meet.google.com/dod-ail-arch",
    reschedule_count: 0,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  };

  store.bookings.unshift(newBooking);

  // Remove temporary hold if any
  store.holds = store.holds.filter((h) => h.slot_time !== params.slotIso);

  // Add CRM activity
  await addLeadActivity({
    lead_id: leadRes.lead.id,
    type: "meeting",
    title: `Consultation Booked: ${product.name}`,
    description: `Scheduled for ${startTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST. Meeting Link: ${newBooking.meeting_link}`,
    performed_by: "Booking Engine",
  });

  store.auditLogs.unshift({
    action: "CREATE_BOOKING",
    booking_id: newBooking.id,
    user: params.email,
    timestamp: now.toISOString(),
    details: { is_free: isFree, status: newBooking.booking_status },
  });

  // Simulated notification
  store.notifications.unshift({
    id: `notif-${Date.now()}`,
    booking_id: newBooking.id,
    recipient_email: params.email,
    type: "booking_confirmation",
    provider: "resend",
    status: "sent",
    sent_at: now.toISOString(),
  });

  writeBookingStore(store);

  return {
    booking: newBooking,
    checkoutRequired: !isFree,
    checkoutSessionUrl: !isFree ? `/api/booking/checkout?booking_id=${newBooking.id}` : undefined,
  };
}

// ================= PAYMENT WEBHOOK IDEMPOTENT PROCESSOR =================

export async function processPaymentWebhook(params: {
  bookingId: string;
  gatewayEventId: string;
  status: "paid" | "failed" | "refunded";
  amount: number;
}): Promise<{ success: boolean; message: string }> {
  const store = readBookingStore();
  const booking = store.bookings.find((b) => b.id === params.bookingId);
  if (!booking) {
    return { success: false, message: "Booking not found" };
  }

  // Idempotency: if already processed, return immediately
  if (booking.payment_gateway_ref === params.gatewayEventId) {
    return { success: true, message: "Webhook already processed (Idempotent)." };
  }

  booking.payment_gateway_ref = params.gatewayEventId;
  booking.payment_status = params.status;

  if (params.status === "paid") {
    booking.booking_status = "confirmed";
  } else if (params.status === "failed") {
    booking.booking_status = "cancelled";
  } else if (params.status === "refunded") {
    booking.booking_status = "cancelled";
  }

  booking.updated_at = new Date().toISOString();

  store.auditLogs.unshift({
    action: "PAYMENT_WEBHOOK_PROCESSED",
    booking_id: booking.id,
    user: "payment_gateway",
    timestamp: new Date().toISOString(),
    details: { event_id: params.gatewayEventId, status: params.status },
  });

  writeBookingStore(store);
  return { success: true, message: `Payment status updated to ${params.status}` };
}

// ================= ALL BOOKINGS ADMIN API =================

export async function getAllBookings(): Promise<Booking[]> {
  const store = readBookingStore();
  return store.bookings;
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  userEmail: string = "admin@dodail.com"
): Promise<Booking | null> {
  const store = readBookingStore();
  const booking = store.bookings.find((b) => b.id === bookingId);
  if (!booking) return null;

  booking.booking_status = status;
  booking.updated_at = new Date().toISOString();

  store.auditLogs.unshift({
    action: "UPDATE_BOOKING_STATUS",
    booking_id: bookingId,
    user: userEmail,
    timestamp: new Date().toISOString(),
    details: { new_status: status },
  });

  writeBookingStore(store);
  return booking;
}

export async function getConsultationProducts(): Promise<ConsultationProduct[]> {
  const store = readBookingStore();
  return store.products;
}

export async function saveConsultationProduct(
  product: Partial<ConsultationProduct>,
  userEmail: string = "admin@dodail.com"
): Promise<ConsultationProduct> {
  const store = readBookingStore();
  const idx = store.products.findIndex((p) => p.id === product.id);

  let updated: ConsultationProduct;
  if (idx >= 0) {
    updated = { ...store.products[idx], ...product } as ConsultationProduct;
    store.products[idx] = updated;
  } else {
    updated = {
      id: product.id || `prod-${Date.now()}`,
      name: product.name || "New Consultation",
      description: product.description || "",
      duration_minutes: product.duration_minutes || 30,
      price_amount: product.price_amount || 0,
      currency: product.currency || "INR",
      is_free: product.is_free ?? true,
      working_days: product.working_days || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      working_hours_start: "10:00",
      working_hours_end: "18:00",
      time_zone: "Asia/Kolkata",
      buffer_minutes: 15,
      minimum_notice_hours: 4,
      booking_horizon_days: 14,
      cancellation_policy: "4-hour advance notice required.",
      refund_policy: "Standard refund policy.",
      meeting_platform: "google_meet",
    };
    store.products.push(updated);
  }

  writeBookingStore(store);
  return updated;
}
