import { Redis } from "@upstash/redis";

export interface ReceiptsConfig {
  airtableUrl: string;
  instructionsUrl: string;
}

export const DEFAULT_RECEIPTS_CONFIG: ReceiptsConfig = {
  airtableUrl: "",
  instructionsUrl: "",
};

// v2 key avoids reading old data that had a large base64 PDF stored under the original key
const RECEIPTS_KEY = "receipts_config_v2";

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

export async function getReceiptsConfig(): Promise<ReceiptsConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_RECEIPTS_CONFIG;
    const data = await redis.get<Record<string, unknown>>(RECEIPTS_KEY);
    if (!data) return DEFAULT_RECEIPTS_CONFIG;
    return {
      airtableUrl: typeof data.airtableUrl === "string" ? data.airtableUrl : "",
      instructionsUrl: typeof data.instructionsUrl === "string" ? data.instructionsUrl : "",
    };
  } catch {
    return DEFAULT_RECEIPTS_CONFIG;
  }
}

export async function setReceiptsConfig(config: ReceiptsConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(RECEIPTS_KEY, config);
}
