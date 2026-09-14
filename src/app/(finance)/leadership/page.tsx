import PageHeader from "@/components/PageHeader";
import LeadershipCard from "@/components/LeadershipCard";
import InstagramSection from "@/components/InstagramSection";
import CTASection from "@/components/CTASection";
import { getLeaders } from "@/lib/leadershipConfig";

export const metadata = {
  title: "Leadership | HUA Finance Team",
  description: "Meet the members of the Harvard Undergraduate Association Finance Team.",
};

export const dynamic = "force-dynamic";

export default async function LeadershipPage() {
  const leaders = await getLeaders();

  return (
    <>
      <PageHeader
        badge="Our Team"
        title="Finance Team Leadership"
        subtitle="Meet the students who oversee the HUA's financial operations and work to ensure fair, transparent funding for Harvard's student organizations."
      />

      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-8">
            {leaders.map((leader, i) => (
              <LeadershipCard key={leader.id} leader={leader} index={i} />
            ))}
          </div>
        </div>
      </section>

      <InstagramSection />

      <CTASection
        title="Have a funding question?"
        subtitle="Our team is here to help. Reach out and we'll get back to you within two business days."
        buttonLabel="Contact Us"
        buttonHref="mailto:treasurer@thehua.org"
      />
    </>
  );
}
