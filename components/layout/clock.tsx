"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/* Türkiye saati. İlk çizimde 00:00, bağlandıktan sonra gerçek saat (taslaktaki canlı saat). */
export function Clock({ as: Tag = "span", prefix = "", interval = 30000, className, id, style, ariaHidden }: { as?: "span" | "b"; prefix?: string; interval?: number; className?: string; id?: string; style?: CSSProperties; ariaHidden?: boolean }) {
  const [t, setT] = useState("00:00");
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }));
    const first = window.setTimeout(tick, 0);
    const h = setInterval(tick, interval);
    return () => {
      clearTimeout(first);
      clearInterval(h);
    };
  }, [interval]);
  return (
    <Tag className={className} id={id} style={style} aria-hidden={ariaHidden}>
      {prefix + t}
    </Tag>
  );
}
