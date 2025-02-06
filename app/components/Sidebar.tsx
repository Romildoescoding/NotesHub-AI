"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { House, NotebookText, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  function handleToggleSidebar() {
    setCollapsed((collapsed) => !collapsed);
  }
  return (
    <>
      <div className="h-[calc(100vh-60px)] w-[94px]"></div>
      <div
        className="pointer-events-auto z-[9999] fixed left-0 top-0 h-screen bg-zinc-400 w-fit flex flex-col gap-16 items-center p-1"
        onClick={handleToggleSidebar}
        // style={{
        //   boxShadow: "0px 2px 3px #00000040",
        //   borderTop: "1px solid #00000010",
        // }}
      >
        <div
          className={`flex flex-col relative ${
            collapsed ? "gap-20" : "gap-16"
          } items-center ${
            collapsed ? "w-20" : "w-44"
          } rounded-xl transition-all bg-[#181818] h-full py-4 px-4 justify-start`}
        >
          <div className="bg-zinc-400 absolute z-[99999] h-4 w-4 top-0 right-[-20px]">
            <div className="w-full h-full relative overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-white absolute top-0 left-0"></div>
            </div>
          </div>

          <Link href="/" className="invert">
            <Image
              src={"/logo_notecraft.svg"}
              width={collapsed ? 30 : 46}
              height={60}
              alt="avatar"
              className=" antialiased transition-all"
            />
          </Link>
          <div className="flex flex-col h-full gap-4 w-full ">
            <motion.div
              className={`${
                collapsed ? "w-12" : "w-fit"
              } transition-all h-fit oveflow-hidden`}
              animate={{ width: collapsed ? "48px" : "100%" }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href="/dashboard/upload"
                className={`tooltip gap-3 rounded-lg p-3 w-full flex transition-all text-zinc-100 ${
                  pathname !== "/dashboard/upload"
                    ? " hover:bg-[#282828] "
                    : "bg-[#363636]"
                }`}
              >
                {collapsed && (
                  <span
                    className="tooltiptext"
                    style={{
                      top: "20%",
                      left: "175%",
                      marginLeft: "-50%",
                      fontSize: "14px",
                    }}
                  >
                    Dashboard
                  </span>
                )}
                <House size={24} className="w-fit" />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Dashboard
                  </motion.span>
                )}
              </Link>
            </motion.div>
            <motion.div
              className={`${
                collapsed ? "w-12" : "w-fit"
              } transition-all h-fit oveflow-hidden`}
              animate={{ width: collapsed ? "48px" : "100%" }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href="/dashboard/list"
                className={`tooltip gap-3 rounded-lg p-3 w-full flex transition-all text-zinc-100 ${
                  pathname !== "/dashboard/list"
                    ? " hover:bg-[#282828] "
                    : "bg-[#363636]"
                }`}
              >
                {collapsed && (
                  <span
                    className="tooltiptext"
                    style={{
                      top: "20%",
                      left: "175%",
                      marginLeft: "-50%",
                      fontSize: "14px",
                    }}
                  >
                    Notes
                  </span>
                )}
                <NotebookText size={24} />{" "}
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Notes
                  </motion.span>
                )}
              </Link>
            </motion.div>
            <motion.div
              className={`${
                collapsed ? "w-12" : "w-fit"
              } transition-all h-fit oveflow-hidden`}
              animate={{ width: collapsed ? "48px" : "100%" }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href="/dashboard/chat"
                className={`tooltip gap-3 rounded-lg p-3 w-full whitespace-nowrap flex transition-all text-zinc-100 ${
                  pathname !== "/dashboard/chat"
                    ? " hover:bg-[#282828] "
                    : "bg-[#363636]"
                }`}
              >
                {collapsed && (
                  <span
                    className="tooltiptext"
                    style={{
                      top: "20%",
                      left: "175%",
                      marginLeft: "-50%",
                      fontSize: "14px",
                    }}
                  >
                    AI Feature
                  </span>
                )}
                <Sparkles size={24} />{" "}
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    AI Features
                  </motion.span>
                )}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
