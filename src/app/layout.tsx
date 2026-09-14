import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Harvard Undergraduate Association",
    template: "%s | Harvard Undergraduate Association",
  },
  description:
    "The official website of the Harvard Undergraduate Association and its Finance Team.",
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
