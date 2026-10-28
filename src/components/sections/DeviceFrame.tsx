import Image from "next/image";
import type { ProjectImage } from "@/content/types";

/**
 * Browser-style frame around a tall full-page screenshot that scrolls inside the frame, so
 * visitors can scan the whole homepage without a giant image pushing the page down.
 */
export function BrowserFrame({ image, label }: { image: ProjectImage; label: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-border-token bg-surface-2 px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      {/* tabIndex lets keyboard users scroll the screenshot. */}
      <div className="max-h-[560px] overflow-y-auto" tabIndex={0} role="group" aria-label={`${label} — scrollable screenshot`}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 1024px) 800px, 100vw" className="h-auto w-full" />
      </div>
    </figure>
  );
}

/** Phone-shaped frame for a mobile screenshot. */
export function PhoneFrame({ image }: { image: ProjectImage }) {
  return (
    <figure className="mx-auto w-48 overflow-hidden rounded-[2rem] border-[6px] border-border-strong bg-surface shadow-lg sm:w-56">
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="224px" className="h-auto w-full" />
    </figure>
  );
}
