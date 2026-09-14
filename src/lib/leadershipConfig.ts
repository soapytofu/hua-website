import { Redis } from "@upstash/redis";
import { Leader, leaders as DEFAULT_LEADERS } from "@/data/leadership";

const LEADERSHIP_KEY = "leadership_config";

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

export async function getLeaders(): Promise<Leader[]> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_LEADERS;
    const data = await redis.get<Leader[]>(LEADERSHIP_KEY);
    return Array.isArray(data) && data.length > 0 ? data : DEFAULT_LEADERS;
  } catch {
    return DEFAULT_LEADERS;
  }
}

export async function setLeaders(leaders: Leader[]): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(LEADERSHIP_KEY, leaders);
}
