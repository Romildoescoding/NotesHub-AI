"use client";
import NotesSlider from "@/app/components/NotesSlider";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [showModal, setShowModal] = useState("");
  const [ocrResults, setOcrResults] = useState([]);
  useEffect(() => {
    setOcrResults(JSON.parse(localStorage.getItem("results") || ""));
  }, []);
  //   const router = useRouter();
  //   console.log(router.query);
  //   const ocrResults = router.query.data ? JSON.parse(router.query.data) : null;
  return (
    <>
      <div>App</div>
      <NotesSlider ocrResults={ocrResults} setShowModal={setShowModal} />
    </>
  );
};

export default Page;
