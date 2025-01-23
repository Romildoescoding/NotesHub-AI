import React, { useEffect, useRef } from "react";
import { ConfettiFireworks } from "./ConfettiFireworks";
import RedirectButton from "./RedirectButton";

const SuccessfulUpload = () => {
  const confettiButtonRef = useRef(null);

  useEffect(() => {
    // Trigger the ConfettiFireworks button click on component mount
    if (confettiButtonRef.current) {
      confettiButtonRef.current.click();
    }
  }, []);

  return (
    <div className="w-[60vw] h-[90vh] bg-white flex flex-col gap-2 items-center justify-center">
      <h1 className="text-[3vw] font-semibold">Upload Successful</h1>
      <div className="flex w-full justify-center gap-24">
        <ConfettiFireworks ref={confettiButtonRef}>
          Celebrate!
        </ConfettiFireworks>
        <RedirectButton />
      </div>
    </div>
  );
};

export default SuccessfulUpload;
