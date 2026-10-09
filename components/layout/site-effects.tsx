"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { browserFrames } from "@/lib/effects/mocks";
import { magnetic } from "@/lib/effects/magnetic";
import { navTone } from "@/lib/effects/navTone";
import { reveal } from "@/lib/effects/reveal";
import { scrollTop } from "@/lib/effects/scrollTop";
import { viz } from "@/lib/effects/viz";

/* İç sayfaların ortak betiği (taslaktaki site.js). Sayfa değişince yeniden bağlanır. */
export function SiteEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const offs = [scrollTop(), reveal(0.15), navTone("main > section"), browserFrames(), viz(), magnetic()];
    return () => offs.forEach((o) => o());
  }, [pathname]);
  return null;
}
