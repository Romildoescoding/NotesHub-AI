import React, { useState } from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";
import Categories from "./Categories";
import useExportPdf from "../(root)/notes/editor/useExportPdf";
import { useNotes } from "../context/NotesContext";
import Spinner from "./Spinner";

const ModalExportPdf = ({ setShowModal }) => {
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [error, setError] = useState(""); // For validation messages

  const { exportToPDF, isLoading } = useExportPdf();
  const { notes } = useNotes();

  const handleExport = () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError(""); // Clear error if valid
    exportToPDF(notes);
  };

  return (
    <Modal setShowModal={setShowModal}>
      <div className="w-[600px] p-4 rounded-md h-auto bg-white flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Export Note</h1>

        {/* Title Input */}
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border p-2 rounded-md w-full ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter note title"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Public/Private Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Visibility:</span>
          <div className="w-fit flex gap-2">
            <div className="flex gap-1 border-2 items-center px-1 rounded-md shadow-sm border-zinc-100">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsPublic(false);
                }}
                disabled={!isPublic}
                className={`${
                  !isPublic
                    ? "bg-zinc-950 text-zinc-50 cursor-not-allowed"
                    : "bg-white text-zinc-950 cursor-pointer"
                } py-1 hover:bg-zinc-950 hover:text-zinc-50 transition-all rounded-md px-3 border-none shadow-sm h-fit w-fit`}
              >
                Private
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsPublic(true);
                }}
                disabled={isPublic}
                className={`${
                  isPublic
                    ? "bg-zinc-950 text-zinc-50 cursor-not-allowed"
                    : "bg-white text-zinc-950 cursor-pointer"
                } py-1 hover:bg-zinc-950 hover:text-zinc-50 transition-all rounded-md px-3 border-none shadow-sm h-fit w-fit`}
              >
                Public
              </button>
            </div>
          </div>
        </div>

        <Categories
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <button
          className="mt-2 rounded-md gap-2 w-full flex items-center justify-center h-fit px-2 py-2 bg-black text-zinc-50"
          onClick={handleExport}
        >
          {isLoading ? (
            <Spinner isWhite={true} height={22} width={22} />
          ) : (
            "Export as PDF"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ModalExportPdf;
