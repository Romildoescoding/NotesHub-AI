"use client";
import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  Pencil,
  Plus,
  PlusCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick from "../hooks/useOutsideClick";
import Modal from "./Modal";
import ModalConfirmDelete from "./ModalConfirmDelete";

function generateUniqueId() {
  return crypto.randomUUID(); // Generates a unique ID
}

const CollapseButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,
    editorCollapsed,
    setEditorCollapsed,
  } = useNotes();

  const [showOptions, setShowOptions] = useState("");
  const modalRef = useOutsideClick(() => {
    if (showOptions) {
      setShowOptions("");
    }
  });
  // setShowOptions("options");

  function handleDeletePage() {
    let notesLength = 0;
    setNotes(() => {
      // Remove the selected note
      const prev = JSON.parse(localStorage.getItem("notes") ?? "[]");
      console.log(prev);
      console.log("selected note!", selectedNote);
      const updatedNotes = prev[0].filter((_, i) => i !== selectedNote);

      console.log([updatedNotes]);
      notesLength = updatedNotes[0]?.length ?? 1;

      // Update localStorage
      // localStorage.setItem("notes", JSON.stringify([updatedNotes]));

      return [updatedNotes];
    });

    // Done to make sure this shit updates, got me debugging like for 3 hours, earlier this was not updating the state properly.. idk why. Will check later but my guess right now is that this happens
    // probably due to re-render after the setNotes and since setNotes deletes the note in the same instant,
    // this gets vut off is what i presume but will come to this later.
    setTimeout(() => {
      setSelectedNote((prevSelected) => {
        // console.log("Previous value:-->", prevSelected);
        if (prevSelected > 0) {
          return prevSelected - 1;
        } else if (prevSelected === 0 && prevSelected < notesLength - 1) {
          return prevSelected + 1;
        } else {
          return 1;
        }
      });
    }, 0);

    setShowOptions("");
  }

  useEffect(() => {
    console.log("New note index-->", selectedNote);
  }, [selectedNote]);

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("notes") ?? "[]"));
  }, [selectedNote, setNotes]); // Trigger when `selectedNote` changes

  return (
    <AnimatePresence>
      <button
        onClick={() => {
          if (pathname === "/notes/editor") {
            setEditorCollapsed((col) => !col);
          } else {
            router.push("/notes/editor");
          }
        }}
        className={`w-full flex gap-2 items-center py-1 justify-start pl-2 bg-white ${
          pathname === "/notes/editor"
            ? "text-zinc-900 hover:text-zinc-900"
            : "text-zinc-400 hover:text-zinc-700"
        } rounded-md`}
      >
        <Pencil size={18} /> Editor{" "}
        {editorCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
      </button>

      {!editorCollapsed && (
        <motion.div
          className="w-full flex pl-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="w-[1px] h-full bg-zinc-300"></div>
          <div className="h-fit flex flex-col w-full relative">
            {notes?.[0]?.map((_, i) => (
              <div
                className={`w-full p-2 flex justify-start pl-4 relative ${
                  selectedNote === i ? "text-zinc-900" : "text-zinc-400"
                }`}
                onClick={() => setSelectedNote(i)}
                key={Math.random() * i + i}
              >
                {showOptions === "confirm-delete" && selectedNote === i && (
                  <Modal setShowModal={setShowOptions}>
                    <ModalConfirmDelete
                      setShowModal={setShowOptions}
                      handleDelete={handleDeletePage}
                    />
                  </Modal>
                )}
                {/* OPTIONS MODAL */}
                {showOptions === "options" && selectedNote === i && (
                  <span
                    ref={modalRef}
                    className="absolute flex flex-col gap-1 top-[75%] z-[9999] left-[90%] rounded-lg h-fit w-fit p-2 bg-zinc-50 shadow-md shadow-[#ccc]"
                  >
                    <span
                      className="flex cursor-pointer gap-2 pointer w-full rounded-md h-fit p-2 hover:bg-zinc-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowOptions("confirm-delete");
                      }}
                    >
                      <Trash2 size={15} color="#18181b" /> Delete
                    </span>
                  </span>
                )}
                {selectedNote === i && (
                  <span
                    className={`absolute cursor-pointer top-1/2 -translate-y-1/2 right-2 ${
                      selectedNote === i ? "text-zinc-900" : "text-zinc-400"
                    }`}
                    // onClick={() => handleDeletePage(i)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowOptions("options");
                    }}
                  >
                    <Ellipsis size={15} />
                  </span>
                )}
                Page {i + 1}
              </div>
            ))}
            <button
              onClick={() =>
                setNotes((prev) => {
                  console.log(prev);
                  const returnValue = [
                    ...prev[0],
                    [
                      {
                        id: generateUniqueId(),
                        type: "heading",
                        props: {
                          level: 1, // Default to H1
                          textColor: "default",
                          backgroundColor: "default",
                          textAlignment: "left",
                        },
                        content: [
                          {
                            type: "text",
                            text: "New Note",
                            styles: {},
                          },
                        ],
                      },
                    ],
                  ];
                  console.log([returnValue]);
                  localStorage.setItem("notes", JSON.stringify(returnValue));
                  return [returnValue];
                })
              }
              className="w-full p-2 text-zinc-400 hover:text-zinc-900 transition-all flex items-center gap-2 justify-start pl-4"
            >
              <PlusCircle size={16} /> Add Note
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CollapseButton;
