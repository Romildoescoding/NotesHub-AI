import { FileText } from "lucide-react";
import Image from "next/image";
import React from "react";

const FileMessage = ({ user, document }) => {
  return (
    <div className="h-fit items-end w-full flex gap-3 ">
      <div className=" w-full flex justify-end">
        <div className="relative bg-zinc-100 border-2 mt-2 ml-2 h-12 gap-2 flex items-center justify-start pl-[6px] w-fit pr-2 rounded-md">
          <div className=" h-fit w-fit p-1 py-2 bg-zinc-900 rounded-md">
            <FileText size={20} className="text-white" />
          </div>
          <span className=" text-sm">
            {document.length > 14 ? document.slice(0, 15) + "..." : document}
          </span>
        </div>
      </div>
      <Image
        src={user?.image}
        height={24}
        width={24}
        alt="user-image"
        className="rounded-full border-2"
        style={{ visibility: "hidden" }}
      />
    </div>
  );
};

export default FileMessage;
