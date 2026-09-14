"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export default function FeatureCard({ icon: Icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl p-8 border border-[#E8ECE7] shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-[#F5F8F2] flex items-center justify-center mb-6 group-hover:bg-[#1F5F0A] transition-colors duration-300">
        <Icon className="w-6 h-6 text-[#1F5F0A] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold text-[#222222] mb-3">{title}</h3>
      <p className="text-[#6b7280] leading-relaxed">{description}</p>
    </motion.div>
  );
}
