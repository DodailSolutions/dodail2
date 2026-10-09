import Link from "next/link";
import { Calendar, MessageSquare } from "lucide-react";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden border-t border-[#1B3652] bg-[#0A1B2A]/95 p-3 backdrop-blur-lg">
      <div className="grid grid-cols-2 gap-2">
        <a
          href="https://wa.me/919966400235?text=Hello%20Dodail%20Solutions,%20I%20am%20interested%20in%20AI%20Automation."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#1B3652] bg-[#0E2235] px-3 py-2.5 text-xs font-semibold text-slate-200 hover:bg-[#142C44]"
        >
          <MessageSquare className="h-4 w-4 text-emerald-400" />
          <span>WhatsApp</span>
        </a>
        <Link
          href="/consultation"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#FA5B0F] px-3 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#FA5B0F]/30 hover:bg-[#FF6C26]"
        >
          <Calendar className="h-4 w-4" />
          <span>Book Call</span>
        </Link>
      </div>
    </div>
  );
}
