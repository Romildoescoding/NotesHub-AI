import { useState } from "react";

export default function useEditNote() {
  const [isEditing, setIsEditing] = useState(false);

  const editNote = async (updatedNote: object) => {
    try {
      setIsEditing(true);
      const res = await fetch(`/api/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
      });

      const data = await res.json();
      console.log("🔄 Response:", data);

      if (data.status !== "success") throw new Error(data.message);

      return data.data; // `data` instead of `data.note`
    } catch (error) {
      console.error("❌ Note update failed:", error.message);
      return false;
    } finally {
      setIsEditing(false);
    }
  };

  return { editNote, isEditing };
}
