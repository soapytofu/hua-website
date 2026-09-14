import { NextResponse } from "next/server";
import { getInstagram } from "@/lib/instagramConfig";
import {
  getDynamicInstagramFeed,
  type InstagramAccount,
} from "@/lib/dynamicInstagram";
import { HUA_INSTAGRAM_FALLBACK, type DynamicInstagramFeed } from "@/lib/instagramFeed";

export const dynamic = "force-dynamic";

function isInstagramAccount(value: string): value is InstagramAccount {
  return value === "hua" || value === "finance";
}

export async function GET(_request: Request, { params }: { params: Promise<{ account: string }> }) {
  const { account } = await params;
  if (!isInstagramAccount(account)) {
    return NextResponse.json({ error: "Unknown Instagram account" }, { status: 404 });
  }

  let fallback = HUA_INSTAGRAM_FALLBACK;
  if (account === "finance") {
    const config = await getInstagram();
    fallback = {
      handle: config.handle,
      profileUrl: config.profileUrl,
      profileImageUrl: config.profileImageUrl,
      source: "fallback",
      posts: config.photos.map((photo) => ({
        imageUrl: photo.imageUrl,
        postUrl: config.profileUrl,
        alt: photo.alt || `Instagram post from ${config.handle}`,
      })),
    } satisfies DynamicInstagramFeed;
  }

  const feed = await getDynamicInstagramFeed(account, fallback);
  return NextResponse.json(feed, {
    headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400" },
  });
}
