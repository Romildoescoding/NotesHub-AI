import { useState } from "react";
import { deleteFileFromSupabase } from "./upload/uploadFile";

export default function useDeleteNote() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteNote = async (id: string, fileUrl: string): Promise<boolean> => {
    try {
      setIsDeleting(true);
      console.log(`🗑️ Deleting note with ID: ${id}`);

      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data);
      if (data.status !== "success") throw new Error(data.error);

      const isDeleted = await deleteFileFromSupabase(fileUrl);
      if (!isDeleted) {
        console.log("Error deleting file from supabase");
        return false;
      }
      console.log("✅ Note deleted successfully!");
      return true;
    } catch (error) {
      console.error("❌ Note deletion failed:", error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteNote, isDeleting };
}
