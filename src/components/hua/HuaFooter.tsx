import Link from "next/link";

export default function HuaFooter() {
  return (
    <footer className="bg-[#2a0d13] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-[1fr_2fr_1fr] sm:items-start">
        <img src="/hua-assets/hua-logo.webp" alt="HUA" className="h-16 w-auto rounded bg-white p-1" />
        <div><strong className="font-serif text-lg">Harvard Undergraduate Association</strong><p className="mt-2 text-sm text-white/70">56 Linnean Street<br />Cambridge, MA 02138</p></div>
        <div><strong>Follow</strong><p className="mt-2 text-sm leading-7"><a href="https://www.instagram.com/theharvardua/">Instagram</a><br /><a href="https://www.linkedin.com/company/thehua/">LinkedIn</a><br /><Link href="/finance">Finance Team</Link></p></div>
      </div>
    </footer>
  );
}
