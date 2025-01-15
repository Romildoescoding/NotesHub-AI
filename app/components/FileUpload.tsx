"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";

// Define the type for the files state
type FileType = File;

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileType[]>([]);

  // Handle file input changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // Handle drag-and-drop functionality
  const handleDrop = (e: DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
  };

  // Remove a file from the selection
  const handleDeleteFile = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full pt-24">
      {/* Drag-and-Drop Input */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-1/2 h-56 border-2 border-dashed border-zinc-300 rounded-md cursor-pointer bg-zinc-50 hover:border-zinc-400 transition-all"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="text-center flex flex-col gap-1 items-center">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"#27272a"}
              fill={"none"}
            >
              <path
                d="M12 8V16M16 12L8 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </p>
          <p className="text-sm text-gray-500">Drag and drop your files here</p>
          <p className="text-sm text-gray-500">or</p>
          <p className="text-zinc-50 p-2 bg-zinc-800 rounded-md">
            Click to browse files
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Uploaded Files Section */}
      <div className="w-full mt-6">
        <h3 className="text-lg font-semibold">Uploaded Files:</h3>
        {files.length > 0 ? (
          <div className="flex flex-col gap-4 mt-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-2 bg-gray-100 rounded-lg shadow-sm"
              >
                {/* Preview Image */}
                <div
                  className="w-20 h-20 bg-cover bg-center rounded-md"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(file)})`,
                  }}
                ></div>
                {/* File Name */}
                <div className="flex-1 text-sm text-gray-700">{file.name}</div>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteFile(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
