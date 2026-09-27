"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";

export function LocaleSwitcher({ locale, ariaLabel = "Language" }: { locale: Locale; ariaLabel?: string }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [hash, setHash] = useState("");
  useEffect(() => {
    const syncUrl = () => { setQuery(window.location.search); setHash(window.location.hash); };
    syncUrl();
    window.addEventListener("hashchange", syncUrl);
    return () => window.removeEventListener("hashchange", syncUrl);
  }, [pathname]);
  const localizedPath = (nextLocale: Locale) => {
    const path = pathname.replace(/^\/(en|tr)(?=\/|$)/, `/${nextLocale}`) || `/${nextLocale}`;
    return `${path}${query}${hash}`;
  };
  return <div className="locale-switcher" aria-label={ariaLabel}>{(["tr", "en"] as const).map((nextLocale, index) => <span key={nextLocale} className="locale-switcher-item">{index > 0 && <span aria-hidden="true"> / </span>}<Link href={localizedPath(nextLocale)} aria-current={locale === nextLocale ? "page" : undefined} className="locale-link">{nextLocale.toUpperCase()}</Link></span>)}</div>;
}
