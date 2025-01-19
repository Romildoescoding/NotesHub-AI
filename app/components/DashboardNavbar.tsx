import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardNavbar = () => {
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-16 items-center px-4  z-[99] bg-white rounded-full"
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
          href="/contact"
          className=" hover:bg-zinc-200 p-2 px-4 rounded-full transition-all"
        >
          Contact
        </Link>
        <Link
          href="/about"
          className=" hover:bg-zinc-200 p-2 px-4 rounded-full transition-all"
        >
          About
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

export default DashboardNavbar;
