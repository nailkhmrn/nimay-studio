"use client";

import { useEffect } from "react";
import { homeEffects } from "@/lib/home";

/* Ana sayfanın betiğini bağlar (taslaktaki index.html içindeki betik). */
export function HomeEffects() {
  useEffect(() => homeEffects(), []);
  return null;
}
