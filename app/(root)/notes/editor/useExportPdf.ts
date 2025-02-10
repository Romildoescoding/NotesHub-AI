// import { useState } from "react";
// import { jsPDF } from "jspdf";
// import { PDFDocument } from "pdf-lib";
// import { uploadFileToSupabase } from "../upload/uploadFile";

// export default function useExportPdf(editorRefs) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [response, setResponse] = useState(null);

//   const handleExportPDF = async () => {
//     setIsLoading(true);
//     console.log("ISLOADING THE PDF MAKING :D");
//     const pdfs: Array<Uint8Array> = [];

//     for (let i = 0; i < editorRefs.current.length; i++) {
//       const editorContent = editorRefs.current[i];
//       if (!editorContent) continue;

//       const tempPdf = new jsPDF();

//       await new Promise((resolve) => {
//         tempPdf.html(editorContent, {
//           x: 10,
//           y: 10,
//           width: 190,
//           windowWidth: editorContent.offsetWidth,
//           autoPaging: true,
//           callback: () => {
//             pdfs.push(tempPdf.output("arraybuffer"));
//             resolve();
//           },
//         });
//       });
//     }

//     const mergedPdf = await PDFDocument.create();

//     for (const pdfBytes of pdfs) {
//       const pdfDoc = await PDFDocument.load(pdfBytes);
//       const copiedPages = await mergedPdf.copyPages(
//         pdfDoc,
//         pdfDoc.getPages().map((_, index) => index)
//       );
//       copiedPages.forEach((page) => mergedPdf.addPage(page));
//     }

//     const mergedPdfBytes = await mergedPdf.save();
//     const pdfBlob = new Blob([mergedPdfBytes], { type: "application/pdf" });
//     const pdfFile = new File([pdfBlob], "uploads.pdf", {
//       type: "application/pdf",
//     });

//     const fileUrl = await uploadFileToSupabase(pdfFile);

//     const user = {
//       email: "romilrajrana1@gmail.com",
//       id: "67839448b5474a277037a82a",
//     };

//     const res = await fetch("/api/notes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: "My First Note",
//         fileName: "uploads.pdf",
//         fileUrl: fileUrl,
//         isPublic: true,
//         tags: ["learning", "typescript"],
//         uploadedBy: user.id,
//         uploaderEmail: user.email,
//         description: "This is my first note uploaded to Supabase.",
//       }),
//     });

//     const data = await res.json();
//     setResponse(data);
//     console.log("COMPLETED THE PDF MAKING :D :D :D :D :D");
//     setIsLoading(false);
//   };

//   return { handleExportPDF, isLoading, response };
// }

// import { useState } from "react";
// import {
//   PDFExporter,
//   pdfDefaultSchemaMappings,
// } from "@blocknote/xl-pdf-exporter";
// import * as ReactPDF from "@react-pdf/renderer";
// // import { BlockNote } from "@blocknote/core";
// import { uploadFileToSupabase } from "../upload/uploadFile"; // Adjust import based on your setup

// export default function useExportPdf(editor: BlockNote) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [response, setResponse] = useState(null);

//   const handleExportPDF = async () => {
//     try {
//       setIsLoading(true);
//       console.log("🔄 Generating PDF...");

//       const exporter = new PDFExporter(editor.schema, pdfDefaultSchemaMappings);
//       const pdfDocument = await exporter.toReactPDFDocument(editor.document);

//       // Convert React-PDF document to a Blob
//       const pdfBlob = await ReactPDF.pdf(pdfDocument).toBlob();
//       const pdfFile = new File([pdfBlob], "uploads.pdf", {
//         type: "application/pdf",
//       });

//       // Upload to Supabase
//       const fileUrl = await uploadFileToSupabase(pdfFile);
//       console.log("📂 File uploaded to Supabase:", fileUrl);

//       // User details
//       const user = {
//         email: "romilrajrana1@gmail.com",
//         id: "67839448b5474a277037a82a",
//       };

//       // Save to database
//       const res = await fetch("/api/notes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: "My First Note",
//           fileName: pdfFile.name,
//           fileUrl: fileUrl,
//           isPublic: true,
//           tags: ["learning", "typescript"],
//           uploadedBy: user.id,
//           uploaderEmail: user.email,
//           description: "This is my first note uploaded to Supabase.",
//         }),
//       });

//       const data = await res.json();
//       setResponse(data);
//       console.log("✅ COMPLETED THE PDF MAKING :D :D :D :D :D");
//     } catch (error) {
//       console.error("❌ PDF Export Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { handleExportPDF, isLoading, response };
// }

// import { useState } from "react";
// import { stringify } from "flatted";

// export default function useExportPdf(document: any) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [exportSuccess, setExportSuccess] = useState<boolean | null>(null);

//   const exportToPDF = async () => {
//     try {
//       setIsLoading(true);
//       console.log("🔄 Generating PDF...");
//       console.log(typeof document);
//       const serializedDocument = stringify({
//         ...document,
//         searchParams: document?.searchParams
//           ? Object.fromEntries(document.searchParams.entries()) // Convert to plain object
//           : undefined,
//       });

//       console.log(typeof serializedDocument);

//       // Send request to server action
//       const res = await fetch("/api/notes", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ document: serializedDocument }),
//       });

//       const data = await res.json();
//       if (!data.success) throw new Error(data.error);

//       console.log("✅ PDF Exported Successfully!", data.fileUrl);
//       setExportSuccess(true);
//     } catch (error) {
//       console.error("❌ PDF Export Error:", error);
//       setExportSuccess(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { exportToPDF, isLoading, exportSuccess };
// }

// useExportPdf.ts
import { useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";

export default function useExportPdf(editor: BlockNoteEditor) {
  const [isLoading, setIsLoading] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<boolean | null>(null);

  const exportToPDF = async () => {
    try {
      setIsLoading(true);
      console.log("🔄 Generating PDF...");

      // Get the blocks directly from the editor
      const blocks = editor.document;

      console.log("Blocks to be exported:", blocks);

      // Send request to server action
      const res = await fetch("/api/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      const user = {
        email: "romilrajrana1@gmail.com",
        id: "67839448b5474a277037a82a",
      };

      const uploadNoteRes = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "My First BlockNote Scan :D",
          fileName: "blocknote.pdf",
          fileUrl: data.fileUrl,
          isPublic: true,
          tags: ["blocknote", "testing"],
          uploadedBy: user.id,
          uploaderEmail: user.email,
          description: "This is my first note uploaded to Supabase.",
        }),
      });

      const uploadNoteData = await res.json();
      console.log(uploadNoteData);
      // setResponse(data);

      console.log("✅ PDF Exported Successfully!", data.fileUrl);
      setExportSuccess(true);
    } catch (error) {
      console.error("❌ PDF Export Error:", error);
      setExportSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { exportToPDF, isLoading, exportSuccess };
}
