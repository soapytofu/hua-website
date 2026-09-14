import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import ResourcesTabs from "@/components/ResourcesTabs";
import { getResourcesConfig } from "@/lib/resourcesConfig";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Resources | HUA Finance Team",
  description: "Step-by-step instructions for receipts, grant applications, and Harvard FCU accounts.",
};

export default async function ResourcesPage() {
  const config = await getResourcesConfig();

  return (
    <>
      <PageHeader
        badge="Grant Information"
        title="Resources"
        subtitle="Step-by-step instructions for grant applications, receipts, and Harvard FCU accounts. Pick a topic to get started."
      />

      <section className="bg-[#F5F8F2] py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ResourcesTabs config={config} />
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
