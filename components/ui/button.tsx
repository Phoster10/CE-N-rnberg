import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold-gradient text-navy-950 font-semibold shadow-glow hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(217,155,31,0.35),0_14px_40px_-10px_rgba(217,155,31,0.6)] active:translate-y-0",
  secondary:
    "bg-navy-900 text-white font-semibold shadow-soft hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift active:translate-y-0",
  outline:
    "border border-white/25 text-white font-medium backdrop-blur-sm hover:border-white/50 hover:bg-white/10",
  ghost: "text-navy-800 font-medium hover:bg-navy-50",
  light:
    "border border-navy-200 bg-white text-navy-900 font-semibold hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-card active:translate-y-0",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[15px]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  target?: string;
  rel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, target, rel, children, ...props }, ref) => {
    const classes = cn(
      "group/btn inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 disabled:pointer-events-none disabled:opacity-60",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes} target={target} rel={rel}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
