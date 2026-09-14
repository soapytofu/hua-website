"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface BudgetEmbedProps {
  url?: string;
  height?: number;
  title?: string;
}

export default function BudgetEmbed({
  url = "EXCEL_ONLINE_EMBED_URL",
  height = 1000,
  title = "HUA Finance Team Budget",
}: BudgetEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const isPlaceholder = url === "EXCEL_ONLINE_EMBED_URL";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full rounded-2xl overflow-hidden border border-[#E8ECE7] shadow-lg bg-white"
      style={{ height }}
    >
      {isPlaceholder ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F8F2] gap-4 text-center px-8">
          <div className="w-16 h-16 rounded-2xl bg-[#E8ECE7] flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-[#1F5F0A]" />
          </div>
          <div>
            <p className="text-[#222222] font-semibold text-lg">Budget Spreadsheet</p>
            <p className="text-[#6b7280] text-sm mt-1 max-w-sm">
              Replace <code className="bg-[#E8ECE7] px-1 rounded text-xs">EXCEL_ONLINE_EMBED_URL</code> with your Excel Online or Google Sheets embed URL to display the budget here.
            </p>
          </div>

          {/* Mock spreadsheet preview */}
          <div className="mt-6 w-full max-w-lg rounded-xl overflow-hidden border border-[#E8ECE7] text-xs">
            <div className="bg-[#1F5F0A] text-white grid grid-cols-4 gap-px">
              <div className="px-3 py-2 font-semibold">Organization</div>
              <div className="px-3 py-2 font-semibold">Category</div>
              <div className="px-3 py-2 font-semibold">Requested</div>
              <div className="px-3 py-2 font-semibold">Approved</div>
            </div>
            {[
              ["Harvard Debate Council", "Programming", "$4,200", "$3,800"],
              ["Harvard Crimson", "Operations", "$12,500", "$11,200"],
              ["Harvard Model UN", "Travel", "$8,000", "$6,500"],
              ["Harvard Science Review", "Publication", "$2,800", "$2,800"],
              ["Harvard Investment Club", "Programming", "$3,500", "$3,000"],
            ].map(([org, cat, req, app], i) => (
              <div
                key={i}
                className={`grid grid-cols-4 gap-px ${i % 2 === 0 ? "bg-white" : "bg-[#F5F8F2]"}`}
              >
                <div className="px-3 py-2 text-[#222222]">{org}</div>
                <div className="px-3 py-2 text-[#6b7280]">{cat}</div>
                <div className="px-3 py-2 text-[#6b7280]">{req}</div>
                <div className="px-3 py-2 text-[#1F5F0A] font-medium">{app}</div>
              </div>
            ))}
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
