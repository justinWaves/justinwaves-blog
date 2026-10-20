import Image from "next/image";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
      if (!value?.asset?._ref) return null;
      const src = urlFor(value).width(1200).url();
      return <Image src={src} alt={value.alt ?? ""} width={1200} height={800} sizes="(min-width: 768px) 680px, 94vw" className="h-auto w-full" />;
    },
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href ?? "";
      const safe = /^(https?:\/\/|mailto:|\/)/i.test(href) ? href : "#";
      const external = /^https?:\/\//i.test(safe);
      return (
        <a href={safe} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }) => <h2>{children}</h2>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
};

export function ReleaseStory({ body }: { body: PortableTextBlock[] }) {
  if (!body.length) return null;
  return (
    <div className="release-story">
      <PortableText value={body} components={components} />
    </div>
  );
}
