import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import HuaPage from "@/components/hua/HuaPage";
import { huaPages } from "@/data/huaPages";

const legacyFinanceRoutes: Record<string, string> = {
  finances: "/finance",
  funding: "/resources",
  "club-funding/grant-information": "/grant-information",
  "club-funding/grant-application": "/grant-application",
  "club-funding/receipts": "/receipts",
};

export function generateStaticParams() {
  return Object.keys(huaPages).map((key) => ({ slug: key.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = huaPages[slug.join("/")];
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  if (legacyFinanceRoutes[key]) redirect(legacyFinanceRoutes[key]);
  const page = huaPages[key];
  if (!page) notFound();
  return <HuaPage page={page} />;
}
