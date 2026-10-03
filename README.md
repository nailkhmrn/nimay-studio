# NIMAY

Independent digital studio designing and building custom websites.

## Overview

NIMAY is an independent digital studio based in Türkiye. This repository contains the studio website, built around a concise editorial presentation of its work and practice.

## Live Site

[nimaystudio.com](https://nimaystudio.com)

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel

## Design Direction

**Studio v2** — oversized Bricolage Grotesque display type, JetBrains Mono labels, 2px outlines, pill controls and hard offset shadows. Two approved themes share one structure: light (orange accent) and dark (peach accent). Theme tokens live in `app/globals.css`.

## Selected Work

- [Zera Moda](https://zera-moda-demo.vercel.app) — Concept Website
- [Erbay Ekinci](https://erbay-ekinci-haute-couture.vercel.app) — Concept Website

Both are concept projects created to demonstrate digital design direction. They are not commissioned client work.

## Key Features

- Responsive layout built on flex-wrap and fluid type
- Light and dark themes (system preference, or a saved choice in the `nimay-theme-v1` cookie)
- Accessible desktop and mobile navigation
- Reduced-motion support
- Production SEO metadata and Open Graph metadata
- Sitemap and robots.txt

## Local Development

Requires Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Available checks and production build:

```bash
npm run lint
npm run typecheck
npm run build
```

There is currently no test script configured in `package.json`.

## Project Structure

```text
app/          App Router pages, global styles, metadata and SEO routes
components/   Shared layout, navigation, project and section components
content/      Navigation, studio and project content
lib/          Metadata helpers
public/       Favicon and retained project interface assets
```

The homepage shows captures of visible projects in Selected Work and in the hero. See [ASSETS.md](ASSETS.md) for asset notes.
