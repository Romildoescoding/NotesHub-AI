import FileUpload from "@/app/components/FileUpload";
import React from "react";

const UploadNotes = () => {
  return (
    <div className=" h-fit w-full relative py-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <FileUpload />
    </div>

    // </div>
  );
};

export default UploadNotes;
