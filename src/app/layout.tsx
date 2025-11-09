import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { UserInfo } from "@/features/auth/components/user-info";
import { MainNav } from "@/components/navigation/main-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 16 게시판",
  description: "Feature-Based Architecture로 구축된 현대적인 게시판",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
              <Link href="/" className="text-2xl font-bold tracking-tight">게시판</Link>
              <MainNav />
            </div>
            <div className="flex justify-end">
              <UserInfo />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
