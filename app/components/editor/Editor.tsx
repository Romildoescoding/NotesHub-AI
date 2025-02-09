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

import React from "react";
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
}

const Editor: React.FC<EditorProps> = ({
  initialContent,
  onChange,
  editable,
}) => {
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  const { exportToPDF, isLoading, exportSuccess } = useExportPdf(editor);

  return (
    <div className="h-full w-full flex flex-col gap-4 pl-16">
      <button
        className="bg-zinc-950 text-zinc-50 rounded-md p-2 px-3"
        onClick={exportToPDF}
      >
        {isLoading ? "Uploading.." : "Upload"}
      </button>
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme="light"
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
