import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import "@/styles/site.css";

export const metadata: Metadata = { metadataBase: new URL("https://nimaystudio.com"), title: "404 — NIMAY Studio", robots: { index: false } };

/* Hiçbir rotayla eşleşmeyen adresler için (birden fazla kök layout olduğundan gerekli). Eski sitedeki gibi İngilizce. */
export default function GlobalNotFound() {
  return (
    <html lang="en" data-pal="kobalt" className={fontVariables}>
      <body>
        <main>
          <section className="sec blue head">
            <div className="wrap">
              <div className="hrow"><span className="mono idx">NIMAY STUDIO / 404</span></div>
              <h1 className="disp" style={{ marginTop: 18 }}><span className="ln"><span>Page not found.</span></span></h1>
              <p><Link className="cta mono" href="/en">Return home</Link></p>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
