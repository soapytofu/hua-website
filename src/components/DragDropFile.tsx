"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, FileSpreadsheet, ImageIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface DragDropFileProps {
  type: "image" | "excel" | "pdf";
  value?: string;
  onChange: (dataUrl: string) => void;
  onClear: () => void;
}

const MAX_IMAGE_PX = 900;

function resizeAndEncode(file: File, onDone: (dataUrl: string) => void) {
  const objectUrl = URL.createObjectURL(file);
  const img = new window.Image();
  img.onload = () => {
    let w = img.width;
    let h = img.height;
    if (w > MAX_IMAGE_PX || h > MAX_IMAGE_PX) {
      if (w > h) { h = Math.round((h * MAX_IMAGE_PX) / w); w = MAX_IMAGE_PX; }
      else        { w = Math.round((w * MAX_IMAGE_PX) / h); h = MAX_IMAGE_PX; }
    }
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")?.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(objectUrl);
    onDone(canvas.toDataURL("image/jpeg", 0.85));
  };
  img.src = objectUrl;
}

export default function DragDropFile({ type, value, onChange, onClear }: DragDropFileProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (type === "image") {
      resizeAndEncode(file, onChange);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") onChange(result);
      };
      reader.readAsDataURL(file);
    }
  }, [type, onChange]);

  const label =
    type === "image" ? "Drag & drop a photo" :
    type === "pdf"   ? "Drag & drop the PDF file" :
                       "Drag & drop the Excel file";

  const sublabel =
    type === "image" ? "JPG, PNG, WEBP — resized automatically" :
    type === "pdf"   ? ".pdf files only" :
                       ".xlsx files only";

  const accept =
    type === "image" ? "image/*" :
    type === "pdf"   ? ".pdf,application/pdf" :
                       ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  const FilledIcon =
    type === "image" ? null :
    type === "pdf"   ? FileText :
                       FileSpreadsheet;

  const filledLabel =
    type === "pdf" ? "PDF uploaded" : "Excel file uploaded";

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  // ── Filled state ─────────────────────────────────────────────────────────────
  if (value) {
    return (
      <div className="relative rounded-xl border border-[#E8ECE7] overflow-hidden">
        {type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
        ) : (
          <div className="flex items-center gap-3 p-5 bg-[#F5F8F2]">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E8ECE7] flex items-center justify-center">
              {FilledIcon && <FilledIcon className="w-5 h-5 text-[#1F5F0A]" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#222222]">{filledLabel}</p>
              <p className="text-xs text-[#9CA3AF]">Click × to replace</p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={onClear}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-sm border border-[#E8ECE7] flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5 text-[#6b7280]" />
        </button>
      </div>
    );
  }

  // ── Empty / drop zone ─────────────────────────────────────────────────────────
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-150",
        dragging
          ? "border-[#1F5F0A] bg-[#F5F8F2]"
          : "border-[#D1D5DB] hover:border-[#1F5F0A] hover:bg-[#F5F8F2]/50"
      )}
    >
      <div className="w-10 h-10 rounded-full bg-[#F5F8F2] border border-[#E8ECE7] flex items-center justify-center">
        {type === "image"
          ? <ImageIcon className="w-5 h-5 text-[#1F5F0A]" />
          : <Upload className="w-5 h-5 text-[#1F5F0A]" />}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-[#222222]">{label}</p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">{sublabel}</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInput}
        className="hidden"
      />
    </div>
  );
}
