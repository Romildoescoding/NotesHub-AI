"use client";

import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";

const Note = ({ note, selectedPdf, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`h-fit cursor-pointer hover:shadow-md shadow-black rounded-md transition-all w-56 border-2 flex flex-col ${
        selectedPdf?.fileUrl === note.fileUrl ? "border-black" : "auto"
      }`}
      // className={`flex flex-col items-center gap-4 p-4 border rounded-lg cursor-pointer  hover:shadow-md`}
    >
      {/* PDf note */}
      <div className="relative w-full h-44 overflow-hidden border-b-2 px-4">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
          <div>
            <Viewer defaultScale={0.3} fileUrl={note.fileUrl} />
          </div>
        </Worker>
      </div>
      <div className="p-2 px-4 flex flex-col gap-2">
        <p className="">
          {note.title.slice(0, 1).toUpperCase() + note.title.slice(1)}
        </p>
        <p className="w-full justify-end flex gap-1">
          {note.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full capitalize"
              style={{ color: tag.secondary, background: tag.primary }}
            >
              {tag.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Note;
