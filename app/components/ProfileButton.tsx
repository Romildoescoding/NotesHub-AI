"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Power, User } from "lucide-react";

const ProfileButton = ({ user }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    // <Link href="/dashboard/profile" className="">
    <button className=" relative cursor-default outline-none">
      <Image
        src={user.image}
        width={42}
        height={42}
        alt="avatar"
        onClick={() => setShowOptions((option) => !option)}
        className=" cursor-pointer rounded-full border-[2px] border-[#ededed] hover:border-zinc-300 transition-all"
      />
      <motion.div
        className="absolute top-[110%] rounded-xl border-2 border-zinc-100 bg-white right-0 h-fit w-fit p-2"
        animate={{
          opacity: showOptions ? 1 : 0,
          scale: showOptions ? 1 : 0.95,
        }}
        style={{
          pointerEvents: showOptions ? "all" : "none",
          boxShadow: "0px 5px 10px #00000040",
        }}
        // transition={{
        //   ease: "easeInOut",
        //   duration: 0.5,
        // }}
      >
        <Link
          href="/dashboard/profile"
          className=" p-2 pr-24 flex gap-4 hover:bg-zinc-100 rounded-lg"
        >
          <User className=" text-zinc-400" />
          Profile
        </Link>
        <Link
          // ><
          href="/dashboard/logout"
          className=" p-2 pr-12 flex gap-4 hover:bg-zinc-100 rounded-lg"
        >
          <Power className=" text-zinc-400" />
          <span>Sign out</span>
        </Link>
      </motion.div>
    </button>
    //   </Link>
  );
};

export default ProfileButton;
