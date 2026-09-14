// ─── Semester Links ───────────────────────────────────────────────────────────
// To update these URLs: go to vercel.com → your project → Settings → Environment Variables

export const PAYMENT_FORM_URL =
  process.env.NEXT_PUBLIC_PAYMENT_FORM_URL ?? "https://tinyurl.com/HUApayment";

export const SUPPLEMENTAL_FORM_URL =
  process.env.NEXT_PUBLIC_SUPPLEMENTAL_FORM_URL ?? "SUPPLEMENTAL_FORM_DOWNLOAD_URL";

export const FUNDING_APPLICATION_URL =
  process.env.NEXT_PUBLIC_FUNDING_APPLICATION_URL ??
  "https://airtable.com/apptT80fnqdIom8dX/shrZqQ7fIHXM2LJSd";
