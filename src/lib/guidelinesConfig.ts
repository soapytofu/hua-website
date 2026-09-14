import { Redis } from "@upstash/redis";

export interface GuidelinesConfig {
  pdfUrl: string; // base64 data URL
}

export const DEFAULT_GUIDELINES: GuidelinesConfig = { pdfUrl: "" };

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
