"use client";
import React, { useEffect, useState } from "react";
import NotesSearchForm from "./NotesSearchForm";
import { useSearchNotes } from "../context/SearchNotesContext";
import Note from "./Note";
import { motion, AnimatePresence } from "framer-motion";
import useOutsideClick from "../hooks/useOutsideClick";
import {
  Check,
  ExternalLink,
  Link,
  Lock,
  LockOpen,
  Pencil,
  Trash2,
} from "lucide-react";
import { useCurrentUser } from "../auth/useCurrentUser";
import Image from "next/image";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { formatDate } from "../_lib/actions";
import useDeleteNote from "../(root)/notes/useDeleteNote";
import ModalEditNote from "./ModalEditNote";
import ModalConfirmDelete from "./ModalConfirmDelete";
import ModalNoteDetails from "./ModalNoteDetails";

const Collections = ({ notes }) => {
  const [localNotes, setLocalNotes] = useState(notes);

  //Sync the local state with upcoming notes
  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const {
    visibility,
    query,
    category,
    notes: notesState,
    setNotes,
    selectedNote,
    setSelectedNote,
  } = useSearchNotes();

  const { deleteNote, isDeleting } = useDeleteNote();

  //   const ref = useOutsideClick(() => setSelectedNote(null));

  useEffect(() => {
    const filteredNotes = localNotes.filter((note) => {
      // Filter by category if it's not empty
      if (
        category &&
        category !== "All" &&
        !note.tags.some(
          (tag) => tag.category.toLowerCase() === category.toLowerCase()
        )
        // !note.tags.category.includes(category.toLowerCase())
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
  }, [localNotes, query, category, visibility, setNotes]);

  const [showModal, setShowModal] = useState<string | boolean>();

  useEffect(() => {
    console.log(selectedNote?._id);
  }, [selectedNote]);

  async function handleDelete(noteId: string, fileUrl: string): Promise<void> {
    const res = await deleteNote(noteId, fileUrl);
    if (!res) {
      console.log("note was not deleted dude!");
    } else {
      //Update the state in the app..
      setLocalNotes((prev) => prev.filter((note) => note._id !== noteId));
      // setNotes((prev) => prev.filter((note) => note._id !== noteId));
    }
    setSelectedNote(null);
    setShowModal(false);
  }

  function updateLocalStates(updatedNote) {
    // also update the notes for state persistance
    setLocalNotes((prev) =>
      prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );

    // setNotes((prevNotes) =>
    //   prevNotes.map((note) =>
    //     note._id === updatedNote._id ? updatedNote : note
    //   )
    // );

    setSelectedNote(updatedNote);
    setShowModal(false); // Close the modal
  }

  useEffect(() => {
    if (showModal || selectedNote) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showModal, selectedNote]);

  return (
    //  pl-24
    <div className="w-full h-full bg-white relative text-black flex flex-col gap-8">
      <NotesSearchForm />

      <ModalNoteDetails
        showModal={showModal}
        setShowModal={setShowModal}
        setSelectedNote={setSelectedNote}
        selectedNote={selectedNote}
        handleDelete={handleDelete}
      />

      {showModal === "editing" && (
        <ModalEditNote
          selectedNote={selectedNote}
          setShowModal={setShowModal}
          onSave={updateLocalStates}
        />
      )}

      {showModal === "deleting" && (
        <ModalConfirmDelete
          isLoading={isDeleting}
          setShowModal={setShowModal}
          handleDelete={() =>
            handleDelete(selectedNote?._id, selectedNote.fileUrl)
          }
          title="Delete Note"
          text="This action will permanently delete the note and related data. Are you sure you want to proceed?"
        />
      )}

      {/* <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="w-full flex flex-wrap gap-6 justify-center pb-4">
        {notesState.length === 0 ? (
          <p className="text-center text-gray-500">No notes found.</p>
        ) : (
          notesState.map((note, i) => (
            <Note
              onClick={() => {
                // document.body.style.overflowY = "hidden";
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
