"use client";

import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/types";
import { switchLocalePath } from "@/lib/routes";

/* Dil değiştirici: aynı sayfanın diğer dildeki karşılığına gider. */
export function LocaleSwitch({ locale, ariaLabel }: { locale: Locale; ariaLabel: string }) {
  const pathname = usePathname();
  return (
    <div className="lang mono" role="group" aria-label={ariaLabel}>
      {(["tr", "en"] as const).map((next, i) => (
        <Fragment key={next}>
          {i > 0 && <span aria-hidden="true">/</span>}
          <Link href={switchLocalePath(pathname, next)} hrefLang={next} lang={next} aria-current={locale === next ? "true" : undefined}>
            {next.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
