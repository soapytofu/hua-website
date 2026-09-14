"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setDesktopOpen(null);
  }, [pathname]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        setDesktopOpen(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f2e04]">
        <a href="#finance-main" className="sr-only z-[60] rounded-md bg-white px-4 py-3 font-semibold text-[#1F5F0A] focus:not-sr-only focus:absolute focus:left-4 focus:top-2">
          Skip to main content
        </a>
        <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Finance navigation">
          {/* Logo */}
          <div className="relative group h-16 flex items-center">
            <Link href="/finance" className="flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt="HUA Finance"
                width={40}
                height={40}
                loading="eager"
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-sm leading-tight">Finance Team</p>
                <p className="text-[#a8d5a0] text-xs leading-tight">Harvard Undergraduate Association</p>
              </div>
            </Link>

            {/* Brand hover dropdown — red HUA panel linking to main website */}
            <Link
              href="/"
              className="absolute top-full left-0 w-full h-16 bg-[#A51C30] flex items-center gap-3 shadow-md border-t-2 border-white/60 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-opacity duration-150"
            >
              <Image
                src="/huamainlogo.png"
                alt="HUA"
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-sm leading-tight">Main Website</p>
                <p className="text-red-200 text-xs leading-tight">Harvard Undergraduate Association</p>
              </div>
            </Link>
          </div>

          {/* Desktop nav + CTA */}
          <div ref={desktopNavRef} className="hidden lg:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isAnyActive = link.dropdown.some((d) => pathname === d.href);
                const isOpen = desktopOpen === link.label;
                return (
                  <li key={link.label} className="relative">
                    <button
                      type="button"
                      onClick={() => setDesktopOpen(isOpen ? null : link.label)}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer",
                        isAnyActive || isOpen
                          ? "bg-white/20 text-white"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E8ECE7] py-1.5 z-50 origin-top-left"
                        >
                          {link.dropdown.map((item) => {
                            const active = pathname === item.href;
                            return (
                              <li key={item.href}>
                                {item.download ? (
                                  <a
                                    href={item.href}
                                    className="flex px-4 py-2.5 text-sm font-medium transition-colors duration-100 text-[#374151] hover:text-[#1F5F0A] hover:bg-[#F5F8F2]"
                                  >
                                    {item.label}
                                  </a>
                                ) : (
                                  <Link
                                    href={item.href}
                                    className={cn(
                                      "flex px-4 py-2.5 text-sm font-medium transition-colors duration-100",
                                      active
                                        ? "text-[#1F5F0A] bg-[#F5F8F2]"
                                        : "text-[#374151] hover:text-[#1F5F0A] hover:bg-[#F5F8F2]"
                                    )}
                                  >
                                    {item.label}
                                  </Link>
                                )}
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href!}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                      active
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
            <Link
              href="/grant-application"
              className="ml-2 inline-flex items-center px-4 py-2 rounded-lg bg-white text-[#1F5F0A] text-sm font-medium hover:bg-white/90 transition-colors duration-150"
            >
              Apply for Funding
            </Link>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden grid min-h-11 min-w-11 place-items-center rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? "Close Finance menu" : "Open Finance menu"}
            aria-controls="finance-mobile-menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            id="finance-mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-[#0f2e04] shadow-lg px-5 sm:px-6 py-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  const isExpanded = mobileExpanded === link.label;
                  const isAnyActive = link.dropdown.some((d) => pathname === d.href);
                  return (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                        aria-expanded={isExpanded}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                          isAnyActive || isExpanded
                            ? "bg-white/20 text-white"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {link.label}
                        <ChevronDown
                          className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-180")}
                        />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden pl-4 mt-0.5 flex flex-col gap-0.5"
                          >
                            {link.dropdown.map((item) => {
                              const active = pathname === item.href;
                              return (
                                <li key={item.href}>
                                  {item.download ? (
                                    <a
                                      href={item.href}
                                      className="flex px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-white/70 hover:text-white hover:bg-white/10"
                                    >
                                      {item.label}
                                    </a>
                                  ) : (
                                    <Link
                                      href={item.href}
                                      className={cn(
                                        "flex px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        active
                                          ? "bg-white/20 text-white"
                                          : "text-white/70 hover:text-white hover:bg-white/10"
                                      )}
                                    >
                                      {item.label}
                                    </Link>
                                  )}
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href!}
                      className={cn(
                        "flex px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        active
                          ? "bg-white/20 text-white"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2">
                <Link
                  href="/grant-application"
                  className="flex items-center justify-center px-4 py-3 rounded-lg bg-white text-[#1F5F0A] text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Apply for Funding
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
