import Link from "next/link";
import { Lines } from "./lines";

/* Sayfa sonundaki mavi kapanış şeridi. */
export function CtaStrip({ lines, cta, note, href }: { lines: readonly string[]; cta: string; note: string; href: string }) {
  return (
    <section className="sec blue">
      <div className="wrap">
        <h2 className="disp big" style={{ margin: 0 }} data-r>
          <Lines lines={lines} />
        </h2>
        <div className="cwrap2" data-r>
          <Link className="cta mono" href={href}>
            {cta}
          </Link>
          <p className="mono">{note}</p>
        </div>
      </div>
    </section>
  );
}
