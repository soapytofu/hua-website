export type DropdownItem = {
  label: string;
  href: string;
  download?: boolean;
};

export type NavLink = {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/finance" },
  { label: "Leadership", href: "/leadership" },
  { label: "Resources", href: "/resources" },
  {
    label: "Grant Information",
    dropdown: [
      { label: "Funding Overview", href: "/grant-information" },
      { label: "Timeline", href: "/timeline" },
      { label: "Eligibility", href: "/eligibility" },
      { label: "Guidelines", href: "/guidelines" },
      { label: "Receipts", href: "/receipts" },
    ],
  },
  {
    label: "Finances",
    dropdown: [
      { label: "Budget", href: "/budget" },
      { label: "Reports", href: "/reports" },
      { label: "Internal Finance Procedures", href: "/api/download/procedures", download: true },
    ],
  },
];
