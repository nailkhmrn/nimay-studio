import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "#2B22FF" }}>
        <svg width="180" height="180" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#2B22FF" />
          <path d="M8 24V8h3l10 12V8h3v16h-3L11 12v12Z" fill="#D8FF3C" />
        </svg>
      </div>
    ),
    size,
  );
}
