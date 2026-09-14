import { Redis } from "@upstash/redis";

export interface BudgetConfig {
  embedCode: string;
  yearLabel: string;
}

export const DEFAULT_BUDGET: BudgetConfig = {
  embedCode: "",
  yearLabel: "Academic Year 2024–25 · Last updated June 2025",
};

const BUDGET_KEY = "budget_config";

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

export async function getBudget(): Promise<BudgetConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_BUDGET;
    const data = await redis.get<BudgetConfig>(BUDGET_KEY);
    return { ...DEFAULT_BUDGET, ...data };
  } catch {
    return DEFAULT_BUDGET;
  }
}

export async function setBudget(config: BudgetConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(BUDGET_KEY, config);
}
