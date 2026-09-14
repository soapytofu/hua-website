"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect, useRef } from "react";
import { Download, ExternalLink, FileText, Loader2 } from "lucide-react";

export default function GuidelinesPdfViewer() {
  const [pdfDataUrl, setPdfDataUrl] = useState<string>("");
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const blobRef = useRef<string>("");

  useEffect(() => {
    fetch("/api/admin/guidelines")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => {
        if (d?.pdfUrl) setPdfDataUrl(d.pdfUrl);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!pdfDataUrl || pdfDataUrl.startsWith("http")) return;
    const base64 = pdfDataUrl.split(",")[1];
    if (!base64) return;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    blobRef.current = url;
    return () => URL.revokeObjectURL(url);
  }, [pdfDataUrl]);

  const handleDownload = () => {
    if (!pdfDataUrl) return;
    const a = document.createElement("a");
    a.href = pdfDataUrl;
    a.download = "HUA_Finance_Guidelines.pdf";
    a.click();
  };

  const externalDocument = pdfDataUrl.startsWith("http");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-[#1F5F0A] animate-spin" />
      </div>
    );
  }

  if (!pdfDataUrl) {
    return (
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F5F8F2] border border-[#E8ECE7] flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-[#1F5F0A]" />
          </div>
          <h2 className="text-xl font-semibold text-[#222222] mb-3">Guidelines coming soon</h2>
          <p className="text-[#6b7280] leading-relaxed">
            The Finance Guidelines document will be posted here. In the meantime, reach out to the Finance Team with any questions.
          </p>
          <a
            href="mailto:treasurer@thehua.org"
            className="inline-flex items-center gap-2 mt-8 bg-[#1F5F0A] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#174508] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#6b7280] font-medium">HUA Finance Guidelines · Fiscal Year 2025–2026</p>
          {externalDocument ? (
            <a href={pdfDataUrl.replace("/preview", "/edit?usp=sharing")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors">
              <ExternalLink className="w-4 h-4" /> Open Guidelines
            </a>
          ) : (
            <button onClick={handleDownload} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          )}
        </div>

        {/* Inline viewer */}
        <div className="rounded-2xl border border-[#E8ECE7] overflow-hidden shadow-sm">
          <iframe
            src={externalDocument ? pdfDataUrl : blobUrl}
            className="w-full"
            style={{ height: "85vh", minHeight: 600 }}
            title="HUA Finance Guidelines"
          />
        </div>
      </div>
    </section>
  );
}
