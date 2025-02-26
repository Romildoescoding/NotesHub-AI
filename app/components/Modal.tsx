"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ReactNode } from "react";
import ModalWrapper from "./ModalWrapper";
import { AnimatePresence, motion } from "framer-motion";

function Modal({
  children,
  setShowModal,
}: {
  children: ReactNode;
  setShowModal: any;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false); // Cleanup on unmount
  }, []);

  if (!mounted) return null; // Prevent rendering on SSR

  return createPortal(
    <AnimatePresence>
      <div>
        {/* Modal Content */}
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
          style={{ zIndex: 10000 }}
          className="w-fit h-fit fixed top-1/2 left-1/2 bg-white rounded-md"
        >
          <ModalWrapper setShowModal={setShowModal}>{children}</ModalWrapper>
        </motion.div>

        {/* Backdrop */}
        <motion.div
          onClick={() => setShowModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 9999 }}
          className="w-full h-full fixed backdrop-blur-sm left-0 top-0 bg-[#18181b95]"
        ></motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
