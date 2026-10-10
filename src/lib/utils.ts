import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** wa.me deep link for a phone number in any format, with an optional prefilled message. */
export function whatsappHref(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

/** Replaces {token} placeholders, e.g. fill("Learn more about {service}", { service: "SEO" }). */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? values[k] : m));
}

/** Allows site paths, anchors, http(s), mailto: and tel: links only (blocks javascript: and protocol-relative URLs). */
export function isSafeUrl(value: string): boolean {
  const v = value.trim();
  return v === "" || /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(v);
}
