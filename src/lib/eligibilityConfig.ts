import { Redis } from "@upstash/redis";

export interface EligibilityConfig {
  airtableEmbedCode: string;
}

export const DEFAULT_ELIGIBILITY_CONFIG: EligibilityConfig = {
  airtableEmbedCode: "https://airtable.com/embed/apptT80fnqdIom8dX/shrS1IcrlOucHfW5p?viewControls=on",
};

const ELIGIBILITY_KEY = "eligibility_config";

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

export async function getEligibilityConfig(): Promise<EligibilityConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_ELIGIBILITY_CONFIG;
    const data = await redis.get<Record<string, unknown>>(ELIGIBILITY_KEY);
    if (!data) return DEFAULT_ELIGIBILITY_CONFIG;
    return {
      airtableEmbedCode: typeof data.airtableEmbedCode === "string" ? data.airtableEmbedCode : DEFAULT_ELIGIBILITY_CONFIG.airtableEmbedCode,
    };
  } catch {
    return DEFAULT_ELIGIBILITY_CONFIG;
  }
}

export async function setEligibilityConfig(config: EligibilityConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(ELIGIBILITY_KEY, config);
}

export function extractEmbedSrc(input: string): string {
  if (!input.trim().startsWith("<")) return input;
  const match = input.match(/src="([^"]+)"/);
  return match?.[1] ?? input;
}
