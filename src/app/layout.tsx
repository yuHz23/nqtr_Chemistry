import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hóa Học 12 CTST | Luyện Thi THPT Quốc Gia",
  description: "Nền tảng học Hóa Học 12 toàn diện theo sách Chân Trời Sáng Tạo. Tích hợp AI giải bài, luyện đề thi mô phỏng THPT Quốc Gia, và ôn tập thông minh bằng Flashcard Spaced Repetition.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* KaTeX CSS for rendering math equations */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
          integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
          crossOrigin="anonymous"
        />
      </head>
      <body className={cn("min-h-screen antialiased", inter.variable)}>
        {children}
      </body>
    </html>
  );
}
