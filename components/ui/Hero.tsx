"use client";
import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";
import Navbar from "@/app/components/Navbar";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import { SparklesText } from "./sparkles-text";
import Link from "next/link";
import { RainbowButton } from "./rainbow-button";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-white flex flex-col items-center justify-start pt-[25vh] rounded-lg">
      <DashboardNavbar />
      <div className="absolute inset-0 w-full h-full bg-zinc-50 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className="text-[7vw] leading-[5vw] text-zinc-900  font-medium relative z-20 flex gap-4 gsans tracking-tighter">
        NoteCraft AI
      </h1>
      <h1 className="text-[5vw] text-zinc-900  font-medium relative z-20 flex gap-4 gsans tracking-tighter">
        – Simplify, Organize, Excel
      </h1>
      <div className="text-center text-[18px] mt-2 text-zinc-400 relative z-20">
        Crafting Smarter Notes with AI Precision, One Craft at a Time.
        {/* <Link
          href="/dashboard"
          // className=" hover:bg-zinc-900 p-2 px-4 rounded-full"
        >
          <RainbowButton className="ml-2 rounded-full">
            Get Started
          </RainbowButton>
        </Link> */}
      </div>
      <div className="absolute bottom-0 z-[100] left-1/2 -translate-x-1/2 h-[40vh] w-[80vw] mt-8 border-2 border-b-0 rounded-b-none rounded-xl bg-zinc-900">
        <div className="h-full w-full relative">
          {/* <div
            className="h-1/3 w-full absolute bottom-0 left-0 bg-white"
            style={{
              background:
                "linear-gradient(180deg, rgba(130,247,201,0) 0%, rgba(250,250,250,0.199124649859944) 35%, rgba(250,250,250,0.25) 66%)",
            }}
          ></div> */}
        </div>
      </div>
    </div>
  );
}
