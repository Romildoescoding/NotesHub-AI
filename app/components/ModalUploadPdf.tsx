import React, { useState } from "react";
import { uploadFileToSupabase } from "../(dashboard)/dashboard/upload/uploadFile";

const ModalUploadPdf = ({ setSelectedPdfFile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Mock data for cards
  /**
   * Paste one or more documents here
   */

  const pdfFiles = [
    {
      title: "My First Note",
      fileName: "uploads.pdf",
      fileUrl:
        "https://toedslmykfbanqvtpktp.supabase.co/storage/v1/object/public/pdfs/pdfs/1737617258167-uploads.pdf",
      isPublic: true,
      tags: ["learning", "typescript"],
      uploadedBy: {
        $oid: "67839448b5474a277037a82a",
      },
      uploaderEmail: "romilrajrana1@gmail.com",
      description: "This is my first note uploaded to Supabase.",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCardClick = (url) => {
    setSelectedPdf(url);
    setSelectedPdfFile(url);
    setUploadedFile("");
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
    // let uploadedUrl = "";
    // if (selectedPdf) {
    //   uploadedUrl = selectedPdf;
    //   //It means that the pdf seleceted alreay has a deployed url so we can already process it
    // } else if (uploadedFile) {
    //   const url = await uploadFileToSupabase(uploadedFile);
    //   uploadedUrl = url;
    //   //First i need to upload the file to supabas storage and then make
    // } else return;
    // setSelectedPdfFile(selectedPdf || uploadedUrl);
  }

  return (
    <div className="w-[60vw] h-[80vh] bg-white rounded-xl shadow-lg p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Select from your PDFs</h2>
      {/* Search Bar */}
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
            <div
              key={i}
              className={`flex flex-col items-center gap-4 p-4 border rounded-lg cursor-pointer ${
                selectedPdf === file.fileUrl
                  ? "border-black"
                  : "border-gray-300"
              } hover:shadow-md`}
              onClick={() => handleCardClick(file.fileUrl)}
            >
              <img
                src={file.fileUrl}
                alt={file.fileName}
                className="w-full h-auto object-cover rounded-md"
              />
              <span className="text-sm font-medium">{file.fileName}</span>
            </div>
          ))}
        </div>
      </div>

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
          {uploadedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected:{" "}
              <span className="font-medium">
                {uploadedFile.name.length > 30
                  ? uploadedFile.name.slice(0, 30) + "..."
                  : uploadedFile.name}
              </span>
            </p>
          )}
        </div>
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800"
          onClick={handleUploadFile}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default ModalUploadPdf;
