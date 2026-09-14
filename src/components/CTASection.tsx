"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CTASection({
  title = "Ready to request funding?",
  subtitle = "Submit a grant application and our team will review it each semester.",
  buttonLabel = "Start Application",
  buttonHref = "/grant-application",
}: CTASectionProps) {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Annenberg Hall background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/jharvard.webp')" }}
      />
      {/* Dark green overlay */}
      <div className="absolute inset-0 bg-[#1F5F0A]/85" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-green-100 text-lg max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-10">
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-2 bg-white text-[#1F5F0A] px-8 py-4 rounded-xl font-semibold text-base hover:bg-[#F5F8F2] transition-colors duration-200 shadow-lg"
            >
              {buttonLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
