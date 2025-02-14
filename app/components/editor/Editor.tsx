import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

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
  const editor = useCreateBlockNote({
    initialContent: initialContent ? initialContent : undefined,
  });

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

  return (
    <div className="h-full w-full flex flex-col gap-4 pl-16">
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
