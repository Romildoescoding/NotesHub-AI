import React from "react";

const ModalConfirmDelete = ({ setShowModal, handleDelete }) => {
  return (
    <div className="w-[full] max-w-md bg-white rounded-md p-6 flex flex-col ">
      <h2 className="text-xl font-bold text-zinc-600 border-b-2">
        Delete Chat?
      </h2>
      <p className="text-gray-600 mt-2  text-sm">
        This action will permanently delete all messages and related data. Are
        you sure you want to proceed?
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
          className="px-5 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700 transition"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
