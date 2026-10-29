import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "orange" | "navy" | "outline" | "success" | "muted" | "cyan" | "teal";
}

export function Badge({ className, variant = "orange", children, ...props }: BadgeProps) {
  const variantStyles = {
    orange: "bg-orange-500/10 text-[#FF6B2C] border border-orange-500/25 light:bg-orange-50 light:border-orange-200",
    navy: "bg-surface-2 text-fg border border-border-token",
    outline: "border border-border-strong text-fg-muted bg-surface",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    cyan: "bg-teal-50 text-teal-700 border border-teal-200",
    teal: "bg-teal-50 text-teal-700 border border-teal-200",
    muted: "bg-surface-2 text-fg-muted border border-border-token",
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
