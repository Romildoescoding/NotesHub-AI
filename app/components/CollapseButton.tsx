"use client";
import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  Pencil,
  Plus,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useNotes } from "../context/NotesContext";
import { AnimatePresence, motion } from "framer-motion";

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
              <button
                className={`w-full p-2 flex justify-start pl-4 relative ${
                  selectedNote === i ? "text-zinc-900" : "text-zinc-400"
                }`}
                onClick={() => setSelectedNote(i)}
                key={Math.random() * i + i}
              >
                {selectedNote === i && (
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 right-2 ${
                      selectedNote === i ? "text-zinc-900" : "text-zinc-400"
                    }`}
                  >
                    <Ellipsis size={15} />
                  </span>
                )}
                Page {i + 1}
              </button>
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
