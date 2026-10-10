"use client";

import { usePathname } from "next/navigation";

/** Renders public-site chrome (header, footer, chat) everywhere except the admin panel. */
export function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
