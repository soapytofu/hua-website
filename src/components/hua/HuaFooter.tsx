import Link from "next/link";
import Image from "next/image";

export default function HuaFooter() {
  return (
    <footer className="bg-[#2a0d13] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-[1fr_2fr_1fr] sm:items-start">
        <Image src="/hua-assets/hua-logo.webp" alt="HUA" width={220} height={64} className="h-16 w-auto rounded bg-white p-1 object-contain" />
        <div><strong className="font-serif text-lg">Harvard Undergraduate Association</strong><p className="mt-2 text-sm text-white/70">56 Linnean Street<br />Cambridge, MA 02138</p></div>
        <div><strong>Follow</strong><div className="mt-2 flex flex-col items-start text-sm"><a className="rounded py-1.5 hover:underline" href="https://www.instagram.com/theharvardua/" target="_blank" rel="noopener noreferrer">Instagram</a><a className="rounded py-1.5 hover:underline" href="https://www.linkedin.com/company/thehua/" target="_blank" rel="noopener noreferrer">LinkedIn</a><Link className="rounded py-1.5 hover:underline" href="/finance">Finance Team</Link></div></div>
      </div>
    </footer>
  );
}
