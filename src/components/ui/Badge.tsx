import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "orange" | "navy" | "outline" | "success" | "muted" | "cyan";
}

export function Badge({ className, variant = "orange", children, ...props }: BadgeProps) {
  const variantStyles = {
    orange: "bg-[#FF6B2C]/10 text-[#FF6B2C] border border-[#FF6B2C]/40",
    navy: "bg-[#0C2233] text-[#F5F8FC] border border-[#1B3652]",
    outline: "border border-[#1B3652] text-[#AABAC8]",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    cyan: "bg-[#27D3C2]/10 text-[#27D3C2] border border-[#27D3C2]/40",
    muted: "bg-[#10293B] text-[#AABAC8] border border-[#1B3652]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[11px] tracking-wider uppercase font-semibold border rounded-none select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
