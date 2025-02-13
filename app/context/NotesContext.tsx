"use client";
import { createContext, useContext, useEffect, useState } from "react";

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
    [
      {
        id: "4ae30dbs-fdi8-49be-y72a-69ra9fb8b689",
        type: "heading",
        props: [Object],
        content: [Array],
        children: [],
      },
      {
        id: "e2f18776-14b4-43eb-8c09-95cee6a01da9",
        type: "heading",
        props: [Object],
        content: [Array],
        children: [],
      },
      {
        id: "05c5a17c-2ce4-4f45-81f2-6236c87d078e",
        type: "paragraph",
        props: [Object],
        content: [],
        children: [],
      },
      {
        id: "13c4d480-5f38-4069-b6f2-5a17892e9880",
        type: "paragraph",
        props: [Object],
        content: [],
        children: [],
      },
    ],
    [
      {
        id: "4ae30dbs-fdi8-49be-y72a-69ra9fb8b689",
        type: "heading",
        props: [Object],
        content: [Array],
        children: [],
      },
      {
        id: "e2f18776-14b4-43eb-8c09-95cee6a01da9",
        type: "heading",
        props: [Object],
        content: [Array],
        children: [],
      },
      {
        id: "05c5a17c-2ce4-4f45-81f2-6236c87d078e",
        type: "paragraph",
        props: [Object],
        content: [],
        children: [],
      },
      {
        id: "13c4d480-5f38-4069-b6f2-5a17892e9880",
        type: "paragraph",
        props: [Object],
        content: [],
        children: [],
      },
    ],
    [
      {
        id: "4ae30dbs-fdi8-49be-y72a-69ra9fb8b689",
        type: "heading",
        props: [Object],
        content: [Array],
        children: [],
      },
      {
        id: "e2f18776-14b4-43eb-8c09-95cee6a01da9",
        type: "heading",
        props: [Object],
        content: [Array],
        children: [],
      },
      {
        id: "05c5a17c-2ce4-4f45-81f2-6236c87d078e",
        type: "paragraph",
        props: [Object],
        content: [],
        children: [],
      },
      {
        id: "13c4d480-5f38-4069-b6f2-5a17892e9880",
        type: "paragraph",
        props: [Object],
        content: [],
        children: [],
      },
    ],
  ]);
  const [editorCollapsed, setEditorCollapsed] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<number>(0);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "notes",
  //     JSON.stringify([
  //       [
  //         {
  //           id: "4ae30dbs-fdi8-49be-y72a-69ra9fb8b689",
  //           type: "heading",
  //           props: {
  //             level: 1, // Default to H1
  //             textColor: "default",
  //             backgroundColor: "default",
  //             textAlignment: "left",
  //           },
  //           content: [
  //             {
  //               type: "text",
  //               text: "I bet this would work",

  //               styles: {},
  //             },
  //           ],
  //           children: [],
  //         },
  //       ],
  //       [
  //         {
  //           id: "4ae30dbs-fdi8-49be-y72a-69ra9fb8b689",
  //           type: "heading",
  //           props: {
  //             level: 1, // Default to H1
  //             textColor: "default",
  //             backgroundColor: "default",
  //             textAlignment: "left",
  //           },
  //           content: [
  //             {
  //               type: "text",
  //               text: "I bet this would work",

  //               styles: {},
  //             },
  //           ],
  //           children: [],
  //         },
  //       ],
  //       [
  //         {
  //           id: "4ae30dbs-fdi8-49be-y72a-69ra9fb8b689",
  //           type: "heading",
  //           props: {
  //             level: 1, // Default to H1
  //             textColor: "default",
  //             backgroundColor: "default",
  //             textAlignment: "left",
  //           },
  //           content: [
  //             {
  //               type: "text",
  //               text: "I bet this would work",

  //               styles: {},
  //             },
  //           ],
  //           children: [],
  //         },
  //       ],
  //     ])
  //   );
  useEffect(() => {
    if (localStorage.getItem("notes"))
      console.log(JSON.parse(localStorage.getItem("notes") ?? ""));
    setNotes([JSON.parse(localStorage.getItem("notes") ?? "")]);
    console.log(JSON.parse(localStorage.getItem("notes") ?? ""));
  }, []);

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
