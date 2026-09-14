import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grant Application | HUA Finance Team",
  description: "Apply for funding from the Harvard Undergraduate Association Finance Team.",
};

export default function GrantApplicationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
