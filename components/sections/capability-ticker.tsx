import type { SiteContent } from "@/content/types";

// The list is rendered twice so the loop can translate by -50%; only the first copy is announced.
export function CapabilityTicker({ content }: { content: SiteContent }) {
  const items = content.capabilities.flatMap((capability) => capability.items);
  return (
    <section className="ticker" aria-label={content.labels.capabilitiesSummary}>
      <div className="ticker-track">
        {[false, true].map((duplicate) => (
          <ul key={String(duplicate)} className="ticker-list" aria-hidden={duplicate || undefined}>
            {items.map((item) => <li key={item}>{item}<span className="ticker-star" aria-hidden="true">✺</span></li>)}
          </ul>
        ))}
      </div>
    </section>
  );
}
