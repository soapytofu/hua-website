"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQAccordion({ items, title = "Frequently Asked Questions" }: FAQAccordionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-[#222222] tracking-tight mb-8">
          {title}
        </h2>
      )}
      <Accordion className="flex flex-col gap-3">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            value={i}
            className="bg-white rounded-xl border border-[#E8ECE7] shadow-sm px-6 data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="py-5 text-left text-[#222222] font-medium hover:no-underline hover:text-[#1F5F0A] transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[#6b7280] leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
