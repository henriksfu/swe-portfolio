import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";

type LinkButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
  showArrow?: boolean;
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary: "link-button-primary",
  secondary: "link-button-secondary",
  quiet: "link-button-quiet",
};

export function LinkButton({
  children,
  className,
  href,
  showArrow = true,
  variant = "primary",
}: LinkButtonProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  return (
    <Link
      href={href}
      className={cn(
        "link-button focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-full border px-5 text-[0.8rem] font-semibold transition-all duration-400 hover:-translate-y-0.5",
        variants[variant],
        className,
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      {showArrow ? <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> : null}
    </Link>
  );
}
