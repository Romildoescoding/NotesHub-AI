"use client";

import Image from "next/image";
import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";
import AnimatedLogoLoader from "./AnimatedLogoLoader";
import Spinner from "./Spinner";
import Modal from "./Modal";
import NotesSlider from "./NotesSlider";

// Define the type for the files state
type FileType = File;

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [ocrResults, setOcrResults] = useState<string[]>([
    "One afternoon in October 2009, a former banking executive named Aaron Siegel waited impatiently in the master bedroom of a house in Buffalo that served as his office. As he stared at the room’s old fireplace and then out the window to the quiet street beyond, he tried not to think about his investors and the $14 million they had entrusted to him. Siegel was no stranger to money. He grew up in one of the city’s wealthiest and most prominent families. His father, Herb Siegel, was a legendary playboy and the majority owner of a hugely profitable personal-injury law firm. During his late teenage years, Aaron lived essentially unchaperoned in a sprawling, 100-year-old mansion. His sister, Shana, recalls the parties she hosted — lavish affairs with plenty of Champagne — and how their private-school classmates would often spend the night, as if the place were a clubhouse for the young and privileged.",
    "One afternoon in October 2009, a former banking executive named Aaron Siegel waited impatiently in the master bedroom of a house in Buffalo that served as his office. As he stared at the room’s old fireplace and then out the window to the quiet street beyond, he tried not to think about his investors and the $14 million they had entrusted to him. Siegel was no stranger to money. He grew up in one of the city’s wealthiest and most prominent families. His father, Herb Siegel, was a legendary playboy and the majority owner of a hugely profitable personal-injury law firm. During his late teenage years, Aaron lived essentially unchaperoned in a sprawling, 100-year-old mansion. His sister, Shana, recalls the parties she hosted — lavish affairs with plenty of Champagne — and how their private-school classmates would often spend the night, as if the place were a clubhouse for the young and privileged.",
    "One afternoon in October 2009, a former banking executive named Aaron Siegel waited impatiently in the master bedroom of a house in Buffalo that served as his office. As he stared at the room’s old fireplace and then out the window to the quiet street beyond, he tried not to think about his investors and the $14 million they had entrusted to him. Siegel was no stranger to money. He grew up in one of the city’s wealthiest and most prominent families. His father, Herb Siegel, was a legendary playboy and the majority owner of a hugely profitable personal-injury law firm. During his late teenage years, Aaron lived essentially unchaperoned in a sprawling, 100-year-old mansion. His sister, Shana, recalls the parties she hosted — lavish affairs with plenty of Champagne — and how their private-school classmates would often spend the night, as if the place were a clubhouse for the young and privileged.",
    "One afternoon in October 2009, a former banking executive named Aaron Siegel waited impatiently in the master bedroom of a house in Buffalo that served as his office. As he stared at the room’s old fireplace and then out the window to the quiet street beyond, he tried not to think about his investors and the $14 million they had entrusted to him. Siegel was no stranger to money. He grew up in one of the city’s wealthiest and most prominent families. His father, Herb Siegel, was a legendary playboy and the majority owner of a hugely profitable personal-injury law firm. During his late teenage years, Aaron lived essentially unchaperoned in a sprawling, 100-year-old mansion. His sister, Shana, recalls the parties she hosted — lavish affairs with plenty of Champagne — and how their private-school classmates would often spend the night, as if the place were a clubhouse for the young and privileged.",
    "One afternoon in October 2009, a former banking executive named Aaron Siegel waited impatiently in the master bedroom of a house in Buffalo that served as his office. As he stared at the room’s old fireplace and then out the window to the quiet street beyond, he tried not to think about his investors and the $14 million they had entrusted to him. Siegel was no stranger to money. He grew up in one of the city’s wealthiest and most prominent families. His father, Herb Siegel, was a legendary playboy and the majority owner of a hugely profitable personal-injury law firm. During his late teenage years, Aaron lived essentially unchaperoned in a sprawling, 100-year-old mansion. His sister, Shana, recalls the parties she hosted — lavish affairs with plenty of Champagne — and how their private-school classmates would often spend the night, as if the place were a clubhouse for the young and privileged.",
    "One afternoon in October 2009, a former banking executive named Aaron Siegel waited impatiently in the master bedroom of a house in Buffalo that served as his office. As he stared at the room’s old fireplace and then out the window to the quiet street beyond, he tried not to think about his investors and the $14 million they had entrusted to him. Siegel was no stranger to money. He grew up in one of the city’s wealthiest and most prominent families. His father, Herb Siegel, was a legendary playboy and the majority owner of a hugely profitable personal-injury law firm. During his late teenage years, Aaron lived essentially unchaperoned in a sprawling, 100-year-old mansion. His sister, Shana, recalls the parties she hosted — lavish affairs with plenty of Champagne — and how their private-school classmates would often spend the night, as if the place were a clubhouse for the young and privileged.",
  ]);
  const [showModal, setShowModal] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // OCR UPLOAD URL IS http://localhost:3000/api/ocr/upload
  useEffect(() => {
    console.log(ocrResults);
  }, [ocrResults]);

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

  const handleGenerate = async () => {
    setIsLoading(true);
    setShowModal("loading");
    const results: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/ocr/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        results.push(data.text || "No text found");
      } catch (error) {
        console.error("Error processing file:", file.name, error);
        results.push(`Error processing file: ${file.name}`);
      }
    }

    setOcrResults(results);
    setShowModal("results");
    setIsLoading(false);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
  };

  // Remove a file from the selection
  const handleDeleteFile = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="z-2 flex flex-col items-center justify-center w-full pt-24 relative">
      {showModal === "loading" && (
        <Modal setShowModal={setShowModal}>
          <div className="h-full w-full flex flex-col items-center justify-center bg-white text-zinc-500 rounded-md">
            <Spinner />
            <span className="mt-2 text-xl font-semibold text-zinc-800">
              Generating Results...
            </span>{" "}
            <span>It might take a few minutes or seconds.</span>
            {/* {ocrResults.map((result, i) => (
              <span key={i}>{result}</span>
            ))} */}
          </div>
        </Modal>
      )}

      {
        <Modal setShowModal={setShowModal}>
          <NotesSlider ocrResults={ocrResults} />
        </Modal>
      }
      {/* Drag-and-Drop Input */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-1/2 h-56 border-2 border-dashed border-zinc-300 rounded-md cursor-pointer bg-white hover:border-zinc-400 transition-all"
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
      <div className="w-3/4 p-4 mt-6 bg-white border-[2px] border-[#eaeaea] rounded-md">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">Uploaded Files:</h3>{" "}
          <button
            className=" bg-zinc-800 text-zinc-50 p-2 flex gap-1 items-center rounded-md"
            style={{ cursor: files.length == 0 ? "not-allowed" : "pointer" }}
            disabled={files.length == 0}
            onClick={handleGenerate}
          >
            {/* img {
  max-width: 100%; 
  height: auto;    
  display: block;  
} */}
            <Image src="/star.svg" height={20} width={20} alt="star" />
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>
        {files.length > 0 ? (
          <div className="flex  flex-wrap gap-2 mt-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex w-fit flex-col items-center gap-4 p-2 bg-zinc-50 border-[2px] border-zinc-100 rounded-lg shadow-sm"
              >
                {/* Preview Image */}
                <div
                  // className=""
                  className=" w-[295px] h-[200px] max-w-full max-h-full  block bg-cover bg-center rounded-md"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(file)})`,
                  }}
                ></div>
                {/* File Name */}
                <div className=" text-sm text-gray-700">
                  {file.name.length > 25
                    ? file.name.slice(0, 25) + "..."
                    : file.name}
                </div>
                {/* Delete Button */}
                <div className="flex w-full justify-between px-2">
                  <span className=" p-2 px-3 bg-zinc-800 text-zinc-50 rounded-md">
                    {index + 1}
                  </span>
                  <button
                    onClick={() => handleDeleteFile(index)}
                    className=" flex gap-2 text-sm text-zinc-50 bg-red-500 hover:bg-red-600 hover:text-white rounded-md p-2 transition-all"
                  >
                    {/* Remove */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#fff"
                      fill="none"
                    >
                      <path
                        d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.5 16.5L9.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14.5 16.5L14.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
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
