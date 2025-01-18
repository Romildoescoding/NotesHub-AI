"use client";
import React, { useRef } from "react";
import NoteEditor from "./NoteEditor";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";

const NotesSlider = ({ ocrResults }: { ocrResults: string[] }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const editorRefs = useRef<HTMLDivElement[]>([]);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < ocrResults.length - 1) setCurrentPage(currentPage + 1);
  };
  const handleExportPDF = async () => {
    const pdfs: Array<Uint8Array> = [];

    // Create individual PDFs
    for (let i = 0; i < editorRefs.current.length; i++) {
      const editorContent = editorRefs.current[i];
      if (!editorContent) continue;

      const tempPdf = new jsPDF();

      await new Promise<void>((resolve) => {
        tempPdf.html(editorContent, {
          x: 10,
          y: 10,
          width: 190,
          windowWidth: editorContent.offsetWidth,
          autoPaging: true,
          callback: () => {
            pdfs.push(tempPdf.output("arraybuffer") as Uint8Array);
            resolve();
          },
        });
      });
    }

    // Merge PDFs using pdf-lib
    const mergedPdf = await PDFDocument.create();

    for (const pdfBytes of pdfs) {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPages().map((_, index) => index)
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    const pdfBlob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "merged_notes.pdf";
    a.click();
  };

  return (
    <div className="relative w-[60vw] h-[90vh] overflow-hidden bg-white rounded-md">
      <div
        className="flex transition-transform h-full duration-300"
        style={{
          transform: `translateX(-${currentPage * 100}%)`,
        }}
      >
        {ocrResults.map((result, i) => (
          <div
            key={i}
            className="min-w-full h-full relative flex-shrink-0 p-8 px-16"
          >
            <span className="absolute top-4 left-4 text-zinc-50 bg-zinc-900 p-1 px-3 rounded-md">
              {i + 1}
            </span>
            <NoteEditor text={result} editorRefs={editorRefs} index={i} />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-zinc-900 text-zinc-50 p-2 rounded-md shadow-md"
        onClick={handlePrev}
        disabled={currentPage === 0}
        style={{ cursor: currentPage === 0 ? "not-allowed" : "pointer" }}
      >
        {"<<"}
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-zinc-900 text-zinc-50 p-2 rounded-md shadow-md"
        onClick={handleNext}
        disabled={currentPage === ocrResults.length - 1}
        style={{
          cursor:
            currentPage === ocrResults.length - 1 ? "not-allowed" : "pointer",
        }}
      >
        {">>"}
      </button>
      <div className="absolute bottom-4 right-4 z-[9]">
        <RainbowButton onClick={handleExportPDF}>Upload &uarr;</RainbowButton>
      </div>
    </div>
  );
};

export default NotesSlider;
