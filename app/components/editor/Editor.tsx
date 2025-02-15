import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";
import { useNotes } from "@/app/context/NotesContext";

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

  const { selectedNote } = useNotes();

  // Sync editor content when page changes after deletion purposes
  // check the array storedNotes length is greater than one or storedNotes[0]?.[page] is undefined..., it means i would have
  // to check for newContent as storedNotes[page] else storedNotes[0].page...
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") ?? "[]");
    // console.log(storedNotes);
    let newContent;
    // console.log(Array.isArray(storedNotes[0]));
    // if(storedNotes[0]?.[page]){
    if (storedNotes[0]?.[page] && Array.isArray(storedNotes[0]?.[page])) {
      newContent = storedNotes[0][page];
    } else {
      newContent = storedNotes[page];
    }
    // const newContent = storedNotes[0]?.[page];
    // console.log(newContent);
    editor.replaceBlocks(editor.document, newContent);
  }, [editor, page, selectedNote]);

  const handleContentChange = () => {
    // Get existing notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem("notes") ?? "[]");

    // Update the specific page's content
    // storedNotes[page] = JSON.stringify(editor.document);
    storedNotes[0][page] = editor.document;
    // console.log(storedNotes);
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
