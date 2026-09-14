import Link from "next/link";
import Image from "next/image";
import type { HuaPage as HuaPageData } from "@/data/huaPages";
import HuaHeader from "./HuaHeader";
import HuaFooter from "./HuaFooter";

const isExternal = (href: string) => href.startsWith("http") || href.startsWith("mailto:");

function Action({ href, children }: { href: string; children: React.ReactNode }) {
  const classes = "inline-flex items-center rounded-full bg-[#a51c30] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#801525]";
  return isExternal(href)
    ? <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{children}</a>
    : <Link href={href} className={classes}>{children}</Link>;
}

export default function HuaPage({ page }: { page: HuaPageData }) {
  return (
    <div className="min-h-screen bg-[#fffdf9] text-[#241f20]">
      <HuaHeader />
      <main id="main">
        <section className="relative isolate min-h-[360px] overflow-hidden bg-cover bg-center sm:min-h-[430px]" style={{ backgroundImage: `url(${page.image})` }}>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
          <div className="mx-auto flex min-h-[360px] max-w-6xl flex-col justify-end px-5 py-12 text-white sm:min-h-[430px] sm:px-6 sm:py-16">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.25em] text-red-200">{page.kicker}</p>
            <h1 className="max-w-4xl font-serif text-4xl leading-tight text-balance sm:text-6xl lg:text-7xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">{page.intro}</p>
          </div>
        </section>
        {page.sections.map((section, index) => (
          <section key={`${section.title}-${index}`} className={index % 2 ? "bg-[#f4eee9]" : "bg-[#fffdf9]"}>
            <div className={`mx-auto grid gap-4 px-5 py-12 sm:px-6 sm:py-16 md:gap-7 ${section.cardColumns === 4 ? "max-w-[1440px]" : "max-w-6xl md:grid-cols-[80px_1fr]"}`}>
              <div className="text-sm font-bold tracking-[.2em] text-[#a51c30]">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h2 className="font-serif text-3xl text-balance text-[#45131d] sm:text-4xl">{section.title}</h2>
                {section.text && <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">{section.text}</p>}
                {section.cards && <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${section.cardColumns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>{section.cards.map((card) => (
                  <article key={`${card.title}-${card.eyebrow ?? ""}`} className="flex min-w-0 flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                    {card.image && <div className="-mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl bg-[#eee8e2]"><Image src={card.image} alt={`${card.title}, ${card.eyebrow ?? "HUA officer"}`} width={750} height={1000} className={`w-full object-cover ${card.imageCrop === "close" ? "scale-125 object-[center_62%]" : "object-top"} ${section.cardColumns === 4 ? "aspect-[3/4]" : "aspect-[4/5]"}`} /></div>}
                    {card.eyebrow && <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a51c30]">{card.eyebrow}</p>}
                    <h3 className="mt-2 font-serif text-2xl text-[#45131d]">{card.title}</h3>
                    {card.text && <p className="mt-3 leading-7 text-neutral-600">{card.text}</p>}
                    {card.meta && <a className="mt-4 block break-all text-sm font-semibold text-[#a51c30] hover:underline" href={`mailto:${card.meta}`}>{card.meta}</a>}
                    {card.link && <div className="mt-auto pt-5"><Action href={card.link}>{card.label ?? "Learn more"} →</Action></div>}
                  </article>
                ))}</div>}
                {section.list && <ol className="mt-7 grid gap-3">{section.list.map((item, itemIndex) => <li key={item} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"><strong className="text-[#a51c30]">{String(itemIndex + 1).padStart(2, "0")}</strong><span>{item}</span></li>)}</ol>}
                {section.stats && <div className="mt-8 grid gap-4 sm:grid-cols-3">{section.stats.map(([value, label]) => <div key={label} className="rounded-xl bg-[#45131d] p-6 text-white"><strong className="block font-serif text-3xl">{value}</strong><span className="text-sm text-white/70">{label}</span></div>)}</div>}
                {section.logos && <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{section.logos.map((label) => <div key={label} className="grid place-items-center rounded-xl border bg-white p-6"><Image src="/hua-assets/hua-logo.webp" alt={`${label} HUA logo`} width={220} height={80} className="h-20 w-auto object-contain" /><span className="mt-3 text-sm font-semibold">{label}</span></div>)}</div>}
                {section.cta && <div className="mt-7"><Action href={section.cta.href}>{section.cta.label}</Action></div>}
              </div>
            </div>
          </section>
        ))}
        <section className="bg-[#a51c30] px-5 py-14 text-center text-white"><p className="text-xs font-bold uppercase tracking-[.2em]">Still looking?</p><h2 className="mt-3 font-serif text-3xl text-balance sm:text-4xl">Find the right HUA team.</h2><Link href="/teams-and-contacts" className="mt-6 inline-flex min-h-11 items-center rounded-full border border-white px-5 py-2.5 font-semibold hover:bg-white hover:text-[#801525]">Browse teams and contacts →</Link></section>
      </main>
      <HuaFooter />
    </div>
  );
}
