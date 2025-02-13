"use client";
import { useNotes } from "@/app/context/NotesContext";
import { useSidebar } from "@/app/context/SidebarContext";
import { ArrowUp, Edit } from "lucide-react";
// import Editor from "@/app/components/editor/Editor";
// import NotesSlider from "@/app/components/NotesSlider";
import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";

import React, { useEffect, useMemo, useRef, useState } from "react";
// import useExportPdf from "./useExportPdf";
import { motion } from "framer-motion";

function generateUniqueId() {
  return crypto.randomUUID(); // Generates a unique ID
}

const Page = () => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/app/components/editor/Editor"), { ssr: false }),
    []
  );

  const { notes, selectedNote } = useNotes();
  const { collapsed } = useSidebar();
  console.log(notes);

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
      <div ref={uploadBtnRef} className="absolute -top-[60px] right-0"></div>
      <button
        className="absolute top-5 right-5 bg-zinc-950 text-zinc-50 rounded-md p-2 px-3"
        // onClick={exportToPDF}
        // ref={uploadBtnRef}
      >
        {false ? "Uploading.." : "Upload"}
      </button>
      <button
        onClick={() =>
          uploadBtnRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        className="p-2 text-zinc-950 fixed bottom-4 right-4 z-[99999] rounded-full flex items-center justify-center bg-zinc-200"
      >
        <ArrowUp size={18} />
      </button>
      <motion.div
        // Here, tranition-all would maeke smooth effect while if i do not use it, then i would make a sudden switching effect making it feel like i switched editors while keeping their states even...
        className={`w-fit h-full overflow-y-hidden  pb-[30vh] transition-all  flex  flex-nowrap  -translate-x-[${
          selectedNote * 100
        }vw]}`}
        // style={{ translateX: -`${selectedNote * 100}%` }}
        style={{ translateX: `-${(selectedNote * 100) / notes?.[0]?.length}%` }}
        // transition={{ ease: "easeInOut", duration: 300 }}
      >
        {/* <div
        // className="w-full h-full relative pb-[30vh] bg-red-500"
        // ref={(el) => (editorRefs.current[0] = el)}
      // > */}
        {notes?.[0]?.map((note, i) => (
          <div
            key={i}
            className={`w-[calc(100vw-130px)] ${
              collapsed ? "pl-[100px]" : "pl-[130px]"
            } h-fit relative  transition-all duration-300`}
          >
            <Editor
              key={i}
              page={i}
              initialContent={JSON.stringify([
                {
                  id: generateUniqueId(),
                  type: "heading",
                  props: {
                    level: 1, // Default to H1
                    textColor: "default",
                    backgroundColor: "default",
                    textAlignment: "left",
                  },
                  content: [
                    {
                      type: "text",
                      text: `${
                        note?.title ?? `No note found at index ${selectedNote}`
                      }`,

                      styles: {},
                    },
                  ],
                  children: [],
                },
                {
                  id: generateUniqueId(),
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
                        note?.text ?? `No note found at index ${selectedNote}`
                      }`,
                      styles: {},
                    },
                  ],
                  children: [],
                },
              ])}
            />
          </div>
        ))}
        {/* <Editor key={selectedNote} initialContent={JSON.stringify([
        {
          id: generateUniqueId(),
          type: "heading",
          props: {
            level: 1, // Default to H1
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: `${
                notes?.[selectedNote]?.title ??
                `No note found at index ${selectedNote}`
              }`,

              styles: {},
            },
          ],
          children: [],
        },
        {
          id: generateUniqueId(),
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
                notes?.[selectedNote]?.text ??
                `No note found at index ${selectedNote}`
              }`,
              styles: {},
            },
          ],
          children: [],
        },
      ])} /> */}
        {/* <div>App</div> */}
        {/* <NotesSlider ocrResults={ocrResults} setShowModal={setShowModal} /> */}
        {/* </div> */}
      </motion.div>
    </div>
  );
};

export default Page;
