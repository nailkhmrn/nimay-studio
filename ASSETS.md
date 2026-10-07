# Project assets

Six optimized WebP captures live under `public/projects/`. The homepage and the work page render the captures of projects marked `visible` in `content/shared.ts` (currently Zera Moda only); Erbay Ekinci captures stay unused while that project is hidden.

| Project | Retained files |
| --- | --- |
| Zera Moda | `zera-01-desktop.webp`, `zera-02-mobile.webp`, `zera-03-desktop.webp` |
| Erbay Ekinci | `erbay-01-desktop.webp`, `erbay-02-desktop.webp`, `erbay-03-mobile.webp` |

These assets represent concept websites, not commissioned client work. The files are kept unchanged in the repository. They were converted from desktop captures at 1440×1000 and mobile captures at 390×844 to WebP; their combined size is 1,798,668 bytes, approximately 38% smaller than the source PNGs. No source website was modified.

`public/hero-yedek.webp` (about 9 KB) is the static fallback of the WebGL hero, shown when WebGL is unavailable. It is one frame of the cobalt palette.
