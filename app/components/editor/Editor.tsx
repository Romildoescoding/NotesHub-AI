// "use client";
// import React from "react";
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// // import { BlockNote } from "@blocknote/core";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import useExportPdf from "@/app/(root)/notes/editor/useExportPdf";
// import { BlockNoteEditor } from "@blocknote/core";

// interface EditorProps {
//   onChange: () => void;
//   initialContent?: string;
//   editable?: boolean;
// }

// const Editor: React.FC<EditorProps> = ({
//   initialContent,
//   onChange,
//   editable,
// }) => {
//   const editor: BlockNoteEditor = useCreateBlockNote({
//     initialContent: initialContent
//       ? (JSON.parse(initialContent) as PartialBlock[])
//       : undefined,
//   });

//   const { exportToPDF, isLoading, exportSuccess } = useExportPdf(editor);
//   return (
//     <div className="h-full w-full flex flex-col gap-4 pl-16">
//       <button
//         className=" bg-zinc-950  text-zinc-50 rounded-md p-2 px-3"
//         onClick={exportToPDF}
//       >
//         {" "}
//         {isLoading ? "Uploading.." : "Upload"}
//       </button>
//       <BlockNoteView
//         editor={editor}
//         editable={editable}
//         theme="light"
//         onChange={onChange}
//       />
//     </div>
//   );
// };

// export default Editor;

import React, { useEffect } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import useExportPdf from "@/app/(root)/notes/editor/useExportPdf";
import { BlockNoteEditor } from "@blocknote/core";

interface EditorProps {
  onChange: () => void;
  initialContent?: string;
  editable?: boolean;
  page: number;
}

const Editor: React.FC<EditorProps> = ({
  initialContent,
  onChange,
  editable,
  page,
}) => {
  console.log(initialContent);
  const editor = useCreateBlockNote({
    initialContent: initialContent ? initialContent : undefined,
  });

  const { exportToPDF, isLoading, exportSuccess } = useExportPdf(editor);

  // const handleContentChange = () => {
  //   const updatedContent = JSON.stringify(editor.document);
  //   localStorage.setItem(`note-${page}`, updatedContent);
  // };

  const handleContentChange = () => {
    // Get existing notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem("notes") ?? "[]");

    // Update the specific page's content
    // storedNotes[page] = JSON.stringify(editor.document);
    storedNotes[0][page] = editor.document;
    console.log(storedNotes);
    // Save back to localStorage
    localStorage.setItem("notes", JSON.stringify(storedNotes));
  };

  // useEffect(() => {
  //   if (initialContent) {
  //     const savedNote = localStorage.getItem("notes");
  //     if (savedNote) {
  //       const parsedContent = JSON.parse(savedNote)[page] as PartialBlock[];
  //       console.log("PARSED CONTENT");
  //       console.log(parsedContent);
  //       const blocks = editor.document;
  //       const blockIds = blocks.map((block) => block.id);
  //       editor.replaceBlocks(blockIds, parsedContent);
  //     }
  //   }
  // }, [editor, initialContent, page]);

  return (
    <div className="h-full w-full flex flex-col gap-4 pl-16">
      {/* <button
        className="bg-zinc-950 text-zinc-50 rounded-md p-2 px-3"
        onClick={exportToPDF}
      >
        {isLoading ? "Uploading.." : "Upload"}
      </button> */}
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme="light"
        onChange={handleContentChange}
      />
    </div>
  );
};

export default Editor;
