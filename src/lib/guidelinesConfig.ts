import { Redis } from "@upstash/redis";

export interface GuidelinesConfig {
  pdfUrl: string; // base64 PDF data URL or an official external document URL
}

export const DEFAULT_GUIDELINES: GuidelinesConfig = {
  pdfUrl: "https://docs.google.com/document/d/1tSyPoyGRZW6guvn350uiaZcWsh3Y75PIsEM__ggp_ig/preview",
};

const GUIDELINES_KEY = "guidelines_config";

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

export async function getGuidelines(): Promise<GuidelinesConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_GUIDELINES;
    const data = await redis.get<GuidelinesConfig>(GUIDELINES_KEY);
    return data ?? DEFAULT_GUIDELINES;
  } catch {
    return DEFAULT_GUIDELINES;
  }
}

export async function setGuidelines(config: GuidelinesConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(GUIDELINES_KEY, config);
}
