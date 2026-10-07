/* Satır satır açılan başlık: her satır .ln > span (taslaktaki yapı). */
export function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((l) => (
        <span className="ln" key={l}>
          <span>{l}</span>
        </span>
      ))}
    </>
  );
}

/* İki satırlı bölüm başlığı: satır sonu <br> ile ayrılır (taslaktaki h2 yapısı). */
export function BrLines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l}>
          {i > 0 && <br />}
          {l}
        </span>
      ))}
    </>
  );
}
