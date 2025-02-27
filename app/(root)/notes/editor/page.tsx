"use client";
import { useNotes } from "@/app/context/NotesContext";
import { useSidebar } from "@/app/context/SidebarContext";
import { ArrowUp } from "lucide-react";
import dynamic from "next/dynamic";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useExportPdf from "./useExportPdf";
import Modal from "@/app/components/Modal";
import ModalExportPdf from "@/app/components/ModalExportPdf";
import ModalExportError from "@/app/components/ModalExportError";
import ModalExportSuccess from "@/app/components/ModalExportSuccess";
import { useNotesSidebar } from "@/app/context/NotesSidebarContext";

const Page = () => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/app/components/editor/Editor"), { ssr: false }),
    []
  );

  const { notes, selectedNote } = useNotes();
  // const { exportToPDF, isLoading, exportSuccess } = useExportPdf();
  const { collapsed } = useSidebar();
  const [exportModal, setExportModal] = useState<boolean | string>("");

  const { isSidebarOpen } = useNotesSidebar();

  // const editorRefs = useRef([]);
  const uploadBtnRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (uploadBtnRef.current) {
      uploadBtnRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [selectedNote]);
  return (
    // <div className="w-full h-full" ref={(el) => (editorRefs.current[index] = el)}>
    <div className="w-full overflow-x-hidden h-full relative pt-16 ">
      {exportModal === "export-pdf" && (
        <ModalExportPdf setShowModal={setExportModal} />
      )}

      {exportModal === "error" && (
        <ModalExportError setShowModal={setExportModal} />
      )}

      {exportModal === "success" && (
        <ModalExportSuccess setShowModal={setExportModal} />
      )}

      <div ref={uploadBtnRef} className="absolute -top-[60px] right-0"></div>
      <button
        className="absolute top-5 right-5 bg-zinc-950 text-zinc-50 rounded-md p-2 px-3"
        // onClick={() =>
        //   // notes state is not set everytime but rather the localStorage is
        //   exportToPDF(
        //     JSON.parse(localStorage.getItem("notes") ?? "[]") ?? notes
        //   )
        // }
        onClick={() => setExportModal("export-pdf")}
        // ref={uploadBtnRef}
      >
        {"Export Notes"}
      </button>
      <button
        onClick={() =>
          uploadBtnRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        className="p-2 text-zinc-950 fixed bottom-4 right-4 z-[998] rounded-full flex items-center justify-center bg-zinc-200"
      >
        <ArrowUp size={18} />
      </button>
      <motion.div
        // Here, tranition-all would maeke smooth effect while if i do not use it, then i would make a sudden switching effect making it feel like i switched editors while keeping their states even...
        className={`w-fit h-full overflow-y-hidden bg-white pb-[30vh] flex flex-nowrap -translate-x-[${
          selectedNote * 100
        }vw]}`}
        // style={{ translateX: -`${selectedNote * 100}%` }}
        style={{ translateX: `-${(selectedNote * 100) / notes?.[0]?.length}%` }}
        // transition={{ ease: "easeInOut", duration: 300 }}
      >
        {notes?.[0]?.map((note, i) => (
          <div
            key={i}
            // className={`w-[calc(100vw-130px)] ${
            className={`w-[100vw] ${
              collapsed
                ? isSidebarOpen
                  ? "pl-[0px] min-[450px]:pl-[88px] min-[600px]:pl-[232px]"
                  : "pl-[0px] min-[450px]:pl-[88px] "
                : isSidebarOpen
                ? "pl-[0px] min-[450px]:pl-[88px] min-[600px]:pl-[329px]"
                : "pl-[0px] min-[450px]:pl-[88px] min-[600px]:pl-[184px]"
            } h-fit relative  transition-all duration-300`}
          >
            <Editor key={i} page={i} initialContent={note} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Page;
