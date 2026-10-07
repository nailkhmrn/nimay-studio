import type { SiteContent } from "@/content/types";

/* Süreç sayfasındaki ve ana sayfadaki dört adım görseli. Oynatma lib/effects/viz.ts içinde (data-at, data-n).
   Görseller aria-hidden süstür; metinleri dile göre content.viz içinden gelir. */
type Props = { step?: boolean; t: SiteContent["viz"] };
const cls = (step?: boolean) => (step ? "viz stepviz" : "viz");

export function VizBrief({ step, t }: Props) {
  return (
    <div className={cls(step)} data-n="5" aria-hidden="true">
      <div className="vin">
        <div className="vh mono">
          <span>{t.brief.file}</span>
          <span className="ap vok" data-at="4">
            {t.brief.done}
          </span>
        </div>
        {t.brief.rows.map(([label, value], i) => (
          <div className="vl ap" data-at={i} key={label}>
            <span className="mono">{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VizDesign({ step, t }: Props) {
  return (
    <div className={cls(step)} data-n="5" aria-hidden="true">
      <div className="vin">
        <div className="vscreen" data-at="1">
          <div className="wnav">
            <span className="wlogo"></span>
            <span className="wns">
              <span className="wn"></span>
              <span className="wn"></span>
              <span className="wn"></span>
            </span>
          </div>
          <div className="wcols">
            <div className="wtxt">
              <span className="wh" style={{ width: "90%" }}></span>
              <span className="wh" style={{ width: "62%" }}></span>
              <span className="wp"></span>
              <span className="wp" style={{ width: "56%" }}></span>
              <span className="wbtn" data-at="3"></span>
            </div>
            <div className="wimg" data-at="2"></div>
          </div>
        </div>
        <div className="vtags mono">
          {([0, 2, 4] as const).map((at, i) => (
            <span className="ap" data-at={at} key={at}>
              {t.design.tags[i]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VizCode({ step, t }: Props) {
  return (
    <div className={cls(step)} data-n="6" aria-hidden="true">
      <div className="vin">
        <div className="vcode">
          <div className="ap" data-at="0">
            <i>1</i>
            <em>export default</em>
            {" function Page() {"}
          </div>
          <div className="ap" data-at="1">
            <i>2</i>
            {"  return <Hero />"}
          </div>
          <div className="ap" data-at="2">
            <i>3</i>
            {"}"}
          </div>
          <div className="ap" data-at="3">
            <i>4</i>
            <em>export const</em>
            {" metadata = {"}
          </div>
          <div className="ap" data-at="4">
            <i>5</i>
            {`  title: "${t.code.title}"`}
          </div>
        </div>
        <div className="vmeter">
          <div className="mrow mono">
            <span>{t.code.meter}</span>
            <b className="ap" data-at="5">
              {t.code.ready}
            </b>
          </div>
          <div className="mbar">
            <div className="mfill"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VizLive({ step, t }: Props) {
  return (
    <div className={cls(step)} data-n="5" aria-hidden="true">
      <div className="vin">
        <div className="vchk">
          {t.live.checks.map((label, i) => (
            <div className="ci" key={label}>
              <i data-at={i}></i>
              <span data-at={i}>{label}</span>
            </div>
          ))}
        </div>
        <div className="vlive ap" data-at="4">
          {t.live.live}
        </div>
      </div>
    </div>
  );
}
