import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-4xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      {...props}
    >
      {badge && (
        <div className="mb-3">
          <Badge variant="orange">{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-[#F5F8FC] leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#AABAC8] leading-relaxed font-light max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
