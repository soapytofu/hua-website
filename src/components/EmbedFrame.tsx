"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

interface EmbedFrameProps {
  url?: string;
  height?: number;
  title: string;
  placeholderLabel?: string;
}

export default function EmbedFrame({
  url,
  height = 700,
  title,
  placeholderLabel = "Slideshow",
}: EmbedFrameProps) {
  const [loaded, setLoaded] = useState(false);
  const isPlaceholder = !url;
  const lastScrollY = useRef(0);

  // Google's Slides embed player focuses itself once it finishes loading.
  // The browser responds to that by auto-scrolling the focused element into
  // view — since `html` has `scroll-behavior: smooth` (globals.css), that
  // shows up as the whole page smoothly "pulling down" toward the embed the
  // instant it's ready, which we don't want. We can't stop a different-origin
  // iframe from focusing itself, so instead: keep track of the scroll
  // position while focus is on our own page, and snap straight back to it
  // the moment focus moves into any iframe.
  useEffect(() => {
    if (isPlaceholder) return;
    function trackScroll() {
      if (document.activeElement?.tagName !== "IFRAME") {
        lastScrollY.current = window.scrollY;
      }
    }
    function handleBlur() {
      if (document.activeElement?.tagName === "IFRAME") {
        window.scrollTo({ top: lastScrollY.current, left: window.scrollX, behavior: "instant" });
      }
    }
    trackScroll();
    window.addEventListener("scroll", trackScroll, { passive: true });
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("scroll", trackScroll);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isPlaceholder]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full rounded-2xl overflow-hidden border border-[#E8ECE7] shadow-md bg-white"
      style={{ height }}
    >
      {isPlaceholder ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F8F2] gap-4 text-center px-8">
          <div className="w-16 h-16 rounded-2xl bg-[#E8ECE7] flex items-center justify-center">
            <PlayCircle className="w-7 h-7 text-[#1F5F0A]" />
          </div>
          <div>
            <p className="text-[#222222] font-semibold text-lg">{placeholderLabel} coming soon</p>
            <p className="text-[#6b7280] text-sm mt-1 max-w-xs">
              Add an embed URL in the admin panel to display it here.
            </p>
          </div>
        </div>
      ) : (
        <>
          {!loaded && (
            <div className="w-full h-full flex items-center justify-center bg-[#F5F8F2]">
              <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <iframe
            src={url}
            title={title}
            width="100%"
            height="100%"
            className={`border-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0 absolute"}`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            allowFullScreen
          />
        </>
      )}
    </motion.div>
  );
}
