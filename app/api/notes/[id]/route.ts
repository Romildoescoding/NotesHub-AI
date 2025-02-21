import dbConnect from "@/app/_lib/dbConnect";
import Notes from "@/app/models/NotesModel";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // Properly extract id from params
    if (!id) {
      return NextResponse.json(
        { status: "error", message: "Note ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find and delete the note by ID
    const deletedNote = await Notes.findByIdAndDelete(id);
    if (!deletedNote) {
      return NextResponse.json(
        { status: "error", message: "Note not found" },
        { status: 404 }
      );
    }

    console.log("🗑️ Note deleted:", deletedNote);
    return NextResponse.json({ status: "success", data: deletedNote });
  } catch (error) {
    console.error("❌ Error deleting note:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to delete note" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "DELETE, OPTIONS",
    },
  });
}
