import { ImageResponse } from "next/og";
import { getSiteContent, isLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Light theme palette; kept literal because ImageResponse cannot read CSS custom properties.
const colors = { accent: "#FF4A1C", ink: "#0D0D0D", bone: "#F4F1EA" };

// Google Fonts serves TTF to clients without a browser user agent, which ImageResponse can parse.
async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = isLocale(locale) ? getSiteContent(locale) : getSiteContent("en");
  // Uppercase in code: ImageResponse text-transform ignores the Turkish dotted İ.
  const [kicker, location] = [content.hero.kicker, content.hero.location].map((label) => label.toLocaleUpperCase(isLocale(locale) ? locale : "en"));
  const title = `${content.hero.title.before}${content.hero.title.emphasis}${content.hero.title.after}`;
  const [display, mono] = await Promise.all([
    loadGoogleFont("Bricolage+Grotesque", 800, `NIMAY®${title}`),
    loadGoogleFont("JetBrains+Mono", 400, `${kicker}${location}`),
  ]);
  const fonts = [
    ...(display ? [{ name: "Bricolage Grotesque", data: display, weight: 800 as const, style: "normal" as const }] : []),
    ...(mono ? [{ name: "JetBrains Mono", data: mono, weight: 400 as const, style: "normal" as const }] : []),
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", padding: "56px 64px", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: colors.accent, color: colors.ink, fontFamily: "Bricolage Grotesque, Arial, sans-serif", borderBottom: `12px solid ${colors.ink}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 20, letterSpacing: 0.8 }}>
          <span>{kicker}</span>
          <span>{location}</span>
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 0.93, letterSpacing: -5 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "flex-start", fontSize: 64, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
          NIMAY<span style={{ fontSize: 26, marginLeft: 4, marginTop: 6 }}>®</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
