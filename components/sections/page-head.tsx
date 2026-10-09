import { Lines } from "./lines";

/* İç sayfaların mavi giriş bölümü: etiket satırı, h1, kısa paragraf. */
export function PageHead({ kicker, year = "2026", title, lead, big = false }: { kicker: string; year?: string; title: readonly string[]; lead: string; big?: boolean }) {
  return (
    <section className="sec blue head">
      <div className="wrap">
        <div className="hrow">
          <span className="mono idx">{kicker}</span>
          <span className="mono idx">{year}</span>
        </div>
        <h1 className={big ? "disp big" : "disp"} style={{ marginTop: 18 }} data-r>
          <Lines lines={title} />
        </h1>
        <p data-r>{lead}</p>
      </div>
    </section>
  );
}
