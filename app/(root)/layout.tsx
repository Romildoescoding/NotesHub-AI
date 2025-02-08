// "use client";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// import Link from "next/link";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// import { useState } from "react";
import { SidebarProvider } from "../context/SidebarContext";
import { SessionProvider } from "next-auth/react";

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
  // const [collapsed, setCollapsed] = useState(true);
  return (
    <SidebarProvider>
      <SessionProvider>
        <div className="bg-red-600 flex">
          <Sidebar />
          <main className="w-full relative bg-white flex flex-col">
            <Navbar />
            <main
              // style={{ boxShadow: "-5px -5px 5px black" }}
              className="pt-4 bg-white w-full text-zinc-900"
            >
              {children}
            </main>
          </main>
        </div>
      </SessionProvider>
    </SidebarProvider>
  );
}
