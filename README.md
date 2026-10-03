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

**Structural Editorial** — a restrained editorial system combining strong grid structure, serif display typography and functional digital UI.

## Selected Work

- [Zera Moda](https://zera-moda-demo.vercel.app) — Concept Website
- [Erbay Ekinci](https://erbay-ekinci-haute-couture.vercel.app) — Concept Website

Both are concept projects created to demonstrate digital design direction. They are not commissioned client work.

## Key Features

- Responsive editorial grid and page layout
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

The project interface assets are retained for a future portfolio or case-study phase; the current homepage presents Selected Work without project imagery. See [ASSETS.md](ASSETS.md) for asset notes.
