"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <section className="bg-white pt-32 pb-16 border-b border-[#E8ECE7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {badge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5F8F2] text-[#1F5F0A] text-xs font-semibold tracking-wide uppercase mb-6 border border-[#E8ECE7]">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-[#222222] tracking-tight leading-tight max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-[#6b7280] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
