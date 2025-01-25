import { Copy } from "lucide-react";
import Image from "next/image";
import React from "react";

const AiMessage = ({ text }) => {
  return (
    <div className="h-fit items-end w-full flex gap-3">
      <Image
        src="/App_Logo.png"
        height={24}
        width={24}
        alt="user-image"
        className="rounded-full border-2"
      />
      <span className="h-fit w-full max-w-[40vw] ai-message relative">
        {text}
        <span className="absolute bottom-2 right-2 text-zinc-50">
          <Copy size={15} />
        </span>
      </span>
    </div>
  );
};

export default AiMessage;
