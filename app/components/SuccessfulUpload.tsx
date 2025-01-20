import React from "react";
import { ConfettiFireworks } from "./ConfettiFireworks";

const SuccessfulUpload = () => {
  return (
    <div className="w-[60vw] h-[90vh] bg-white flex flex-col gap-2 items-center justify-center">
      <h1 className="text-[3vw] font-semibold">Upload Successful</h1>
      <div className="flex w-full justify-center gap-24">
        <ConfettiFireworks>Celebrate!</ConfettiFireworks>
        <ConfettiFireworks>View Uploaded Notes!</ConfettiFireworks>
      </div>
    </div>
  );
};

export default SuccessfulUpload;
