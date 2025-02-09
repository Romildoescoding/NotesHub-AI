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

import {
  PDFExporter,
  pdfDefaultSchemaMappings,
} from "@blocknote/xl-pdf-exporter";
import * as ReactPDF from "@react-pdf/renderer";
import { BlockNoteSchema } from "@blocknote/core";
import { uploadFileToSupabase } from "@/app/(root)/notes/upload/uploadFile";

// Explicitly define the schema
// const customSchema: BlockSchemaFromSpecs<typeof BlockNote.schema> = BlockNote.schema;.

// export async function PUT(req: Request) {
//   try {
//     const { document } = await req.json();

//     // Ensure BlockNote instance schema is used
//     const exporter = new PDFExporter(BlockNoteSchema, pdfDefaultSchemaMappings);
//     const pdfDocument = await exporter.toReactPDFDocument(document);

//     // Convert to Buffer (needed for upload)
//     const pdfBuffer = await ReactPDF.renderToBuffer(pdfDocument);

//     // 🔥 Convert Buffer to Blob
//     const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

//     // 🔥 Convert Blob to File
//     const pdfFile = new File([pdfBlob], `document-${Date.now()}.pdf`, {
//       type: "application/pdf",
//     });

//     // Upload PDF to Supabase
//     const fileUrl = await uploadFileToSupabase(pdfFile);
//     console.log();

//     return NextResponse.json({ success: true, fileUrl });
//   } catch (error) {
//     console.error("PDF Export Error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req: Request) {
  try {
    const { blocks } = await req.json();
    console.log("Received blocks:", blocks);

    // Validate blocks
    if (!Array.isArray(blocks)) {
      throw new Error("Invalid blocks format");
    }

    const exporter = new PDFExporter(BlockNoteSchema, pdfDefaultSchemaMappings);
    const pdfDocument = await exporter.toReactPDFDocument(blocks);

    // Convert to Buffer (needed for upload)
    const pdfBuffer = await ReactPDF.renderToBuffer(pdfDocument);
    const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
    const pdfFile = new File([pdfBlob], `document-${Date.now()}.pdf`, {
      type: "application/pdf",
    });

    // Upload PDF to Supabase
    const fileUrl = await uploadFileToSupabase(pdfFile);
    console.log("Uploaded file URL:", fileUrl);

    return NextResponse.json({ success: true, fileUrl });
  } catch (error) {
    console.error("PDF Export Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "POST, PUT, OPTIONS",
    },
  });
}
