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

//For the single editor to pdf
// export async function PUT(req: Request) {
//   try {
//     const { blocks } = await req.json();
//     console.log("Received blocks:", blocks);

//     // Validate blocks
//     if (!Array.isArray(blocks)) {
//       throw new Error("Invalid blocks format");
//     }

//     const exporter = new PDFExporter(BlockNoteSchema, pdfDefaultSchemaMappings);
//     const pdfDocument = await exporter.toReactPDFDocument(blocks);

//     // Convert to Buffer (needed for upload)
//     const pdfBuffer = await ReactPDF.renderToBuffer(pdfDocument);
//     const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
//     const pdfFile = new File([pdfBlob], `document-${Date.now()}.pdf`, {
//       type: "application/pdf",
//     });

//     // Upload PDF to Supabase
//     const fileUrl = await uploadFileToSupabase(pdfFile);
//     console.log("Uploaded file URL:", fileUrl);

//     return NextResponse.json({ success: true, fileUrl });
//   } catch (error) {
//     console.error("PDF Export Error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { PDFDocument } from "pdf-lib"; // Library for merging PDFs

// Function to merge multiple PDF buffers
async function mergePDFs(pdfBuffers: Buffer[]) {
  const mergedPdf = await PDFDocument.create();

  for (const buffer of pdfBuffers) {
    const pdf = await PDFDocument.load(buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}

export async function PUT(req: Request) {
  try {
    const { blocks } = await req.json();
    // console.log("Received blocks:", blocks);

    // Validate blocks
    if (!Array.isArray(blocks) || !blocks.every((arr) => Array.isArray(arr))) {
      throw new Error("Invalid blocks format");
    }

    const exporter = new PDFExporter(BlockNoteSchema, pdfDefaultSchemaMappings);
    const pdfBuffers: Buffer[] = [];

    // Generate separate PDFs for each array in blocks
    for (const blockArray of blocks) {
      const pdfDocument = await exporter.toReactPDFDocument(blockArray);
      const pdfBuffer = await ReactPDF.renderToBuffer(pdfDocument);
      pdfBuffers.push(pdfBuffer);
    }

    // Merge all PDFs into one
    const mergedPdfBuffer = await mergePDFs(pdfBuffers);

    // Convert to Blob and File
    const pdfBlob = new Blob([mergedPdfBuffer], { type: "application/pdf" });
    const pdfFile = new File([pdfBlob], `merged-notes-${Date.now()}.pdf`, {
      type: "application/pdf",
    });

    // Upload to Supabase
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
