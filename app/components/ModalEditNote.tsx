import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";
import Categories from "./Categories";
import { useNotes } from "../context/NotesContext";
import Spinner from "./Spinner";
import useEditNote from "../(root)/notes/useEditNote";
import { Switch } from "@/components/ui/switch";

const ModalEditNote = ({ selectedNote, setShowModal, onSave }) => {
  //   console.log(selectedNote);
  const [title, setTitle] = useState(selectedNote.title ?? "");
  const [description, setDescription] = useState(
    selectedNote.description ?? ""
  );
  const [isPublic, setIsPublic] = useState(selectedNote.isPublic ?? false);
  const [selectedCategories, setSelectedCategories] = useState(
    selectedNote.tags ?? []
  );
  const [categoryInput, setCategoryInput] = useState("");
  const [error, setError] = useState({}); // For validation messages

  const { editNote, isEditing } = useEditNote();
  const { notes } = useNotes();

  //   useEffect(()=>{
  //     setTitle(selectedNote.title ?? "");
  //     setDescription(selectedNote.description ?? "");
  //     setIsPublic(selectedNote.isPublic ?? false);
  //     setSelectedCategories(
  //         selectedNote.tags ?? []
  //       );
  //   },[])

  const handleExport = async () => {
    let errors = {};

    if (!title.trim()) {
      errors.title = "Title is required.";
    }
    if (title.trim().length > 20) {
      errors.title = "Title must be 20 characters or fewer.";
    }
    if (!description.trim()) {
      errors.description = "Description is required.";
    }
    if (!selectedCategories.length) {
      errors.categories = "Categories are required";
    }

    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    // No validation errors were found. So, process further
    setError({});

    console.log(selectedNote);

    console.log({
      //   notes,
    });

    const new1 = await editNote({
      ...selectedNote,
      title,
      description,
      isPublic,
      tags: selectedCategories,
    });

    console.log(new1);

    onSave(new1);
    setShowModal(false);

    // if (success) setShowModal("success");
    // else setShowModal("error");
  };

  return (
    <Modal setShowModal={setShowModal}>
      <div className="w-[95vw] max-w-[600px] p-4 rounded-md h-auto bg-white flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Edit Note</h1>

        {/* Title Input */}
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border p-2 rounded-md w-full ${
            error.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter note title"
        />
        {error.title && <p className="text-red-500 text-sm">{error.title}</p>}

        <label className="text-sm font-medium">Description</label>
        <textarea
          // type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`border p-2 rounded-md w-full min-h-28 max-h-28 ${
            error.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter note description"
        />
        {error.description && (
          <p className="text-red-500 text-sm">{error.description}</p>
        )}

        {/* Public/Private Toggle */}
        <div className="flex items-center justify-between gap-2 p-4 h-fit border rounded-md border-gray-300">
          <div className="flex flex-col w-[75%]">
            <span className="text-md font-medium">Public Visibility:</span>
            <span className="text-zinc-500 text-xs min-[600px]:text-sm">
              All users will have the permissions to view this content.
            </span>
          </div>
          <div className="h-full flex items-center">
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>
        </div>

        <Categories
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          error={error}
        />
        {error.categories && (
          <p className="text-red-500 text-sm">{error.categories}</p>
        )}

        <button
          className="mt-2 rounded-md gap-2 w-full flex items-center justify-center h-fit px-2 py-2 hover:bg-zinc-800 transition bg-black text-zinc-50"
          onClick={handleExport}
        >
          {isEditing ? (
            <Spinner isWhite={true} height={22} width={22} />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ModalEditNote;
