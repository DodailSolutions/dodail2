import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "orange" | "navy" | "outline" | "success" | "muted";
}

export function Badge({ className, variant = "orange", children, ...props }: BadgeProps) {
  const variantStyles = {
    orange: "bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/30",
    navy: "bg-[#142C44] text-slate-200 border border-[#1B3652]",
    outline: "border border-slate-700 text-slate-300",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    muted: "bg-slate-800/60 text-slate-400 border border-slate-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
