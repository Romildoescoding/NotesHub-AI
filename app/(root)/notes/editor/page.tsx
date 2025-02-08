"use client";
// import Editor from "@/app/components/editor/Editor";
// import NotesSlider from "@/app/components/NotesSlider";
import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";

import React, { useEffect, useMemo, useState } from "react";

const Page = () => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/app/components/editor/Editor"), { ssr: false }),
    []
  );
  // const [showModal, setShowModal] = useState("");
  const [ocrResults, setOcrResults] = useState([]);
  useEffect(() => {
    setOcrResults(JSON.parse(localStorage.getItem("results") || "[]"));
  }, []);
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
          text: "Welcome to this demo!",
          styles: {},
        },
      ],
      children: [],
    },
  ]);
  return (
    <>
      <Editor initialContent={initialContent} />
      {/* <div>App</div> */}
      {/* <NotesSlider ocrResults={ocrResults} setShowModal={setShowModal} /> */}
    </>
  );
};

export default Page;
