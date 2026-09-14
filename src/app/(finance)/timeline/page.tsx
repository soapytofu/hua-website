import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { getTimeline, TIMELINE_ROWS } from "@/lib/timelineConfig";
import type { SemesterTimeline } from "@/lib/timelineConfig";

export const metadata = {
  title: "Timeline | HUA Finance Team",
  description: "Grant application timeline and key dates for HUA funding.",
};

export const dynamic = "force-dynamic";

function GrantTable({ data }: { data: SemesterTimeline }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#D1D5DB] shadow-md w-full">
      {/* Title banner */}
      <div className="bg-[#1F5F0A] px-6 py-4 text-center">
        <h3 className="text-white font-bold text-lg tracking-wide">{data.title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          {/* Column headers */}
          <thead>
            <tr className="bg-[#174508]">
              <th className="w-[38%] px-5 py-3 text-left text-white/0 select-none">—</th>
              <th className="w-[31%] px-5 py-3 text-center text-white font-semibold leading-snug">
                {data.semesterlyLabel}
              </th>
              <th className="w-[31%] px-5 py-3 text-center text-white font-semibold leading-snug">
                Emergency
              </th>
            </tr>
          </thead>

          <tbody>
            {TIMELINE_ROWS.map((row, i) => (
              <tr
                key={row.key}
                className={i % 2 === 0 ? "bg-white" : "bg-[#F5F8F2]"}
              >
                <td className="px-5 py-4 font-semibold text-[#1F5F0A] border-r border-[#E8ECE7] leading-snug">
                  {row.label}
                </td>
                <td className="px-5 py-4 text-[#374151] text-center border-r border-[#E8ECE7] leading-relaxed">
                  {data[row.key].semesterly}
                </td>
                <td className="px-5 py-4 text-[#374151] text-center leading-relaxed">
                  {data[row.key].emergency}
                </td>
              </tr>
            ))}

            {/* Expense Date Ranges — merged cell */}
            <tr className="bg-[#F5F8F2]">
              <td className="px-5 py-4 font-semibold text-[#1F5F0A] border-r border-[#E8ECE7] leading-snug">
                Expense Date Ranges
              </td>
              <td
                colSpan={2}
                className="px-5 py-4 text-[#374151] text-center leading-relaxed whitespace-pre-line"
              >
                {data.expenseDateRanges}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function TimelinePage() {
  const timeline = await getTimeline();

  return (
    <>
      <PageHeader
        badge="Grant Information"
        title="Application Timeline"
        subtitle="Key dates and deadlines for HUA grant funding cycles. All deadlines are at 11:59 pm EST unless otherwise noted."
      />

      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <GrantTable data={timeline.fall} />
            <GrantTable data={timeline.spring} />
          </div>

          <p className="mt-8 text-center text-xs text-[#9CA3AF]">
            Dates are subject to change. Contact{" "}
            <a href="mailto:treasurer@thehua.org" className="text-[#1F5F0A] hover:underline">
              treasurer@thehua.org
            </a>{" "}
            with any questions.
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to apply?"
        subtitle="Once you've reviewed the timeline and eligibility requirements, you can submit your grant application."
        buttonLabel="Apply for Funding"
        buttonHref="/grant-application"
      />
    </>
  );
}
