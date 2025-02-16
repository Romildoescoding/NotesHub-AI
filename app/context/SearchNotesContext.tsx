"use client";
import { createContext, useContext, useState } from "react";

const SearchNotesContext = createContext<{
  notes: object[];
  setNotes: React.Dispatch<React.SetStateAction<object[]>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  visibility: string;
  setVisibility: React.Dispatch<React.SetStateAction<string>>;
  selectedNote: object | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<object | null>>;
} | null>(null);

export function SearchNotesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [visibility, setVisibility] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <SearchNotesContext.Provider
      value={{
        notes,
        setNotes,
        category,
        setCategory,
        query,
        setQuery,
        visibility,
        setVisibility,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </SearchNotesContext.Provider>
  );
}

// Custom hook to use SearchNotesContext
export function useSearchNotes() {
  const context = useContext(SearchNotesContext);
  if (!context)
    throw new Error("useSearchNotes must be used within a SearchNotesProvider");
  return context;
}
