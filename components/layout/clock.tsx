"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/* Türkiye saati. Tarayıcıda hazır olana kadar hiçbir şey çizmez (sahte 00:00 görünmez).
   "before" metni (örn. " · ") yalnızca saat göründüğünde, saatle birlikte çizilir. */
export function Clock({ as: Tag = "span", prefix = "", before = "", interval = 30000, className, id, style, ariaHidden }: { as?: "span" | "b"; prefix?: string; before?: string; interval?: number; className?: string; id?: string; style?: CSSProperties; ariaHidden?: boolean }) {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }));
    const first = window.setTimeout(tick, 0);
    const h = setInterval(tick, interval);
    return () => {
      clearTimeout(first);
      clearInterval(h);
    };
  }, [interval]);
  if (t === null) return null;
  return (
    <>
      {before}
      <Tag className={className} id={id} style={style} aria-hidden={ariaHidden}>
        {prefix + t}
      </Tag>
    </>
  );
}
