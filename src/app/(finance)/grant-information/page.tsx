import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Landmark, ReceiptText, RotateCcw } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Grant Information | HUA Finance Team",
  description: "A single start-to-finish guide to HUA grant funding for student organizations.",
};

const steps = [
  {
    number: "01", title: "Understand the funding source", icon: Landmark,
    text: "HUA grants use the Student Activities Fee and are intended to support recognized organizations and undergraduate student life.",
    href: "/guidelines", label: "Read the 2025–2026 Finance Guidelines",
  },
  {
    number: "02", title: "Confirm eligibility", icon: CheckCircle2,
    text: "Check DSO standing, receipt compliance, organizational eligibility, and whether your planned expenses meet HUA policy.",
    href: "/eligibility", label: "Review eligibility",
  },
  {
    number: "03", title: "Prepare the request", icon: FileText,
    text: "Build an itemized budget, disclose outside funding, prepare the required supplement, and retain documentation for every expense.",
    href: "/resources", label: "Open application resources",
  },
  {
    number: "04", title: "Apply when the cycle opens", icon: ArrowRight,
    text: "Fall 2026 grant applications are coming soon. All cycle dates are TBD until the Co-Treasurers publish the confirmed schedule.",
    href: "/timeline", label: "Check the timeline",
  },
  {
    number: "05", title: "Document spending", icon: ReceiptText,
    text: "After an award, spend only for the approved purpose and submit itemized receipts by the published deadline.",
    href: "/receipts", label: "Receipt requirements",
  },
  {
    number: "06", title: "Appeal or reapply", icon: RotateCcw,
    text: "If you believe an allocation contains an error, contact the Finance Team within the appeal window. For a future cycle, update the budget and reapply when applications reopen.",
    href: "mailto:treasurer@thehua.org", label: "Contact the Co-Treasurers",
  },
];

export default function GrantInformationPage() {
  return (
    <>
      <PageHeader
        badge="Funding Hub"
        title="One clear grant process"
        subtitle="Start here for funding sources, guidelines, application preparation, deadlines, receipts, appeals, and reapplication."
      />
      <section className="bg-[#F5F8F2] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Fall 2026 status</p>
            <h2 className="mt-2 text-2xl font-bold text-[#222222]">Grant applications coming soon</h2>
            <p className="mt-2 text-[#6b7280]">Confirmed opening dates and deadlines have not yet been published. The application workflow remains available for preparation; the Airtable destination is unchanged.</p>
          </div>
          <ol className="grid gap-5 md:grid-cols-2">
            {steps.map((step) => {
              const Icon = step.icon;
              const external = step.href.startsWith("mailto:");
              const classes = "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1F5F0A] hover:underline";
              return (
                <li key={step.number} className="rounded-2xl border border-[#E8ECE7] bg-white p-7 shadow-sm">
                  <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[.2em] text-[#1F5F0A]">STEP {step.number}</span><Icon className="h-5 w-5 text-[#1F5F0A]" /></div>
                  <h2 className="mt-4 text-xl font-bold text-[#222222]">{step.title}</h2>
                  <p className="mt-3 leading-7 text-[#6b7280]">{step.text}</p>
                  {external ? <a href={step.href} className={classes}>{step.label} <ArrowRight className="h-4 w-4" /></a> : <Link href={step.href} className={classes}>{step.label} <ArrowRight className="h-4 w-4" /></Link>}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
