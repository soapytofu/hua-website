# Harvard Undergraduate Association Website

Unified public website for the Harvard Undergraduate Association and the HUA Finance Team. The application combines the original HUA site with the finance application from [`HUAtreasurer/HUA-Finance-Website`](https://github.com/HUAtreasurer/HUA-Finance-Website).

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- NextAuth with Google sign-in for protected funding and admin routes
- Upstash Redis / Vercel KV-compatible configuration storage

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The main HUA site is at `/`; the Finance Team landing page is at `/finance`.

Run production checks with:

```bash
npm run lint
npm run build
```

## Production configuration

Public pages render with built-in defaults. To enable Google authentication and persistent admin-managed content, configure:

- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (or the compatible `STORAGE_REDIS_*` / `KV_REST_API_*` pair)
- `NEXT_PUBLIC_BASE_URL`

Optional public form overrides are `NEXT_PUBLIC_PAYMENT_FORM_URL`, `NEXT_PUBLIC_SUPPLEMENTAL_FORM_URL`, and `NEXT_PUBLIC_FUNDING_APPLICATION_URL`.

To enable Google Analytics, set `NEXT_PUBLIC_GA_ID` to the site’s GA4 measurement ID (for example, `G-XXXXXXXXXX`). Analytics scripts are omitted when the variable is unset.

### Automatic Instagram feeds

The homepage and Finance leadership page request the latest four posts through the server-side Instagram API and refresh their cached feed every 15 minutes. Configure the professional Instagram accounts with:

- `INSTAGRAM_HUA_ACCESS_TOKEN` and `INSTAGRAM_HUA_USER_ID`
- `INSTAGRAM_FINANCE_ACCESS_TOKEN` and `INSTAGRAM_FINANCE_USER_ID`

Tokens are never sent to the browser. `INSTAGRAM_GRAPH_API_BASE_URL` can optionally override the default `https://graph.instagram.com` API host. If credentials are missing, expired, or the API is unavailable, each section automatically keeps showing its four configured fallback images.

## Route organization

- Main HUA pages: `/`, `/executiveofficers`, `/calendar`, and the other public organization/resource routes
- Finance pages: `/finance`, `/leadership`, `/resources`, `/grant-application`, `/budget`, `/reports`, and related routes
- Finance administration: `/admin`
- Legacy finance URLs redirect to their integrated equivalents
