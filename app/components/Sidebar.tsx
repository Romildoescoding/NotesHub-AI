"use client";
import {
  House,
  NotebookText,
  SidebarOpenIcon,
  Sparkles,
  SidebarCloseIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const pathname = usePathname();
  // const sidebarContext = useSidebar();
  // useEffect(()=>{
  //   console.log(sidebarContext.collapsed);
  // },[sidebarContext])
  const router = useRouter();
  const routes = useMemo(() => pathname.slice(1).split("/"), [pathname]);
  const routeArr = useMemo(
    () =>
      routes.flatMap((item, index) =>
        index < routes.length - 1 ? [item, "/"] : [item]
      ),
    [routes]
  );

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", `${!collapsed}`);
  }, [collapsed]);

  function handleToggleSidebar() {
    setCollapsed((collapsed) => !collapsed);
  }
  return (
    <>
      <div className="h-[calc(100vh-60px)] w-[94px]"></div>
      <div
        className="pointer-events-auto z-[9999] fixed left-0 top-0 h-screen bg-zinc-400 w-fit flex flex-col gap-16 items-center p-1"
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
          } rounded-xl transition-all duration-300 bg-[#181818] h-full py-4 px-4 justify-start`}
        >
          {/* Button to make the rounded effect on the right side of the main content block of the app */}
          <div className="bg-zinc-400 absolute z-[99999] h-4 w-4 top-0 right-[-20px]">
            <div className="w-full h-full relative overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-white absolute top-0 left-0"></div>
            </div>
          </div>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-md top-4 -right-11 absolute z-[99999] hover:text-zinc-950 text-zinc-500 transition-all"
            onClick={handleToggleSidebar}
          >
            {collapsed ? (
              <SidebarOpenIcon size={24} />
            ) : (
              <SidebarCloseIcon size={24} />
            )}
          </button>

          <div className="flex items-center justify-center rounded-md bg-red-500 top-5 -right-[75px] w-[0px] overflow-visible absolute z-[99999] transition-all text-zinc-500">
            <div className="relative">
              <div className="absolute top-0 flex gap-2 left-0 whitespace-nowrap">
                {/* <span className=""> */}
                {routeArr.map((route, i) => (
                  <span
                    className={
                      route !== "/"
                        ? i !== routeArr.length - 1
                          ? "cursor-pointer capitalize hover:text-zinc-950"
                          : "cursor-pointer min-w-fit text-zinc-950 font-semibold capitalize"
                        : ""
                    }
                    onClick={() => {
                      if (route === "/") return;
                      const newPath = "/" + routeArr.slice(0, i + 1).join("");
                      if (pathname.endsWith(route)) return;
                      router.push(newPath);
                    }}
                    key={i}
                  >
                    {route}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Link href="/" className="invert">
            <Image
              src={"/logo_notecraft.svg"}
              width={collapsed ? 30 : 46}
              height={60}
              alt="avatar"
              className=" antialiased transition-all duration-300"
            />
          </Link>
          <div className="flex flex-col h-full gap-4 w-full ">
            <motion.div
              className={`${
                collapsed ? "w-12" : "w-fit"
              } transition-all duration-300 h-fit oveflow-hidden`}
              animate={{ width: collapsed ? "48px" : "100%" }}
              // transition={{ duration: 0.15 }}
            >
              <Link
                href="/dashboard"
                className={`tooltip gap-3 rounded-lg p-3 w-full flex transition-all duration-300 text-zinc-100 ${
                  pathname !== "/dashboard"
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
                <House size={24} className="min-w-[24px]" />
                {!collapsed && (
                  <motion.span
                    transition={{ duration: 0.3 }}
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
              } transition-all duration-300 h-fit oveflow-hidden`}
              animate={{ width: collapsed ? "48px" : "100%" }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href="/notes"
                className={`tooltip gap-3 rounded-lg p-3 w-full flex transition-all duration-300 text-zinc-100 ${
                  pathname !== "/notes"
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
                <NotebookText size={24} className="min-w-[24px]" />{" "}
                {!collapsed && (
                  <motion.span
                    transition={{ duration: 0.3 }}
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
              } transition-all duration-300 h-fit oveflow-hidden`}
              animate={{ width: collapsed ? "48px" : "100%" }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href="/ai/chat"
                className={`tooltip gap-3 rounded-lg p-3 w-full whitespace-nowrap flex transition-all duration-300 text-zinc-100 ${
                  pathname !== "/ai/chat"
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
                <Sparkles size={24} className="min-w-[24px]" />{" "}
                {!collapsed && (
                  <motion.span
                    transition={{ duration: 0.3 }}
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
