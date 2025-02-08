"use client";
import React from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNote } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

interface EditorProps {
  onChange: () => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor: React.FC<EditorProps> = ({initialContent, onChange, editable}) => {
  const editor :BlockNote = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  }));
  return (
    <div className="h-full w-full pl-16">
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
