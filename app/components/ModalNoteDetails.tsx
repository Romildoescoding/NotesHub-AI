import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ExternalLink,
  Link,
  Lock,
  LockOpen,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatDate } from "../_lib/actions";
import { useCurrentUser } from "../auth/useCurrentUser";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";

const ModalNoteDetails = ({
  selectedNote,
  showModal,
  setShowModal,
  setSelectedNote,
  handleDelete,
}) => {
  const [copyUrl, setCopyUrl] = useState(false);
  useEffect(() => {
    if (copyUrl) {
      const timeout = setTimeout(() => setCopyUrl(false), 2000);
    }
  }, [copyUrl]);
  const { user } = useCurrentUser();
  //   function handleEditNote(selectedNote) {
  //     setShowModal("editing");
  //   }

  return (
    <>
      <AnimatePresence>
        {selectedNote && !showModal && (
          <motion.div
            // ref={ref}
            initial={{ bottom: "-100%" }}
            animate={{ bottom: 0 }}
            exit={{ bottom: "-100%" }}
            className="fixed bottom-0 overflow-y-scroll left-0 z-[999999999] w-full h-[90%]  bg-white rounded-t-xl"
          >
            <div className="w-full h-fit p-8 pb-4 flex flex-col gap-4 items-center">
              <div className="font-bold text-xl min-[400px]:text-2xl min-[600px]:text-3xl w-full flex flex-col gap-3 pb-4 justify-between border-b-2 border-zinc-200">
                <span className="capitalize ">{selectedNote.title}</span>
                <div className="flex gap-2 w-full items-end min-[500px]:justify-end flex-col min-[500px]:flex-row">
                  <div className="w-full flex justify-end gap-2 order-2 min-[500px]:order-1">
                    <button
                      className="
                    flex gap-2 items-center cursor-pointer border-zinc-200 border-2 rounded-full text-zinc-500 hover:text-zinc-900 p1 px-2 text-sm py-2"
                      onClick={() => setShowModal("editing")}
                    >
                      <Pencil size={20} />
                      Edit Note
                    </button>

                    <button
                      className="
                    flex gap-2 items-center cursor-pointer border-zinc-200 border-2 rounded-full text-zinc-500 hover:text-zinc-900 p1 px-2 text-sm py-2"
                      onClick={() =>
                        // handleDelete(selectedNote?._id, selectedNote.fileUrl)
                        setShowModal("deleting")
                      }
                    >
                      <Trash2 size={20} /> {"Delete Note"}
                    </button>
                  </div>
                  <span
                    className={`${
                      selectedNote.isPublic
                        ? "text-red-900 bg-red-300 border-red-400"
                        : "text-green-900 bg-green-300 border-green-400"
                    } rounded-full w-fit border-2 text-sm items-center px-3 py-2 flex gap-2 order-1 min-[500px]:order-2`}
                  >
                    {selectedNote.isPublic ? (
                      <LockOpen size={16} />
                    ) : (
                      <Lock size={16} />
                    )}
                    {selectedNote.isPublic ? "Public" : "Private"}
                  </span>
                </div>
              </div>

              {/* User detials and file link section */}
              <div className="w-full h-fit flex flex-col gap-2 min-[650px]:gap-0 min-[650px]:flex-row min-[650px]:justify-between">
                <div className="h-fit flex w-full  justify-start gap-6 items-center">
                  <Image
                    src={user?.image ?? ""}
                    height={60}
                    width={60}
                    alt="user"
                    className="rounded-full"
                  />
                  <p className="flex flex-col ">
                    <span className="font-semibold text-xl ">{user?.name}</span>{" "}
                    <span className="text-zinc-600">Full-Stack Developer</span>
                  </p>
                </div>
                <div className="h-full flex justify-end min-w-fit w-full gap-2">
                  <span
                    className="
                      flex gap-2 items-center text-xs min-[380px]:text-base cursor-pointer border-zinc-200 border-2 rounded-md text-zinc-500 hover:text-zinc-900 p-1 px-2"
                    onClick={() => {
                      window.open(selectedNote.fileUrl);
                    }}
                  >
                    <ExternalLink size={16} /> View in separate tab
                  </span>
                  <span
                    className={`${
                      copyUrl ? "cursor-auto" : "cursor-pointer"
                    } flex gap-2 items-center text-xs min-[380px]:text-base cursor-pointer border-zinc-200 border-2 rounded-md text-zinc-500 hover:text-zinc-900 p-1 px-2`}
                    onClick={() => {
                      navigator.clipboard.writeText(selectedNote.fileUrl);
                      setCopyUrl(true);
                    }}
                  >
                    {copyUrl ? <Check size={16} /> : <Link size={16} />} Copy
                    Url
                  </span>
                </div>
              </div>
              <div className="w-full h-[75vh] flex justify-center">
                <div className="relative w-[90%] min-[800px]:w-[75%] h-full overflow-scroll border-2 border-zinc-200 rounded-lg">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                    <div>
                      <Viewer
                        defaultScale={SpecialZoomLevel.PageWidth}
                        fileUrl={selectedNote.fileUrl}
                        // theme={{
                        //   textLayer: "hidden", // Hides the text layer
                        // }}
                      />
                      {/* <Viewer defaultScale={1} fileUrl={selectedNote.fileUrl} /> */}
                    </div>
                  </Worker>
                </div>
              </div>
              <div className="w-[100%] flex flex-col mt-2 border-t-2 border-zinc-200 py-2 pr-4 pl-2 gap-2">
                <span className="text-3xl font-semibold">About</span>
                <p className="text-zinc-700 text-md">
                  {selectedNote.description}
                </p>
              </div>

              {/* Categories */}
              <div className="w-full flex flex-col py-2 pl-2 gap-2">
                <span className="text-3xl font-semibold">Categories</span>
                <div className="flex gap-2 flex-wrap">
                  {selectedNote.tags.map((tag, i) => (
                    <span
                      className="bg-blue-300 text-md p-2 px-3 rounded-full text-blue-900 border-blue-400"
                      style={{
                        backgroundColor: tag.secondary,
                        color: tag.primary,
                      }}
                      key={i}
                    >
                      {tag.category}
                    </span>
                  ))}
                </div>
              </div>

              <p className="flex w-full justify-end text-md gap-2">
                Uploaded on{" "}
                <span className="font-semibold">
                  {formatDate(selectedNote.createdAt)}{" "}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedNote && !showModal && (
          <motion.div
            onClick={() => {
              setSelectedNote(null);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-0 cursor-pointer left-0 z-[999999998] w-full h-full bg-zinc-950"
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalNoteDetails;
