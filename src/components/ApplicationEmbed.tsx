"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface ApplicationEmbedProps {
  url?: string;
  height?: number;
  title?: string;
}

export default function ApplicationEmbed({
  url = "GOOGLE_FORM_OR_AIRTABLE_URL",
  height = 900,
  title = "Grant Application Form",
}: ApplicationEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const isPlaceholder = url === "GOOGLE_FORM_OR_AIRTABLE_URL";

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
            <FileText className="w-7 h-7 text-[#1F5F0A]" />
          </div>
          <div>
            <p className="text-[#222222] font-semibold text-lg">Application Form</p>
            <p className="text-[#6b7280] text-sm mt-1 max-w-xs">
              Replace <code className="bg-[#E8ECE7] px-1 rounded text-xs">GOOGLE_FORM_OR_AIRTABLE_URL</code> with your Google Form or Airtable form embed URL.
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
