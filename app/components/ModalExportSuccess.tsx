"use client";
import React, { useEffect, useRef } from "react";
import Modal from "./Modal";
import Link from "next/link";
import { Check } from "lucide-react";
import Image from "next/image";
import { ConfettiFireworks } from "./ConfettiFireworks";
// import { useRouter } from "next/router";

const ModalExportSuccess = ({ setShowModal }) => {
  return (
    <Modal setShowModal={setShowModal}>
      <div className="w-[95vw] items-center text-center max-w-[600px] p-4 rounded-md h-auto bg-white flex flex-col gap-3">
        {/* <Image src="/confetti.jpg" alt="confetti" height={100} width={200} /> */}
        <div
          className=" w-40 h-[160px] flex items-center justify-center bg-cover"
          style={{ backgroundImage: "url('/confetti.jpg')" }}
        >
          <span className="bg-white border-2 text-black flex items-center justify-center h-10 w-10 rounded-full">
            <Check size={20} strokeWidth={2} />
          </span>
        </div>
        <ConfettiFireworks />
        <h1 className="text-2xl font-semibold text-black">Export Success</h1>
        <p className="text-zinc-500 flex flex-col">
          <span>Your note has been saved successfully.</span>
          <span>
            Feel free to create more notes and review your exported notes
            anytime.
          </span>
        </p>
        <Link
          href="/notes"
          className="mt-2 rounded-md gap-2 w-full flex items-center justify-center h-fit px-2 py-2 hover:bg-zinc-800 cursor-pointer transition bg-black text-zinc-50"
        >
          Browse Notes
        </Link>
      </div>
    </Modal>
  );
};

export default ModalExportSuccess;
