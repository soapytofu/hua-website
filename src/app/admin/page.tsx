"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import {
  LogOut, CalendarDays, Zap, Save, Check,
  Plus, Trash2, User, ChevronDown, Link2,
  Users, Clock, BarChart2, BarChart3, FileText, Receipt, TableProperties, TrendingUp, BookOpen, Camera, LifeBuoy,
} from "lucide-react";
import DragDropFile from "@/components/DragDropFile";
import { cn } from "@/lib/utils";
import type { GrantConfig } from "@/lib/grantConfig";
import type { Leader } from "@/data/leadership";
import { DEFAULT_TIMELINE, TIMELINE_ROWS } from "@/lib/timelineConfig";
import type { TimelineConfig, SemesterTimeline } from "@/lib/timelineConfig";
import type { LinksConfig } from "@/lib/linksConfig";
import type { GuidelinesConfig } from "@/lib/guidelinesConfig";
import type { ReceiptsConfig } from "@/lib/receiptsConfig";
import type { EligibilityConfig } from "@/lib/eligibilityConfig";
import type { ProceduresConfig } from "@/lib/proceduresConfig";
import type { StatsConfig } from "@/lib/statsConfig";
import { DEFAULT_STATS } from "@/lib/statsConfig";
import type { BudgetConfig } from "@/lib/budgetConfig";
import type { Report } from "@/lib/reportsConfig";
import type { InstagramConfig } from "@/lib/instagramConfig";
import { DEFAULT_INSTAGRAM } from "@/lib/instagramConfig";
import type { ResourcesConfig } from "@/lib/resourcesConfig";
import { DEFAULT_RESOURCES } from "@/lib/resourcesConfig";

// ─── Types / defaults ────────────────────────────────────────────────────────

const DEFAULT_CONFIG: GrantConfig = {
  semesterly: { name: "Semesterly Grant", available: true },
  emergency: { name: "Emergency Grant", available: true },
};

const DEFAULT_LINKS: LinksConfig = {
  paymentFormUrl: "",
  supplementalFormUrl: "",
  fundingApplicationUrl: "",
  paymentFormPassword: "",
  fundingFormPassword: "",
};

const GRANT_META = {
  semesterly: { icon: CalendarDays, label: "Semesterly Grant" },
  emergency: { icon: Zap, label: "Emergency Grant" },
} as const;

function newLeader(): Leader {
  return {
    id: crypto.randomUUID(),
    name: "", title: "", concentration: "",
    year: "", email: "", bio: "", imageUrl: "",
  };
}

function newReport(): Report {
  return {
    id: crypto.randomUUID(),
    title: "", type: "", semester: "", date: "", url: "", description: "",
  };
}

// ─── Shared save button ───────────────────────────────────────────────────────

function SaveButton({
  saving, saved, error, disabled, onClick,
}: {
  saving: boolean; saved: boolean; error: boolean; disabled: boolean; onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-end gap-2">
      {error && (
        <p className="text-sm text-red-600 font-medium">Save failed — check your connection and try again.</p>
      )}
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
          error ? "bg-red-600 text-white"
            : saved ? "bg-green-600 text-white"
            : "bg-[#1F5F0A] text-white hover:bg-[#174508] disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {error ? "Save Failed" : saved ? <><Check className="w-4 h-4" /> Saved</> : saving ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
      </button>
    </div>
  );
}

// ─── Tab definitions ──────────────────────────────────────────────────────────

type Tab = "grants" | "links" | "leadership" | "timeline" | "guidelines" | "receipts" | "eligibility" | "stats" | "budget" | "reports" | "instagram" | "resources";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "grants",      label: "Grants",      icon: BarChart2 },
  { id: "links",       label: "App Links",   icon: Link2 },
  { id: "leadership",  label: "Leadership",  icon: Users },
  { id: "instagram",   label: "Instagram",   icon: Camera },
  { id: "timeline",    label: "Timeline",    icon: Clock },
  { id: "eligibility", label: "Eligibility", icon: TableProperties },
  { id: "guidelines",  label: "Guidelines",  icon: FileText },
  { id: "receipts",    label: "Receipts",    icon: Receipt },
  { id: "resources",   label: "Resources",   icon: LifeBuoy },
  { id: "budget",      label: "Budget",      icon: BarChart3 },
  { id: "stats",       label: "Stats",       icon: TrendingUp },
  { id: "reports",     label: "Reports",     icon: BookOpen },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("grants");

  // Grants
  const [config, setConfig] = useState<GrantConfig>(DEFAULT_CONFIG);
  const [grantsLoading, setGrantsLoading] = useState(true);
  const [grantsSaving, setGrantsSaving] = useState(false);
  const [grantsSaved, setGrantsSaved] = useState(false);
  const [grantsError, setGrantsError] = useState(false);

  // Links
  const [links, setLinks] = useState<LinksConfig>(DEFAULT_LINKS);
  const [linksLoading, setLinksLoading] = useState(true);
  const [linksSaving, setLinksSaving] = useState(false);
  const [linksSaved, setLinksSaved] = useState(false);
  const [linksError, setLinksError] = useState(false);

  // Procedures PDF
  const [procedures, setProcedures] = useState<ProceduresConfig>({ pdfBase64: "" });
  const [proceduresSaving, setProceduresSaving] = useState(false);
  const [proceduresSaved, setProceduresSaved] = useState(false);
  const [proceduresError, setProceduresError] = useState(false);

  // Leadership
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [leadersLoading, setLeadersLoading] = useState(true);
  const [leadersSaving, setLeadersSaving] = useState(false);
  const [leadersSaved, setLeadersSaved] = useState(false);
  const [leadersError, setLeadersError] = useState(false);

  // Timeline
  const [timeline, setTimeline] = useState<TimelineConfig>(DEFAULT_TIMELINE);
  const [timelineLoading, setTimelineLoading] = useState(true);
  const [timelineSaving, setTimelineSaving] = useState(false);
  const [timelineSaved, setTimelineSaved] = useState(false);
  const [timelineError, setTimelineError] = useState(false);
  const [timelineExpanded, setTimelineExpanded] = useState<"fall" | "spring" | null>("fall");

  // Guidelines
  const [guidelines, setGuidelines] = useState<GuidelinesConfig>({ pdfUrl: "" });
  const [guidelinesLoading, setGuidelinesLoading] = useState(true);
  const [guidelinesSaving, setGuidelinesSaving] = useState(false);
  const [guidelinesSaved, setGuidelinesSaved] = useState(false);
  const [guidelinesError, setGuidelinesError] = useState(false);

  // Eligibility
  const [eligibility, setEligibility] = useState<EligibilityConfig>({ airtableEmbedCode: "" });
  const [eligibilityLoading, setEligibilityLoading] = useState(true);
  const [eligibilitySaving, setEligibilitySaving] = useState(false);
  const [eligibilitySaved, setEligibilitySaved] = useState(false);
  const [eligibilityError, setEligibilityError] = useState(false);

  // Receipts
  const [receipts, setReceipts] = useState<ReceiptsConfig>({ airtableUrl: "", instructionsUrl: "" });
  const [receiptsLoading, setReceiptsLoading] = useState(true);
  const [receiptsSaving, setReceiptsSaving] = useState(false);
  const [receiptsSaved, setReceiptsSaved] = useState(false);
  const [receiptsError, setReceiptsError] = useState(false);

  // Stats
  const [stats, setStats] = useState<StatsConfig>(DEFAULT_STATS);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsSaving, setStatsSaving] = useState(false);
  const [statsSaved, setStatsSaved] = useState(false);
  const [statsError, setStatsError] = useState(false);

  // Budget
  const [budget, setBudget] = useState<BudgetConfig>({ embedCode: "", yearLabel: "Academic year and update date: TBD" });

  // Instagram
  const [instagram, setInstagram] = useState<InstagramConfig>(DEFAULT_INSTAGRAM);
  const [instagramLoading, setInstagramLoading] = useState(true);
  const [instagramSaving, setInstagramSaving] = useState(false);
  const [instagramSaved, setInstagramSaved] = useState(false);
  const [instagramError, setInstagramError] = useState(false);

  // Resources
  const [resources, setResources] = useState<ResourcesConfig>(DEFAULT_RESOURCES);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesSaving, setResourcesSaving] = useState(false);
  const [resourcesSaved, setResourcesSaved] = useState(false);
  const [resourcesError, setResourcesError] = useState(false);

  // Reports
  const [reportsList, setReportsList] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsSaving, setReportsSaving] = useState(false);
  const [reportsSaved, setReportsSaved] = useState(false);
  const [reportsError, setReportsError] = useState(false);
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);
  const [budgetLoading, setBudgetLoading] = useState(true);
  const [budgetSaving, setBudgetSaving] = useState(false);
  const [budgetSaved, setBudgetSaved] = useState(false);
  const [budgetError, setBudgetError] = useState(false);

  useEffect(() => {
    fetch("/api/admin/grants")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.semesterly && d?.emergency) setConfig(d); setGrantsLoading(false); })
      .catch(() => setGrantsLoading(false));

    fetch("/api/admin/links")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.paymentFormUrl !== undefined) setLinks(d); setLinksLoading(false); })
      .catch(() => setLinksLoading(false));

    fetch("/api/admin/procedures")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.hasPdf) setProcedures({ pdfBase64: "STORED" }); })
      .catch(() => {});

    fetch("/api/admin/leadership")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (Array.isArray(d)) setLeaders(d); setLeadersLoading(false); })
      .catch(() => setLeadersLoading(false));

    fetch("/api/admin/timeline")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.fall && d?.spring) setTimeline(d); setTimelineLoading(false); })
      .catch(() => setTimelineLoading(false));

    fetch("/api/admin/guidelines")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.pdfUrl !== undefined) setGuidelines(d); setGuidelinesLoading(false); })
      .catch(() => setGuidelinesLoading(false));

    fetch("/api/admin/receipts")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.airtableUrl !== undefined) setReceipts(d); setReceiptsLoading(false); })
      .catch(() => setReceiptsLoading(false));

    fetch("/api/admin/eligibility")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.airtableEmbedCode !== undefined) setEligibility(d); setEligibilityLoading(false); })
      .catch(() => setEligibilityLoading(false));

    fetch("/api/admin/stats")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.cards?.length === 3) setStats(d); setStatsLoading(false); })
      .catch(() => setStatsLoading(false));

    fetch("/api/admin/budget")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.embedCode !== undefined) setBudget(d); setBudgetLoading(false); })
      .catch(() => setBudgetLoading(false));

    fetch("/api/admin/instagram")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setInstagram(d); setInstagramLoading(false); })
      .catch(() => setInstagramLoading(false));

    fetch("/api/admin/reports")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.reports) setReportsList(d.reports); setReportsLoading(false); })
      .catch(() => setReportsLoading(false));

    fetch("/api/admin/resources")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.hfcuAccountSetup !== undefined) setResources(d); setResourcesLoading(false); })
      .catch(() => setResourcesLoading(false));
  }, []);

  // ── Save handlers ────────────────────────────────────────────────────────────

  const handleSaveGrants = async () => {
    setGrantsSaving(true); setGrantsError(false);
    try {
      const res = await fetch("/api/admin/grants", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(config) });
      if (!res.ok) throw new Error();
      setGrantsSaved(true); setTimeout(() => setGrantsSaved(false), 2500);
    } catch { setGrantsError(true); setTimeout(() => setGrantsError(false), 4000); }
    finally { setGrantsSaving(false); }
  };

  const handleSaveProcedures = async () => {
    setProceduresSaving(true); setProceduresError(false);
    try {
      const res = await fetch("/api/admin/procedures", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(procedures) });
      if (!res.ok) throw new Error();
      setProceduresSaved(true); setTimeout(() => setProceduresSaved(false), 2500);
    } catch { setProceduresError(true); setTimeout(() => setProceduresError(false), 4000); }
    finally { setProceduresSaving(false); }
  };

  const handleSaveLinks = async () => {
    setLinksSaving(true); setLinksError(false);
    try {
      const res = await fetch("/api/admin/links", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(links) });
      if (!res.ok) throw new Error();
      setLinksSaved(true); setTimeout(() => setLinksSaved(false), 2500);
    } catch { setLinksError(true); setTimeout(() => setLinksError(false), 4000); }
    finally { setLinksSaving(false); }
  };

  const handleSaveLeadership = async () => {
    setLeadersSaving(true); setLeadersError(false);
    try {
      const res = await fetch("/api/admin/leadership", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(leaders) });
      if (!res.ok) throw new Error();
      setLeadersSaved(true); setTimeout(() => setLeadersSaved(false), 2500);
    } catch { setLeadersError(true); setTimeout(() => setLeadersError(false), 4000); }
    finally { setLeadersSaving(false); }
  };

  const handleSaveTimeline = async () => {
    setTimelineSaving(true); setTimelineError(false);
    try {
      const res = await fetch("/api/admin/timeline", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(timeline) });
      if (!res.ok) throw new Error();
      setTimelineSaved(true); setTimeout(() => setTimelineSaved(false), 2500);
    } catch { setTimelineError(true); setTimeout(() => setTimelineError(false), 4000); }
    finally { setTimelineSaving(false); }
  };

  const handleSaveGuidelines = async () => {
    setGuidelinesSaving(true); setGuidelinesError(false);
    try {
      const res = await fetch("/api/admin/guidelines", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(guidelines) });
      if (!res.ok) throw new Error();
      setGuidelinesSaved(true); setTimeout(() => setGuidelinesSaved(false), 2500);
    } catch { setGuidelinesError(true); setTimeout(() => setGuidelinesError(false), 4000); }
    finally { setGuidelinesSaving(false); }
  };

  const handleSaveEligibility = async () => {
    setEligibilitySaving(true); setEligibilityError(false);
    try {
      const res = await fetch("/api/admin/eligibility", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(eligibility) });
      if (!res.ok) throw new Error();
      setEligibilitySaved(true); setTimeout(() => setEligibilitySaved(false), 2500);
    } catch { setEligibilityError(true); setTimeout(() => setEligibilityError(false), 4000); }
    finally { setEligibilitySaving(false); }
  };

  const handleSaveReceipts = async () => {
    setReceiptsSaving(true); setReceiptsError(false);
    try {
      const res = await fetch("/api/admin/receipts", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(receipts) });
      if (!res.ok) throw new Error();
      setReceiptsSaved(true); setTimeout(() => setReceiptsSaved(false), 2500);
    } catch { setReceiptsError(true); setTimeout(() => setReceiptsError(false), 4000); }
    finally { setReceiptsSaving(false); }
  };

  const handleSaveStats = async () => {
    setStatsSaving(true); setStatsError(false);
    try {
      const res = await fetch("/api/admin/stats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(stats) });
      if (!res.ok) throw new Error();
      setStatsSaved(true); setTimeout(() => setStatsSaved(false), 2500);
    } catch { setStatsError(true); setTimeout(() => setStatsError(false), 4000); }
    finally { setStatsSaving(false); }
  };

  const handleSaveReports = async () => {
    setReportsSaving(true); setReportsError(false);
    try {
      const res = await fetch("/api/admin/reports", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reports: reportsList }) });
      if (!res.ok) throw new Error();
      setReportsSaved(true); setTimeout(() => setReportsSaved(false), 2500);
    } catch { setReportsError(true); setTimeout(() => setReportsError(false), 4000); }
    finally { setReportsSaving(false); }
  };

  const handleSaveInstagram = async () => {
    setInstagramSaving(true); setInstagramError(false);
    try {
      const res = await fetch("/api/admin/instagram", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(instagram) });
      if (!res.ok) throw new Error();
      setInstagramSaved(true); setTimeout(() => setInstagramSaved(false), 2500);
    } catch { setInstagramError(true); setTimeout(() => setInstagramError(false), 4000); }
    finally { setInstagramSaving(false); }
  };

  const handleSaveBudget = async () => {
    setBudgetSaving(true); setBudgetError(false);
    try {
      const res = await fetch("/api/admin/budget", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(budget) });
      if (!res.ok) throw new Error();
      setBudgetSaved(true); setTimeout(() => setBudgetSaved(false), 2500);
    } catch { setBudgetError(true); setTimeout(() => setBudgetError(false), 4000); }
    finally { setBudgetSaving(false); }
  };

  const handleSaveResources = async () => {
    setResourcesSaving(true); setResourcesError(false);
    try {
      const res = await fetch("/api/admin/resources", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(resources) });
      if (!res.ok) throw new Error();
      setResourcesSaved(true); setTimeout(() => setResourcesSaved(false), 2500);
    } catch { setResourcesError(true); setTimeout(() => setResourcesError(false), 4000); }
    finally { setResourcesSaving(false); }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  // ── Update helpers ───────────────────────────────────────────────────────────

  const updateGrant = (key: keyof GrantConfig, field: "name" | "available", value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
    setGrantsSaved(false);
  };

  const updateLeader = (id: string, field: keyof Leader, value: string) => {
    setLeaders((prev) => prev.map((l) => l.id === id ? { ...l, [field]: value } : l));
    setLeadersSaved(false);
  };

  const updateTimelineField = (semester: "fall" | "spring", field: keyof SemesterTimeline, value: string) => {
    setTimeline((prev) => ({ ...prev, [semester]: { ...prev[semester], [field]: value } }));
    setTimelineSaved(false);
  };

  const updateTimelineRow = (
    semester: "fall" | "spring",
    rowKey: keyof Omit<SemesterTimeline, "title" | "semesterlyLabel" | "expenseDateRanges">,
    col: "semesterly" | "emergency",
    value: string
  ) => {
    setTimeline((prev) => ({
      ...prev,
      [semester]: { ...prev[semester], [rowKey]: { ...prev[semester][rowKey], [col]: value } },
    }));
    setTimelineSaved(false);
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F5F8F2]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8ECE7] pt-24 pb-6 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5F8F2] text-[#1F5F0A] text-xs font-semibold tracking-wide uppercase mb-3 border border-[#E8ECE7]">
              Admin
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#222222]">Admin Panel</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E8ECE7] text-[#6b7280] text-sm font-medium hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 flex gap-8 items-start">
        {/* Sidebar nav */}
        <aside className="w-52 flex-shrink-0">
          <nav className="flex flex-col gap-1 sticky top-24">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer w-full text-left",
                  activeTab === id
                    ? "bg-[#1F5F0A] text-white"
                    : "text-[#6b7280] hover:text-[#222222] hover:bg-white"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* ── Grants ────────────────────────────────────────────────────────── */}
          {activeTab === "grants" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Grant Availability</h2>
                <p className="text-sm text-[#6b7280] mt-1">Toggle open/closed and edit the display name for each grant type.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {(["semesterly", "emergency"] as const).map((key) => {
                  const { icon: Icon } = GRANT_META[key];
                  const grant = config[key];
                  return (
                    <div key={key} className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#F5F8F2] border border-[#E8ECE7] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#1F5F0A]" />
                          </div>
                          <span className="text-xs font-bold text-[#6b7280] uppercase tracking-widest">{GRANT_META[key].label}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateGrant(key, "available", !grant.available)}
                          className={cn("relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 cursor-pointer focus:outline-none", grant.available ? "bg-[#1F5F0A]" : "bg-[#D1D5DB]")}
                        >
                          <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200", grant.available ? "translate-x-6" : "translate-x-1")} />
                        </button>
                      </div>
                      <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold w-fit", grant.available ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200")}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", grant.available ? "bg-green-500" : "bg-red-500")} />
                        {grant.available ? "Open — accepting applications" : "Closed — not accepting applications"}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Display Name</label>
                        <input
                          type="text"
                          value={grant.name}
                          onChange={(e) => updateGrant(key, "name", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                          placeholder={`e.g. Fall 2026 ${GRANT_META[key].label}`}
                        />
                        <p className="text-xs text-[#9CA3AF]">Shown to applicants on the grant selection screen.</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <SaveButton saving={grantsSaving} saved={grantsSaved} error={grantsError} disabled={grantsSaving || grantsLoading} onClick={handleSaveGrants} />
            </div>
          )}

          {/* ── Links ─────────────────────────────────────────────────────────── */}
          {activeTab === "links" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Grant Application Links</h2>
                <p className="text-sm text-[#6b7280] mt-1">These URLs appear as buttons inside the grant application wizard.</p>
              </div>

              {linksLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Step 3 — Payment Information Form</label>
                    <input
                      type="url"
                      value={links.paymentFormUrl}
                      onChange={(e) => { setLinks((prev) => ({ ...prev, paymentFormUrl: e.target.value })); setLinksSaved(false); }}
                      placeholder="https://tinyurl.com/HUApayment"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Link to the payment information form (opens in new tab).</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Step 3 — Payment Form Password</label>
                    <input
                      type="text"
                      value={links.paymentFormPassword}
                      onChange={(e) => { setLinks((prev) => ({ ...prev, paymentFormPassword: e.target.value })); setLinksSaved(false); }}
                      placeholder="e.g. HUAFall2026"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Shown to applicants in Step 3. Leave blank to hide the password box entirely.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Step 4 — Supplemental Excel Template</label>
                    <DragDropFile
                      type="excel"
                      value={links.supplementalFormUrl || undefined}
                      onChange={(dataUrl) => { setLinks((prev) => ({ ...prev, supplementalFormUrl: dataUrl })); setLinksSaved(false); }}
                      onClear={() => { setLinks((prev) => ({ ...prev, supplementalFormUrl: "" })); setLinksSaved(false); }}
                    />
                    <p className="text-xs text-[#9CA3AF]">Uploaded file becomes the download button in Step 4 of the grant application.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Step 5 — Funding Application Form</label>
                    <input
                      type="url"
                      value={links.fundingApplicationUrl}
                      onChange={(e) => { setLinks((prev) => ({ ...prev, fundingApplicationUrl: e.target.value })); setLinksSaved(false); }}
                      placeholder="https://airtable.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Link to the Airtable (or other) funding application (opens in new tab).</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Step 5 — Funding Form Password</label>
                    <input
                      type="text"
                      value={links.fundingFormPassword}
                      onChange={(e) => { setLinks((prev) => ({ ...prev, fundingFormPassword: e.target.value })); setLinksSaved(false); }}
                      placeholder="e.g. HUAFall2026"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Shown to applicants in Step 5. Leave blank to hide the password box entirely.</p>
                  </div>

                </div>
              )}

              <SaveButton saving={linksSaving} saved={linksSaved} error={linksError} disabled={linksSaving || linksLoading} onClick={handleSaveLinks} />

              {/* Procedures PDF — separate save */}
              <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Internal Finance Procedures PDF</p>
                  <p className="text-xs text-[#6b7280] mt-1">When uploaded, clicking &quot;Internal Finance Procedures&quot; in the nav downloads this PDF directly.</p>
                </div>
                <DragDropFile
                  type="pdf"
                  value={procedures.pdfBase64 && procedures.pdfBase64 !== "STORED" ? procedures.pdfBase64 : procedures.pdfBase64 === "STORED" ? "STORED" : undefined}
                  onChange={(dataUrl) => { setProcedures({ pdfBase64: dataUrl }); setProceduresSaved(false); }}
                  onClear={() => { setProcedures({ pdfBase64: "" }); setProceduresSaved(false); }}
                />
              </div>
              <SaveButton saving={proceduresSaving} saved={proceduresSaved} error={proceduresError} disabled={proceduresSaving || procedures.pdfBase64 === "STORED"} onClick={handleSaveProcedures} />
            </div>
          )}

          {/* ── Leadership ────────────────────────────────────────────────────── */}
          {activeTab === "leadership" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Leadership Team</h2>
                <p className="text-sm text-[#6b7280] mt-1">Edit names, roles, bios, and photos for each team member.</p>
              </div>
              {leadersLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {leaders.map((leader) => (
                    <div key={leader.id} className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {leader.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={leader.imageUrl} alt={leader.name} className="w-10 h-10 rounded-full object-cover border border-[#E8ECE7]" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#F5F8F2] border border-[#E8ECE7] flex items-center justify-center">
                              <User className="w-5 h-5 text-[#1F5F0A]" />
                            </div>
                          )}
                          <span className="font-semibold text-[#222222] text-sm">{leader.name || "New Member"}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setLeaders((prev) => prev.filter((l) => l.id !== leader.id)); setLeadersSaved(false); }}
                          className="p-2 rounded-lg text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {([
                          { field: "name", label: "Full Name", placeholder: "e.g. Jake Marino" },
                          { field: "title", label: "Title / Role", placeholder: "e.g. Finance Team Director" },
                          { field: "concentration", label: "Concentration", placeholder: "e.g. Economics" },
                          { field: "year", label: "Class Year", placeholder: "e.g. 2026" },
                          { field: "email", label: "Email", placeholder: "e.g. jmarino@college.harvard.edu" },
                        ] as { field: keyof Leader; label: string; placeholder: string }[]).map(({ field, label, placeholder }) => (
                          <div key={field} className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">{label}</label>
                            <input
                              type="text"
                              value={(leader[field] as string) ?? ""}
                              onChange={(e) => updateLeader(leader.id, field, e.target.value)}
                              placeholder={placeholder}
                              className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                            />
                          </div>
                        ))}
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Photo</label>
                          <DragDropFile
                            type="image"
                            value={leader.imageUrl || undefined}
                            onChange={(dataUrl) => updateLeader(leader.id, "imageUrl", dataUrl)}
                            onClear={() => updateLeader(leader.id, "imageUrl", "")}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Bio</label>
                        <textarea
                          value={leader.bio}
                          onChange={(e) => updateLeader(leader.id, "bio", e.target.value)}
                          placeholder="Short bio shown on hover on the leadership page..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => { setLeaders((prev) => [...prev, newLeader()]); setLeadersSaved(false); }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-dashed border-[#D1D5DB] text-[#6b7280] text-sm font-medium hover:border-[#1F5F0A] hover:text-[#1F5F0A] transition-colors cursor-pointer w-fit"
                  >
                    <Plus className="w-4 h-4" />
                    Add Team Member
                  </button>
                  <SaveButton saving={leadersSaving} saved={leadersSaved} error={leadersError} disabled={leadersSaving || leadersLoading} onClick={handleSaveLeadership} />
                </div>
              )}
            </div>
          )}

          {/* ── Timeline ──────────────────────────────────────────────────────── */}
          {activeTab === "timeline" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Grant Timeline</h2>
                <p className="text-sm text-[#6b7280] mt-1">Edit all dates and labels for the fall and spring grant cycles.</p>
              </div>
              {timelineLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {(["fall", "spring"] as const).map((sem) => {
                    const isOpen = timelineExpanded === sem;
                    const semData = timeline[sem];
                    return (
                      <div key={sem} className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setTimelineExpanded(isOpen ? null : sem)}
                          className="w-full flex items-center justify-between px-8 py-5 text-left cursor-pointer hover:bg-[#F5F8F2] transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-[#222222]">{semData.title || (sem === "fall" ? "Fall Semester" : "Spring Semester")}</p>
                            <p className="text-xs text-[#6b7280] mt-0.5">{semData.semesterlyLabel} · Emergency</p>
                          </div>
                          <ChevronDown className={cn("w-5 h-5 text-[#6b7280] transition-transform duration-200", isOpen && "rotate-180")} />
                        </button>
                        {isOpen && (
                          <div className="px-8 pb-8 flex flex-col gap-6 border-t border-[#E8ECE7]">
                            <div className="grid sm:grid-cols-2 gap-4 pt-6">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Table Title</label>
                                <input type="text" value={semData.title} onChange={(e) => updateTimelineField(sem, "title", e.target.value)} placeholder="e.g. Fall 2026 Grant Cycles" className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent" />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Semesterly Column Label</label>
                                <input type="text" value={semData.semesterlyLabel} onChange={(e) => updateTimelineField(sem, "semesterlyLabel", e.target.value)} placeholder="e.g. Fall 2026 Semesterly" className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent" />
                              </div>
                            </div>
                            <div className="flex flex-col gap-4">
                              <div className="grid grid-cols-[1fr_1fr_1fr] gap-3">
                                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">Row</p>
                                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">Semesterly</p>
                                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">Emergency</p>
                              </div>
                              {TIMELINE_ROWS.map((row) => (
                                <div key={row.key} className="grid grid-cols-[1fr_1fr_1fr] gap-3 items-start">
                                  <p className="text-sm font-medium text-[#374151] pt-3 leading-snug">{row.label}</p>
                                  <input type="text" value={semData[row.key].semesterly} onChange={(e) => updateTimelineRow(sem, row.key, "semesterly", e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent" />
                                  <input type="text" value={semData[row.key].emergency} onChange={(e) => updateTimelineRow(sem, row.key, "emergency", e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent" />
                                </div>
                              ))}
                              <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 items-start">
                                <p className="text-sm font-medium text-[#374151] pt-3 leading-snug">Expense Date Ranges</p>
                                <textarea value={semData.expenseDateRanges} onChange={(e) => updateTimelineField(sem, "expenseDateRanges", e.target.value)} rows={3} placeholder={"Events & Expenses: ...\nSocial Events: ..."} className="col-span-2 w-full px-3 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <SaveButton saving={timelineSaving} saved={timelineSaved} error={timelineError} disabled={timelineSaving || timelineLoading} onClick={handleSaveTimeline} />
                </div>
              )}
            </div>
          )}

          {/* ── Eligibility ──────────────────────────────────────────────────── */}
          {activeTab === "eligibility" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Eligibility Airtable</h2>
                <p className="text-sm text-[#6b7280] mt-1">Update the embed code for the eligibility requirements table shown on the Eligibility page.</p>
              </div>
              {eligibilityLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Airtable Embed Code</label>
                    <textarea
                      value={eligibility.airtableEmbedCode}
                      onChange={(e) => { setEligibility({ airtableEmbedCode: e.target.value }); setEligibilitySaved(false); }}
                      placeholder={`<iframe class="airtable-embed" src="https://airtable.com/embed/..." ...></iframe>`}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Paste the full embed code from Airtable. The src URL is extracted automatically.</p>
                  </div>
                </div>
              )}
              <SaveButton saving={eligibilitySaving} saved={eligibilitySaved} error={eligibilityError} disabled={eligibilitySaving || eligibilityLoading} onClick={handleSaveEligibility} />
            </div>
          )}

          {/* ── Receipts ─────────────────────────────────────────────────────── */}
          {activeTab === "receipts" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Receipt Compliance</h2>
                <p className="text-sm text-[#6b7280] mt-1">Update the Airtable embed, submission form link, and instructions PDF each semester.</p>
              </div>
              {receiptsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Airtable Embed Code</label>
                    <textarea
                      value={receipts.airtableUrl}
                      onChange={(e) => { setReceipts((prev) => ({ ...prev, airtableUrl: e.target.value })); setReceiptsSaved(false); }}
                      placeholder={`<iframe class="airtable-embed" src="https://airtable.com/embed/..." ...></iframe>`}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Paste the full embed code from Airtable. Update each semester when the new table is ready.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Instructions Link</label>
                    <input
                      type="url"
                      value={receipts.instructionsUrl}
                      onChange={(e) => { setReceipts((prev) => ({ ...prev, instructionsUrl: e.target.value })); setReceiptsSaved(false); }}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Link that opens in a new tab when visitors click &quot;Please preview the instructions here&quot;.</p>
                  </div>
                </div>
              )}
              <SaveButton saving={receiptsSaving} saved={receiptsSaved} error={receiptsError} disabled={receiptsSaving || receiptsLoading} onClick={handleSaveReceipts} />
            </div>
          )}

          {/* ── Resources ────────────────────────────────────────────────────── */}
          {activeTab === "resources" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Resources Page</h2>
                <p className="text-sm text-[#6b7280] mt-1">Edit each section of the Resources page. Text sections support Markdown.</p>
              </div>

              {resourcesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-6">
                    <h3 className="text-sm font-bold text-[#1F5F0A] tracking-widest uppercase">Receipt Submission Instructions</h3>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Slideshow Embed Code</label>
                      <textarea
                        value={resources.receiptInstructions.embedUrl}
                        onChange={(e) => { setResources((prev) => ({ ...prev, receiptInstructions: { ...prev.receiptInstructions, embedUrl: e.target.value } })); setResourcesSaved(false); }}
                        placeholder={`<iframe src="https://docs.google.com/presentation/d/.../embed" ...></iframe>`}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                      />
                      <p className="text-xs text-[#9CA3AF]">Paste the Google Slides embed code (File → Share → Publish to web → Embed). The src URL is extracted automatically.</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Link to View Outside the Website</label>
                      <input
                        type="url"
                        value={resources.receiptInstructions.externalUrl}
                        onChange={(e) => { setResources((prev) => ({ ...prev, receiptInstructions: { ...prev.receiptInstructions, externalUrl: e.target.value } })); setResourcesSaved(false); }}
                        placeholder="https://docs.google.com/presentation/d/..."
                        className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                      />
                      <p className="text-xs text-[#9CA3AF]">Shown as an &quot;Open in Google Slides&quot; button below the embed.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-6">
                    <h3 className="text-sm font-bold text-[#1F5F0A] tracking-widest uppercase">Grant Application Instructions</h3>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Slideshow Embed Code</label>
                      <textarea
                        value={resources.grantApplicationInstructions.embedUrl}
                        onChange={(e) => { setResources((prev) => ({ ...prev, grantApplicationInstructions: { ...prev.grantApplicationInstructions, embedUrl: e.target.value } })); setResourcesSaved(false); }}
                        placeholder={`<iframe src="https://docs.google.com/presentation/d/.../embed" ...></iframe>`}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                      />
                      <p className="text-xs text-[#9CA3AF]">Paste the Google Slides embed code (File → Share → Publish to web → Embed). The src URL is extracted automatically.</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Link to View Outside the Website</label>
                      <input
                        type="url"
                        value={resources.grantApplicationInstructions.externalUrl}
                        onChange={(e) => { setResources((prev) => ({ ...prev, grantApplicationInstructions: { ...prev.grantApplicationInstructions, externalUrl: e.target.value } })); setResourcesSaved(false); }}
                        placeholder="https://docs.google.com/presentation/d/..."
                        className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                      />
                      <p className="text-xs text-[#9CA3AF]">Shown as an &quot;Open in Google Slides&quot; button below the embed.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-[#1F5F0A] tracking-widest uppercase mb-4">Example Grant Application</h3>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Link to Example Application</label>
                    <input
                      type="url"
                      value={resources.exampleApplicationUrl}
                      onChange={(e) => { setResources((prev) => ({ ...prev, exampleApplicationUrl: e.target.value })); setResourcesSaved(false); }}
                      placeholder="https://docs.google.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Link-out only — shown as a button, no embed. Leave blank to show &quot;Coming soon&quot;.</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-[#1F5F0A] tracking-widest uppercase mb-4">HFCU: Account Setup</h3>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Content (Markdown)</label>
                    <textarea
                      value={resources.hfcuAccountSetup}
                      onChange={(e) => { setResources((prev) => ({ ...prev, hfcuAccountSetup: e.target.value })); setResourcesSaved(false); }}
                      rows={12}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Supports Markdown: **bold**, *italics*, numbered/bulleted lists, and links.</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-[#1F5F0A] tracking-widest uppercase mb-4">HFCU: Signer Change</h3>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Content (Markdown)</label>
                    <textarea
                      value={resources.hfcuSignerChange}
                      onChange={(e) => { setResources((prev) => ({ ...prev, hfcuSignerChange: e.target.value })); setResourcesSaved(false); }}
                      rows={10}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Supports Markdown: **bold**, *italics*, numbered/bulleted lists, and links.</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-[#1F5F0A] tracking-widest uppercase mb-4">How to Return Funds</h3>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Content (Markdown)</label>
                    <textarea
                      value={resources.returnFunds}
                      onChange={(e) => { setResources((prev) => ({ ...prev, returnFunds: e.target.value })); setResourcesSaved(false); }}
                      rows={8}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Supports Markdown: **bold**, *italics*, numbered/bulleted lists, and links.</p>
                  </div>
                </div>
              )}
              <SaveButton saving={resourcesSaving} saved={resourcesSaved} error={resourcesError} disabled={resourcesSaving || resourcesLoading} onClick={handleSaveResources} />
            </div>
          )}

          {/* ── Stats ────────────────────────────────────────────────────────── */}
          {activeTab === "stats" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Home Page Stats</h2>
                <p className="text-sm text-[#6b7280] mt-1">Edit the three stat cards shown on the homepage hero section.</p>
              </div>
              {statsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {stats.cards.map((card, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-4">
                      <p className="text-xs font-bold text-[#6b7280] uppercase tracking-widest">Card {i + 1}</p>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Label</label>
                          <input
                            type="text"
                            value={card.label}
                            onChange={(e) => {
                              const next = stats.cards.map((c, j) => j === i ? { ...c, label: e.target.value } : c) as StatsConfig["cards"];
                              setStats({ cards: next }); setStatsSaved(false);
                            }}
                            placeholder="e.g. Budget Allocated"
                            className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Value</label>
                          <input
                            type="text"
                            value={card.value}
                            onChange={(e) => {
                              const next = stats.cards.map((c, j) => j === i ? { ...c, value: e.target.value } : c) as StatsConfig["cards"];
                              setStats({ cards: next }); setStatsSaved(false);
                            }}
                            placeholder="e.g. $2.4M"
                            className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Subtitle</label>
                          <input
                            type="text"
                            value={card.sub}
                            onChange={(e) => {
                              const next = stats.cards.map((c, j) => j === i ? { ...c, sub: e.target.value } : c) as StatsConfig["cards"];
                              setStats({ cards: next }); setStatsSaved(false);
                            }}
                            placeholder="e.g. Academic year: TBD"
                            className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <SaveButton saving={statsSaving} saved={statsSaved} error={statsError} disabled={statsSaving || statsLoading} onClick={handleSaveStats} />
            </div>
          )}

          {/* ── Guidelines ───────────────────────────────────────────────────── */}
          {activeTab === "guidelines" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Finance Guidelines PDF</h2>
                <p className="text-sm text-[#6b7280] mt-1">Upload the current Finance Guidelines document. Visitors can view it inline or download it from the Guidelines page.</p>
              </div>
              {guidelinesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Guidelines PDF</label>
                    <DragDropFile
                      type="pdf"
                      value={guidelines.pdfUrl || undefined}
                      onChange={(dataUrl) => { setGuidelines({ pdfUrl: dataUrl }); setGuidelinesSaved(false); }}
                      onClear={() => { setGuidelines({ pdfUrl: "" }); setGuidelinesSaved(false); }}
                    />
                    <p className="text-xs text-[#9CA3AF]">Replaces the document shown on the public Guidelines page.</p>
                  </div>
                </div>
              )}
              <SaveButton saving={guidelinesSaving} saved={guidelinesSaved} error={guidelinesError} disabled={guidelinesSaving || guidelinesLoading} onClick={handleSaveGuidelines} />
            </div>
          )}

          {/* ── Reports ──────────────────────────────────────────────────────── */}
          {activeTab === "reports" && (
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#222222]">Financial Reports</h2>
                  <p className="text-sm text-[#6b7280] mt-1">Add, edit, or remove published reports. Each report links out to an external document.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const r = newReport();
                    setReportsList((prev) => [r, ...prev]);
                    setExpandedReportId(r.id);
                    setReportsSaved(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors cursor-pointer flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add Report
                </button>
              </div>
              {reportsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm overflow-hidden">
                  {reportsList.length === 0 ? (
                    <p className="text-[#9CA3AF] text-sm text-center py-10">No reports yet. Click &quot;Add Report&quot; to get started.</p>
                  ) : (
                    reportsList.map((report) => {
                      const isOpen = expandedReportId === report.id;
                      return (
                        <div key={report.id} className={cn("border-b border-[#E8ECE7] last:border-b-0", isOpen && "bg-[#FAFCF9]")}>
                          {/* Compact row */}
                          <div className="flex items-center gap-3 px-5 py-3.5">
                            <button
                              type="button"
                              onClick={() => setExpandedReportId(isOpen ? null : report.id)}
                              className="flex-1 flex items-center gap-3 text-left cursor-pointer min-w-0"
                            >
                              <ChevronDown className={cn("w-4 h-4 text-[#9CA3AF] flex-shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
                              <span className="font-medium text-sm text-[#222222] truncate">
                                {report.title || <span className="text-[#9CA3AF] italic">Untitled report</span>}
                              </span>
                              <span className="hidden sm:flex items-center gap-2 flex-shrink-0 ml-auto mr-2">
                                {report.type && (
                                  <span className="px-2 py-0.5 rounded-full bg-[#F5F8F2] border border-[#E8ECE7] text-[#1F5F0A] text-xs font-medium">
                                    {report.type}
                                  </span>
                                )}
                                {report.semester && (
                                  <span className="text-xs text-[#9CA3AF]">{report.semester}</span>
                                )}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setReportsList((prev) => prev.filter((r) => r.id !== report.id));
                                if (expandedReportId === report.id) setExpandedReportId(null);
                                setReportsSaved(false);
                              }}
                              className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Expanded edit fields */}
                          {isOpen && (
                            <div className="px-5 pb-5 grid sm:grid-cols-2 gap-4 border-t border-[#E8ECE7] pt-4">
                              <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Title</label>
                                <input
                                  type="text"
                                  value={report.title}
                                  onChange={(e) => { setReportsList((prev) => prev.map((r) => r.id === report.id ? { ...r, title: e.target.value } : r)); setReportsSaved(false); }}
                                  placeholder="e.g. Fall Semester Budget Report"
                                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Type</label>
                                <input
                                  type="text"
                                  value={report.type}
                                  onChange={(e) => { setReportsList((prev) => prev.map((r) => r.id === report.id ? { ...r, type: e.target.value } : r)); setReportsSaved(false); }}
                                  placeholder="e.g. Semester Report"
                                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Semester</label>
                                <input
                                  type="text"
                                  value={report.semester}
                                  onChange={(e) => { setReportsList((prev) => prev.map((r) => r.id === report.id ? { ...r, semester: e.target.value } : r)); setReportsSaved(false); }}
                                  placeholder="e.g. Fall semester"
                                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Date Published</label>
                                <input
                                  type="date"
                                  value={report.date}
                                  onChange={(e) => { setReportsList((prev) => prev.map((r) => r.id === report.id ? { ...r, date: e.target.value } : r)); setReportsSaved(false); }}
                                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Document URL</label>
                                <input
                                  type="url"
                                  value={report.url}
                                  onChange={(e) => { setReportsList((prev) => prev.map((r) => r.id === report.id ? { ...r, url: e.target.value } : r)); setReportsSaved(false); }}
                                  placeholder="https://drive.google.com/..."
                                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Description <span className="font-normal normal-case">(optional)</span></label>
                                <textarea
                                  value={report.description}
                                  onChange={(e) => { setReportsList((prev) => prev.map((r) => r.id === report.id ? { ...r, description: e.target.value } : r)); setReportsSaved(false); }}
                                  placeholder="Brief summary shown on the reports page..."
                                  rows={2}
                                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
              <SaveButton saving={reportsSaving} saved={reportsSaved} error={reportsError} disabled={reportsSaving || reportsLoading} onClick={handleSaveReports} />
            </div>
          )}

          {/* ── Instagram ────────────────────────────────────────────────────── */}
          {activeTab === "instagram" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Instagram Section</h2>
                <p className="text-sm text-[#6b7280] mt-1">Update the handle, profile link, and the four photos shown on the Leadership page.</p>
              </div>
              {instagramLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Handle + URL + Profile pic */}
                  <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Handle</label>
                        <input
                          type="text"
                          value={instagram.handle}
                          onChange={(e) => { setInstagram((prev) => ({ ...prev, handle: e.target.value })); setInstagramSaved(false); }}
                          placeholder="@HUAFinance"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Profile URL</label>
                        <input
                          type="url"
                          value={instagram.profileUrl}
                          onChange={(e) => { setInstagram((prev) => ({ ...prev, profileUrl: e.target.value })); setInstagramSaved(false); }}
                          placeholder="https://www.instagram.com/HUAFinance"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Profile Picture</label>
                      <DragDropFile
                        type="image"
                        value={instagram.profileImageUrl || undefined}
                        onChange={(dataUrl) => { setInstagram((prev) => ({ ...prev, profileImageUrl: dataUrl })); setInstagramSaved(false); }}
                        onClear={() => { setInstagram((prev) => ({ ...prev, profileImageUrl: "" })); setInstagramSaved(false); }}
                      />
                      <p className="text-xs text-[#9CA3AF]">Shown in the circle next to the handle. Falls back to the gradient icon if not set.</p>
                    </div>
                  </div>

                  {/* 4 photo slots */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    {instagram.photos.map((photo, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-6 flex flex-col gap-4">
                        <p className="text-xs font-bold text-[#6b7280] uppercase tracking-widest">Photo {i + 1}</p>
                        <DragDropFile
                          type="image"
                          value={photo.imageUrl || undefined}
                          onChange={(dataUrl) => {
                            const next = instagram.photos.map((p, j) => j === i ? { ...p, imageUrl: dataUrl } : p) as InstagramConfig["photos"];
                            setInstagram((prev) => ({ ...prev, photos: next }));
                            setInstagramSaved(false);
                          }}
                          onClear={() => {
                            const next = instagram.photos.map((p, j) => j === i ? { ...p, imageUrl: "" } : p) as InstagramConfig["photos"];
                            setInstagram((prev) => ({ ...prev, photos: next }));
                            setInstagramSaved(false);
                          }}
                        />
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Alt text <span className="font-normal normal-case">(optional)</span></label>
                          <input
                            type="text"
                            value={photo.alt}
                            onChange={(e) => {
                              const next = instagram.photos.map((p, j) => j === i ? { ...p, alt: e.target.value } : p) as InstagramConfig["photos"];
                              setInstagram((prev) => ({ ...prev, photos: next }));
                              setInstagramSaved(false);
                            }}
                            placeholder="Describe the photo..."
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <SaveButton saving={instagramSaving} saved={instagramSaved} error={instagramError} disabled={instagramSaving || instagramLoading} onClick={handleSaveInstagram} />
            </div>
          )}

          {/* ── Budget ───────────────────────────────────────────────────────── */}
          {activeTab === "budget" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">Budget Spreadsheet</h2>
                <p className="text-sm text-[#6b7280] mt-1">Paste the embed code or URL for the budget spreadsheet shown on the Budget page.</p>
              </div>
              {budgetLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Academic Year Label</label>
                    <input
                      type="text"
                      value={budget.yearLabel}
                      onChange={(e) => { setBudget((prev) => ({ ...prev, yearLabel: e.target.value })); setBudgetSaved(false); }}
                      placeholder="Academic year and update date: TBD"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Shown beneath &quot;Budget Allocations&quot; on the Budget page.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">Embed Code or URL</label>
                    <textarea
                      value={budget.embedCode}
                      onChange={(e) => { setBudget((prev) => ({ ...prev, embedCode: e.target.value })); setBudgetSaved(false); }}
                      placeholder={`<iframe src="https://..." ...></iframe>\n\nor paste a plain URL`}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8ECE7] text-[#222222] text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-[#1F5F0A] focus:border-transparent"
                    />
                    <p className="text-xs text-[#9CA3AF]">Accepts a full &lt;iframe&gt; embed code (Excel Online, Google Sheets, etc.) or a plain embed URL. The src is extracted automatically.</p>
                  </div>
                </div>
              )}
              <SaveButton saving={budgetSaving} saved={budgetSaved} error={budgetError} disabled={budgetSaving || budgetLoading} onClick={handleSaveBudget} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
