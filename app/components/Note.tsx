"use client";

import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";

const Note = ({ note, selectedPdf, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`h-fit cursor-pointer hover:shadow-md shadow-black rounded-md transition-all w-64 border-2 flex flex-col ${
        selectedPdf?.fileUrl === note.fileUrl ? "border-black" : "auto"
      }`}
      // className={`flex flex-col items-center gap-4 p-4 border rounded-lg cursor-pointer  hover:shadow-md`}
    >
      {/* PDf note */}
      <div className="relative w-full h-56 overflow-hidden border-b-2 px-4">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
          <div>
            <Viewer defaultScale={0.475} fileUrl={note.fileUrl} />
          </div>
        </Worker>
      </div>
      <div className="p-2 px-4 flex flex-col gap-2">
        <p className="capitalize">
          {note.title.length > 22 ? note.title.slice(0, 22) + ".." : note.title}
        </p>
        <p className="w-full justify-end flex gap-1">
          {note.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full capitalize"
              style={{ background: tag.secondary, color: tag.primary }}
              // style={{ background: tag.primary, color: tag.secondary }}
            >
              {tag.category}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Note;
