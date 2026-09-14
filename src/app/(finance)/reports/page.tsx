"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, FileText, ExternalLink, ChevronDown } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { cn } from "@/lib/utils";
import type { Report } from "@/lib/reportsConfig";

type SortKey = "newest" | "oldest" | "title";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sort, setSort] = useState<SortKey>("newest");

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.reports) setReports(d.reports); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const types = useMemo(() => {
    const t = new Set(reports.map((r) => r.type).filter(Boolean));
    return ["All", ...Array.from(t).sort()];
  }, [reports]);

  const filtered = useMemo(() => {
    let list = [...reports];
    if (typeFilter !== "All") list = list.filter((r) => r.type === typeFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((r) =>
        r.title.toLowerCase().includes(q) ||
        r.semester.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }
    if (sort === "newest") list.sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === "oldest") list.sort((a, b) => a.date.localeCompare(b.date));
    else if (sort === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [reports, query, typeFilter, sort]);

  return (
    <>
      <PageHeader
        badge="Finances"
        title="Financial Reports"
        subtitle="Published reports, summaries, and audits from the HUA Finance Team."
      />

      <section className="bg-[#F5F8F2] min-h-screen py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, semester, or type..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8ECE7] bg-white text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-[#E8ECE7] bg-white text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] cursor-pointer"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title A–Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
            </div>
          </div>

          {/* Type filter chips */}
          {!loading && types.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer",
                    typeFilter === t
                      ? "bg-[#1F5F0A] text-white border-[#1F5F0A]"
                      : "bg-white text-[#6b7280] border-[#E8ECE7] hover:border-[#1F5F0A] hover:text-[#1F5F0A]"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E8ECE7] h-48 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <FileText className="w-12 h-12 text-[#D1D5DB] mx-auto mb-4" />
              <p className="text-[#6b7280] font-medium text-lg">
                {reports.length === 0
                  ? "No reports have been published yet."
                  : "No reports match your search."}
              </p>
              {reports.length === 0 && (
                <p className="text-[#9CA3AF] text-sm mt-2">Check back soon or contact the Finance Team.</p>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ReportCard({ report }: { report: Report }) {
  const formattedDate = report.date
    ? new Date(report.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F5F8F2] border border-[#E8ECE7] flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-[#1F5F0A]" />
        </div>
        {report.type && (
          <span className="inline-flex px-2.5 py-1 rounded-full bg-[#F5F8F2] border border-[#E8ECE7] text-[#1F5F0A] text-xs font-semibold whitespace-nowrap">
            {report.type}
          </span>
        )}
      </div>

      <div className="flex-1">
        <p className="font-semibold text-[#222222] leading-snug">{report.title}</p>
        <div className="flex flex-wrap gap-x-3 mt-1">
          {report.semester && <p className="text-sm text-[#6b7280]">{report.semester}</p>}
          {formattedDate && <p className="text-xs text-[#9CA3AF] mt-0.5">{formattedDate}</p>}
        </div>
        {report.description && (
          <p className="text-sm text-[#6b7280] mt-2 leading-relaxed line-clamp-2">{report.description}</p>
        )}
      </div>

      {report.url && (
        <a
          href={report.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Report
        </a>
      )}
    </div>
  );
}
