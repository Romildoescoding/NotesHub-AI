"use client";
import React, { useEffect, useState } from "react";
import NotesSearchForm from "./NotesSearchForm";
import { useSearchNotes } from "../context/SearchNotesContext";
import Note from "./Note";
import { motion, AnimatePresence } from "framer-motion";
import useOutsideClick from "../hooks/useOutsideClick";
import { Check, ExternalLink, Link, Lock, LockOpen } from "lucide-react";
import { useCurrentUser } from "../auth/useCurrentUser";
import Image from "next/image";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { formatDate } from "../_lib/actions";

const Collections = ({ notes }) => {
  const {
    visibility,
    query,
    category,
    notes: notesState,
    setNotes,
    selectedNote,
    setSelectedNote,
  } = useSearchNotes();

  //   const ref = useOutsideClick(() => setSelectedNote(null));

  useEffect(() => {
    const filteredNotes = notes.filter((note) => {
      // Filter by category if it's not empty
      if (
        category &&
        category !== "All" &&
        !note.tags.includes(category.toLowerCase())
      ) {
        return false;
      }

      // Filter by visibility if it's not empty
      if (visibility === "private" && note.isPublic) {
        return false;
      }
      if (visibility === "public" && !note.isPublic) {
        return false;
      }
      //   if (visibility && note.isPublic && visibility === "private" && visibility) {
      //     return false;
      //   }

      // Filter by query in title (case insensitive)
      if (query && !note.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      return true;
    });

    setNotes(filteredNotes);
  }, [notes, query, category, visibility, setNotes]);

  const { user } = useCurrentUser();
  const [copyUrl, setCopyUrl] = useState(false);

  useEffect(() => {
    if (copyUrl) {
      const timeout = setTimeout(() => setCopyUrl(false), 2000);
    }
  }, [copyUrl]);

  return (
    <div className="w-full min-h-screen bg-white relative text-black flex flex-col gap-8 pl-24">
      <NotesSearchForm />

      <AnimatePresence>
        {selectedNote && (
          <motion.div
            // ref={ref}
            initial={{ bottom: "-100%" }}
            animate={{ bottom: 0 }}
            exit={{ bottom: "-100%" }}
            className="fixed bottom-0 overflow-y-scroll left-0 z-[999999999] w-full h-[90%]  bg-white rounded-t-xl"
          >
            <div className="w-full h-fit p-8 pb-4 flex flex-col gap-4 items-center">
              <p className="font-bold text-3xl w-full flex pb-4 justify-between border-b-2 border-zinc-200">
                <span>{selectedNote.title}</span>
                <span
                  className={`${
                    selectedNote.isPublic
                      ? "text-red-900 bg-red-300 border-red-400"
                      : "text-green-900 bg-green-300 border-green-400"
                  } rounded-full border-2 text-sm items-center px-3 flex gap-2`}
                >
                  {selectedNote.isPublic ? (
                    <LockOpen size={16} />
                  ) : (
                    <Lock size={16} />
                  )}
                  {selectedNote.isPublic ? "Public" : "Private"}
                </span>
              </p>
              <div className="w-full h-fit flex justify-between">
                <div className="h-fit flex gap-6 items-center">
                  <Image
                    src={user?.image ?? ""}
                    height={60}
                    width={60}
                    alt="user"
                    className="rounded-full"
                  />
                  <p className="flex flex-col ">
                    <span className="font-semibold text-xl ">{user?.name}</span>{" "}
                    <span className="text-zinc-600">Full-Stack Developer</span>
                  </p>
                </div>
                <div className="h-full w-fit flex gap-2">
                  <span
                    className="
                      flex gap-2 items-center cursor-pointer border-zinc-200 border-2 rounded-md text-zinc-500 hover:text-zinc-900 p1 px-2"
                    onClick={() => {
                      window.open(selectedNote.fileUrl);
                    }}
                  >
                    <ExternalLink size={16} /> View in separate tab
                  </span>
                  <span
                    className={`${
                      copyUrl ? "cursor-auto" : "cursor-pointer"
                    } flex gap-2 items-center cursor-pointer border-zinc-200 border-2 rounded-md text-zinc-500 hover:text-zinc-900 p1 px-2`}
                    onClick={() => {
                      navigator.clipboard.writeText(selectedNote.fileUrl);
                      setCopyUrl(true);
                    }}
                  >
                    {copyUrl ? <Check size={16} /> : <Link size={16} />} Copy
                    Url
                  </span>
                </div>
              </div>
              <div className="w-full h-[75vh] flex justify-center">
                <div className="relative w-[75%] h-full overflow-scroll border-2 border-zinc-200 rounded-lg px-4">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                    <div>
                      <Viewer defaultScale={1} fileUrl={selectedNote.fileUrl} />
                    </div>
                  </Worker>
                </div>
              </div>
              <div className="w-[100%] flex flex-col mt-2 border-t-2 border-zinc-200 py-2 pr-4 pl-2 gap-2">
                <span className="text-3xl font-semibold">About</span>
                <p className="text-zinc-700 text-md">
                  {selectedNote.description}
                </p>
              </div>

              {/* Categories */}
              <div className="w-full flex flex-col py-2 pl-2 gap-2">
                <span className="text-3xl font-semibold">Categories</span>
                <div className="flex gap-2 flex-wrap">
                  {selectedNote.tags.map((tag, i) => (
                    <span
                      className="bg-blue-300 text-md p-2 px-3 rounded-full text-blue-900 border-blue-400"
                      key={i}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="flex w-full justify-end text-md gap-2">
                Uploaded on{" "}
                <span className="font-semibold">
                  {formatDate(selectedNote.createdAt)}{" "}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedNote && (
          <motion.div
            onClick={() => {
              document.body.style.overflowY = "auto";
              setSelectedNote(null);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-0 cursor-pointer left-0 z-[999999998] w-full h-full  bg-zinc-950"
          ></motion.div>
        )}
      </AnimatePresence>

      {/* <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="w-full flex flex-wrap gap-6">
        {notesState.length === 0 ? (
          <p className="text-center text-gray-500">No notes found.</p>
        ) : (
          notesState.map((note, i) => (
            <Note
              onClick={() => {
                document.body.style.overflowY = "hidden";
                setSelectedNote(note);
              }}
              key={i}
              note={note}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Collections;
