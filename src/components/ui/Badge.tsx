import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "orange" | "navy" | "outline" | "success" | "muted" | "cyan" | "teal";
}

export function Badge({ className, variant = "orange", children, ...props }: BadgeProps) {
  const variantStyles = {
    orange: "bg-orange-50 text-[#FF6B2C] border border-orange-200",
    navy: "bg-slate-100 text-slate-800 border border-slate-200",
    outline: "border border-slate-300 text-slate-700 bg-white",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    cyan: "bg-teal-50 text-teal-700 border border-teal-200",
    teal: "bg-teal-50 text-teal-700 border border-teal-200",
    muted: "bg-slate-100 text-slate-600 border border-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] tracking-wider uppercase font-semibold border rounded-full select-none shadow-xs",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
