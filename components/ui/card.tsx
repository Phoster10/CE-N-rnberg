import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-shadow hover:shadow-soft",
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
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="container-heading mt-3">{title}</h2>
      {description && <p className="mt-4 text-navy-500">{description}</p>}
    </div>
  );
}
