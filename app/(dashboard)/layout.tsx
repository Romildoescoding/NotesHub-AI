// "use client";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import SessionWrapper from "../components/SessionWrapper";
import Sidebar from "../components/Sidebar";
import SidebarWrapper from "../components/SidebarWrapper";
import { SidebarProvider } from "../context/SidebarContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "NotesHub AI",
//   description: "AI Powered Notes and StudyRooms",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="bg-red-600 flex">
        <Sidebar />
        <main className="w-full relative bg-white flex flex-col">
          <SessionProvider>
            <Navbar />
          </SessionProvider>
          <main
            // style={{ boxShadow: "-5px -5px 5px black" }}
            className="border-2 bg-white w-full text-zinc-900"
          >
            {children}
          </main>
        </main>
      </div>
    </SidebarProvider>
  );
}
