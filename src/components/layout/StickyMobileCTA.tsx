import Link from "next/link";
import { Calendar, MessageSquare } from "lucide-react";

/** Phone-only action bar, docked to the bottom edge (respects the iOS home indicator). */
export function StickyMobileCTA() {
  return (
    <>
      {/* Spacer so the fixed bar never covers the end of the footer */}
      <div className="h-24 bg-[#05070B] sm:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#05070B]/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-[1fr_1.5fr] gap-2">
          <a
            href="https://wa.me/919966400235?text=Hello%20Dodail%20Solutions,%20I%20am%20interested%20in%20AI%20Automation."
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] text-sm font-medium text-[#F5F8FC] active:bg-white/10"
          >
            <MessageSquare className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
          <Link
            href="/consultation"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF6B2C] text-sm font-semibold text-[#05070B] active:bg-[#e0561b]"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>Book a Consultation</span>
          </Link>
        </div>
      </div>
    </>
  );
}
