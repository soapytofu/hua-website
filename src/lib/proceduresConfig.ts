import { Redis } from "@upstash/redis";

export interface ProceduresConfig {
  pdfBase64: string;
}

export const DEFAULT_PROCEDURES_CONFIG: ProceduresConfig = { pdfBase64: "" };

const PROCEDURES_KEY = "procedures_pdf_v1";

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

export async function getProcedures(): Promise<ProceduresConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_PROCEDURES_CONFIG;
    const data = await redis.get<Record<string, unknown>>(PROCEDURES_KEY);
    if (!data) return DEFAULT_PROCEDURES_CONFIG;
    return { pdfBase64: typeof data.pdfBase64 === "string" ? data.pdfBase64 : "" };
  } catch {
    return DEFAULT_PROCEDURES_CONFIG;
  }
}

export async function setProcedures(config: ProceduresConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(PROCEDURES_KEY, config);
}
