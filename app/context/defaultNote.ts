import { v4 as uuidv4 } from "uuid";

const defaultNote =
  '[[[{"id":"5702f5ad-58f0-4e3d-b144-fbb2f82e882b","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"I bet this would work","styles":{}}],"children":[]}]]]';
export default defaultNote;

interface INote {
  title: string;
  text: string;
}

function escapeText(text: string): string {
  return text
    .replace(/\\/g, "\\\\") // Escape backslashes first
    .replace(/\n/g, "\\n") // Escape newlines
    .replace(/\r/g, "\\r") // Escape carriage returns
    .replace(/"/g, '\\"'); // Escape double quotes
}

export function getTitle(text: string): string {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  return words.slice(0, 2).join(" ");
}

export function generateNotes(notes: INote[]) {
  let outputStr = "";

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const escapedTitle = escapeText(note.title);
    const escapedText = escapeText(note.text);

    outputStr += `[{"id":"${uuidv4()}","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"${escapedTitle}","styles":{}}],"children":[]},{"id":"${uuidv4()}","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"${escapedText}","styles":{}}],"children":[]}]${
      i !== notes.length - 1 ? "," : ""
    }`;
  }

  return `[[${outputStr}]]`;
}
