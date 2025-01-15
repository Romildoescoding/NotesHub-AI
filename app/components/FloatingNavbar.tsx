"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const FloatingNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="pointer-events-auto flex gap-4 h-18 px-2 py-2 w-fit bg-zinc-50 rounded-md border-[2px] border-[#ededed]">
      <Link
        href="/dashboard/upload"
        className={`capitalize rounded-md p-2 ${
          pathname === "/dashboard/upload" ? "bg-zinc-800 text-zinc-100" : ""
        }`}
      >
        Upload Notes
      </Link>
      <Link
        href="/dashboard/list"
        className={`capitalize rounded-md p-2 ${
          pathname === "/dashboard/list" ? "bg-zinc-800 text-zinc-100" : ""
        }`}
      >
        My Notes
      </Link>

      <Link
        href="/dashboard"
        className={`capitalize rounded-md p-2 ${
          pathname === "/dashboard"
            ? "bg-zinc-800 text-zinc-100 stroke-red-500"
            : " stroke-yellow-500"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          color={pathname === "/dashboard" ? "#fafafa" : "#27272a"}
          fill={"none"}
        >
          <path
            d="M17.5 17.5L22 22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <Link
        href="/dashboard/summary"
        className={`capitalize rounded-md p-2 ${
          pathname === "/dashboard/summary" ? "bg-zinc-800 text-zinc-100" : ""
        }`}
      >
        AI Summary
      </Link>

      <Link
        href="/dashboard/rooms"
        className={`capitalize rounded-md p-2 ${
          pathname === "/rooms" ? "bg-zinc-800 text-zinc-100" : ""
        }`}
      >
        Study Rooms
      </Link>
    </div>
  );
};

export default FloatingNavbar;
