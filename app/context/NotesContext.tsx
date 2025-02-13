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
    setNotes(
      JSON.parse(
        localStorage.getItem("notes") ??
          '[[[{"id":"5702f5ad-58f0-4e3d-b144-fbb2f82e882b","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"I bet this would work","styles":{}}],"children":[]},{"id":"37c3209b-4600-4021-b5a8-e12bc751bff9","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another headingI bet this would work","styles":{}}],"children":[]},{"id":"19d88ceb-a492-4a8a-b2d5-dbab825b7748","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another headingI bet this would work","styles":{}}],"children":[]},{"id":"19ceb417-e16f-4019-9a98-85c93fb72796","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another headingI bet this would work","styles":{}}],"children":[]},{"id":"4ed9b480-567b-4158-825f-6bf7acc992bc","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another headingI bet this would work","styles":{}}],"children":[]},{"id":"7478c551-6bd5-4117-94cb-471170b7a732","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another headingI bet this would work","styles":{}}],"children":[]},{"id":"3855fbe9-cef8-4ba3-be8a-96640fb7adfe","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another headingI bet this would work","styles":{}}],"children":[]},{"id":"7ec736b0-2561-4a10-8e07-94f7ab3fcfc3","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another headingI bet this would work","styles":{}}],"children":[]},{"id":"c62499ed-9a6d-4784-a9cd-936587efccd5","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another headingI bet this would work","styles":{}}],"children":[]},{"id":"01da1d2e-83a9-41fb-91e8-1cc14955977f","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another headingI bet this would work","styles":{}}],"children":[]},{"id":"f6e0fd93-1373-43f5-8646-d5a81c19bc82","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another heading","styles":{}}],"children":[]},{"id":"05c5a17c-2ce4-4f45-81f2-6236c87d078e","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"13c4d480-5f38-4069-b6f2-5a17892e9880","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}],[{"id":"4ae30dbs-fdi8-49be-y72a-69ra9fb8b689","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"I bet this would work","styles":{}}],"children":[]},{"id":"e2f18776-14b4-43eb-8c09-95cee6a01da9","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another heading","styles":{}}],"children":[]},{"id":"05c5a17c-2ce4-4f45-81f2-6236c87d078e","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"13c4d480-5f38-4069-b6f2-5a17892e9880","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}],[{"id":"4ae30dbs-fdi8-49be-y72a-69ra9fb8b689","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"I bet this would work","styles":{}}],"children":[]},{"id":"e2f18776-14b4-43eb-8c09-95cee6a01da9","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another heading","styles":{}}],"children":[]},{"id":"05c5a17c-2ce4-4f45-81f2-6236c87d078e","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"13c4d480-5f38-4069-b6f2-5a17892e9880","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}],[{"id":"4ae30dbs-fdi8-49be-y72a-69ra9fb8b689","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"I bet this would work","styles":{}}],"children":[]},{"id":"e2f18776-14b4-43eb-8c09-95cee6a01da9","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"another heading or what man","styles":{}}],"children":[]},{"id":"12382867-9ab9-4fde-b619-5586fa4ef81b","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"6973559b-1b81-4f47-8693-9c749a84757f","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"LMAO","styles":{}}],"children":[]},{"id":"1252e961-a217-46ec-8c3c-9ad66d9fd09c","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"><","styles":{}}],"children":[]},{"id":"a3d0f347-1342-4ed9-ba63-b65902d64fa8","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"05c5a17c-2ce4-4f45-81f2-6236c87d078e","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"13c4d480-5f38-4069-b6f2-5a17892e9880","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]]]'
      )
    );
  }, []);

  useEffect(() => {
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
