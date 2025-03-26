"use client";
import { createContext, useContext, useEffect, useState } from "react";
import defaultNote from "./defaultNote";

const NotesContext = createContext<{
  notes: [];
  setNotes: React.Dispatch<React.SetStateAction<[]>>;
  editorCollapsed: boolean;
  setEditorCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNote: number;
  setSelectedNote: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState(JSON.parse(defaultNote));
  const [editorCollapsed, setEditorCollapsed] = useState<boolean>(true);
  const [selectedNote, setSelectedNote] = useState<number>(0);
  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("notes") ?? defaultNote));
  }, []);

  // This one sets the value at initial rendering time and all the note changes...
  useEffect(() => {
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        editorCollapsed,
        setEditorCollapsed,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

// Custom hook to use NotesContext
export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within a NotesProvider");
  return context;
}
