"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  {
    label: "Teams",
    links: [
      ["All Teams & Contacts", "/teams-and-contacts"], ["Academic Life", "/academic-team"],
      ["Social Life", "/social-life-team"], ["Sports", "/sports-team"],
      ["Well-Being", "/well-being-team"], ["Residential Life", "/residential-life-team"],
      ["Extracurriculars", "/extracurriculars-team"], ["Inclusion", "/inclusion-team"],
      ["Finance", "/finance-team"],
    ],
  },
];

const singles = [
  ["Elections", "/election-guidelines"], ["Donate", "/donations"],
];

export default function HuaHeader() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
      <a href="#main" className="sr-only z-50 rounded-md bg-white px-4 py-3 font-semibold text-[#801b2b] focus:not-sr-only focus:absolute focus:left-4 focus:top-3">
        Skip to main content
      </a>
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-6 px-5 lg:px-10">
        <Link href="/" aria-label="Harvard Undergraduate Association home" className="shrink-0">
          <Image src="/hua-assets/hua-logo.webp" alt="Harvard Undergraduate Association" width={220} height={64} loading="eager" className="h-14 w-auto object-contain" />
        </Link>
        <button className="grid min-h-11 min-w-11 place-items-center rounded-md text-[#801b2b] hover:bg-red-50 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="hua-primary-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <X /> : <Menu />}
        </button>
        <nav id="hua-primary-navigation" className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto border-b bg-white p-5 shadow-xl lg:static lg:flex lg:max-h-none lg:flex-row lg:items-center lg:overflow-visible lg:border-0 lg:p-0 lg:shadow-none`} aria-label="Primary navigation">
          <Link href="/" onClick={closeMenu} className="rounded px-3 py-3 text-sm font-semibold text-neutral-800 hover:bg-red-50 hover:text-[#a51c30] lg:py-2">Home</Link>
          {groups.map((group) => (
            <details key={group.label} className="group relative">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-1 rounded px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-red-50 hover:text-[#a51c30] lg:min-h-0 lg:justify-start">
                {group.label}<ChevronDown className="h-3.5 w-3.5 group-open:rotate-180" />
              </summary>
              <div className="flex min-w-56 flex-col rounded-lg bg-white p-2 lg:absolute lg:left-0 lg:top-full lg:border lg:shadow-xl">
                {group.links.map(([label, href]) => <Link key={href} href={href} onClick={closeMenu} className="rounded px-3 py-3 text-sm hover:bg-red-50 hover:text-[#a51c30] lg:py-2">{label}</Link>)}
              </div>
            </details>
          ))}
          {singles.map(([label, href]) => <Link key={href} href={href} onClick={closeMenu} className="rounded px-3 py-3 text-sm font-semibold text-neutral-800 hover:bg-red-50 hover:text-[#a51c30] lg:py-2">{label}</Link>)}
          <Link href="/finance" onClick={closeMenu} className="mt-2 rounded-full bg-[#1f5f0a] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#174508] lg:mt-0 lg:py-2">Finances & Funding</Link>
        </nav>
      </div>
    </header>
  );
}
