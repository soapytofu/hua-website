import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="finance-main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
