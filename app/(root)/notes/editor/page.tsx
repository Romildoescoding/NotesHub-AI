"use client";
import { useNotes } from "@/app/context/NotesContext";
// import Editor from "@/app/components/editor/Editor";
// import NotesSlider from "@/app/components/NotesSlider";
import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";

import React, { useEffect, useMemo, useRef, useState } from "react";
// import useExportPdf from "./useExportPdf";

const Page = () => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/app/components/editor/Editor"), { ssr: false }),
    []
  );

  const { notes, selectedNote } = useNotes();
  // const [showModal, setShowModal] = useState("");
  // const [ocrResults, setOcrResults] = useState([]);
  // useEffect(() => {
  //   setOcrResults(JSON.parse(localStorage.getItem("results") || "[]"));
  // }, []);
  //   const router = useRouter();
  //   console.log(router.query);
  //   const ocrResults = router.query.data ? JSON.parse(router.query.data) : null;

  const initialContent = JSON.stringify([
    {
      id: "edd0f77d-0d7f-4430-a516-d2accc849010",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [
        {
          type: "text",
          text: `${
            notes?.[selectedNote] ?? `No note found at index ${selectedNote}`
          }`,
          styles: {},
        },
      ],
      children: [],
    },
  ]);

  // const editorRefs = useRef([]);
  return (
    // <div className="w-full h-full" ref={(el) => (editorRefs.current[index] = el)}>
    <div className="w-full h-full relative pt-16">
      <div
        className="w-full h-full relative"
        // ref={(el) => (editorRefs.current[0] = el)}
      >
        <Editor initialContent={initialContent} />
        {/* <div>App</div> */}
        {/* <NotesSlider ocrResults={ocrResults} setShowModal={setShowModal} /> */}
      </div>
    </div>
  );
};

export default Page;
