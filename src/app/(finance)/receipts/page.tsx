import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import ReceiptsSection from "@/components/ReceiptsSection";
import type { FAQItem } from "@/components/FAQAccordion";
import { getReceiptsConfig } from "@/lib/receiptsConfig";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Receipts | HUA Finance Team",
  description: "Receipt submission requirements and FAQs for HUA grant funding.",
};

const faqItems: FAQItem[] = [
  {
    question: "What happens if I don't submit all my receipts?",
    answer: (
      <div className="flex flex-col gap-3">
        <p>
          <strong className="text-[#222222]">You will be disqualified from funding for the following semester, with no exceptions.</strong>{" "}
          The Finance Team will be completing monthly audits and a final audit during Wintersession to ensure that Student Organizations are within compliance.
        </p>
        <p>
          If you are not in compliance, you will be sent an e-mail and be given a limited time period to collect your receipts and submit them before disqualification.
        </p>
      </div>
    ),
  },
  {
    question: "How do I spend my disbursement on events given funding cuts?",
    answer: (
      <p>
        You are free to spend your funding within the constraints of what you applied for on your Grant Supplement and within the constraints of the Finance Guidelines.{" "}
        <strong className="text-[#222222]">Please reach out if you have any questions.</strong>
      </p>
    ),
  },
  {
    question: "Why do we need to collect receipts?",
    answer: (
      <div className="flex flex-col gap-3">
        <p>
          To ensure that funds are being spent within the constraints of guidelines set by the Finance Team and what is expected from the Student Activities Fee.
        </p>
        <p>
          This is essential so that we can continue advocating for more funding from the Dean of Students Office (DSO). The DSO will not be inclined to give us more money if proper receipts are not being collected — and hence student organizations not submitting receipts negatively affects what they may receive in the future.
        </p>
      </div>
    ),
  },
  {
    question: "Why is my organization listed as receipt non-compliant?",
    answer: (
      <div className="flex flex-col gap-3">
        <p>
          This can have several reasons: your club might have submitted receipts late for the last grant cycle or not at all, your club might have forgotten to return ineligible funding to the HUA, or your club might have submitted inappropriate receipts — in which case you have to return the money. In very few instances, our systems can have a flaw. So, if you have checked all the points above, feel free to contact the Co-Treasurers for help.
        </p>
        <p>
          Address the{" "}
          <Link href="/guidelines" className="text-[#1F5F0A] font-medium underline underline-offset-2 hover:text-[#174508]">
            HUA finance guidelines
          </Link>{" "}
          for more information.
        </p>
      </div>
    ),
  },
];

export default async function ReceiptsPage() {
  const receiptsConfig = await getReceiptsConfig();

  const subtitle = (
    <>
      By the HUA Constitution, any recipient of HUA funding is required to submit receipts.{" "}
      {receiptsConfig.instructionsUrl ? (
        <a
          href={receiptsConfig.instructionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1F5F0A] font-medium underline underline-offset-2 hover:text-[#174508]"
        >
          Please preview the instructions here
        </a>
      ) : (
        "Please review the instructions"
      )}{" "}
      regarding how to do this. Additionally, the database below shows the current status of receipt submissions for HUA grant funding. All last year&apos;s noncompliant grant applications are also visible below.
    </>
  );

  return (
    <>
      <PageHeader
        badge="Grant Information"
        title="Receipt Submission"
        subtitle={subtitle}
      />

      <ReceiptsSection />

      <section className="bg-[#F5F8F2] py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <CTASection
        title="Still have questions?"
        subtitle="Reach out to the Finance Team and we'll get back to you within two business days."
        buttonLabel="Contact Us"
        buttonHref="mailto:treasurer@thehua.org"
      />
    </>
  );
}
