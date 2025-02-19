"use client";
import React, { ReactNode } from "react";
import Cancel from "./svgs/Cancel";

const ModalWrapper = ({
  children,
  setShowModal,
}: {
  children: ReactNode;
  setShowModal: any;
}) => {
  return (
    <div className="relative rounded-md w-fit h-fit ">
      <button
        className="absolute top-4 right-4 z-[9999]"
        onClick={() => setShowModal("")}
      >
        <Cancel />
      </button>
      {children}
    </div>
  );
};

export default ModalWrapper;
