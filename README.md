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
- Plain CSS (two stylesheets: `styles/home.css` for the homepage, `styles/site.css` for inner pages)
- Server Actions with zod validation, Cloudflare Turnstile and Upstash rate limiting for the contact form
- Vercel

## Design Direction

**Studio v3** — cobalt and lime. Oversized condensed Archivo display type, DM Mono labels, a WebGL hero, calm slow motion. Two palettes share one structure: cobalt (default) and night. The light/dark switch in the header keeps the existing `nimay-theme-v1` cookie (`light` = cobalt, `dark` = night). Palette tokens live at the top of `styles/site.css` and `styles/home.css`.

## Selected Work

- [Zera Moda](https://zera-moda-demo.vercel.app) — Concept Website

Zera Moda is a concept project created to demonstrate digital design direction. It is not commissioned client work. Erbay Ekinci stays hidden (`visible: false` in `content/shared.ts`) until the business agrees to be shown.

## Key Features

- Turkish and English (`/tr`, `/en`) with localized page addresses (`/tr/isler`, `/en/work`, ...). Page folders use the Turkish names; English addresses are rewritten in `next.config.ts` (see `lib/routes.ts`)
- Old single-page addresses (`/work`, `/studio`, `/contact`, `/services`, `/privacy`) redirect permanently to the new pages
- Optional GA4 analytics behind an explicit consent choice
- Contact form (`app/actions/contact.ts`): server-side validation, honeypot, Turnstile, rate limit, email delivery
- Strict CSP with a per-request nonce (`proxy.ts`, `lib/csp.ts`) and security headers
- Reduced-motion support; canvas and WebGL pause off-screen
- Sitemap with hreflang alternates, robots.txt, Open Graph image, JSON-LD

## Environment

Copy `.env.example` to `.env.local`. Without the contact-form variables the form fails closed in production.

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
app/(home)    Homepage root layout
app/(inner)   Inner pages root layout (work, services, process, about, contact, privacy)
app/actions   Contact form server action
components/   Layout, sections, homepage and form components
content/      TR/EN text (content/locales), projects and site facts
lib/          Routes, SEO, CSP, contact form logic, effects (reveal, WebGL, canvas)
styles/       home.css and site.css
public/       Favicon, project captures and the static hero fallback
```

The work pages show captures of visible projects. See [ASSETS.md](ASSETS.md) for asset notes.
