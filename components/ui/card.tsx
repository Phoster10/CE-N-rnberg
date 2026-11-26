import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-navy-100/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className
      )}
      {...props}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-14 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <span className={cn("eyebrow", dark && "text-gold-400")}>{eyebrow}</span>}
      <h2 className={cn("container-heading mt-4", dark && "text-white")}>{title}</h2>
      {description && (
        <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-navy-200" : "text-navy-500")}>{description}</p>
      )}
    </div>
  );
}
