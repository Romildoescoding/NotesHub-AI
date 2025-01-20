"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const FloatingNavbar = () => {
  const pathname = usePathname();
  return (
    // <div className="pointer-events-auto flex gap-4 h-18 px-2 py-2 w-fit bg-[#ffffffee] backdrop-blur-sm rounded-md border-[2px] border-[#ededed]">
    //   <Link
    //     href="/dashboard/upload"
    //     className={`capitalize rounded-md p-2 ${
    //       pathname === "/dashboard/upload" ? "bg-zinc-800 text-zinc-100" : ""
    //     }`}
    //   >
    //     Upload Notes
    //   </Link>
    //   <Link
    //     href="/dashboard/list"
    //     className={`capitalize rounded-md p-2 ${
    //       pathname === "/dashboard/list" ? "bg-zinc-800 text-zinc-100" : ""
    //     }`}
    //   >
    //     My Notes
    //   </Link>

    //   <Link
    //     href="/dashboard"
    //     className={`capitalize rounded-md p-2 ${
    //       pathname === "/dashboard"
    //         ? "bg-zinc-800 text-zinc-100 stroke-red-500"
    //         : " stroke-yellow-500"
    //     }`}
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       width={24}
    //       height={24}
    //       color={pathname === "/dashboard" ? "#fafafa" : "#27272a"}
    //       fill={"none"}
    //     >
    //       <path
    //         d="M17.5 17.5L22 22"
    //         stroke="currentColor"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
    //         stroke="currentColor"
    //         strokeWidth="1.5"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   </Link>

    //   <Link
    //     href="/dashboard/summary"
    //     className={`capitalize rounded-md p-2 ${
    //       pathname === "/dashboard/summary" ? "bg-zinc-800 text-zinc-100" : ""
    //     }`}
    //   >
    //     AI Summary
    //   </Link>

    //   <Link
    //     href="/dashboard/rooms"
    //     className={`capitalize rounded-md p-2 ${
    //       pathname === "/rooms" ? "bg-zinc-800 text-zinc-100" : ""
    //     }`}
    //   >
    //     Study Rooms
    //   </Link>
    // </div>

    <div
      className="fixed pointer-events-auto top-16 left-1/2 -translate-x-1/2 flex gap-16 items-center px-4  z-[99] bg-white rounded-full"
      style={{
        boxShadow: "0px 2px 3px #00000040",
        borderTop: "1px solid #00000010",
      }}
    >
      <Link href="/">
        <Image
          src={"/App_Logo.svg"}
          width={60}
          height={60}
          alt="avatar"
          className=" antialiased"
        />
      </Link>
      <div className="flex gap-2 items-center">
        <Link
          href="/dashboard/upload"
          className=" hover:bg-zinc-200 p-2 px-4 rounded-full transition-all flex"
        >
          Upload
        </Link>
        <Link
          href="/dashboard/list"
          className=" hover:bg-zinc-200 p-2 px-4 rounded-full transition-all"
        >
          View Notes
        </Link>

        <Link
          href="/dashboard/summary"
          className=" hover:bg-zinc-200 p-2 px-4 rounded-full transition-all"
        >
          AI summary
        </Link>

        <Link
          href="/dashboard"
          // className=" hover:bg-zinc-900 p-2 px-4 rounded-full"
        >
          <RainbowButton className="ml-2 rounded-full">
            Get Started
          </RainbowButton>
        </Link>
      </div>
    </div>
  );
};

export default FloatingNavbar;
