"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Power, User } from "lucide-react";
import ModalLogout from "./ModalLogout";

const ProfileButton = ({ user }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState<boolean | string>("");
  return (
    // <Link href="/dashboard/profile" className="">
    <button className=" relative cursor-default outline-none">
      <Image
        src={user?.image}
        width={42}
        height={42}
        alt="avatar"
        onClick={() => setShowOptions((option) => !option)}
        className=" cursor-pointer rounded-full border-[2px] border-[#ededed] hover:border-zinc-300 transition-all"
      />
      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="absolute top-[110%] rounded-md border border-zinc-100 shadow-sm bg-white right-0 h-fit w-48 p-2"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            style={{
              boxShadow: "0px 5px 5px #00000020",
            }}
          >
            <Link
              href="/dashboard/profile"
              className="p-2 w-full flex gap-4 hover:bg-zinc-100 transition rounded-md"
            >
              <User className=" text-zinc-600" />
              Profile
            </Link>
            <button
              // ><
              // href="/dashboard/logout"
              onClick={() => setShowModal("logout")}
              className="p-2 w-full flex gap-4 hover:bg-zinc-100 transition rounded-md"
            >
              <Power className=" text-zinc-600" />
              <span className="">Sign out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal === "logout" && <ModalLogout setShowModal={setShowModal} />}
      </AnimatePresence>
    </button>
    //   </Link>
  );
};

export default ProfileButton;
