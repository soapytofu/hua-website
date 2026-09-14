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

## Route organization

- Main HUA pages: `/`, `/executiveofficers`, `/calendar`, and the other public organization/resource routes
- Finance pages: `/finance`, `/leadership`, `/resources`, `/grant-application`, `/budget`, `/reports`, and related routes
- Finance administration: `/admin`
- Legacy finance URLs redirect to their integrated equivalents
