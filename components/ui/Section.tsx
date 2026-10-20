import type { ReactNode } from "react";

export function Eyebrow({ children, className = "", as: Tag = "p" }: { children: ReactNode; className?: string; as?: "p" | "span" | "div" }) {
  return <Tag className={`eyebrow ${className}`}>{children}</Tag>;
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Heading level for the title. */
  level?: 1 | 2 | 3;
  size?: "xl" | "lg" | "md" | "sm";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

const sizeClass = {
  xl: "page-heading",
  lg: "page-heading",
  md: "section-label",
  sm: "section-label",
} as const;

export function SectionHeading({ eyebrow, title, intro, level = 2, size = "md", align = "left", className = "", id }: SectionHeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={`${sizeClass[size]} text-ivory`}>
        {title}
      </Tag>
      {intro ? <p className={`lede mt-5 prose-width ${align === "center" ? "mx-auto" : ""}`}>{intro}</p> : null}
    </div>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t rule ${className}`} />;
}

export function Section({
  children,
  className = "",
  id,
  pad = "lg",
  ariaLabelledby,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  pad?: "lg" | "sm" | "none";
  ariaLabelledby?: string;
}) {
  const padClass = pad === "lg" ? "section-pad" : pad === "sm" ? "section-pad-sm" : "";
  return (
    <section id={id} aria-labelledby={ariaLabelledby} className={`relative ${padClass} ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}
