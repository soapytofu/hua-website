"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={center ? "text-center" : ""}
    >
      {eyebrow && (
        <p className="text-[#1F5F0A] text-sm font-semibold uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#222222] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-[#6b7280] text-lg leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
