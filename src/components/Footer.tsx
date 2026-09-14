import Link from "next/link";
import { MapPin } from "lucide-react";
import { navLinks } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="bg-[#F5F8F2] border-t border-[#E8ECE7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#1F5F0A] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">HUA</span>
              </div>
              <div>
                <p className="font-semibold text-[#222222] text-sm">Finance Team</p>
                <p className="text-[#6b7280] text-xs">Harvard Undergraduate Association</p>
              </div>
            </div>
            <p className="text-[#6b7280] text-sm max-w-sm leading-relaxed">
              Allocating funding to student organizations with transparency and accountability since 2022.
            </p>
            <a
              href="mailto:treasurer@thehua.org"
              className="inline-block mt-4 text-[#1F5F0A] text-sm font-medium hover:underline"
            >
              treasurer@thehua.org
            </a>
            <div className="flex items-start gap-2 mt-3 text-[#6b7280] text-sm">
              <MapPin className="w-4 h-4 text-[#1F5F0A] flex-shrink-0 mt-0.5" />
              <span>56 Linnean Street<br />Cambridge, MA 02138</span>
            </div>
            <a
              href="https://www.instagram.com/huafinance/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-[#6b7280] text-sm hover:text-[#1F5F0A] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              @huafinance
            </a>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[#222222] font-semibold text-sm mb-4">Quick Links</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.flatMap((link) =>
                link.dropdown
                  ? link.dropdown.map((item) => ({ label: item.label, href: item.href }))
                  : [{ label: link.label, href: link.href! }]
              ).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#6b7280] text-sm hover:text-[#1F5F0A] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E8ECE7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6b7280] text-xs">
            © {new Date().getFullYear()} Harvard Undergraduate Association Finance Team. All rights reserved.
          </p>
          <p className="text-[#6b7280] text-xs">
            Harvard Undergraduate Association
          </p>
        </div>
      </div>
    </footer>
  );
}
