"use client";
import React from "react";
import { Boxes } from "../ui/background-boxes";

import DashboardNavbar from "@/app/components/DashboardNavbar";
import { motion } from "framer-motion";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-full py-8 relative w-full overflow-hidden bg-white flex flex-col items-center justify-start pt-[25vh] rounded-lg">
      <DashboardNavbar />
      <div className="absolute inset-0 w-full h-full bg-zinc-50 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <motion.h1
        // initial={{ opacity: 0, y: 50 }}
        // animate={{ opacity: 1, y: 0 }}
        className="text-[7vw] leading-[5vw] text-zinc-900  font-medium relative z-20 flex gap-4 gsans tracking-tighter"
      >
        NoteCraft AI
      </motion.h1>
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
      <div className=" mt-16 h-fit w-full flex justify-center">
        {/* <div className="absolute bottom-0 z-[100] left-1/2 -translate-x-1/2 h-fit w-[80vw] mt-8 border-2 border-b-0 rounded-b-none rounded-xl"> */}
        {/* <div className="h-full w-full relative">
        </div> */}
        <img
          src="/hero-image-1.png"
          alt="dashboard-img"
          className="z-[99] h-auto w-[80vw] rounded-lg border-2"
        />
      </div>
    </div>
  );
}
