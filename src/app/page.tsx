import Link from "next/link";
import Image from "next/image";
import HuaHeader from "@/components/hua/HuaHeader";
import HuaFooter from "@/components/hua/HuaFooter";
import HuaInstagramSection from "@/components/hua/HuaInstagramSection";

const features = [
  { title: "Executive Team", text: "Meet the students leading HUA teams and connect with the right people.", image: "/hua-assets/executive.webp", href: "/executiveofficers" },
  { title: "Our Structure", text: "Find the many ways you can contribute to change-making on campus.", image: "/hua-assets/structure.webp", href: "/join" },
  { title: "Harvard Guides", text: "Navigate University and College resources, or suggest one we should add.", image: "/hua-assets/guides.webp", href: "/harvard-guides" },
];

export default function Home() {
  return (
    <div className="bg-[#fffdf9] text-[#241f20]">
      <HuaHeader />
      <main id="main">
        <section className="relative isolate flex min-h-[68vh] items-end overflow-hidden bg-[url('/hua-assets/widener.webp')] bg-cover bg-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
          <div className="mx-auto w-full max-w-6xl px-5 py-14 text-white sm:px-6 sm:py-20">
            <p className="text-sm font-bold uppercase tracking-[.3em] text-red-200">Welcome to the</p>
            <h1 className="mt-4 max-w-5xl font-serif text-4xl leading-[1.05] text-balance sm:text-6xl lg:text-8xl">Harvard Undergraduate Association</h1>
            <p className="mt-5 text-xl text-white/80">Official Website</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="group relative isolate min-h-[360px] overflow-hidden rounded-2xl bg-cover bg-center sm:min-h-[430px]" style={{ backgroundImage: `url(${feature.image})` }}>
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition group-hover:from-[#6f1020]/95" />
              <div className="flex min-h-[360px] flex-col justify-end p-6 text-white sm:min-h-[430px] sm:p-7">
                <h2 className="font-serif text-3xl sm:text-4xl">{feature.title}</h2><p className="mt-3 leading-7 text-white/85">{feature.text}</p>
                <Link href={feature.href} className="mt-5 w-fit rounded-md py-2 font-semibold hover:underline">Learn more →</Link>
              </div>
            </article>
          ))}
        </section>

        <section className="bg-[#45131d] text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-14">
            <div><p className="text-xs font-bold uppercase tracking-[.22em] text-red-200">Campus life</p><h2 className="mt-2 font-serif text-4xl">Meetings & Events</h2><p className="mt-2 text-white/70">HUA General Meeting · Sunday, September 13, 2026</p></div>
            <Link href="/calendar" className="w-fit rounded-full border border-white px-5 py-3 text-sm font-semibold hover:bg-white hover:text-[#45131d]">View calendar ↗</Link>
          </div>
        </section>

        <HuaInstagramSection />

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#a51c30]">Get involved</p><h2 className="mt-2 font-serif text-5xl text-[#45131d]">Take Part</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="overflow-hidden rounded-2xl bg-white shadow-lg"><Image src="/hua-assets/improve.webp" alt="Historic Harvard brick buildings" width={900} height={520} className="h-56 w-full object-cover sm:h-64" /><div className="p-6 sm:p-7"><h3 className="font-serif text-3xl text-[#45131d]">Help us Improve</h3><p className="mt-3 leading-7 text-neutral-600">Share what students need and help us improve the resources and programs listed here.</p><a href="https://docs.google.com/forms/d/e/1FAIpQLSfjUOvCVpErYRkreT1Jkor1CESSW9-FhvbazQ9qb30hgsu0hA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#a51c30] px-5 py-2.5 font-semibold text-white hover:bg-[#801525]">Submit feedback</a></div></article>
            <article className="overflow-hidden rounded-2xl bg-white shadow-lg"><Image src="/hua-assets/meeting.webp" alt="Harvard campus building" width={900} height={520} className="h-56 w-full object-cover sm:h-64" /><div className="p-6 sm:p-7"><h3 className="font-serif text-3xl text-[#45131d]">Come to a Meeting</h3><p className="mt-3 leading-7 text-neutral-600">Learn what teams are working on and add your perspective at a full-body or team meeting.</p><Link href="/calendar" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#a51c30] px-5 py-2.5 font-semibold text-white hover:bg-[#801525]">View calendar</Link></div></article>
          </div>
        </section>
      </main>
      <HuaFooter />
    </div>
  );
}
