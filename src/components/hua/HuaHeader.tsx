"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const groups = [
  {
    label: "About Us",
    links: [
      ["Executive Officers", "/executiveofficers"], ["Executive Team", "/executive-team"],
      ["Join the HUA", "/join"], ["Calendar", "/calendar"],
      ["Governing Documents", "/governing-docs"], ["Semesterly Grants", "/hua-semesterly-grant-opening"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Harvard Guides", "/harvard-guides"], ["HUA Logos", "/hua-logos"],
    ],
  },
];

const singles = [
  ["Elections", "/election-guidelines"], ["Teams & Contacts", "/teams-and-contacts"],
  ["Donate", "/donations"],
];

export default function HuaHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-40 bg-white border-b border-black/10">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-6 px-5 lg:px-10">
        <Link href="/" aria-label="Harvard Undergraduate Association home" className="shrink-0">
          <img src="/hua-assets/hua-logo.webp" alt="Harvard Undergraduate Association" className="h-14 w-auto" />
        </Link>
        <button className="rounded-md p-2 text-[#801b2b] lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-1 border-b bg-white p-5 shadow-xl lg:static lg:flex lg:flex-row lg:items-center lg:border-0 lg:p-0 lg:shadow-none`} aria-label="Primary navigation">
          <Link href="/" className="px-3 py-2 text-sm font-semibold text-neutral-800 hover:text-[#a51c30]">Home</Link>
          {groups.map((group) => (
            <details key={group.label} className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 px-3 py-2 text-sm font-semibold text-neutral-800 hover:text-[#a51c30]">
                {group.label}<ChevronDown className="h-3.5 w-3.5 group-open:rotate-180" />
              </summary>
              <div className="flex min-w-56 flex-col rounded-lg bg-white p-2 lg:absolute lg:left-0 lg:top-full lg:border lg:shadow-xl">
                {group.links.map(([label, href]) => <Link key={href} href={href} className="rounded px-3 py-2 text-sm hover:bg-red-50 hover:text-[#a51c30]">{label}</Link>)}
              </div>
            </details>
          ))}
          {singles.map(([label, href]) => <Link key={href} href={href} className="px-3 py-2 text-sm font-semibold text-neutral-800 hover:text-[#a51c30]">{label}</Link>)}
          <Link href="/finance" className="rounded-full bg-[#1f5f0a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#174508]">Finances & Funding</Link>
        </nav>
      </div>
    </header>
  );
}
