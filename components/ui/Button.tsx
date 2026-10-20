import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowIcon, ExternalIcon } from "@/components/brand/Icons";

type Variant = "primary" | "outline" | "ghost" | "link";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-ivory text-ink hover:bg-ivory/90 active:bg-ivory/80 border border-transparent",
  outline:
    "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/5",
  ghost: "text-ivory hover:text-copper-bright border border-transparent",
  link: "text-copper-bright hover:text-ivory underline-offset-4 hover:underline px-0 min-h-0",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

export type ButtonProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  /** Show a trailing arrow (internal) or external icon. */
  icon?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  href,
  variant = "primary",
  size = "md",
  external,
  icon = variant === "link",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 font-mono uppercase font-medium tracking-[0.04em] transition-colors duration-200 rounded-none select-none",
    variants[variant],
    variant === "link" ? "" : sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isExternal = external ?? (href ? /^(https?:|mailto:)/.test(href) : false);
  const trailing = icon ? (
    isExternal ? <ExternalIcon className="size-4 shrink-0" /> : <ArrowIcon className="size-4 shrink-0" />
  ) : null;

  if (href) {
    if (isExternal) {
      return (
        <a href={href} className={classes} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>
          {children}
          {trailing}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        {trailing}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
      {trailing}
    </button>
  );
}
