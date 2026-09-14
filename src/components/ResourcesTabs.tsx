"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import EmbedFrame from "@/components/EmbedFrame";
import MarkdownContent from "@/components/MarkdownContent";
import { extractEmbedSrc } from "@/lib/eligibilityConfig";
import type { ResourcesConfig } from "@/lib/resourcesConfig";

interface ResourcesTabsProps {
  config: ResourcesConfig;
}

type SectionId =
  | "grant-application-instructions"
  | "receipt-instructions"
  | "hfcu"
  | "example-application";

// Only these four are shown for now. `resourcesConfig` still carries
// `returnFunds` (editable in admin) — add it back here once it's ready
// to go live; no schema change needed.
const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "grant-application-instructions", label: "Grant Application Instructions" },
  { id: "receipt-instructions", label: "Receipt Instructions" },
  { id: "hfcu", label: "Harvard FCU" },
  { id: "example-application", label: "Example Grant Application" },
];

function OpenInNewTabLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors duration-200 w-fit"
    >
      <ExternalLink className="w-4 h-4" />
      {label}
    </a>
  );
}

export default function ResourcesTabs({ config }: ResourcesTabsProps) {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  function renderPanel(): ReactNode {
    switch (active) {
      case "grant-application-instructions":
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#222222]">Grant Application Instructions</h2>
            <EmbedFrame
              url={
                config.grantApplicationInstructions.embedUrl
                  ? extractEmbedSrc(config.grantApplicationInstructions.embedUrl)
                  : undefined
              }
              title="Grant Application Instructions"
              placeholderLabel="Grant application slideshow"
            />
            {config.grantApplicationInstructions.externalUrl && (
              <OpenInNewTabLink
                href={config.grantApplicationInstructions.externalUrl}
                label="Open in Google Slides"
              />
            )}
          </div>
        );
      case "receipt-instructions":
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#222222]">Receipt Instructions</h2>
            <EmbedFrame
              url={
                config.receiptInstructions.embedUrl
                  ? extractEmbedSrc(config.receiptInstructions.embedUrl)
                  : undefined
              }
              title="Receipt Submission Instructions"
              placeholderLabel="Receipt submission slideshow"
            />
            {config.receiptInstructions.externalUrl && (
              <OpenInNewTabLink href={config.receiptInstructions.externalUrl} label="Open in Google Slides" />
            )}
          </div>
        );
      case "hfcu":
        return (
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-2xl font-bold text-[#222222] mb-1">Harvard FCU</h2>
              <p className="text-[#6b7280] text-sm">
                How to open a new organization account or change authorized signers.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-[#1F5F0A]">Account Setup</h3>
              <MarkdownContent content={config.hfcuAccountSetup} />
            </div>
            <div className="flex flex-col gap-4 border-t border-[#E8ECE7] pt-8">
              <h3 className="text-lg font-bold text-[#1F5F0A]">Signer Change</h3>
              <MarkdownContent content={config.hfcuSignerChange} />
            </div>
          </div>
        );
      case "example-application":
        return (
          <div className="flex flex-col gap-4 items-start">
            <h2 className="text-2xl font-bold text-[#222222]">Example Grant Application</h2>
            <p className="text-[#6b7280] leading-relaxed">
              See a completed example application to get a sense of what a strong submission looks like.
            </p>
            {config.exampleApplicationUrl ? (
              <OpenInNewTabLink href={config.exampleApplicationUrl} label="View Example Application" />
            ) : (
              <p className="text-sm text-[#9CA3AF]">Coming soon — check back later.</p>
            )}
          </div>
        );
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
      {/* Mobile / tablet: horizontal pill row */}
      <nav className="lg:hidden w-full overflow-x-auto -mx-6 px-6">
        <div className="flex gap-2 pb-1 w-max">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap",
                s.id === active
                  ? "bg-[#1F5F0A] text-white"
                  : "bg-white border border-[#E8ECE7] text-[#6b7280] hover:text-[#222222]"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop: sidebar */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <nav className="flex flex-col gap-1 sticky top-24">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer w-full text-left",
                s.id === active
                  ? "bg-[#1F5F0A] text-white"
                  : "text-[#6b7280] hover:text-[#222222] hover:bg-white"
              )}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content panel */}
      <div className="flex-1 min-w-0 w-full bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-6 sm:p-8 overflow-hidden">
        {/*
          No AnimatePresence here on purpose. An exit-then-enter transition
          unmounts the old panel before the new one mounts, so for a moment
          the page has nothing in this slot — if that moment's document is
          shorter than the current scroll position, the browser clamps
          scrollY back up, which reads as the page "jumping" on every tab
          switch. Swapping the child directly (still keyed, so it still
          re-mounts and re-runs the fade-in) replaces the content in a single
          render with no empty gap in between.
        */}
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {renderPanel()}
        </motion.div>
      </div>
    </div>
  );
}
