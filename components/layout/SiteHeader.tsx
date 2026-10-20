"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon, PlatformIcon } from "@/components/brand/Icons";
import { WaveMark, Wordmark } from "@/components/brand/Marks";
import { listenPlatforms, primaryNav, shell, SITE_NAME, socialPlatforms } from "@/lib/content/site";

function navActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  if (href === "/music") return pathname === "/music" || pathname.startsWith("/post/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const nav = primaryNav();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (focusable.length === 0) return;
        const firstEl = focusable[0]!;
        const lastEl = focusable[focusable.length - 1]!;
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open, close]);

  return (
    <header>
      <div
        className="fixed inset-x-0 top-0 z-50 bg-ink border-b rule"
        style={{ height: "var(--header-height)" }}
      >
        <div className="container-site flex h-full items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 text-ivory hover:text-ivory/80 transition-colors" aria-label={`${SITE_NAME} — home`} onClick={close}>
            <WaveMark className="h-8 w-auto lg:h-9" />
            <Wordmark className="h-auto w-[min(54vw,14rem)]" />
          </Link>

          <nav aria-label="Primary" className="archive-nav hidden lg:flex items-center gap-8">
            {nav.map((item) => {
              const active = navActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[0.9375rem] tracking-[0.02em] transition-colors hover:text-ivory ${active ? "text-ivory" : "text-muted"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="lg:hidden inline-flex size-11 items-center justify-center rounded-none border rule text-ivory hover:border-ivory/60"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? shell.closeNav : shell.openNav}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        hidden={!open}
        className="lg:hidden fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 overflow-y-auto bg-ink"
      >
        <div className="container-site flex min-h-full flex-col justify-between py-8">
          <nav aria-label="Primary mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={navActive(pathname, item.href) ? "page" : undefined}
                onClick={close}
                className="font-sans text-2xl font-medium leading-tight text-ivory hover:text-copper-bright border-b rule py-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10">
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {[...listenPlatforms, ...socialPlatforms].map((p) => (
                <li key={p.key}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-muted hover:text-ivory">
                    <PlatformIcon platform={p.key} className="size-4" />
                    <span className="text-sm">{p.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
