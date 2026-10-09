import { siteFacts } from "@/content/shared";
import type { SiteContent } from "@/content/types";

/* WhatsApp düğmesi. Canlı sitedeki gibi numara girilene kadar hiç gösterilmez
   (taslaktaki "Numara eklenecek" yer tutucusu canlıya taşınmaz). Nail "duruma göre kaldırırız" dedi. */
export function WhatsAppButton({ content }: { content: SiteContent }) {
  if (!siteFacts.whatsappNumber) return null;
  return (
    <a className="wa mono" id="wa" href={`https://wa.me/${siteFacts.whatsappNumber}?text=${encodeURIComponent(content.chrome.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
      {content.chrome.whatsapp}
    </a>
  );
}
