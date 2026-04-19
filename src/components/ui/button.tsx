import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-[0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-white/70 bg-white text-slate-950 shadow-[0_18px_44px_rgba(255,255,255,0.16)] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(255,255,255,0.2)] hover:bg-slate-100 focus-visible:ring-white",
        secondary:
          "border border-white/14 bg-white/6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/10 focus-visible:ring-white",
        ghost:
          "text-slate-200 hover:bg-white/6 hover:text-white focus-visible:ring-white",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-7 text-[0.95rem]",
        sm: "h-10 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
