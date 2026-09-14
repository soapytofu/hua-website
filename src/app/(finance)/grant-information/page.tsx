import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Grant Information | HUA Finance Team",
  description: "Information about HUA grant funding for student organizations.",
};

export default function GrantInformationPage() {
  return (
    <>
      <PageHeader
        badge="Grant Information"
        title="Funding for Student Organizations"
        subtitle="Everything you need to know about applying for HUA grant funding. More information coming soon."
      />

      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#6b7280] text-lg leading-relaxed">
            Additional grant information will be posted here. Check back soon or reach out to the Finance Team with any questions.
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
        title="Ready to apply?"
        subtitle="Once you've reviewed the eligibility requirements, you can submit your grant application."
        buttonLabel="Apply for Funding"
        buttonHref="/grant-application"
      />
    </>
  );
}
