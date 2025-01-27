import React, { useState } from "react";

const ModalUploadPdf = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Mock data for cards
  const pdfFiles = [
    { id: 1, name: "File 1.pdf", file: "https://placehold.co/600x400" },
    { id: 2, name: "File 2.pdf", file: "https://placehold.co/600x400" },
    { id: 3, name: "File 3.pdf", file: "https://placehold.co/600x400" },
    // Add more as needed
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCardClick = (id) => {
    setSelectedPdf(id);
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
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleUploadFile() {
    // https://toedslmykfbanqvtpktp.supabase.co/storage/v1/object/public/pdfs/pdfs/1737617258167-uploads.pdf
    if (selectedPdf) {
      //It means that the pdf seleceted alreay has a deployed url so we can already process it
    } else if (uploadedFile) {
      //First i need to upload the file to supabas storage and then make
    } else return;
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
          {filteredPdfFiles.map((file) => (
            <div
              key={file.id}
              className={`flex flex-col items-center gap-4 p-4 border rounded-lg cursor-pointer ${
                selectedPdf === file.id ? "border-black" : "border-gray-300"
              } hover:shadow-md`}
              onClick={() => handleCardClick(file.id)}
            >
              <img
                src={file.file}
                alt={file.name}
                className="w-full h-auto object-cover rounded-md"
              />
              <span className="text-sm font-medium">{file.name}</span>
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
