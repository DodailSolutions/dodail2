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
      "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A28] disabled:opacity-50 disabled:pointer-events-none rounded-none active:translate-y-0.5 select-none";

    const variantStyles = {
      primary:
        "bg-[#FF6B2C] hover:bg-[#FF854D] text-[#071A28] font-bold border border-[#FF6B2C] shadow-sm shadow-[#FF6B2C]/20 hover:shadow-[#FF6B2C]/40",
      secondary:
        "bg-[#0C2233] hover:bg-[#10293B] hover:text-[#F5F8FC] text-[#F5F8FC] border border-[#1B3652]",
      outline:
        "border border-[#1B3652] hover:border-[#FF6B2C] text-[#F5F8FC] hover:bg-[#FF6B2C]/5",
      ghost:
        "text-[#AABAC8] hover:text-[#F5F8FC] hover:bg-[#10293B]",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 h-8 gap-1.5 font-mono uppercase tracking-wider",
      md: "text-xs px-5 py-2.5 h-10 gap-2 font-mono uppercase tracking-wider",
      lg: "text-sm px-7 py-3.5 h-12 gap-2.5 font-bold uppercase tracking-wider",
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
