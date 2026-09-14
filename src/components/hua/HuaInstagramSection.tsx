"use client";

import { useEffect, useState } from "react";
import { HUA_INSTAGRAM_FALLBACK, type DynamicInstagramFeed } from "@/lib/instagramFeed";

export default function HuaInstagramSection() {
  const [feed, setFeed] = useState<DynamicInstagramFeed>(HUA_INSTAGRAM_FALLBACK);

  useEffect(() => {
    fetch("/api/instagram/hua")
      .then((response) => response.ok ? response.json() : null)
      .then((data: DynamicInstagramFeed | null) => { if (data?.posts?.length === 4) setFeed(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[url('/hua-assets/instagram-bg.webp')] bg-cover bg-center py-20 text-white">
      <div className="absolute inset-0 -z-10 bg-black/70" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-red-200">Follow along</p><h2 className="mt-2 font-serif text-4xl sm:text-5xl">Instagram</h2></div>
          <a href={feed.profileUrl} target="_blank" rel="noopener noreferrer" className="w-fit rounded-md py-2 font-semibold hover:underline">{feed.handle} ↗</a>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
          {feed.posts.map((post, index) => (
            <a key={`${post.postUrl}-${index}`} href={post.postUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${feed.handle} Instagram post ${index + 1}`} className="rounded-xl transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.imageUrl} alt={post.alt} className="aspect-square w-full rounded-xl object-cover" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
