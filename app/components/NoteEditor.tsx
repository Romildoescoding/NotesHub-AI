"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import ToolBar from "./Toolbar";

const NoteEditor = ({
  text,
  onChange,
  index,
  editorRefs,
}: {
  text: string;
  onChange?: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Highlight,
      Image,
    ],
    content: text,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-[50vw] h-full max-w-[50vw] max-h-full flex flex-col gap-2 overflow-hidden">
      <ToolBar editor={editor} />
      <div
        className="h-full overflow-scroll overflow-x-hidden mt-16"
        ref={(el) => (editorRefs.current[index] = el)}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default NoteEditor;
