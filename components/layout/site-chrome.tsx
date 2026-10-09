"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeControl } from "@/components/theme/theme-control";
import type { Locale, PageKey, SiteContent } from "@/content/types";
import { pagePath } from "@/lib/routes";
import type { Theme } from "@/lib/theme";
import { LocaleSwitch } from "./locale-switch";

const pill: Exclude<PageKey, "privacy" | "contact">[] = ["work", "services", "process", "about"];

/* Üst gezinme çubuğu ve mobil tam ekran menü. Ana sayfada saat var, menü 860 px altında devreye girer;
   iç sayfalarda 980 px (taslaktaki değerler). */
export function SiteChrome({ locale, content, theme, home = false }: { locale: Locale; content: SiteContent; theme: Theme; home?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const limit = home ? 860 : 980;
  const c = content.chrome;

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const size = () => {
      if (innerWidth > limit) setOpen(false);
    };
    addEventListener("keydown", key);
    addEventListener("resize", size);
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("resize", size);
    };
  }, [limit]);

  const cur = (href: string) => (pathname === href ? ("page" as const) : undefined);
  const menu: { href: string; label: string }[] = [
    { href: pagePath(locale), label: c.nav.home },
    ...pill.map((k) => ({ href: pagePath(locale, k), label: c.nav[k] })),
    { href: pagePath(locale, "contact"), label: c.nav.contact },
  ];

  return (
    <>
      <header className="nav">
        <Link className="logo" href={home ? "#top" : pagePath(locale)} aria-label={c.logoAria}>
          NIMAY
        </Link>
        <nav className="pill mono" aria-label={c.navAria}>
          {pill.map((k) => (
            <Link key={k} href={pagePath(locale, k)} aria-current={home ? undefined : cur(pagePath(locale, k))}>
              {c.nav[k]}
            </Link>
          ))}
        </nav>
        <div className="navr">
          <LocaleSwitch locale={locale} ariaLabel={c.language} />
          <ThemeControl initial={theme} labels={c} />
          <Link className="cta mono" href={pagePath(locale, "contact")}>
            {c.cta}
          </Link>
          <button className="menubtn mono" id="menubtn" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
            {open ? c.close : c.menu}
          </button>
        </div>
      </header>
      <nav className={"menu" + (open ? " open" : "")} id="menu" aria-label={c.mobileNavAria}>
        {menu.map((l) => (
          <Link key={l.href} href={l.href} aria-current={cur(l.href)} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <span className="mono">{c.menuCaption}</span>
      </nav>
    </>
  );
}
