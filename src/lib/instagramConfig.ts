import { Redis } from "@upstash/redis";

export interface InstagramPhoto {
  imageUrl: string;
  alt: string;
}

export interface InstagramConfig {
  handle: string;
  profileUrl: string;
  profileImageUrl: string;
  photos: [InstagramPhoto, InstagramPhoto, InstagramPhoto, InstagramPhoto];
}

export const DEFAULT_INSTAGRAM: InstagramConfig = {
  handle: "@HUAFinance",
  profileUrl: "https://www.instagram.com/HUAFinance",
  profileImageUrl: "",
  photos: [
    { imageUrl: "/insta1.jpg",    alt: "HUA Finance Team at Annenberg" },
    { imageUrl: "/annen1.jpg",    alt: "Annenberg Hall" },
    { imageUrl: "/insta2.jpg",    alt: "HUA Finance Team on campus" },
    { imageUrl: "/jharvard.webp", alt: "John Harvard statue" },
  ],
};

const INSTAGRAM_KEY = "instagram_config";

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

export async function getInstagram(): Promise<InstagramConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_INSTAGRAM;
    const data = await redis.get<InstagramConfig>(INSTAGRAM_KEY);
    if (!data) return DEFAULT_INSTAGRAM;
    return {
      handle: data.handle || DEFAULT_INSTAGRAM.handle,
      profileUrl: data.profileUrl || DEFAULT_INSTAGRAM.profileUrl,
      profileImageUrl: data.profileImageUrl ?? "",
      photos: data.photos?.length === 4 ? data.photos : DEFAULT_INSTAGRAM.photos,
    };
  } catch {
    return DEFAULT_INSTAGRAM;
  }
}

export async function setInstagram(config: InstagramConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(INSTAGRAM_KEY, config);
}
