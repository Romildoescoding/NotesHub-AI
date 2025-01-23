import { NextResponse } from "next/server";
import dbConnect from "@/app/_lib/dbConnect";
import Notes from "@/app/models/NotesModel";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the JSON body
    await dbConnect();

    // Create a new note in the database
    const note = new Notes(body);

    // Save the instance to the database
    const createdNote = await note.save();
    console.log("Created Note:", createdNote);

    return NextResponse.json({ status: "success", data: createdNote });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to create note" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
