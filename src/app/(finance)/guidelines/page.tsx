import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import GuidelinesPdfViewer from "@/components/GuidelinesPdfViewer";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export const metadata = {
  title: "Guidelines | HUA Finance Team",
  description: "HUA grant funding guidelines for student organizations.",
};

const faqItems: FAQItem[] = [
  {
    question: "Should I apply for semesterly or emergency funding?",
    answer: (
      <div className="flex flex-col gap-4">
        <p>
          The HUA Finance Team highly recommends student organizations to apply for Semesterly grant funding as that is where the vast majority of the budget for grant funding is dedicated. Emergency grant funding is only reserved for emergency, unforeseen expenses, and provisionally approved student organizations, which reflects a much smaller budget in comparison to Semesterly grant funding. <strong>Do not rely on Emergency funds.</strong>
        </p>
      </div>
    ),
  },
  {
    question: "Why is a funding supplement required?",
    answer: (
      <div className="flex flex-col gap-4">
        <p>
          This supplement ensures that we can accurately and quickly assess whether or not expenses for particular events fall within our guidelines. It also ensures that interviews run more quickly, easing the burden on student organizations and the Finance Team alike.
        </p>
        <p>
          It also provides the opportunity for more transparency in why particular funding line items may be cut per our guidelines (as you will receive a modified version of your supplement following the final determination on your funding application, detailing expenses that were either cut or even sometimes raised).
        </p>
      </div>
    ),
  },
  {
    question: "What are ineligible expenses?",
    answer: "Any expenses that do not fall within our Finance Guidelines.",
  },
  {
    question: "Why do I have to include ineligible expenses on the funding supplement?",
    answer: (
      <div className="flex flex-col gap-4">
        <p>This helps the Finance Team assess where outside funding should be applied to.</p>
        <p>We will always apply outside funding to the full amount of ineligible expenses before applying it to eligible expenses. This benefits student organizations!</p>
      </div>
    ),
  },
  {
    question: "Will I be penalized for outside funding?",
    answer: (
      <div className="flex flex-col gap-4">
        <p>Not necessarily.</p>
        <p>
          There is an expectation that clubs spend at least 50% of their outside funding during each grant cycle unless there is a reasonable explanation (e.g. <em>saving for an end-of-the-year formal</em>).
        </p>
        <p>Outside funding will always be applied to ineligible expenses before eligible expenses.</p>
      </div>
    ),
  },
  {
    question: "Can I apply for both semesterly and emergency funding?",
    answer: (
      <div className="flex flex-col gap-4">
        <p>Yes! But...</p>
        <p><strong>The HUA restricts student organizations from applying for Semesterly and Emergency grant funding simultaneously.</strong></p>
        <p>
          For example, you cannot submit a Fall 2024 Semesterly grant application and an emergency grant application within a month of the deadline for the Semesterly grant application.
        </p>
      </div>
    ),
  },
];

export default function GuidelinesPage() {
  return (
    <>
      <PageHeader
        badge="Grant Information"
        title="Funding Guidelines"
        subtitle="The official HUA Finance Guidelines for the current fiscal year."
      />

      <GuidelinesPdfViewer />

      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <CTASection
        title="Ready to apply?"
        subtitle="Once you've reviewed the guidelines, you can submit your grant application."
        buttonLabel="Apply for Funding"
        buttonHref="/grant-application"
      />
    </>
  );
}
