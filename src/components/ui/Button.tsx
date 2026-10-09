import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, isExternal, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5B0F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1B2A] disabled:opacity-50 disabled:pointer-events-none rounded-lg active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-[#FA5B0F] hover:bg-[#FF6C26] text-white shadow-md shadow-[#FA5B0F]/20 hover:shadow-lg hover:shadow-[#FA5B0F]/30",
      secondary:
        "bg-[#142C44] hover:bg-[#1B3652] text-slate-100 border border-[#1B3652]",
      outline:
        "border border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-white/5",
      ghost:
        "text-slate-300 hover:text-white hover:bg-white/5",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 h-8 gap-1.5",
      md: "text-sm px-4 py-2.5 h-10 gap-2",
      lg: "text-base px-6 py-3.5 h-12 gap-2.5 font-semibold",
    };

    const combinedClassName = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
