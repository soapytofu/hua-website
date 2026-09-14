"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import BudgetEmbed from "@/components/BudgetEmbed";
import StatsCard from "@/components/StatsCard";
import { extractEmbedSrc } from "@/lib/eligibilityConfig";
import type { StatsConfig } from "@/lib/statsConfig";
import { DEFAULT_BUDGET } from "@/lib/budgetConfig";


export default function BudgetPage() {
  const [stats, setStats] = useState<StatsConfig | null>(null);
  const [embedUrl, setEmbedUrl] = useState("");
  const [yearLabel, setYearLabel] = useState(DEFAULT_BUDGET.yearLabel);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.cards?.length === 3) setStats(d); })
      .catch(() => {});

    fetch("/api/admin/budget")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => {
        if (d?.embedCode) setEmbedUrl(extractEmbedSrc(d.embedCode));
        if (d?.yearLabel) setYearLabel(d.yearLabel);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <PageHeader
        badge="Financial Transparency"
        title="Finance Team Budget"
        subtitle="Current budget allocations and expenditures for the Harvard Undergraduate Association. Updated after every Finance Committee meeting."
      />

      {/* Stats */}
      <section className="bg-[#F5F8F2] py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {stats ? stats.cards.map((card, i) => (
              <StatsCard key={i} value={card.value} label={card.label} description={card.sub} index={i} />
            )) : [0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-[#E8ECE7] shadow-sm h-40 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Spreadsheet embed */}
      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#222222]">Budget Allocations</h2>
              <p className="text-[#6b7280] mt-1 text-sm">{yearLabel}</p>
            </div>
            {embedUrl && (
              <span className="inline-flex items-center gap-2 bg-[#F5F8F2] border border-[#E8ECE7] text-[#1F5F0A] text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#1F5F0A] animate-pulse" />
                Live data
              </span>
            )}
          </div>
          {embedUrl ? (
            <BudgetEmbed url={embedUrl} height={1000} />
          ) : (
            <div className="flex items-center justify-center py-24 text-[#6b7280] text-sm">
              The budget spreadsheet is currently being worked on. Check back soon.
            </div>
          )}
        </div>
      </section>

    </>
  );
}
