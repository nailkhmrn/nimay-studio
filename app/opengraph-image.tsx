import { ImageResponse } from "next/og";

export const alt = "NIMAY — Independent Digital Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F3F0E8",
          color: "#11110F",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: -1.5 }}>NIMAY</span>
          <span style={{ width: 1, height: 28, backgroundColor: "rgba(17,17,15,0.28)" }} />
          <span style={{ fontSize: 18, letterSpacing: 1.6 }}>Independent Digital Studio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 156, fontWeight: 600, letterSpacing: -10, lineHeight: 0.9 }}>NIMAY</div>
          <div style={{ fontSize: 32, letterSpacing: -0.4 }}>Independent Digital Studio</div>
        </div>
        <div style={{ width: "100%", height: 1, backgroundColor: "rgba(17,17,15,0.32)" }} />
      </div>
    ),
    size,
  );
}
