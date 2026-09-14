import { Redis } from "@upstash/redis";

export interface LinksConfig {
  paymentFormUrl: string;
  supplementalFormUrl: string;
  fundingApplicationUrl: string;
  paymentFormPassword: string;
  fundingFormPassword: string;
}

export const DEFAULT_LINKS: LinksConfig = {
  paymentFormUrl: process.env.NEXT_PUBLIC_PAYMENT_FORM_URL ?? "https://tinyurl.com/HUApayment",
  supplementalFormUrl: process.env.NEXT_PUBLIC_SUPPLEMENTAL_FORM_URL ?? "",
  fundingApplicationUrl: process.env.NEXT_PUBLIC_FUNDING_APPLICATION_URL ?? "https://airtable.com/apptT80fnqdIom8dX/shrZqQ7fIHXM2LJSd",
  paymentFormPassword: "",
  fundingFormPassword: "",
};

const LINKS_KEY = "links_config";

function getRedis() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.STORAGE_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.STORAGE_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getLinks(): Promise<LinksConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_LINKS;
    const data = await redis.get<Partial<LinksConfig>>(LINKS_KEY);
    if (!data) return DEFAULT_LINKS;
    return { ...DEFAULT_LINKS, ...data };
  } catch {
    return DEFAULT_LINKS;
  }
}

export async function setLinks(config: LinksConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(LINKS_KEY, config);
}
