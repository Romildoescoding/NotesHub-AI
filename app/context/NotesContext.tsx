"use client";
import { createContext, useContext, useState } from "react";

const NotesContext = createContext<{
  notes: string[];
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
} | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
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
