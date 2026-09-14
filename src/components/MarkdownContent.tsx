"use client";

import ReactMarkdown from "react-markdown";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-4 text-[#374151] text-[15px] leading-relaxed">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="text-[#222222] font-semibold">{children}</strong>,
          em: ({ children }) => <em className="text-[#6b7280]">{children}</em>,
          ul: ({ children }) => <ul className="list-disc pl-6 flex flex-col gap-1.5">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 flex flex-col gap-2.5">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1F5F0A] font-medium underline underline-offset-2 hover:text-[#174508]"
            >
              {children}
            </a>
          ),
          h1: ({ children }) => <h3 className="text-xl font-bold text-[#222222] mt-2">{children}</h3>,
          h2: ({ children }) => <h3 className="text-lg font-bold text-[#222222] mt-2">{children}</h3>,
          h3: ({ children }) => <h4 className="text-base font-bold text-[#222222] mt-2">{children}</h4>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
