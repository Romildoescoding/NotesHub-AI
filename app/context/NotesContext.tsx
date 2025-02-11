"use client";
import { createContext, useContext, useState } from "react";

const NotesContext = createContext<{
  notes: [];
  setNotes: React.Dispatch<React.SetStateAction<[]>>;
  editorCollapsed: boolean;
  setEditorCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNote: number;
  setSelectedNote: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState([
    { title: "Introduction", text: " Hey there! how you doing ;D" },
    { title: "Reply Back", text: "I am good. What about you man? :)" },
    {
      title: "Welcoming response",
      text: "I am good too dude. How have you been doing lately :o",
    },
  ]);
  const [editorCollapsed, setEditorCollapsed] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<number>(0);

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
