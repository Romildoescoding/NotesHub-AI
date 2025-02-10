"use client";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import { useSidebar } from "@/app/context/SidebarContext";
import { useState } from "react";

// import Link from "next/link";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";

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

import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  LayoutDashboardIcon,
  Pencil,
  Upload,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NotesProvider } from "@/app/context/NotesContext";
import CollapseButton from "@/app/components/CollapseButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState();
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  return (
    <NotesProvider>
      <div className=" relative w-full flex h-full">
        <motion.button
          className="fixed top-18 left-[104px] rounded-sm  z-[999] text-zinc-500 hover:text-zinc-950 transition-all"
          onClick={() => setIsSidebarOpen((open) => !open)}
          style={{
            left: collapsed
              ? isSidebarOpen
                ? "248px"
                : "104px"
              : isSidebarOpen
              ? "348px"
              : "204px",
            transition: "left 0.3s",
          }}
          // initial={{ left: "104px" }}
          // animate={{ left: "248px" }}
        >
          {isSidebarOpen ? (
            <ChevronsLeft size={20} />
          ) : (
            <ChevronsRight size={20} />
          )}
        </motion.button>

        {/* div to make the right moving effect after opening sidebar */}
        <div
          className="h-[calc(100vh - 28px)] w-38 mt-24"
          style={{
            width: collapsed
              ? isSidebarOpen
                ? "144px"
                : "0px"
              : isSidebarOpen
              ? "244px"
              : "100px",
            // width: isSidebarOpen ? "144px" : 0,
            transition: "width 0.3s",
          }}
        ></div>

        <motion.div
          className="h-[calc(100vh - 28px)] px-2 left-0 fixed w-36 top-16 flex z-[999] flex-col gap-2 pt-4 bg-white border-r-2 border-zinc-100 items-center text-sm"
          style={{
            height: "calc(100vh - 28px)",
            left: collapsed
              ? isSidebarOpen
                ? "88px"
                : "-56px"
              : isSidebarOpen
              ? "188px"
              : "44px",
            transition: "left 0.3s",
          }}
        >
          <Link
            href="/notes"
            className={`w-full flex gap-2 items-center py-1 justify-start pl-2 bg-white ${
              pathname === "/notes"
                ? "text-zinc-900 hover:text-zinc-900"
                : "text-zinc-400 hover:text-zinc-700"
            } rounded-md`}
          >
            <LayoutDashboardIcon size={18} /> Collection
          </Link>
          <Link
            href="/notes/upload"
            className={`w-full flex gap-2 items-center py-1 justify-start pl-2 bg-white ${
              pathname === "/notes/upload"
                ? "text-zinc-900 hover:text-zinc-900"
                : "text-zinc-400 hover:text-zinc-700"
            } rounded-md`}
          >
            <Upload size={18} /> Upload
          </Link>
          <CollapseButton />
        </motion.div>
        {children}
      </div>
    </NotesProvider>
  );
}
