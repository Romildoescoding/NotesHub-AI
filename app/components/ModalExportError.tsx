import React from "react";
import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";

const ModalExportError = ({ setShowModal }) => {
  return (
    <Modal setShowModal={setShowModal}>
      <div className="w-[95vw] max-w-[600px] items-center p-4 rounded-md h-auto bg-white flex flex-col gap-3">
        {/* <span className="bg-red-200 h-12 w-12 rounded-full flex items-center justify-center text-red-500">
          <AlertTriangle size={25} />
        </span> */}
        <div className="w-full flex flex-col items-center">
          <Image
            src="/error-bot.png"
            alt="export_error"
            height={200}
            width={200}
          />

          <h1 className="text-xl min-[600px]:text-2xl font-semibold text-black">
            Error Exporting PDF
          </h1>
        </div>
        <p className="text-zinc-500 flex flex-col text-center text-xs min-[600px]:text-base text-md">
          <span>There was an error exporting the PDF.</span>{" "}
          <span>
            Please try again and If the issue persists, try again after some
            time.
          </span>
        </p>

        <button
          className="mt-2 rounded-md gap-2 w-full flex items-center justify-center h-fit px-2 py-2 hover:bg-zinc-800 transition bg-black text-zinc-50"
          onClick={() => setShowModal(false)}
        >
          I understand
        </button>
      </div>
    </Modal>
  );
};

export default ModalExportError;
