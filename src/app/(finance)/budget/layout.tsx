import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budget | HUA Finance Team",
  description: "Current budget allocations and expenditures for the Harvard Undergraduate Association.",
};

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
