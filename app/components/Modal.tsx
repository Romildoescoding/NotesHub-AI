"use client";
// import { createPortal } from "react-dom";
// import "../styles/modal.css";
import { ReactNode } from "react";
import ModalWrapper from "./ModalWrapper";
import { AnimatePresence, motion } from "framer-motion";
// import useOutsideClick from "../hooks/useOutsideClick";

function Modal({
  children,
  setShowModal,
}: {
  children: ReactNode;
  setShowModal: any;
}) {
  //   const ref = useOutsideClick(() => setShowModal(""));
  return (
    // <AnimatePresence>
    //   <motion.div
    //     className="z-[99999999] cursor-default bg-[#00000070] flex items-center justify-center backdrop-blur-sm h-full w-full fixed top-0 left-0"
    //     initial={{ opacity: 0, scale: 0.95 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     exit={{ opacity: 0, scale: 0.95 }}
    //   >
    //     <ModalWrapper setShowModal={setShowModal}>{children}</ModalWrapper>
    //   </motion.div>
    // </AnimatePresence>
    <>
      {/* <AnimatePresence> */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-fit h-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md z-[9999999]"
      >
        <ModalWrapper setShowModal={setShowModal}>{children}</ModalWrapper>
      </motion.div>
      {/* </AnimatePresence> */}
      {/* <AnimatePresence> */}
      <motion.div
        // onClick={() => setShowModal(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full fixed backdrop-blur-sm left-0 top-0 bg-[#18181b75] z-[9999998]"
      ></motion.div>
      {/* </AnimatePresence> */}
    </>
  );
}

export default Modal;
