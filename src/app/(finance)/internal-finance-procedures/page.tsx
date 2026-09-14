import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Internal Finance Procedures | HUA Finance Team",
  description: "Internal finance procedures for the HUA Finance Team.",
};

export default function InternalFinanceProceduresPage() {
  return (
    <>
      <PageHeader
        badge="Finances"
        title="Internal Finance Procedures"
        subtitle="Internal procedures and policies for the HUA Finance Team. More information coming soon."
      />

      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#6b7280] text-lg leading-relaxed">
            Internal finance procedures will be posted here. Check back soon or reach out to the Finance Team with any questions.
          </p>
          <a
            href="mailto:treasurer@thehua.org"
            className="inline-flex items-center gap-2 mt-8 bg-[#1F5F0A] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#174508] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      <CTASection
        title="Have a question?"
        subtitle="Our team is here to help. Reach out and we'll get back to you within two business days."
        buttonLabel="Contact Us"
        buttonHref="mailto:treasurer@thehua.org"
      />
    </>
  );
}
