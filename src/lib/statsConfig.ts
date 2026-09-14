import { Redis } from "@upstash/redis";

export interface StatCard {
  label: string;
  value: string;
  sub: string;
}

export interface StatsConfig {
  cards: [StatCard, StatCard, StatCard];
}

export const DEFAULT_STATS: StatsConfig = {
  cards: [
    { label: "Budget Allocated",       value: "$2.4M",   sub: "Academic year: TBD" },
    { label: "Student Organizations",  value: "450+",    sub: "Funded this semester"  },
    { label: "Grant Applications",     value: "1,200+",  sub: "Processed annually"    },
  ],
};

const STATS_KEY = "stats_config";

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

export async function getStats(): Promise<StatsConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_STATS;
    const data = await redis.get<StatsConfig>(STATS_KEY);
    if (!data?.cards || data.cards.length !== 3) return DEFAULT_STATS;
    return data;
  } catch {
    return DEFAULT_STATS;
  }
}

export async function setStats(config: StatsConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(STATS_KEY, config);
}
