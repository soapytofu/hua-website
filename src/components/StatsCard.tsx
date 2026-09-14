"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  value: string;
  label: string;
  description?: string;
  index?: number;
}

export default function StatsCard({ value, label, description, index = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="bg-white rounded-2xl p-8 border border-[#E8ECE7] shadow-sm text-center"
    >
      <p className="text-4xl md:text-5xl font-bold text-[#1F5F0A] tracking-tight">{value}</p>
      <p className="mt-2 text-[#222222] font-semibold text-lg">{label}</p>
      {description && <p className="mt-1 text-[#6b7280] text-sm leading-relaxed">{description}</p>}
    </motion.div>
  );
}
