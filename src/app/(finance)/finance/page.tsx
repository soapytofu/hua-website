"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wallet, ClipboardList, BarChart3, ArrowRight, TrendingUp, Users, FileCheck } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import CTASection from "@/components/CTASection";
import type { StatsConfig } from "@/lib/statsConfig";

const CARD_ICONS = [TrendingUp, Users, FileCheck];

const DEFAULT_STATS: StatsConfig = {
  cards: [
    { label: "Budget Allocated",      value: "$2.4M",  sub: "Academic year: TBD" },
    { label: "Student Organizations", value: "450+",   sub: "Funded this semester"  },
    { label: "Grant Applications",    value: "1,200+", sub: "Processed annually"    },
  ],
};

const features = [
  {
    icon: Wallet,
    title: "Allocate Funding",
    description:
      "Each semester, the Finance Team reviews budget requests from registered student organizations and allocates funding fairly based on need, programming scope, and HUA guidelines.",
  },
  {
    icon: ClipboardList,
    title: "Review Grants",
    description:
      "Organizations may apply for supplemental grant funding throughout the year. Our committee reviews each application, considering impact, feasibility, and alignment with HUA's mission.",
  },
  {
    icon: BarChart3,
    title: "Financial Transparency",
    description:
      "All budget allocations and expenditures are published publicly. We believe accountability to the student body is fundamental to our work.",
  },
];

export default function HomePage() {
  const [stats, setStats] = useState<StatsConfig>(DEFAULT_STATS);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.cards?.length === 3) setStats(d); })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/widener.jpg')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 py-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 text-xl font-medium mb-4"
          >
            Welcome to the
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tight leading-none whitespace-nowrap"
          >
            HUA Finance Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-5 text-white/70 text-xl font-medium"
          >
            Harvard Undergraduate Association · Official Website
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/grant-application"
              className="inline-flex items-center gap-2 bg-white text-[#1F5F0A] px-8 py-4 rounded-xl font-semibold text-base hover:bg-[#F5F8F2] transition-colors duration-200 shadow-lg"
            >
              Apply for Funding
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/budget"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-base border border-white/30 hover:bg-white/20 transition-colors duration-200"
            >
              View Budget
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.cards.map((card, i) => {
              const Icon = CARD_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.65 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 flex items-center gap-4 text-left"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white tracking-tight leading-none">{card.value}</p>
                    <p className="text-xs font-medium text-white/80 mt-1">{card.label}</p>
                    <p className="text-xs text-white/50">{card.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── What We Do ───── */}
      <section className="bg-[#F5F8F2] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="What We Do"
            title="Supporting the financial health of student life"
            subtitle="From semester allocations to grant reviews, the Finance Team works year-round to ensure every student organization has the resources it needs to thrive."
            center
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── Finance Process ───── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Our Process"
            title="How funding works"
            subtitle="A transparent, structured process from application to decision."
            center
          />
          <div className="mt-20">
            <Timeline />
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <CTASection />
    </>
  );
}
