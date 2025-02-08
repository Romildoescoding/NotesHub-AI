import React, { useState } from "react";
import Note from "./Note";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { uploadFileToSupabase } from "../(root)/notes/upload/uploadFile";

// Implement local storage for selected file yk...

const pdfFiles = [
  {
    title: "My First Note",
    fileName: "uploads.pdf",
    fileUrl:
      "https://toedslmykfbanqvtpktp.supabase.co/storage/v1/object/public/pdfs/pdfs/0_Resume_Romil_v1.pdf",
    isPublic: true,
    tags: [
      { name: "learning", primary: "#b8fff0", secondary: "#429583" },
      { name: "typescipt", primary: "#ffd9b6", secondary: "#956742" },
    ],
    uploadedBy: {
      $oid: "67839448b5474a277037a82a",
    },
    uploaderEmail: "romilrajrana1@gmail.com",
    description: "This is my first note uploaded to Supabase.",
  },
];

const ModalUploadPdf = ({ setSelectedPdfFile, setShowModal, chatId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCardClick = (file) => {
    setSelectedPdf(file);
    setSelectedPdfFile(file);
    setUploadedFile(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPdf(null);
      setUploadedFile(file);
    }
  };

  const filteredPdfFiles = pdfFiles.filter((file) =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleUploadFile() {
    // https://toedslmykfbanqvtpktp.supabase.co/storage/v1/object/public/pdfs/pdfs/1737617258167-uploads.pdf
    let uploadedUrl = null;
    if (selectedPdf) {
      uploadedUrl = selectedPdf;
      //It means that the pdf seleceted alreay has a deployed url so we can already process it
    } else if (uploadedFile) {
      const url = await uploadFileToSupabase(uploadedFile);
      uploadedUrl = url;
      //First i need to upload the file to supabas storage and then make
    } else return;
    setSelectedPdfFile(
      selectedPdf
        ? {
            fileUrl: selectedPdf.fileUrl,
            title: selectedPdf.title,
            chatId: chatId,
            isNote: true,
          }
        : {
            fileUrl: uploadedUrl,
            title: uploadedFile.name,
            chatId: chatId,
            isNote: false,
          }
    );
    setShowModal("");
  }

  return (
    <div className="w-[60vw] h-[80vh] min-h-fit bg-white rounded-xl shadow-lg p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Select Notes</h2>
      {/* Search Bar */}
      {!uploadedFile && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search PDFs..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Cards Section */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="grid grid-cols-3 gap-4">
              {filteredPdfFiles.map((file, i) => (
                <Note
                  selectedPdf={selectedPdf}
                  onClick={() => handleCardClick(file)}
                  key={i}
                  note={file}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {uploadedFile && (
        <div className="border-t-2 border-zinc-300">
          <p className="mt-2 text-md text-gray-600">
            <span className="font-medium">
              {uploadedFile.name.length > 30
                ? uploadedFile.name.slice(0, 30) + "..."
                : uploadedFile.name}
            </span>
          </p>

          <div className="relative w-full h-[53vh] overflow-x-hidden overflow-y-hidden pb-4 border-b-2 px-4">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
              <div className="w-full">
                <Viewer
                  defaultScale={1}
                  fileUrl={URL.createObjectURL(uploadedFile)}
                />
              </div>
            </Worker>
          </div>
        </div>
      )}

      {/* Sticky Buttons */}
      <div className="flex justify-between items-center mt-4">
        <div className="relative">
          <label
            htmlFor="uploadPdfInput"
            className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-zinc-800"
          >
            Upload PDF from PC
          </label>
          <input
            id="uploadPdfInput"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        <div className="flex gap-2 w-fit">
          <button
            className="px-4 py-2 bg-zinc-200 text-black rounded-lg hover:bg-zinc-300"
            onClick={() => {
              setUploadedFile(null);
              setSelectedPdf(null);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black text-white disabled:cursor-not-allowed rounded-lg hover:bg-zinc-800"
            disabled={!uploadedFile && !selectedPdf}
            onClick={handleUploadFile}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUploadPdf;
