import PageHeader from "@/components/PageHeader";
import AirtableEmbed from "@/components/AirtableEmbed";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { getEligibilityConfig, extractEmbedSrc } from "@/lib/eligibilityConfig";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Eligibility | HUA Finance Team",
  description: "Learn about eligibility requirements for HUA funding.",
};

const faqItems: FAQItem[] = [
  {
    question: "Who is eligible to apply for HUA funding?",
    answer:
      "Any recognized student organization at Harvard College that is in good standing with the Dean of Students Office is eligible to apply for HUA funding. Organizations must be registered for the current academic year and be compliant with all receipt submissions. ONLY AUTHORIZED TREASURERS/FINANCIAL OFFICERS AFFILIATED WITH YOUR CLUB ARE ALLOWED TO APPLY.",
  },
  {
    question: "What types of organizations qualify for funding?",
    answer:
      "Eligible organizations include student groups focused on academic, cultural, athletic, artistic, and community service activities. Organizations must primarily serve Harvard College undergraduates. Graduate student organizations and organizations affiliated with specific academic departments are generally not eligible for HUA funding. More information is available in the finance guidelines.",
  },
  {
    question: "What expenses cannot be funded by the HUA?",
    answer:
      "The HUA does not fund alcohol, drugs, personal gifts, prizes or awards with monetary value, donations to outside organizations, expenses that primarily benefit non-Harvard students. More information is available in the finance guidelines",
  },
  {
    question: "When are funding decisions released?",
    answer:
      "Semester allocation decisions are typically released within 3-4 weeks of the application deadline. Emergency grant application decisions are made on a rolling basis, with most decisions issued within two weeks of committee review. Organizations are notified via email at the address provided in their application.",
  },
  {
    question: "Can a newly formed organization apply for funding?",
    answer:
      "Yes, newly recognized organizations may apply for funding after completing their first semester of registration. New organizations will typically receive a reduced allocation in their first funding cycle. After demonstrating programming activity, they may receive standard allocations. An interview may be required. ",
  },
  {
    question: "What documentation is required for an application?",
    answer:
      "Organizations must submit payment information that we can route decision awards to, a supplemental excel sheet (provided by us) that contains a detailed budget breakdown of programming expenses, and the full application form that contains additional information, of which the supplemental application will be attached to.",
  },
];

export default async function EligibilityPage() {
  const eligibilityConfig = await getEligibilityConfig();
  return (
    <>
      <PageHeader
        badge="Funding Eligibility"
        title="Who can apply for HUA funding?"
        subtitle="The Finance Team is committed to equitable access to resources. Review the eligibility requirements below before submitting your application."
      />

      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Eligibility highlights */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Registered Organizations",
                body: "Must be recognized by the Dean of Students Office for the current academic year.",
              },
              {
                title: "Undergraduate Focus",
                body: "Primary membership and programming must serve Harvard College undergraduates.",
              },
              {
                title: "Good Standing",
                body: "Must be current on all prior-year financial reporting requirements.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#F5F8F2] rounded-2xl p-6 border border-[#E8ECE7]">
                <h3 className="font-semibold text-[#222222] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1F5F0A] flex-shrink-0" />
                  {item.title}
                </h3>
                <p className="text-[#6b7280] text-sm leading-relaxed pl-4">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Airtable embed */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#222222] mb-2">Club Eligibility List</h2>
            <p className="text-[#6b7280] mb-8">
              The table below lists every registered organization and its current eligibility status, maintained by the Finance Team.
            </p>
          </div>
          <AirtableEmbed url={extractEmbedSrc(eligibilityConfig.airtableEmbedCode)} height={900} title="Club Eligibility List" />

          {/* FAQ */}
          <div className="mt-20">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to apply?"
        subtitle="If your organization meets the eligibility requirements, submit a grant application today."
        buttonLabel="Apply for Funding"
        buttonHref="/grant-application"
      />
    </>
  );
}
