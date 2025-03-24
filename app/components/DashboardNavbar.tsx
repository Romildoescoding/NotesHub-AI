"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { Mail } from "lucide-react";

const DashboardNavbar = () => {
  const [contact, setContact] = useState(false);

  useEffect(() => {
    console.log(contact);
  }, [contact]);

  return (
    <motion.div
      className=" fixed top-4 left-1/2 -translate-x-1/2 px-3 min-[500px]:px-4 w-fit max-w-screen overflow-hidden z-[100] bg-white rounded-[30px]"
      style={{
        boxShadow: "0px 2px 3px #00000040",
        borderTop: "1px solid #00000010",
      }}
      animate={{ height: !contact ? "60px" : "140px" }}
      transition={{
        duration: 0.3,
        ease: cubicBezier(0.46, 0.03, 0.52, 0.96),
        delay: 0.15,
      }}
      // initial={{ width: 0, padding: "0px 0px" }}
      // animate={{ width: "auto", padding: "8px 16px" }}
      // transition={{ duration: 0.25, ease: cubicBezier(0.33, 0.64, 0.57, 0.74) }}
    >
      <div className="w-full h-fit flex gap-2 min-[500px]:gap-16 items-start">
        <Link href="/" className="h-[60px] flex items-center">
          <Image
            src={"/App_Logo.svg"}
            width={60}
            height={60}
            alt="avatar"
            className="h-[40px] min-[500px]:h-[60px] min-w-[40px] min-[500px]:min-w-[60px] antialiased"
          />
        </Link>
        <motion.div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ delay: 0.5 }}
          className="flex gap-2 pt-2 pb-2 items-center "
        >
          <motion.button
            onMouseEnter={() => setContact(true)}
            onMouseLeave={() => setContact(false)}
            className=" hover:bg-zinc-200 p-2 px-4 rounded-full transition-all"
          >
            Contact
          </motion.button>
          <Link
            href="/auth/login"
            className=" max-[500px]:hidden hover:bg-zinc-200 p-2 px-4 rounded-full transition-all"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            // className=" hover:bg-zinc-900 p-2 px-4 rounded-full"
          >
            <RainbowButton className="ml-2 rounded-full whitespace-nowrap min-w-fit">
              Get Started
            </RainbowButton>
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {contact && (
          <motion.div
            className="w-full flex items-center justify-between"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "80px", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: cubicBezier(0.46, 0.03, 0.52, 0.96),
              delay: 0.15,
            }}
            onMouseOver={() => setContact(true)}
            onMouseLeave={() => setContact(false)}
          >
            <a
              href="mailto:romil4business@gmail.com"
              className="border border-gray-300 shadow-md hover:shadow-lg transition-all rounded-full px-3 py-2 flex gap-2 text-black"
              target="_blank"
            >
              <Mail size={24} />
              Email Support
            </a>
            <a
              href="https://romildoescoding.vercel.app/"
              className="humane text-5xl hover:text-zinc-700 transition-all"
              target="_blank"
            >
              ROMILDOESCODING
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardNavbar;
