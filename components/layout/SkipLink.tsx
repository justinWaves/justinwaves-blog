import { shell } from "@/lib/content/site";

export function SkipLink() {
  return (
    <a href="#content" className="skip-link">
      {shell.skipLink}
    </a>
  );
}
