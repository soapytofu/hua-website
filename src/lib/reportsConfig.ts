import { Redis } from "@upstash/redis";

export interface Report {
  id: string;
  title: string;
  type: string;
  semester: string;
  date: string;
  url: string;
  description: string;
}

export interface ReportsConfig {
  reports: Report[];
}

const REPORTS_KEY = "reports_config";

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

export async function getReports(): Promise<ReportsConfig> {
  try {
    const redis = getRedis();
    if (!redis) return { reports: [] };
    const data = await redis.get<ReportsConfig>(REPORTS_KEY);
    return { reports: data?.reports ?? [] };
  } catch {
    return { reports: [] };
  }
}

export async function setReports(config: ReportsConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(REPORTS_KEY, config);
}
