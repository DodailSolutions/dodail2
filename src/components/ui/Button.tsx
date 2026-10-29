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
      "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5B0F] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none rounded-xl active:translate-y-0.5 select-none";

    const variantStyles = {
      primary:
        "bg-[#FA5B0F] hover:bg-[#E04E08] text-white font-bold border border-[#FA5B0F] shadow-md shadow-orange-500/20 hover:shadow-orange-500/30",
      secondary:
        "bg-surface hover:bg-surface text-fg border border-border-token shadow-sm",
      outline:
        "border border-border-strong hover:border-[#FA5B0F] text-fg bg-surface hover:bg-orange-50/20 shadow-sm",
      ghost:
        "text-fg-muted hover:text-fg hover:bg-surface-2",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 h-8 gap-1.5 font-mono uppercase tracking-wider rounded-lg",
      md: "text-xs px-5 py-2.5 h-10 gap-2 font-mono uppercase tracking-wider rounded-xl",
      lg: "text-sm px-7 py-3.5 h-12 gap-2.5 font-bold uppercase tracking-wider rounded-xl",
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
