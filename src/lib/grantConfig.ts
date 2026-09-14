import { Redis } from "@upstash/redis";

export interface GrantTypeConfig {
  name: string;
  available: boolean;
}

export interface GrantConfig {
  semesterly: GrantTypeConfig;
  emergency: GrantTypeConfig;
}

export const DEFAULT_GRANT_CONFIG: GrantConfig = {
  semesterly: { name: "Semesterly Grant", available: true },
  emergency: { name: "Emergency Grant", available: true },
};

const CONFIG_KEY = "grant_config";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
    || process.env.STORAGE_REDIS_REST_URL
    || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
    || process.env.STORAGE_REDIS_REST_TOKEN
    || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getGrantConfig(): Promise<GrantConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_GRANT_CONFIG;
    const config = await redis.get<GrantConfig>(CONFIG_KEY);
    return config ?? DEFAULT_GRANT_CONFIG;
  } catch {
    return DEFAULT_GRANT_CONFIG;
  }
}

export async function setGrantConfig(config: GrantConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(CONFIG_KEY, config);
}
