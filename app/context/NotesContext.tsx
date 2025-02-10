"use client";
import { createContext, useContext, useState } from "react";

const NotesContext = createContext<{
  notes: string[];
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
  editorCollapsed: boolean;
  setEditorCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNote: number;
  setSelectedNote: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState([
    " Hey there! how you doing ;D",
    "I am good. What about you man? :)",
    "I am good too dude. How have you been doing lately :o",
  ]);
  const [editorCollapsed, setEditorCollapsed] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<number>(1);

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
