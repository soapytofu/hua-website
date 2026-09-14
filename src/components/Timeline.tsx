"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Organization Applies",
    description: "Student organizations submit their funding request through the online application portal.",
  },
  {
    number: "02",
    title: "Finance Committee Review",
    description: "The funding committee reviews the budget request and supporting documentation.",
  },
  {
    number: "03",
    title: "Funding Decision",
    description: "Organizations are notified of their approved funding allocation within two weeks.",
  },
  {
    number: "04",
    title: "Disbursements by HFCU",
    description: "Approved funding decisions are sent to the Harvard Federal Credit Union (HFCU), who handle all disbursements directly to organizations.",
  },
  {
    number: "05",
    title: "Receipts Submitted & Excess Returned",
    description: "Organizations submit receipts documenting their expenditures. Any funds not used must be returned to the HUA Finance Team.",
  },
  {
    number: "06",
    title: "Budget Released",
    description: "All funding decisions are published publicly on the HUA Budget page for transparency.",
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line — desktop */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#E8ECE7]" />

      <div className="flex flex-col gap-12 lg:gap-0">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
              className={`lg:flex lg:items-center lg:gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} lg:mb-12`}
            >
              {/* Card */}
              <div className={`flex-1 ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
                <div
                  className={`inline-block bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-6 text-left max-w-sm ${
                    isLeft ? "lg:ml-auto" : ""
                  }`}
                >
                  <span className="text-xs font-bold text-[#1F5F0A] tracking-widest uppercase">
                    Step {step.number}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-[#222222]">{step.title}</h3>
                  <p className="mt-2 text-[#6b7280] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Center dot */}
              <div className="hidden lg:flex w-10 h-10 rounded-full bg-[#1F5F0A] items-center justify-center flex-shrink-0 z-10 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>

              {/* Spacer */}
              <div className="flex-1" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
