import React, { useState } from "react";
import Spinner from "./Spinner";
import Modal from "./Modal";
import { Trash2 } from "lucide-react";

const ModalDeleteAccount = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<string | boolean>>;
}) => {
  const [inputVal, setInputVal] = useState("");
  function handleDeleteAccount() {}
  const isLoading = false;

  return (
    <Modal setShowModal={setShowModal}>
      <div className=" w-[95vw] max-w-[500px] p-4 rounded-md h-auto bg-white flex flex-col gap-2">
        <h2 className="text-xl min-[600px]:text-2xl pb-2 flex gap-2 font-bold text-zinc-900 border-b-2">
          <span className="bg-[rgb(255,209,209)] flex items-center justify-center text-red-500 rounded-full h-8 w-8">
            <Trash2 size={20} />
          </span>
          Delete Account
        </h2>
        <p className="text-gray-400 mt-2 text-xs min-[600px]:text-sm">
          This action cannot be undone. All data associated with this account
          will be permanently deleted.
        </p>
        <p className="text-gray-600 mt-2 text-xs min-[600px]:text-base">
          Type <span className="font-bold">{'"I understand"'}</span> to confirm
          account deletion.
        </p>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          //   className={`border p-2 rounded-md w-full ${
          //     error.title ? "border-red-500" : "border-gray-300"
          //   }`}
          className="border-gray-300 border p-2 rounded-md w-full"
          placeholder="Enter note title"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-5 py-2 bg-zinc-200 text-gray-800 text-base rounded-lg hover:bg-zinc-300 transition"
            onClick={() => setShowModal("")}
          >
            Cancel
          </button>
          <button
            className={`px-5 py-2 flex items-center justify-center ${
              inputVal === "I understand" ? "bg-red-600" : "bg-red-400"
            } min-w-[88px] text-white text-base rounded-lg ${
              inputVal === "I understand" && "hover:bg-red-700"
            } transition disabled:cursor-not-allowed`}
            onClick={handleDeleteAccount}
            disabled={inputVal !== "I understand"}
            // onClick={handleDelete}
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

export default ModalDeleteAccount;
