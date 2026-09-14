"use client";

import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import type { DynamicInstagramFeed } from "@/lib/instagramFeed";

export default function InstagramSection() {
  const [feed, setFeed] = useState<DynamicInstagramFeed | null>(null);

  useEffect(() => {
    fetch("/api/instagram/finance")
      .then((r) => r.ok ? r.json() : null)
      .then((d: DynamicInstagramFeed | null) => { if (d?.posts?.length === 4) setFeed(d); })
      .catch(() => {});
  }, []);

  const handle = feed?.handle ?? "@huafinance";
  const profileUrl = feed?.profileUrl ?? "https://www.instagram.com/huafinance/";
  const profileImageUrl = feed?.profileImageUrl;

  return (
    <section className="bg-white py-16 px-6 lg:px-8 border-t border-[#E8ECE7]">
      <div className="max-w-6xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
          <h2 className="text-3xl font-bold text-[#222222]">
            Follow us on{" "}
            <span className="text-[#1F5F0A] italic">Instagram</span>
          </h2>

          <div className="flex items-center gap-4">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[#222222] font-medium text-sm hover:text-[#1F5F0A] transition-colors"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
                {profileImageUrl
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={profileImageUrl} alt={handle} className="w-full h-full object-cover" />
                  : <Camera className="w-4 h-4 text-white" />
                }
              </div>
              {handle}
            </a>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#222222] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1F5F0A] transition-colors"
            >
              Follow Us
            </a>
          </div>
        </div>

        <div className="w-full h-px bg-[#E8ECE7] mb-8" />

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {feed === null
            ? [0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-[#F5F8F2] animate-pulse" />
              ))
            : feed.posts.map((post) => (
                <a
                  key={post.postUrl}
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-2xl overflow-hidden block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt={post.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <Camera className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              ))
          }
        </div>

      </div>
    </section>
  );
}
