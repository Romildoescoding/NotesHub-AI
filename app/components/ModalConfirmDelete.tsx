import React from "react";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { AlertTriangle, Trash2 } from "lucide-react";

const ModalConfirmDelete = ({
  isLoading = false,
  setShowModal,
  handleDelete,
  title = "Delete Chat?",
  text = "This action will permanently delete all messages and related data. Are you sure you want to proceed?",
}) => {
  return (
    // <div className="w-[full] max-w-md bg-white rounded-md p-6 flex flex-col ">

    // </div>

    <Modal setShowModal={setShowModal}>
      <div className=" w-[95vw] max-w-[500px] p-4 rounded-md h-auto bg-white flex flex-col gap-2">
        <h2 className="text-xl min-[600px]:text-2xl pb-2 flex gap-2 font-bold text-zinc-900 border-b-2">
          <span className="bg-[rgb(255,209,209)] flex items-center justify-center text-red-500 rounded-full h-8 w-8">
            <Trash2 size={20} />
          </span>
          {title}
        </h2>
        <p className="text-gray-600 mt-2 text-xs min-[600px]:text-base text-md">
          {text}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-5 py-2 bg-zinc-200 text-gray-800 text-base rounded-lg hover:bg-zinc-300 transition"
            onClick={() => setShowModal("")}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 flex items-center justify-center bg-red-600 min-w-[88px] text-white text-base rounded-lg hover:bg-red-700 transition"
            onClick={handleDelete}
          >
            {isLoading ? (
              <Spinner isWhite={true} height={22} width={22} />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmDelete;
