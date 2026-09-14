import "server-only";
import type { DynamicInstagramFeed, DynamicInstagramPost } from "@/lib/instagramFeed";

export type InstagramAccount = "hua" | "finance";

interface InstagramMediaItem {
  id?: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
}

interface InstagramMediaResponse {
  data?: InstagramMediaItem[];
}

function getAccountCredentials(account: InstagramAccount) {
  const prefix = account === "hua" ? "INSTAGRAM_HUA" : "INSTAGRAM_FINANCE";
  return {
    accessToken: process.env[`${prefix}_ACCESS_TOKEN`],
    userId: process.env[`${prefix}_USER_ID`] || "me",
    apiBaseUrl: (process.env.INSTAGRAM_GRAPH_API_BASE_URL || "https://graph.instagram.com").replace(/\/$/, ""),
  };
}

function captionToAlt(caption: string | undefined, handle: string) {
  const normalized = caption?.replace(/\s+/g, " ").trim();
  if (!normalized) return `Instagram post from ${handle}`;
  return normalized.length > 140 ? `${normalized.slice(0, 137)}…` : normalized;
}

export async function getDynamicInstagramFeed(
  account: InstagramAccount,
  fallback: DynamicInstagramFeed,
): Promise<DynamicInstagramFeed> {
  const { accessToken, userId, apiBaseUrl } = getAccountCredentials(account);
  if (!accessToken) return fallback;

  try {
    const params = new URLSearchParams({
      fields: "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp",
      limit: "8",
    });
    const response = await fetch(`${apiBaseUrl}/${encodeURIComponent(userId)}/media?${params}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 900 },
    });
    if (!response.ok) return fallback;

    const payload = await response.json() as InstagramMediaResponse;
    const posts = (payload.data ?? [])
      .map((item): DynamicInstagramPost | null => {
        const imageUrl = item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;
        if (!imageUrl || !item.permalink) return null;
        return {
          imageUrl,
          postUrl: item.permalink,
          alt: captionToAlt(item.caption, fallback.handle),
        };
      })
      .filter((item): item is DynamicInstagramPost => item !== null)
      .slice(0, 4);

    if (posts.length < 4) return fallback;
    return { ...fallback, posts, source: "instagram" };
  } catch {
    return fallback;
  }
}
