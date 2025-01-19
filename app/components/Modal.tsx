"use client";
// import { createPortal } from "react-dom";
// import "../styles/modal.css";
import { ReactNode } from "react";
import ModalWrapper from "./ModalWrapper";
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
    <div className="z-[99999] bg-[#00000007] flex items-center justify-center backdrop-blur-sm h-full w-full fixed top-0 left-0">
      <ModalWrapper setShowModal={setShowModal}>{children}</ModalWrapper>
    </div>
  );
}

export default Modal;
