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
    <motion.div
      className="z-[99999999] bg-[#00000017] flex items-center justify-center backdrop-blur-sm h-full w-full fixed top-0 left-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      // exit={{ opacity: 0, scale: 0.95 }}
    >
      <ModalWrapper setShowModal={setShowModal}>{children}</ModalWrapper>
    </motion.div>
    // </AnimatePresence>
  );
}

export default Modal;
