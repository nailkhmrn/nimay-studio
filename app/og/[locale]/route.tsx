import { ImageResponse } from "next/og";
import { getSiteContent, isLocale } from "@/lib/i18n";

const size = { width: 1200, height: 630 };

// Yeni tasarımın kobalt paleti; ImageResponse CSS değişkenlerini okuyamadığı için sabit yazıldı.
const colors = { bg: "#2B22FF", fg: "#F4F2FF", acc: "#D8FF3C" };

// Google Fonts, tarayıcı kimliği olmayan istemcilere ImageResponse'un okuyabildiği TTF verir.
async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

/* Paylaşım görseli. Canlı sitedeki adres (/tr/opengraph-image) next.config.ts içinde bu yola yönlendirilir. */
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : "en";
  const content = getSiteContent(lang);
  // Büyük harf kodda yapılır: ImageResponse text-transform Türkçe noktalı İ'yi tanımaz.
  const [kicker, location] = [content.metadata.kicker, content.metadata.location].map((label) => label.toLocaleUpperCase(lang));
  const title = content.home.heroTitle.join(" ");
  const [display, mono] = await Promise.all([
    loadGoogleFont("Archivo", 800, `NIMAY®${title}`),
    loadGoogleFont("DM+Mono", 400, `${kicker}${location}`),
  ]);
  const fonts = [
    ...(display ? [{ name: "Archivo", data: display, weight: 800 as const, style: "normal" as const }] : []),
    ...(mono ? [{ name: "DM Mono", data: mono, weight: 400 as const, style: "normal" as const }] : []),
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", padding: "56px 64px", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: colors.bg, color: colors.fg, fontFamily: "Archivo, Arial, sans-serif", borderBottom: `12px solid ${colors.acc}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "DM Mono, monospace", fontSize: 20, letterSpacing: 0.8, color: colors.acc }}>
          <span>{kicker}</span>
          <span>{location}</span>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 0.98, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "flex-start", fontSize: 64, fontWeight: 800, letterSpacing: -4, lineHeight: 1, color: colors.acc }}>
          NIMAY<span style={{ fontSize: 26, marginLeft: 4, marginTop: 6 }}>®</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
