import React from "react";
import Modal from "./Modal";

const ModalExportError = ({ setShowModal }) => {
  return (
    <Modal setShowModal={setShowModal}>
      <div className="w-[600px] p-4 rounded-md h-auto bg-white flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-black">
          Error Exporting PDF
        </h1>
        <p className="text-zinc-700">
          There was an error exporting the PDF. Please try again. If the issue
          persists, try again after some time.
        </p>

        <button
          className="mt-2 rounded-md gap-2 w-full flex items-center justify-center h-fit px-2 py-2 hover:bg-zinc-800 transition bg-black text-zinc-50"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ModalExportError;
