"use client";
import React from "react";
import Modal from "./Modal";
import Link from "next/link";
// import { useRouter } from "next/router";

const ModalExportSuccess = ({ setShowModal }) => {
  //   const router = useRouter();

  return (
    <Modal setShowModal={setShowModal}>
      <div className="w-[600px] p-4 rounded-md h-auto bg-white flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-black">Export Success</h1>
        <p className="text-black">Your note has been saved successfully.</p>
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
