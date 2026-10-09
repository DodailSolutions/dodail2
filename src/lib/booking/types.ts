export type Currency = "INR" | "USD" | "EUR";

export type BookingStatus =
  | "pending_payment"
  | "confirmed"
  | "rescheduled"
  | "cancelled"
  | "completed"
  | "no_show";

export type PaymentStatus =
  | "unpaid"
  | "authorized"
  | "paid"
  | "failed"
  | "refunded";

export interface ConsultationProduct {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price_amount: number; // in minor units (e.g., paisa/cents) or major (e.g. ₹2,999)
  currency: Currency;
  is_free: boolean;
  working_days: string[]; // ["Monday", "Tuesday", ...]
  working_hours_start: string; // "10:00"
  working_hours_end: string; // "18:00"
  time_zone: string; // "Asia/Kolkata"
  buffer_minutes: number;
  minimum_notice_hours: number;
  booking_horizon_days: number;
  cancellation_policy: string;
  refund_policy: string;
  meeting_platform: "google_meet" | "zoom" | "phone";
}

export interface BookingHold {
  id: string;
  slot_time: string; // ISO 8601 UTC
  product_id: string;
  hold_expires_at: string; // ISO 8601 UTC (e.g. now + 15 mins)
  created_at: string;
}

export interface Booking {
  id: string;
  product_id: string;
  lead_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_company?: string;
  notes?: string;
  start_time: string; // ISO 8601 UTC
  end_time: string; // ISO 8601 UTC
  time_zone: string; // Customer's timezone e.g. "Asia/Kolkata" or "America/New_York"
  booking_status: BookingStatus;
  payment_status: PaymentStatus;
  amount_paid: number;
  currency: Currency;
  payment_gateway_ref?: string;
  payment_session_id?: string;
  meeting_link?: string;
  reschedule_count: number;
  created_at: string;
  updated_at: string;
}

export interface NotificationLog {
  id: string;
  booking_id: string;
  recipient_email: string;
  type: "booking_confirmation" | "payment_receipt" | "reminder" | "cancellation" | "reschedule";
  provider: "resend" | "postmark" | "smtp" | "console";
  status: "delivered" | "sent" | "failed";
  sent_at: string;
}
