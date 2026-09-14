"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, BookOpen, Plus, X } from "lucide-react";
import { Leader } from "@/data/leadership";
import { cn } from "@/lib/utils";

interface LeadershipCardProps {
  leader: Leader;
  index?: number;
}

export default function LeadershipCard({ leader, index = 0 }: LeadershipCardProps) {
  const [expanded, setExpanded] = useState(false);
  const initials = leader.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const shortYear = leader.year ? `'${String(leader.year).slice(-2)}` : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      onClick={() => setExpanded((v) => !v)}
      className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer"
    >
      {/* Photo / fallback */}
      {leader.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={leader.imageUrl}
          alt={leader.name}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-transform duration-500",
            !expanded && "group-hover:scale-105"
          )}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a7a10] to-[#1F5F0A] flex items-center justify-center">
          <span className="text-8xl font-bold text-white/20">{initials}</span>
        </div>
      )}

      {/* Persistent bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

      {/* Hover darkening — only when not expanded */}
      <div className={cn(
        "absolute inset-0 bg-black/25 transition-opacity duration-300",
        expanded ? "opacity-0" : "opacity-0 group-hover:opacity-100"
      )} />

      {/* Expanded full overlay */}
      <div className={cn(
        "absolute inset-0 bg-black/65 transition-opacity duration-300",
        expanded ? "opacity-100" : "opacity-0 pointer-events-none"
      )} />

      {/* Year — top left */}
      {shortYear && (
        <div className="absolute top-5 left-5 text-white font-bold text-xl tracking-tight drop-shadow">
          {shortYear}
        </div>
      )}

      {/* + / × button — top right */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setExpanded((value) => !value);
        }}
        aria-expanded={expanded}
        aria-label={`${expanded ? "Hide" : "Show"} details for ${leader.name}`}
        className="absolute top-4 right-4 grid min-h-11 min-w-11 place-items-center rounded-full bg-white shadow-md transition-transform duration-200 group-hover:scale-110"
      >
        {expanded
          ? <X className="w-4 h-4 text-[#222222]" />
          : <Plus className="w-4 h-4 text-[#222222]" />
        }
      </button>

      {/* Hover-revealed info (truncated, hidden when expanded) */}
      <div className={cn(
        "absolute inset-x-5 bottom-28 flex flex-col gap-1.5 transition-all duration-300 pointer-events-none",
        expanded
          ? "opacity-0"
          : "opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
      )}>
        {leader.bio && (
          <p className="text-white/80 text-sm leading-relaxed line-clamp-4">{leader.bio}</p>
        )}
        {leader.concentration && (
          <div className="flex items-center gap-1.5 text-white/70 text-xs mt-1">
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{leader.concentration}</span>
          </div>
        )}
        {leader.email && (
          <a
            href={`mailto:${leader.email}`}
            className="flex items-center gap-1.5 text-white/70 text-xs hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{leader.email}</span>
          </a>
        )}
      </div>

      {/* Click-expanded full info — from top of card */}
      <div className={cn(
        "absolute inset-x-5 bottom-24 top-16 flex flex-col gap-3 overflow-y-auto transition-all duration-300 pointer-events-none",
        expanded ? "opacity-100 pointer-events-auto" : "opacity-0"
      )}>
        {leader.bio && (
          <p className="text-white text-sm leading-relaxed">{leader.bio}</p>
        )}
        {leader.concentration && (
          <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1">
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{leader.concentration}</span>
          </div>
        )}
        {leader.email && (
          <a
            href={`mailto:${leader.email}`}
            className="flex items-center gap-1.5 text-white/80 text-sm hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="break-all">{leader.email}</span>
          </a>
        )}
      </div>

      {/* Always-visible: name + title pill */}
      <div className="absolute bottom-5 left-5 right-5">
        <h3 className="text-white font-bold text-xl uppercase tracking-wide leading-tight drop-shadow">
          {leader.name}
        </h3>
        {leader.title && (
          <span className="inline-block mt-2 text-white text-xs font-medium border border-white/50 rounded-full px-3 py-1">
            {leader.title}
          </span>
        )}
      </div>
    </motion.div>
  );
}
