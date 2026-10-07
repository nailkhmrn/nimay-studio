import { Archivo, DM_Mono } from "next/font/google";

/* Yazı tipleri build sırasında indirilir ve siteden sunulur, tarayıcı Google'a bağlanmaz.
   Archivo: değişken, genişlik (wdth) ve ağırlık eksenleriyle. DM Mono: 400 ve 500. */
export const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], display: "swap", variable: "--font-archivo" });
export const dmMono = DM_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], display: "swap", variable: "--font-dm-mono" });
export const fontVariables = `${archivo.variable} ${dmMono.variable}`;
