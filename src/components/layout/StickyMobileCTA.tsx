import Link from "next/link";
import { Calendar, MessageSquare } from "lucide-react";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-16 sm:bottom-0 left-0 right-0 z-30 sm:hidden border-t border-slate-200 bg-white/95 p-3 backdrop-blur-lg shadow-lg">
      <div className="grid grid-cols-2 gap-2">
        <a
          href="https://wa.me/919966400235?text=Hello%20Dodail%20Solutions,%20I%20am%20interested%20in%20AI%20Automation."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-none border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100"
        >
          <MessageSquare className="h-4 w-4 text-emerald-500" />
          <span>WhatsApp</span>
        </a>
        <Link
          href="/consultation"
          className="flex items-center justify-center gap-1.5 rounded-none bg-[#FF6B2C] px-3 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#FF854D]"
        >
          <Calendar className="h-4 w-4" />
          <span>Book Call</span>
        </Link>
      </div>
    </div>
  );
}
