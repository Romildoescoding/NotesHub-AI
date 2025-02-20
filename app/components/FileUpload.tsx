"use client";

import Image from "next/image";
import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";
import AnimatedLogoLoader from "./AnimatedLogoLoader";
import Spinner from "./Spinner";
import Modal from "./Modal";
import NotesSlider from "./NotesSlider";
import Loader from "./Loader";
import Confetti, { ConfettiButton } from "@/components/ui/confetti";
import { ConfettiFireworks } from "./ConfettiFireworks";
import SuccessfulUpload from "./SuccessfulUpload";
import { useRouter } from "next/navigation";
import { useNotes } from "../context/NotesContext";
import { generateNotes, getTitle } from "../context/defaultNote";

// Define the type for the files state
type FileType = File;

interface INote {
  title: string;
  text: string;
}

const FileUpload: React.FC = () => {
  const router = useRouter();
  // const router = useRouter();

  // Your file upload logic and result generation code here

  // After successful upload, redirect to /dashboard/editor
  const [files, setFiles] = useState<FileType[]>([]);
  const [ocrResults, setOcrResults] = useState<string[]>([
    "hey there.. how you doin?? I am fine thank you",
    "hey there.. how you doin?? I am fine thank you",
    "hey there.. how you doin?? I am fine thank you",
  ]);
  const [showModal, setShowModal] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { setNotes } = useNotes();

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
    const results: INote[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/ocr/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        results.push({
          title: getTitle(data.text) || "Placeholder Title",
          text: data.text,
        });
        //Go to the editor
      } catch (error) {
        console.error("Error processing file:", file.name, error);
        // results.push(`Error processing file: ${file.name}`);
      }
    }
    console.log(results);
    const results2 = generateNotes(results);
    console.log(results2);
    setNotes(JSON.parse(results2));
    router.push("/notes/editor");
    // router.push("/dashboard/editor");

    // setOcrResults(results);
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
    <div className="z-2 flex flex-col items-center justify-center w-full pt-4 relative">
      {showModal === "loading" && (
        <Modal setShowModal={setShowModal}>
          <div className="w-[60vw] h-[90vh] flex flex-col items-center justify-center bg-white text-zinc-500 rounded-md">
            <Loader />
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

      {/* {showModal === "results" && (
        <Modal setShowModal={setShowModal}>
          <NotesSlider ocrResults={ocrResults} setShowModal={setShowModal} />
        </Modal>
      )} */}

      {showModal === "uploaded" && (
        <Modal setShowModal={setShowModal}>
          <SuccessfulUpload />
        </Modal>
      )}

      {/* Drag-and-Drop Input */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-1/2 h-56 border-2 border-dashed border-zinc-300 rounded-md cursor-pointer bg-white hover:border-zinc-400 transition-all hover:shadow-md shadow-zinc-400"
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
          <p className="text-zinc-50 p-2 bg-zinc-900 rounded-md">
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

      {/* SAMPLE IMAGES
      {/* <div className="flex flex-col gap-2 justify-center items-center h-fit w-fit p-2 text-zinc-900 font-semibold">
        <span>Sample Images</span>
        <div className="flex gap-2">
          <Image
            onClick={() => {
              setFiles((prev) => [...prev, new File([""], "/file_2.jpg")]);
            }}
            alt="sample1"
            src="/file_2.jpg"
            height={300}
            width={300}
          />
          <Image
            onClick={() => {
              setFiles((prev) => [...prev, new File([""], "/file.jpg")]);
            }}
            alt="sample1"
            src="/file.jpg"
            height={300}
            width={300}
          />
        </div>
      </div> */}

      {/* Uploaded Files Section */}
      <div className="w-3/4 p-4 mt-6 bg-white border-[2px] border-[#eaeaea] rounded-md">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">Uploaded Files:</h3>{" "}
          <button
            className=" bg-zinc-900 text-zinc-50 p-2 px-4 flex gap-1 items-center rounded-full"
            style={{ cursor: files.length == 0 ? "not-allowed" : "pointer" }}
            disabled={files.length == 0}
            // onClick={() => setShowModal("results")}
            onClick={handleGenerate}
            // onClick={() =>
            //   router.push(
            //     `/dashboard/editor?data=${encodeURIComponent(
            //       JSON.stringify(ocrResults)
            //     )}`
            //   )
            // }
            // onClick={() => {
            //   localStorage.setItem("results", JSON.stringify(ocrResults));
            //   router.push("/notes/editor");
            // }}
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
