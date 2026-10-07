"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { en } from "@/content/locales/en";
import { tr } from "@/content/locales/tr";

/* Dil klasörü içinde notFound() çağrıldığında gösterilir. */
export default function LocaleNotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/tr") ? "tr" : "en";
  const content = locale === "tr" ? tr : en;
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="sec blue head">
        <div className="wrap">
          <div className="hrow"><span className="mono idx">{content.notFound.kicker}</span></div>
          <h1 className="disp" style={{ marginTop: 18 }}><span className="ln"><span>{content.notFound.title}</span></span></h1>
          <p><Link className="cta mono" href={`/${locale}`}>{content.notFound.home}</Link></p>
        </div>
      </section>
    </main>
  );
}
