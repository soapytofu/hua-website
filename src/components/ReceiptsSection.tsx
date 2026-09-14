"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import AirtableEmbed from "@/components/AirtableEmbed";

interface ReceiptsConfig {
  airtableUrl: string;
  instructionsUrl: string;
}

function extractEmbedSrc(input: string): string {
  if (!input.trim().startsWith("<")) return input;
  const match = input.match(/src="([^"]+)"/);
  return match?.[1] ?? input;
}

export default function ReceiptsSection() {
  const [config, setConfig] = useState<ReceiptsConfig | null>(null);

  useEffect(() => {
    fetch("/api/admin/receipts")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setConfig(d); })
      .catch(() => {});
  }, []);

  if (!config) {
    return (
      <section className="bg-white py-20 px-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#1F5F0A] animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Airtable embed */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#222222]">Receipt Compliance Database</h2>
          {config.airtableUrl ? (
            <AirtableEmbed url={extractEmbedSrc(config.airtableUrl)} height={700} title="Receipt Collection" />
          ) : (
            <div className="w-full rounded-2xl border-2 border-dashed border-[#D1D5DB] bg-[#F5F8F2] flex flex-col items-center justify-center gap-3 py-16 text-center px-8">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8ECE7] flex items-center justify-center">
                <ExternalLink className="w-7 h-7 text-[#1F5F0A]" />
              </div>
              <p className="text-[#222222] font-semibold">No Airtable embed configured</p>
              <p className="text-sm text-[#6b7280] max-w-xs">
                Paste the Airtable embed URL in Admin Panel → Receipts to display the compliance database here.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
