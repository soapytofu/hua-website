import { Redis } from "@upstash/redis";

export interface TimelineRow {
  semesterly: string;
  emergency: string;
}

export interface SemesterTimeline {
  title: string;
  semesterlyLabel: string;
  applicationOpens: TimelineRow;
  applicationDeadline: TimelineRow;
  revision: TimelineRow;
  finalFunding: TimelineRow;
  disbursement: TimelineRow;
  receiptDeadline: TimelineRow;
  expenseDateRanges: string;
}

export interface TimelineConfig {
  fall: SemesterTimeline;
  spring: SemesterTimeline;
}

export const TIMELINE_ROWS: { key: keyof Omit<SemesterTimeline, "title" | "semesterlyLabel" | "expenseDateRanges">; label: string }[] = [
  { key: "applicationOpens", label: "Application Opens" },
  { key: "applicationDeadline", label: "Application Deadline" },
  { key: "revision", label: "Revision" },
  { key: "finalFunding", label: "Final Funding Disbursement Decision" },
  { key: "disbursement", label: "Receive HFCU Disbursement" },
  { key: "receiptDeadline", label: "Receipt Submission Deadline" },
];

export const DEFAULT_TIMELINE: TimelineConfig = {
  fall: {
    title: "Fall 2026 Grant Cycles",
    semesterlyLabel: "Fall 2026 Semesterly",
    applicationOpens: { semesterly: "TBD", emergency: "TBD" },
    applicationDeadline: { semesterly: "TBD", emergency: "TBD" },
    revision: { semesterly: "TBD", emergency: "TBD" },
    finalFunding: { semesterly: "TBD", emergency: "TBD" },
    disbursement: { semesterly: "TBD", emergency: "TBD" },
    receiptDeadline: { semesterly: "TBD", emergency: "TBD" },
    expenseDateRanges: "TBD",
  },
  spring: {
    title: "Spring 2027 Grant Cycles",
    semesterlyLabel: "Spring 2027 Semesterly",
    applicationOpens: { semesterly: "TBD", emergency: "TBD" },
    applicationDeadline: { semesterly: "TBD", emergency: "TBD" },
    revision: { semesterly: "TBD", emergency: "TBD" },
    finalFunding: { semesterly: "TBD", emergency: "TBD" },
    disbursement: { semesterly: "TBD", emergency: "TBD" },
    receiptDeadline: { semesterly: "TBD", emergency: "TBD" },
    expenseDateRanges: "TBD",
  },
};

const TIMELINE_KEY = "timeline_config";

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

export async function getTimeline(): Promise<TimelineConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_TIMELINE;
    const data = await redis.get<TimelineConfig>(TIMELINE_KEY);
    return data ?? DEFAULT_TIMELINE;
  } catch {
    return DEFAULT_TIMELINE;
  }
}

export async function setTimeline(config: TimelineConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(TIMELINE_KEY, config);
}
