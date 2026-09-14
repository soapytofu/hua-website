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
    title: "Fall 2025 Grant Cycles",
    semesterlyLabel: "Fall 2025 Semesterly",
    applicationOpens: { semesterly: "September 18th, 2025", emergency: "October 7th, 2025" },
    applicationDeadline: { semesterly: "September 28th, 2025 at 11:59 pm EST", emergency: "December 3rd, 2025 at 11:59 pm EST" },
    revision: { semesterly: "September 29th – October 6th", emergency: "Within a week" },
    finalFunding: { semesterly: "By October 7th, 2025 at 11:59 pm EST", emergency: "Within a week" },
    disbursement: { semesterly: "Week of October 7th, 2025", emergency: "Within a week" },
    receiptDeadline: { semesterly: "December 9th, 2025 by 11:59 pm EST", emergency: "Two weeks after the expense unless communicated" },
    expenseDateRanges: "Events & Expenses: Sept. 7th – Dec. 9th\nSocial Events: Sept. 7th – Dec. 3rd",
  },
  spring: {
    title: "Spring 2026 Grant Cycles",
    semesterlyLabel: "Spring 2026 Semesterly",
    applicationOpens: { semesterly: "January 29th, 2026", emergency: "February 23rd, 2026" },
    applicationDeadline: { semesterly: "February 8th, 2026 at 11:59 pm EST", emergency: "April 30th, 2026" },
    revision: { semesterly: "February 9 – February 23", emergency: "Within a week" },
    finalFunding: { semesterly: "February 23", emergency: "Within a week" },
    disbursement: { semesterly: "Week of October 24th, 2026", emergency: "Within a week" },
    receiptDeadline: { semesterly: "May 6th, 2026 at 11:59 pm EST", emergency: "Two weeks after the expense unless communicated" },
    expenseDateRanges: "Events & Expenses: Jan. 26th – May 3rd\nSocial Events: Jan. 26th – May 3rd",
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
